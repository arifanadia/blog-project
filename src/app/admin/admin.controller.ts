import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockedUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await AdminServices.blockedUser(userId);
    sendResponse(res, {
      success: true,
      message: 'User blocked successfully',
      statusCode: StatusCodes.OK, // 200 for successful update
      data: result,
    });
  });
const deleteBlogs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteBlogs(id);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const AdminControllers = {
  blockedUser,
  deleteBlogs
};
