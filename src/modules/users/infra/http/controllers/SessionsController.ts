import { container } from 'tsyringe';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticatedUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { credential, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      credential,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }

  public async authenticatedUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return response.json({ success: true });
  }
}

export default SessionsController;
