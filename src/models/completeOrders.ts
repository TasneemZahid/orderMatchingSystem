import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,DeleteDateColumn, OneToMany, BeforeInsert } from 'typeorm';

@Entity('completed_orders')
export class CompletedOrders {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    price!: number;

    @Column()
    qty!: number;

    @Column()
    @CreateDateColumn()
    created_at!: Date;

    @Column()
    @UpdateDateColumn()
    updated_at!: Date;

    @Column()
    @DeleteDateColumn()
    deleted_at!: Date;

}
