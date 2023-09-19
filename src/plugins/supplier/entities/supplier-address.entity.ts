import { Supplier } from "./supplier.entity";
import { Country, DeepPartial, SoftDeletable, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne, OneToOne, OneToMany, JoinColumn, Unique } from 'typeorm';

@Entity()
export class SupplierAddress extends VendureEntity {
    constructor(input?: DeepPartial<SupplierAddress>) {
        super(input);
    }

    @ManyToOne(type => Supplier, supplier => supplier.addresses)
    supplier: Supplier;

    @Column({ default: '' }) fullName: string;

    @Column({ default: '' })
    company: string;

    @Column() streetLine1: string;

    @Column({ default: '' })
    streetLine2: string;

    @Column({ default: '' }) city: string;

    @Column({ default: '' })
    province: string;

    @Column({ default: '' }) postalCode: string;

    @ManyToOne(type => Country)
    country: Country;

    @Column({ default: '' })
    phoneNumber: string;

    @Column({ default: false })
    defaultShippingAddress: boolean;

    @Column({ default: false })
    defaultBillingAddress: boolean;

}