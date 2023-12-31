import {
	Body,
	Controller,
	Inject,
	Post,
	UseFilters,
	Param,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { IAuthService } from './auth.interface';
import { Exception } from '@common/filters/exception.filter';
import { ROLE } from '@common/enums';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(IAuthService) private readonly authService: IAuthService
	) {}

	@Post('login')
	@UseFilters(Exception)
	login(@Body() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto);
	}

	@Post('register/:role')
	register(
		@Param('role') role: ROLE,
		@Body() registerUserDto: RegisterUserDto
	) {
		return this.authService.register(role, registerUserDto);
	}
}
