import { IsString } from 'class-validator';

export class EditItemDTO {
    @IsString()
    productName!: string;
}

export class ItemDTO extends EditItemDTO {
    @IsString()
    productID!: string;
}
