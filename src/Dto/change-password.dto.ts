import {} from 'class-validator';

export class ChangePasswordDto {
    userId : number;
    oldPassword: string;
    newPassword: string; 
}