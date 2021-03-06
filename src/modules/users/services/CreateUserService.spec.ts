import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('shoudld not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Monroe',
        email: 'monroe@grimm.com',
        phone: '99999999999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
