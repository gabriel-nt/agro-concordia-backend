import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  data: IUpdateUserDTO;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, data }: IRequest): Promise<User> {
    const { name, email, phone, old_password, password, confirm_password } =
      data;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User non exist');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('Email already in use');
    }

    Object.assign(user, {
      name,
      email,
      phone,
    });

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && !confirm_password) {
      throw new AppError(
        'You need to inform the confirm password to set a new password',
      );
    }

    if (password && old_password) {
      if (password !== confirm_password) {
        throw new AppError(
          'You need to inform the confirm password to equal a new password',
        );
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
