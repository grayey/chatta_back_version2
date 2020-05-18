import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  Query,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../client/dto/login-user.dto';
import { Response, Request } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/verify_email')
  async verifyEmail(
    @Query('token') token,
    @Req() req: Response,
    @Res() res: Response,
  ) {
    const authenticatedUser = await this.authService.verifyUserEmail(
      token,
      req,
      res,
    );
    if (authenticatedUser) {
      return authenticatedUser;
    }
    return {};
  }
  @Patch('/reset-password')
  async resetPassword(
    @Query('token') token,
    @Req() req: Response,
    @Res() res: Response,
  ) {
    const passwordReset = await this.authService.resetPassword(token, req, res);
    if (passwordReset) {
      return passwordReset;
    }
    return {};
  }
  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Response,
    @Res() res: Response,
  ) {
    return await this.authService.validateUserPassword(loginUserDto, req, res);
  }
}
