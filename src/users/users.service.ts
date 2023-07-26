import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

import { validateID } from '../utils/validateID';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    validateID(id);
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('ID doest not exist');
    else return this.users.find((user) => user.id === id);
  }

  createUser(dto: CreateUserDto) {
    const newUser: User = {
      ...dto,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    this.users.push(newUser);
    const showUser = Object.assign({}, newUser);
    delete showUser.password;
    return showUser;
  }

  updateUser(id: string, dto: UpdateUserDto) {
    validateID(id);
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
      throw new NotFoundException('ID doest not exist');
    }
  }

  deleteUser(id: string) {
    validateID(id);
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }
}
