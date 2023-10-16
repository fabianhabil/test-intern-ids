import { Service } from 'typedi';
import { Item } from '../database/entities/item.entity';
import { Errors } from '../utils/api.util';
import type { EditItemDTO, ItemDTO } from '../validations/item.validation';

@Service()
export class ItemService {
    async create(dto: ItemDTO): Promise<Item | null> {
        const itemExist = await this.getById(dto.productID);

        if (itemExist) {
            throw Errors.ITEM_EXISTS;
        }

        const item = Item.create({ ...dto });

        await Item.save(item);

        return item;
    }

    async getAll(): Promise<Item[] | null> {
        const item = await Item.find();

        return item;
    }

    async getById(productID: string, api?: boolean): Promise<Item | null> {
        const item = await Item.findOne({ where: { productID } });

        if (api && !item) {
            throw Errors.ITEM_NOT_FOUND;
        }

        return item;
    }

    async update(productID: string, dto: EditItemDTO): Promise<Item> {
        const item = await this.getById(productID);

        if (!item) {
            throw Errors.ITEM_NOT_FOUND;
        }

        item.productName = dto.productName;

        await item!.save();

        return item;
    }

    async delete(productID: string): Promise<void> {
        const item = await this.getById(productID);

        if (!item) {
            throw Errors.ITEM_NOT_FOUND;
        }

        await item.remove();
    }
}
