import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError) : TGenericErrorResponse => {
  // Map the Mongoose validation errors to a structured error response
  const errorSources: TErrorSources[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError)  => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
