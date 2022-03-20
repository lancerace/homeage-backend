import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, RelationId } from "typeorm";
import User from "./user";
import VaccinationCenter from "./vaccinationCenter";

@Entity({ name: 'booking' })
export default class Booking {

    @PrimaryGeneratedColumn()
    bookingId: number;

    @Column({ nullable: true })
    startTime: Date;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @ManyToOne(type => VaccinationCenter)
    @JoinColumn({ name: 'vaccinationcenterId' })
    vaccinationcenter: VaccinationCenter;

    @Column()
    vaccinationcenterId: number;
    
    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamptz", default: null, nullable: true })
    deletedAt: Date;
}


