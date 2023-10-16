import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { TrackingEmbed } from './embedded/tracking.embed';
import { Item } from './item.entity';
import { Status } from './status.entity';

@Entity({ name: 'transaction' })
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    amount!: number;

    @Column()
    transactionDate!: Date;

    @Column()
    createBy!: string;

    @Column()
    customerName!: string;

    @Column({ name: 'productID', select: false })
    productID!: string;

    @Column({ name: 'statusID', select: false })
    statusID!: number;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

    @ManyToOne(() => Item, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'productID' })
    item!: Item;

    @ManyToOne(() => Status, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'statusID' })
    status!: Status;
}
