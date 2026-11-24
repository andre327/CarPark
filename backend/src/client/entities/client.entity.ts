import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{ unique:true })
    documentNumber: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text')
    email: string;

    @Column('text')
    telephone: string;

    @Column('text')
    addres: string;  

    @Column('bool', {
    default: true,
    })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date;
}
