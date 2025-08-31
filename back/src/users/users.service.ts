import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hash,
      },
    });
  }

  async userConnection(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) throw new UnauthorizedException('Utilisateur introuvable');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Mot de passe incorrect');

    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token, user };
  }
}
