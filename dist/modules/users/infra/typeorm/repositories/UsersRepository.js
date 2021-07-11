"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByCredential(credential) {
    const user = await this.ormRepository.findOne({
      where: [{
        email: (0, _typeorm.Raw)(alias => `LOWER(${alias}) = LOWER('${credential}')`)
      }, {
        phone: (0, _typeorm.Raw)(alias => `LOWER(${alias}) = LOWER('${credential}')`)
      }, {
        name: (0, _typeorm.Raw)(alias => `LOWER(${alias}) = LOWER('${credential}')`)
      }]
    });
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async create({
    email,
    name,
    phone,
    password
  }) {
    const user = this.ormRepository.create({
      email,
      name,
      phone,
      password
    });
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

}

var _default = UsersRepository;
exports.default = _default;