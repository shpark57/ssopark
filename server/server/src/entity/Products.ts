import {Entity, Column, PrimaryGeneratedColumn , Index , Unique } from "typeorm";

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;         //key

    @Index()
    @Column({nullable : false})
    product_nm: string;      //제품명  not null

    @Column("text")
    product_type: string;    //제품 타입  not null

    @Column({nullable : false ,  default: 0})
    price: number      //제품 가격  not null

    @Column("longtext")
    content: string;    //내용  not null

    @Column({nullable : false ,  default: 'Y'})
    use_yn: string;     //사용여부 , not null , 디폴트 Y

    @Column({type : 'double' , nullable : false ,  default: 0})
    grade:number        //평점 수  , not null , 디폴트 0

    @Column({nullable : false ,  default: 0})
    count: number      //제품 가격  not null


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