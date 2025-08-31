import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.['token'] as string | undefined;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: string;
          email: string;
        };
        req.user = { token: { id: decoded.id, email: decoded.email } };
      } catch {
        req.user = null;
      }
    } else {
      req.user = null;
    }

    next();
  }
}
