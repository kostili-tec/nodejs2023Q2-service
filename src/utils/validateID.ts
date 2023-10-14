import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export const validateID = (id: string) => {
  const isValidId = validate(id);
  if (!isValidId) throw new BadRequestException('userID is invalid (not uuid)');
};
