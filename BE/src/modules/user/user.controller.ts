import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor() {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: RequestWithUser) {
    return req.user;
  }
}
