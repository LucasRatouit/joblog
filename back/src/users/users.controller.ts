import { Controller, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.usersService.create(createUserDto);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'prod',
      maxAge: 60 * 1000, // 1 minute
    });

    return { user, message: 'Inscription réussie' };
  }

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.usersService.userLogin(
      loginDto.email,
      loginDto.password,
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'prod',
      maxAge: 60 * 1000, // 1 minute
    });

    return { user, message: 'Connexion réussie' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Déconnexion réussie' };
  }
}
