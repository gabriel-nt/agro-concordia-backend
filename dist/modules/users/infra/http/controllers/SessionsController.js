"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticatedUserService = _interopRequireDefault(require("../../../services/AuthenticatedUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      credential,
      password
    } = request.body;

    const authenticateUser = _tsyringe.container.resolve(_AuthenticatedUserService.default);

    const {
      user,
      token
    } = await authenticateUser.execute({
      credential,
      password
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

  async authenticatedUser(request, response) {
    return response.json({
      success: true
    });
  }

}

var _default = SessionsController;
exports.default = _default;