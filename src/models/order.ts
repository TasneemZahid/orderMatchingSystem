import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, BeforeInsert } from 'typeorm';

@Entity('pending_orders')
export class PendingOrders {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    buyerQty!: number;

    @Column()
    buyerPrice!: number;

    @Column({ nullable: true })
    sellerPrice!: number;

    @Column({ nullable: true })
    sellerQty!: number;

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
