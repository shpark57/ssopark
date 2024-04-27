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
import {Orders} from "./Orders";

@Entity()
export class OrderDetails {

    @PrimaryGeneratedColumn()
    id: number;


    @Index()
    @Column({nullable : false})
    order_id: number;

    @Index()
    @Column({nullable : false})
    product_id: number;      //제품명  not null

    @Index()
    @Column({nullable : false})
    product_nm: string;      //제품명  not null

    @Column("text")
    product_type: string;    //제품 타입  not null

    @Column({nullable : false ,  default: 0})
    cnt: number      //제품 보유 갯수  not null

    @Column({nullable : false ,  default: 0})
    price: number      //제품 가격  not null

    @Column({nullable : false ,  default: 0})
    totalPrice: number      //제품 가격  not null

    @Column("longtext")
    title_img: string;  //타이틀에 들어가는 이미지


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



    @ManyToOne(() => Orders, (order) => order.details)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
    order: Orders;
}