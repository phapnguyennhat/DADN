import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import JwtAuthGuard from './guard/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import * as bcrypt from 'bcrypt';


import { LocalAuthGuard } from './guard/local-auth.guard';
import JwtRefreshGuard from './guard/jwtRefresh.guard';

import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private jwtService: JwtService,
   

  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: RequestWithUser) {
    // Xóa cookie access token và refresh token
    req.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return { message: 'Đăng xuất thành công' };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(req.user?.id);
    const refreshTokenCookie =
      await this.authService.getCookieWithJwtRefreshToken(req.user?.id);
    
    req.res.setHeader('Set-Cookie', [
      accessTokenCookie.cookie,
      refreshTokenCookie.cookie,
    ]);

    return { accessTokenCookie, refreshTokenCookie };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req) {
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(req.user.id);

    req.res.setHeader('Set-Cookie', accessTokenCookie.cookie);
    return accessTokenCookie;
  }
}
