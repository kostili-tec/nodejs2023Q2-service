import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly oldPassword: string; // previous password

  @IsNotEmpty()
  readonly newPassword: string; // new password
}
