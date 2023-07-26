import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(dto: CreateUserDto) {
    const newUser: User = {
      ...dto,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 0,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, dto: UpdateUserDto) {
    const isValidUUID = validate(id);
    if (!isValidUUID || typeof id !== 'string') {
      throw new HttpException('userID is invalid', HttpStatus.BAD_REQUEST);
    }
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      const user = Object.assign({}, this.users[userIndex]);
      const { oldPassword, newPassword } = dto;
      if (oldPassword !== user.password) {
        throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
      }
      user.password = newPassword;
      user.version = user.version + 1;
      user.updatedAt = Date.now();
      Object.assign(this.users[userIndex], user);
      delete user.password;
      return user;
    } else {
      throw new HttpException('ID doest not exist', HttpStatus.NOT_FOUND);
    }
  }
}
