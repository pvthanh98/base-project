import { IsEmail, IsString } from 'class-validator';

/** BODY DTO */
export class GetStartedDto {
  @IsEmail()
  email: string;
}


/** RESPONSE DTO */
export interface GetStartedResponseDto {
  id: string;
  email: string;
  is_registered: boolean;
}

export class SignupCognitoData {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}