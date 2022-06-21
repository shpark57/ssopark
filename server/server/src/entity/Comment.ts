import {Entity, Column, PrimaryGeneratedColumn , Index , Unique , OneToMany ,JoinColumn , ManyToOne} from "typeorm";
@Entity()
export class Comment {

    
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({nullable : false})
    parent_id: string;         
    
    @Index()
    @Column({nullable : false})
    type: string;                   //댓글을 사용하는 테이블명 ex) movies , comments

    @ManyToOne(type => Comment)
    @JoinColumn({ name: 'parent_comment_id' })
    @Column({nullable : true})
    parent_comment_id: string;      //대댓글 시 사용

    @Column({nullable : false})
    comment: string;                //댓글 내용
    
    @Column({nullable : false ,  default: 0})
    like:number         //좋아요 수  , not null , 디폴트 0

    @Column({nullable : false ,  default: 0})
    dis_like:number     //싫어요 수  , not null , 디폴트 0

    @Column({default: 'systemAdmin'})
    rgstr_id: string;

    @Index()
    @Column({ type: 'timestamp' ,default: () => "CURRENT_TIMESTAMP"})
    rgstr_time: Date;


    @OneToMany(type => Comment , comment => comment.parent_comment_id)
    children : Comment[];

}