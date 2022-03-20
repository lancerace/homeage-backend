import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity({ name: 'vaccinationcenter' })
export default class VaccinationCenter {

    @PrimaryGeneratedColumn()
    vaccinationcenterId: number;

    @Column()
    name: string;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)"})
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamptz", default: null, nullable: true })
    deletedAt: Date;

}


