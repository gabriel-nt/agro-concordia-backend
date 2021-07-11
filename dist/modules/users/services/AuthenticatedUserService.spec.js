"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _AuthenticatedUserService = _interopRequireDefault(require("./AuthenticatedUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let authenticateUser;
describe('AuthenticatedUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticatedUserService.default(fakeHashProvider, fakeUsersRepository);
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      credential: 'Monroe',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should be able to authenticate within non existing user', async () => {
    await expect(authenticateUser.execute({
      credential: 'nick',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to authenticate within wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    await expect(authenticateUser.execute({
      credential: 'monroe@grimm.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});