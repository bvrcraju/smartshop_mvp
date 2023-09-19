import { Channel, DeepPartial, SoftDeletable, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne, OneToOne, OneToMany, JoinColumn, Unique } from 'typeorm';
import { SupplierAddress } from './supplier-address.entity';
import { SupplierBankAccount } from './supplier-bank-account.entity';

@Entity()
export class Supplier extends VendureEntity implements SoftDeletable {
    constructor(input?: DeepPartial<Supplier>) {
        super(input);
    }

    @Column({ type: Date, nullable: true })
    deletedAt: Date | null;

    @Column({ nullable: false})
    storeName: string;

    @Column({ nullable: false})
    contactPersonFullName: string;

    @Column({ default: '' })
    phoneNumber: string;
    
    @Column()
    emailAddress: string;

    @Column()
    gstNumber: string;

    @Column()
    panNumber: string;

    @Column()
    documentsPath: string;

    @OneToMany(type => SupplierAddress, supplierAddress => supplierAddress.supplier)
    addresses: SupplierAddress[];

    @OneToMany(type => SupplierBankAccount, supplierBankAccount => supplierBankAccount.supplier)
    bankAccounts: SupplierBankAccount[];

    @OneToOne(type => Channel)
    @JoinColumn()
    channel: Channel;
}