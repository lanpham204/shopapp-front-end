import{
    IsString,IsNotEmpty,
    IsPhoneNumber,IsDate, isString
} from 'class-validator'

export class UpdateUserDTO {
        @IsString()
        fullname: String;

        @IsString()
        address: String;

        @IsString()
        @IsNotEmpty()
        password: String;

        @IsString()
        @IsNotEmpty()
        retype_password: String;

        @IsDate()
        date_of_birth: Date;


        constructor(data: any) {
            this.fullname = data.fullName;
            this.address = data.address;
            this.password = data.password;
            this.retype_password = data.retype_password;
            this.date_of_birth = data.date_of_birth
        }
}
