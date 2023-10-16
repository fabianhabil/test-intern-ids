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
import { TransactionService } from '../../services/transaction.service';
import { sendResponse } from '../../utils/api.util';
import { TransactionDTO } from '../../validations/transaction.validation';
import { Response } from 'express';

@Service()
@JsonController('/v1/transaction')
export class TransactionController {
    constructor(private readonly service: TransactionService) {}

    @Get('/')
    async getAll(@Res() res: Response) {
        const transactions = await this.service.getAll();

        return sendResponse(res, {
            message: 'Success get all transactions',
            data: transactions
        });
    }

    @Post('/')
    async create(@Res() res: Response, @Body() body: TransactionDTO) {
        const transaction = await this.service.create(body);

        return sendResponse(res, {
            message: 'Success create transaction',
            data: { transaction }
        });
    }

    @Get('/:transactionId')
    async getById(
        @Res() res: Response,
        @Param('transactionId') transactionId: number
    ) {
        const transaction = await this.service.getById(transactionId);

        return sendResponse(res, {
            message: 'Success get transaction',
            data: transaction
        });
    }

    @Delete('/:transactionId')
    async deleteById(
        @Res() res: Response,
        @Param('transactionId') transactionId: number
    ) {
        await this.service.delete(transactionId);

        return sendResponse(res, { message: 'Transaction deleted' });
    }

    @Put('/:transactionId')
    async editById(
        @Res() res: Response,
        @Param('transactionId') transactionId: number,
        @Body() body: TransactionDTO
    ) {
        const transaction = await this.service.update(transactionId, body);
        return sendResponse(res, {
            message: 'Transaction updated',
            data: transaction
        });
    }
}
