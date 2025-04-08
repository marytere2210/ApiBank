import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity } from "typeorm";

export enum UserRole {
ACTIVE = "active",
INACTIVE = "inactive",
}
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

    @Column({type: "enum", enum:UserRole, default: UserRole.INACTIVE})
    status_user: UserRole;

    @CreateDateColumn()
    createdAt_user: Date;   
}