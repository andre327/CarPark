import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text')
    plate:string;

    @Column('text')
    model:string;

    @Column('text')
    client:string;

    isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date;
    
    
}
