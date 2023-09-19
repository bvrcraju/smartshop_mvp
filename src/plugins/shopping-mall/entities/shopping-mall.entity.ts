import { Asset, Channel, Customer, DeepPartial, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class ShoppingMall extends VendureEntity {
    constructor(input?: DeepPartial<ShoppingMall>) {
        super(input);
    }
    
    // @OneToMany(type => Channel, channel => channel.customFields.mall)
    // channels: Channel[];

    @OneToOne(type => Asset)
    @JoinColumn()
    bannerImage: Asset;

    @Column('text', { nullable: false})
    name: string;

    @Column('text', { nullable: false})
    address: string;

    @Column('text', { nullable: false})
    city: string;

    @Column('text', { nullable: false})
    state: string;

    @Column('text', { nullable: false})
    postalCode: string;

}