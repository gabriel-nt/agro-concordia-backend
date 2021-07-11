import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserService from './UpdateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateUserService;

describe('UpdateUserService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUsersRepository();

    updateUser = new UpdateUserService(fakeHashProvider, fakeUserRepository);
  });

  it('should be able to update a user without password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    const updateProfileUser = await updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Nick',
        email: 'nick@grimm.com',
        phone: '999999999',
      },
    });

    expect(updateProfileUser.name).toEqual('Nick');
    expect(updateProfileUser.email).toEqual('nick@grimm.com');
  });

  it('should be able to update a user with password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    const updateProfileUser = await updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Nick',
        email: 'nick@grimm.com',
        phone: '999999999',
        password: '12345',
        old_password: '123456',
        confirm_password: '12345',
      },
    });

    expect(updateProfileUser.name).toEqual('Nick');
    expect(updateProfileUser.email).toEqual('nick@grimm.com');
  });

  it('should not be able to show the update from non-existing user', async () => {
    await expect(
      updateUser.execute({
        user_id: 'non-existing',
        data: {
          name: 'Nick',
          email: 'nick@grimm.com',
          phone: '999999999',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Nick',
      email: 'nick@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        data: {
          name: 'Monroe',
          email: 'monroe@grimm.com',
          phone: '99999999999',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change password having field password old', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        data: {
          name: 'Monroe e Rosalle',
          email: 'monroe@rosalle.com',
          phone: '99999999999',
          password: '098765',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change password having confirm password field', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        data: {
          name: 'Monroe e Rosalle',
          email: 'monroe@rosalle.com',
          phone: '99999999999',
          password: '098765',
          old_password: '123456',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change the password equal confirm password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        data: {
          name: 'Monroe e Rosalle',
          email: 'monroe@rosalle.com',
          phone: '99999999999',
          password: '098765',
          old_password: '123456',
          confirm_password: '09876',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change the password if password old is correct', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        data: {
          name: 'Monroe e Rosalle',
          email: 'monroe@rosalle.com',
          phone: '99999999999',
          password: '098765',
          old_password: '12345',
          confirm_password: '09876',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
