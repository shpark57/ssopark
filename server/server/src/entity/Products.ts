import {Entity, Column, PrimaryGeneratedColumn, Index, Unique, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {Files} from "./Files";

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({nullable : false})
    product_nm: string;      //제품명  not null

    @Column("text")
    product_type: string;    //제품 타입  not null

    @Column({nullable : false ,  default: 0})
    price: number      //제품 가격  not null

    @Column("longtext")
    content: string;    //내용  not null

    @Column("longtext")
    title_img: string;  //타이틀에 들어가는 이미지

    @Column({nullable : false ,  default: 'Y'})
    use_yn: string;     //사용여부 , not null , 디폴트 Y

    @Column({nullable : false ,  default: 0})
    like:number         //좋아요 수  , not null , 디폴트 0

    @Column({nullable : false ,  default: 0})
    dis_like:number     //싫어요 수  , not null , 디폴트 0

    @Column({nullable : false ,  default: 0})
    visits: number      //방문 수  , not null , 디폴트 0

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

}