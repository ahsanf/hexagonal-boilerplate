import jwt, { Secret } from 'jsonwebtoken';
import { ApplicationError } from '../error/application_error';
import { HttpError } from '../error/type/http_error';
import { formatError } from '../error/format_error';
import { config } from 'src/config/config';

const secretKey: Secret = config.app.appSalt;
let applicationError: ApplicationError

export const globalAuthMiddleware =  (req: any, res: any, next: any) => {
  (async () => {
    try {
      const token: string = req.cookies.accessToken !== undefined ? req.cookies.accessToken.token : req.query.accessToken?.toString();
      if (!token) {
        applicationError = new ApplicationError(HttpError('Access token required').UNAUTHORIZED);
        res.status(403).json(formatError(applicationError));
        return
      } else {
        jwt.verify(token, secretKey, (error, decoded) => {
          if (error) {
            applicationError = new ApplicationError(HttpError('Invalid access token').UNAUTHORIZED);
            applicationError.message = error.message;
            res.status(401).json(formatError(applicationError));
            return
          } else {
            res.locals.user = decoded;
            next();
          }
        });
      }

    } catch (err: any) {
      applicationError = new ApplicationError(HttpError().UNAUTHORIZED);
      applicationError.message = err.message;
      res.status(401).json(formatError(applicationError));
    }
  })()
};
