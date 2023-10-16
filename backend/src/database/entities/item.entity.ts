import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity({ name: 'item' })
export class Item extends BaseEntity {
    @PrimaryColumn()
    productID!: string;

    @Column()
    productName!: string;

    @OneToMany(() => Transaction, (transaction) => transaction.item, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    transaction!: Transaction;
}
