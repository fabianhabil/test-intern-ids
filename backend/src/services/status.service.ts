import { Service } from 'typedi';
import type { StatusDTO } from '../validations/status.validation';
import { Status } from '../database/entities/status.entity';
import { Errors } from '../utils/api.util';

@Service()
export class StatusService {
    async create(dto: StatusDTO): Promise<Status | null> {
        const status = Status.create({ ...dto });

        await Status.save(status);

        return status;
    }

    async getAll(): Promise<Status[] | null> {
        const status = await Status.find();

        return status;
    }

    async getById(statusId: number): Promise<Status> {
        const status = await Status.findOne({ where: { id: statusId } });

        if (!status) {
            throw Errors.ITEM_NOT_FOUND;
        }

        return status;
    }

    async update(statusId: number, dto: StatusDTO): Promise<Status> {
        const status = await this.getById(statusId);

        status.name = dto.name;

        await status.save();

        return status;
    }
}
