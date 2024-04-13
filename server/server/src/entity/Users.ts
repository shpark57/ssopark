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
    email: string;

    @Column()
    phone_number: string;

    @Column()
    use_yn: string;

    @Column({default: 'systemAdmin'})
    rgstr_id: string;

    @Index()
    @Column({ type: 'timestamp' ,default: () => "CURRENT_TIMESTAMP"})
    rgstr_time: Date;

    @Column({default: 'systemAdmin'})
    mdfr_id: string;

    @Index()
    @Column({ type: 'timestamp' ,default: () => "CURRENT_TIMESTAMP"})
    mdfr_time: Date;

    @Index()
    @Column({ type: 'timestamp' ,default: () => "CURRENT_TIMESTAMP"})
    last_login: Date;

    @Column()
    salt: string;

    @Column({default: ''})
    auth: string;   //도로명주소

    @Column({default: ''})
    addr: string;   //권한

    @Column({default: ''})
    zipNo: string;   //우편주소

    @Column({default: ''})
    addrDetail: string;   //상세주소


}