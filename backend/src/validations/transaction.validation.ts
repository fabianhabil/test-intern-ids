import { IsDateString, IsNumber, IsString } from 'class-validator';

export class TransactionDTO {
    @IsNumber()
    amount!: number;

    @IsDateString()
    transactionDate!: Date;

    @IsString()
    customerName!: string;

    @IsString()
    createBy!: string;

    @IsString()
    productID!: string;

    @IsNumber()
    statusID!: number;
}
