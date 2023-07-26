import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly oldPassword: string; // previous password

  @IsString()
  readonly newPassword: string; // new password
}
