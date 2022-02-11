import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetStartedDto, SignupCognitoData } from './auth.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}

    /** Get started API */
    @Post('get-started')
    async getStarted (@Body() getStartedData: GetStartedDto) {
        return this.service.getStarted(getStartedData);
    }

    /** Cognito signup for testing only */
    @Post("signup-cognito")
    async signup(@Body() signupCognitoData: SignupCognitoData){
        return this.service.signupCognito(signupCognitoData)
    }
}
