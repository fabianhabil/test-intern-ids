import { Service } from 'typedi';
import type { TransactionDTO } from '../validations/transaction.validation';
import { Transaction } from '../database/entities/transaction.entity';
import { Errors } from '../utils/api.util';

@Service()
export class TransactionService {
    async create(dto: TransactionDTO): Promise<Transaction | null> {
        const transaction = Transaction.create({ ...dto });

        await Transaction.save(transaction);

        return transaction;
    }

    async getAll(): Promise<Transaction[] | null> {
        const transaction = await Transaction.find({
            relations: { item: true, status: true }
        });

        return transaction;
    }

    async getById(transactionId: number): Promise<Transaction> {
        const transaction = await Transaction.findOne({
            where: { id: transactionId },
            relations: { item: true, status: true }
        });

        if (!transaction) {
            throw Errors.ITEM_NOT_FOUND;
        }

        return transaction;
    }

    async update(
        transactionId: number,
        dto: TransactionDTO
    ): Promise<Transaction> {
        const transaction = await this.getById(transactionId);

        transaction.amount = dto.amount;
        transaction.transactionDate = dto.transactionDate;
        transaction.createBy = dto.createBy;
        transaction.productID = dto.productID;
        transaction.item.productID = dto.productID;
        transaction.status.id = dto.statusID;
        transaction.statusID = dto.statusID;
        await transaction.save();

        return transaction;
    }

    async delete(transactionId: number): Promise<void> {
        const transaction = await this.getById(transactionId);

        if (!transaction) {
            throw Errors.ITEM_NOT_FOUND;
        }

        await transaction.remove();
    }
}
