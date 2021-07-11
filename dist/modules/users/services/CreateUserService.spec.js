"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUser;
describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('shoudld not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    });
    await expect(createUser.execute({
      name: 'Monroe',
      email: 'monroe@grimm.com',
      phone: '99999999999',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});