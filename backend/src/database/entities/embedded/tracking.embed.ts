import { CreateDateColumn } from 'typeorm';

export class TrackingEmbed {
    @CreateDateColumn({ name: 'createOn' })
    createOn!: Date;
}
