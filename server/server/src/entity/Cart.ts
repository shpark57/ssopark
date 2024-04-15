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

@Entity()
export class Cart {


    @Index()
    @PrimaryColumn()
    user_id: number;

    @Index()
    @PrimaryColumn()
    product_id: number;

    @Column({nullable : false ,  default: 0})
    cnt: number      //제품 보유 갯수  not null


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



    @ManyToOne(() => Products, (product) => product.carts)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: Products[];

    @ManyToOne(() => Users, (users) => users.carts)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Users[];

}