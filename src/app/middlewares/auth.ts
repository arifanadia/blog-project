import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized!');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwt_secret as string, (err, decoded) => {
      if (err) {
        return next(
          new AppError(StatusCodes.FORBIDDEN, 'Invalid or expired token!'),
        );
      }

      const userRole = (decoded as JwtPayload).role;
      if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        return next(
          new AppError(StatusCodes.FORBIDDEN, 'You do not have permission!'),
        );
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default auth;
