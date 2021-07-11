import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  filePath: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('StorageProvider') private storageProvider: IStorageProvider,
    @inject('UsersRepository') private usersRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    filePath,
    avatarFilename,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.image) {
      await this.storageProvider.deleteFile(user.image);
    }

    const filename = await this.storageProvider.saveFile({
      filePath,
      file: avatarFilename,
    });

    user.image = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
