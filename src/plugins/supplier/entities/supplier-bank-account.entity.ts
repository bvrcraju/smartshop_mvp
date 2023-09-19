import { Supplier } from "./supplier.entity";
import { Country, DeepPartial, SoftDeletable, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne, OneToOne, OneToMany, JoinColumn, Unique } from 'typeorm';

@Entity()
export class SupplierBankAccount extends VendureEntity {
    constructor(input?: DeepPartial<SupplierBankAccount>) {
        super(input);
    }

    @ManyToOne(type => Supplier, supplier => supplier.bankAccounts)
    supplier: Supplier;

    @Column({ default: '' }) accountHolderName: string;

    @Column({ default: '' })
    ifscCode: string;

    @Column() accountNumber: string;

    @Column({ default: '' })
    accountType: string;
}