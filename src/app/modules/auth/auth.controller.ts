import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: StatusCodes.ACCEPTED,
    data: { token: result.token },
  });
});

export const AuthControllers = {
  register,
  login,
};
