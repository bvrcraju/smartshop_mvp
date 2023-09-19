import { DeepPartial, VendureEntity, Customer } from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ShoppingMall } from './shopping-mall.entity';

@Entity()
export class MallEntry extends VendureEntity {
    constructor(input?: DeepPartial<MallEntry>) {
        super(input);
    }

    @ManyToOne(type => Customer)
    customer: Customer;

    @ManyToOne(type => ShoppingMall)
    mall: ShoppingMall;

    @Column({ nullable: false})
    checkedInAt: Date;

    @Column({ nullable: true})
    checkedOutAt: Date;
}