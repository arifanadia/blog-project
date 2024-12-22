import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { UserServices } from './user.service';

const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getRegisteredUserFromDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const UserControllers = {
  registerUser,
};
