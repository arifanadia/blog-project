import { StatusCodes } from 'http-status-codes';
import { TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extracting the duplicate key information
  const field = Object.keys(err.keyValue)[0]; // Field causing the duplicate error
  const value = err.keyValue[field]; // Value causing the duplicate error

  const errorSources = [
    {
      path: field,
      message: `The value '${value}' already exists. Please use a different value.`,
    },
  ];

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Duplicate Key Error',
    errorSources,
  };
};

export default handleDuplicateError;
