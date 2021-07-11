"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserService {
  constructor(hashProvider, usersRepository) {
    this.hashProvider = hashProvider;
    this.usersRepository = usersRepository;
  }

  async execute({
    user_id,
    data
  }) {
    const {
      name,
      email,
      phone,
      old_password,
      password,
      confirm_password
    } = data;
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User non exist');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new _AppError.default('Email already in use');
    }

    Object.assign(user, {
      name,
      email,
      phone
    });

    if (password && !old_password) {
      throw new _AppError.default('You need to inform the old password to set a new password');
    }

    if (password && !confirm_password) {
      throw new _AppError.default('You need to inform the confirm password to set a new password');
    }

    if (password && old_password) {
      if (password !== confirm_password) {
        throw new _AppError.default('You need to inform the confirm password to equal a new password');
      }

      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) {
        throw new _AppError.default('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateUserService;
exports.default = _default;