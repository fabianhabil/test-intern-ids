import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity({ name: 'status' })
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Transaction, (transaction) => transaction.status, {
        onDelete: 'CASCADE'
    })
    transaction!: Transaction[];
}
