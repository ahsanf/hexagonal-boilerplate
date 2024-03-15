import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../error/application_error';
import { HTTPError } from '../error/type/common_error';
import { formatError } from '../error/format_error';
import { config } from '../../../config/config';

const secretKey: Secret = config.app.appSalt;
let applicationError: ApplicationError

export const authMiddleware =  (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const token: string = req.cookies.accessToken !== undefined ? req.cookies.accessToken.token : req.query.accessToken?.toString();
      if (!token) {
        applicationError = new ApplicationError(HTTPError('Access token required').UNAUTHORIZED);
        res.status(403).json(formatError(applicationError));
        return
      } else {
        jwt.verify(token, secretKey, (error, decoded) => {
          if (error) {
            applicationError = new ApplicationError(HTTPError('Invalid access token').UNAUTHORIZED);
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
      applicationError = new ApplicationError(HTTPError().UNAUTHORIZED);
      applicationError.message = err.message;
      res.status(401).json(formatError(applicationError));
    }
  })()
};
