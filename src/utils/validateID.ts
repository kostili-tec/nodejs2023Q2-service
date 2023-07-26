import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';

export const validateID = (id: string) => {
  const isValidId = validate(id);
  if (!isValidId)
    throw new HttpException(
      'userID is invalid (not uuid)',
      HttpStatus.BAD_REQUEST,
    );
};
