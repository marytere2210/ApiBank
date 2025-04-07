import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Transaction extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id_transation: string;

    @Column("uuid")
   ref_send_transaction: string;

   @Column("uuid")
   ref_resp_transaction: string;

    @Column({type:"numeric", precision: 10, scale: 2})
    amount_transaction: number;

    @CreateDateColumn()
    createdAt_transaction: Date;
    
}