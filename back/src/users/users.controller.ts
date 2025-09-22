import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { Request, Response } from 'express';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

type Success = { user: User; token: string };
type Error = { error: string; message: string };

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  isLoggedIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['token'] as string;

    if (!token)
      res.status(401).send({ error: 'token', message: 'Aucun token valide' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded)
      return res
        .status(401)
        .send({ error: 'token', message: 'Token invalide' });

    res.status(200).send({ message: 'Token valide', user: req.user });
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data: Success | Error = await this.usersService.create(createUserDto);
    if ('error' in data) {
      res.status(400).send(data);
      return;
    }

    res.cookie('token', data.token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'prod',
      maxAge: 60 * 1000, // 1 minute
    });

    res.status(201).send({ message: 'Utilisateur créé avec succès' });
  }

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const data: Success | Error = await this.usersService.userLogin(
      loginDto.email,
      loginDto.password,
    );
    if ('error' in data) {
      res.status(400).send(data);
      return;
    }

    res.cookie('token', data.token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'prod',
      maxAge: 60 * 1000, // 1 minute
    });

    res.status(200).send({ message: 'Connexion réussie' });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    res.status(200).send({ message: 'Déconnexion réussie' });
  }
}
