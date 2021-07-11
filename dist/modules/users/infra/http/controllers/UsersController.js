"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserService = _interopRequireDefault(require("../../../services/UpdateUserService"));

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      phone,
      password
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute({
      name,
      email,
      phone,
      password
    });
    return response.json(user);
  }

  async update(request, response) {
    const updateUser = _tsyringe.container.resolve(_UpdateUserService.default);

    const user = await updateUser.execute({
      user_id: request.user.id,
      data: request.body
    });
    return response.json(user);
  }

}

exports.default = UsersController;