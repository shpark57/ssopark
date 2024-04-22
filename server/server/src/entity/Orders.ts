import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
    Unique,
    OneToMany,
    ManyToOne,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import {type} from "os";
import {Users} from "./Users";
import {Products} from "./Products";
import {OrderDetails} from "./OrderDetails";

@Entity()
export class Orders {

    @Index()
    @PrimaryColumn()
    id: string;

    @Index()
    @Column({nullable : true})
    user_id: number;

    @Index()
    @Column({ type: 'timestamp' ,default: () => "CURRENT_TIMESTAMP"})
    order_date: Date;



    @Column({default: '미결제'})
    order_state: string;


    @Column({default: ''})
    order_title: string;

    @Column({default: 0})
    order_price: number;



    @Column({default: ''})
    recipient_name: string;

    @Column()
    recipient_phone_number: string;

    @Column({default: ''})
    addr: string;  //도로명주소

    @Column({default: ''})
    zipNo: string;   //우편주소

    @Column({default: ''})
    addrDetail: string;   //상세주소

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


    @ManyToOne(() => Users, (users) => users.orders)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Users;


    @OneToMany(type => OrderDetails , details => details.order)
    details : OrderDetails[];
}