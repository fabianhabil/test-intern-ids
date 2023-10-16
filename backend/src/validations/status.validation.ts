import { IsString } from 'class-validator';

export class StatusDTO {
    @IsString()
    name!: string;
}
