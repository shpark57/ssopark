import {Entity, Column, PrimaryGeneratedColumn , Index , Unique } from "typeorm";

@Entity()
@Unique('my_unique_constraint', ['user_id']) 
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    user_id: string;

    @Column()
    password: string;

    @Column()
    user_name: string;

    @Column()
    avatar: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @Column()
    use_yn: string;

    @Column()
    rgstr_id: string;

    @Index()
    @Column({ type: 'timestamp' })
    rgstr_time: Date;

    @Column()
    mdfr_id: string;

    @Index()
    @Column({ type: 'timestamp' })
    mdfr_time: Date;

    @Index()
    @Column({ type: 'timestamp' })
    last_login: Date;

    @Column()
    salt: string;

}