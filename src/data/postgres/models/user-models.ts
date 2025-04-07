import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id_user: string;

    @Column({type: "varchar", length:50})
    name_user: string;

    @Column({type: "varchar", length:50, unique: true })
    email_user: string;

    @Column({type: "text", nullable: true })
    password_user: string;

    @Column({type: "boolean", default: true})
    status_user: boolean;

    @CreateDateColumn()
    createdAt_user: Date;   
}