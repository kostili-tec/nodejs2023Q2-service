import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { v4 as uuidv4 } from 'uuid';

import { User as UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateID } from '../utils/validateID';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: UserInterface[] = [];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserById(id: string) {
    validateID(id);
    return this.usersRepository.findOneBy({ id });
  }

  async createUser(dto: CreateUserDto) {
    const newUser: UserInterface = {
      ...dto,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };

    await this.usersRepository.insert(newUser);
    const showUser = Object.assign({}, newUser);
    delete showUser.password;
    return showUser;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    validateID(id);
    const userToUpdate = await this.usersRepository.findOneBy({ id });
    if (userToUpdate) {
      const { oldPassword, newPassword } = dto;
      if (oldPassword !== userToUpdate.password) {
        throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
      }
      userToUpdate.password = newPassword;
      userToUpdate.version = userToUpdate.version + 1;
      userToUpdate.updatedAt = Date.now();
      await this.usersRepository.save(userToUpdate);
      delete userToUpdate.password;
      return userToUpdate;
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  async deleteUser(id: string) {
    validateID(id);
    const userToDelete = await this.usersRepository.findOneBy({ id });
    if (userToDelete) {
      await this.usersRepository.delete({ id });
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }
}
