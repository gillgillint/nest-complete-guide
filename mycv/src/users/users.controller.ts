import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('/signin')
  signIn(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.email, body.password);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user
  }

  @Get()
  findUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }

  @Delete("/:id")
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }
}