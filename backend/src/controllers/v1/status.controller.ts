import {
    Body,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Res
} from 'routing-controllers';
import { Service } from 'typedi';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';
import { StatusService } from '../../services/status.service';
import { StatusDTO } from '../../validations/status.validation';

@Service()
@JsonController('/v1/status')
export class ItemController {
    constructor(private readonly service: StatusService) {}

    @Get('/')
    async getAll(@Res() res: Response) {
        const status = await this.service.getAll();

        return sendResponse(res, {
            message: 'Success get all status',
            data: status
        });
    }

    @Post('/')
    async create(@Res() res: Response, @Body() body: StatusDTO) {
        const status = await this.service.create(body);

        return sendResponse(res, {
            message: 'Success create status',
            data: { status }
        });
    }

    @Get('/:statusId')
    async getById(@Res() res: Response, @Param('statusId') statusId: number) {
        const status = await this.service.getById(statusId);

        return sendResponse(res, {
            message: 'Success get status',
            data: status
        });
    }

    @Put('/:statusId')
    async editById(
        @Res() res: Response,
        @Param('statusId') statusId: number,
        @Body() body: StatusDTO
    ) {
        const item = await this.service.update(statusId, body);
        return sendResponse(res, { message: 'Item updated', data: item });
    }
}
