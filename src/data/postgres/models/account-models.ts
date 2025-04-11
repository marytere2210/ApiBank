import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity, BeforeInsert, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user-models";
import { Transaction } from "./transaction-models";

export enum AccountType {
    CHECKING = "checking",
    SAVINGS = "savings",
}


@Entity()
export class Account extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id_account: string;

    @Column({type: "varchar", length:14, unique: true })
    account_number: string;

    @BeforeInsert()
    generateAccountNumber() {
        const timestamp = Date.now().toString().slice(-8);
        const randomDigits = Math.floor(Math.random() * 900000).toString().padStart(6, '0');
       this.account_number = timestamp + randomDigits;
}
    @Column({type:"numeric", precision: 10, scale: 2})
    balance_account: number;

    @Column({type: "enum", enum: AccountType, default: AccountType.SAVINGS})
    type_account: AccountType;

    @Column({type: "boolean", default: true})
    status_account: boolean;

    @CreateDateColumn()
    createdAt_account: Date;

   @ManyToOne (()=> User, (user) => user.accounts) user: User; 

   @OneToMany(()=> Transaction, (transaction) => transaction.account)
   transactions: Transaction[];
   
}