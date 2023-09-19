import { Customer, DeepPartial, Product, ProductVariant, VendureEntity, Order } from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ActivityType } from '../types';

@Entity()
export class RewardAuditEntry extends VendureEntity {
    constructor(input?: DeepPartial<RewardAuditEntry>) {
        super(input);
    }

    @ManyToOne(type => Customer)
    customer: Customer;

    @Column('varchar')
    activity: ActivityType;

    @ManyToOne(type => Order, { nullable: true })
    order: Order;

    @Column({ default: 0 })
    rewards: number;

    @Column('text', { nullable: true, default: null })
    note: string;

}