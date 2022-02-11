import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity'
import { Repository } from 'typeorm';
import { GetStartedDto, GetStartedResponseDto, SignupCognitoData } from './auth.dto';
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
	UserPoolId: process.env.USER_POOL_ID, // Your user pool id here
	ClientId: process.env.COGNITO_APP_CLIENT_ID, // Your client id here
};

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    
    /** Get started service */
    async getStarted(getStartedData: GetStartedDto): Promise<GetStartedResponseDto> {
        const { email } = getStartedData;
        const user = await this.usersRepository.findOne({
            where:{
                email:email
            }
        });

        if (user) return {
            id: user.id,
            email: user.email,
            is_registered: true
        }

        return {
            id: null,
            email: email,
            is_registered: false
        }
    }


    /** Signup cognito for testing only */
    async signupCognito(signupCognitoData: SignupCognitoData): Promise<any>{
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var attributeList = [];

        const {email, password} = signupCognitoData
 
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: email,
        });
        attributeList.push(attributeEmail);

        return (async () => {
            return new Promise((resolve, reject)=>{
                userPool.signUp(email, password, attributeList, null, function(
                    err,
                    result
                ) {
                    if (err) {
                        return reject(new BadRequestException({
                            code: "user_0",
                            message: err.message
                        })) 
                        // reject(err.message)
                    }
                    var cognitoUser = result.user;
                    return resolve({
                        email: email
                    })
                });
            })
        })()
    }
}
