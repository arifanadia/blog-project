import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';


const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Invalid email or password');
  }
  if (user.isBlocked) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Your account is blocked. Please contact support.',
    );
  }
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password did not match');
  }

  const token = jwt.sign(
    {
      id: user.email,
      role: user.role, // Assuming the user has a `role` field, adjust based on your schema
    },
    config.jwt_secret as string, // Replace with your secret key
    { expiresIn: '10d' }, // Token expiration time, can be adjusted as needed
  );
  return { token, user };
};
export const AuthServices = {
  register,
  login,
};
