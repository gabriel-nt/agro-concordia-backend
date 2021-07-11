"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _UpdateUserService = _interopRequireDefault(require("./UpdateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let updateUser;
describe('UpdateUserService', () => {
  beforeEach(() => {
    fakeHashProvider = new _FakeHashProvider.default();
    fakeUserRepository = new _FakeUserRepository.default();
    updateUser = new _UpdateUserService.default(fakeHashProvider, fakeUserRepository);
  });
  it('should be able to update a user without password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    const updateProfileUser = await updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Nick',
        email: 'nick@grimm.com',
        phone: '999999999'
      }
    });
    expect(updateProfileUser.name).toEqual('Nick');
    expect(updateProfileUser.email).toEqual('nick@grimm.com');
  });
  it('should be able to update a user with password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    const updateProfileUser = await updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Nick',
        email: 'nick@grimm.com',
        phone: '999999999',
        password: '12345',
        old_password: '123456',
        confirm_password: '12345'
      }
    });
    expect(updateProfileUser.name).toEqual('Nick');
    expect(updateProfileUser.email).toEqual('nick@grimm.com');
  });
  it('should not be able to show the update from non-existing user', async () => {
    await expect(updateUser.execute({
      user_id: 'non-existing',
      data: {
        name: 'Nick',
        email: 'nick@grimm.com',
        phone: '999999999'
      }
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    const user = await fakeUserRepository.create({
      name: 'Nick',
      email: 'nick@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    await expect(updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Monroe',
        email: 'monroe@grimm.com',
        phone: '99999999999'
      }
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to change password having field password old', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    await expect(updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Monroe e Rosalle',
        email: 'monroe@rosalle.com',
        phone: '99999999999',
        password: '098765'
      }
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to change password having confirm password field', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    await expect(updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Monroe e Rosalle',
        email: 'monroe@rosalle.com',
        phone: '99999999999',
        password: '098765',
        old_password: '123456'
      }
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to change the password equal confirm password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    await expect(updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Monroe e Rosalle',
        email: 'monroe@rosalle.com',
        phone: '99999999999',
        password: '098765',
        old_password: '123456',
        confirm_password: '09876'
      }
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to change the password if password old is correct', async () => {
    const user = await fakeUserRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    await expect(updateUser.execute({
      user_id: user.id,
      data: {
        name: 'Monroe e Rosalle',
        email: 'monroe@rosalle.com',
        phone: '99999999999',
        password: '098765',
        old_password: '12345',
        confirm_password: '09876'
      }
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});