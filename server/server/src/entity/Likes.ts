import {Entity, Column, PrimaryGeneratedColumn , Index , Unique } from "typeorm";

@Entity()
export class Likes {

    
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({nullable : false})
    parent_id: string;         
    
    @Index()
    @Column({nullable : false})
    type: string;                   //댓글을 사용하는 테이블명 ex) movies , comments

    @Column({nullable : false})
    like_type: string;              //좋아요 or 싫어요 ex) like , dis_like

    @Column({default: 'systemAdmin'})
    rgstr_id: string;

    @Index()
    @Column({ type: 'timestamp' ,default: () => "CURRENT_TIMESTAMP"})
    rgstr_time: Date;



}