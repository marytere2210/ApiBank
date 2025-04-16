import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { Account } from "./account-models";

export enum TransactionsType{
    INCOME = "income",
    OUTCOME = "outcome",
}
@Entity()
export class Transaction extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id_transaction: string;

    @Column("uuid",{nullable:true})
   ref_send_transaction: string;

   @Column("uuid",{nullable:true})
   ref_resp_transaction: string;

   @Column ({type: "enum", enum: TransactionsType})
   type_transaction: TransactionsType;

    @Column({type:"numeric", precision: 10, scale: 2})
    amount_transaction: number;

    @CreateDateColumn()
    createdAt_transaction: Date;

   @ManyToOne(()=> Account, (account) => account.transactions)
    account: Account;
    
}