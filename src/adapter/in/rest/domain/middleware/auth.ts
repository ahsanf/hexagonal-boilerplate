import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorToRestResponse } from '../util/converter';
import { ApplicationError } from '../../../../../util/error/application_error';
import { HTTPError } from '../../../../../util/error/type/common_error';

export const secretKey: Secret = process.env.APP_SALT ?? '';

export const authMiddleware =  (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        throw new ApplicationError(HTTPError.FORBIDDEN)
      }
      
      jwt.verify(token, secretKey, (error, decoded) => {
        if(error) {
          throw new ApplicationError(HTTPError.FORBIDDEN)
        } else{
          res.locals.user = decoded;
          next()
        }
      });

    } catch (err) {
      console.log(err)
      throw new ApplicationError(HTTPError.UNAUTHORIZED)
    }
  })()
};

