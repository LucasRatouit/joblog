import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<
    { user: User; token: string } | { error: string; message: string }
  > {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (userExists) return { error: 'email', message: 'Utilisateur existant' };

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hash,
      },
    });

    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { user, token };
  }

  async userLogin(
    email: string,
    password: string,
  ): Promise<
    { token: string; user: User } | { error: string; message: string }
  > {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) return { error: 'email', message: 'Utilisateur introuvable' };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return { error: 'password', message: 'Mot de passe incorrect' };

    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token, user };
  }
}
