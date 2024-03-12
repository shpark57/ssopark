import {Entity, Column, PrimaryGeneratedColumn, Index, Unique, OneToMany} from "typeorm";

@Entity()
export class Movies {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({nullable : false})
    title: string;      //제목  not null

    
    @Column("text")
    content: string;    //내용  not null

    
    @Index()
    @Column({nullable : true})
    genre: string;      //장르  null 가능

    
    @Index()
    @Column({nullable : true})
    tag: string;        //태그 : #공포 #코믹 #뭘바 < 이런식으로 들어갈예정  null 가능

    @Column({nullable : false ,  default: 0})
    visits: number      //방문 수  , not null , 디폴트 0


    @Column({nullable : false ,  default: 'Y'})
    use_yn: string;     //사용여부 , not null , 디폴트 Y

    @Column({nullable : false ,  default: 0})
    like:number         //좋아요 수  , not null , 디폴트 0

    @Column({nullable : false ,  default: 0})
    dis_like:number     //싫어요 수  , not null , 디폴트 0
    
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