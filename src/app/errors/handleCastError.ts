import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid Id',
    errorSources,
  };

 
};
export default handleCastError;