import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService){}

    @Post()
    async createUser () {
        return this.service.createUser()
    }
}
