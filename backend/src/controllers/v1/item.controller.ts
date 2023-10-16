import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Res
} from 'routing-controllers';
import { Service } from 'typedi';
import { ItemService } from '../../services/item.service';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';
import { EditItemDTO, ItemDTO } from '../../validations/item.validation';

@Service()
@JsonController('/v1/item')
export class ItemController {
    constructor(private readonly service: ItemService) {}

    @Get('/')
    async getAll(@Res() res: Response) {
        const items = await this.service.getAll();

        return sendResponse(res, {
            message: 'Success get all item',
            data: items
        });
    }

    @Post('/')
    async create(@Res() res: Response, @Body() body: ItemDTO) {
        const item = await this.service.create(body);

        return sendResponse(res, {
            message: 'Success create item',
            data: { item }
        });
    }

    @Get('/:itemId')
    async getById(@Res() res: Response, @Param('itemId') itemId: string) {
        const item = await this.service.getById(itemId, true);

        return sendResponse(res, { message: 'Success get item', data: item });
    }

    @Delete('/:itemId')
    async deleteById(@Res() res: Response, @Param('itemId') itemId: string) {
        await this.service.delete(itemId);

        return sendResponse(res, { message: 'Item deleted' });
    }

    @Put('/:itemId')
    async editById(
        @Res() res: Response,
        @Param('itemId') itemId: string,
        @Body() body: EditItemDTO
    ) {
        const item = await this.service.update(itemId, body);
        return sendResponse(res, { message: 'Item updated', data: item });
    }
}
