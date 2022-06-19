import {Entity, Column, PrimaryGeneratedColumn , Index , Unique } from "typeorm";

@Entity()
export class Files {
    /*
        파일을 저장하면
        /{type}/{ymd}/{change_name}.file_type 형태로 저장할 예정
    */
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Index()
    @Column({nullable : false})
    parent_id: string;

    @Index()
    @Column({nullable : false})
    type: string;           //영화 , 소설 , 만화 등의 테이블명 입력

    @Column({nullable : true})
    type_detail: string;     //영화라면 영화의 영상이냐 자막이냐 같은 타입 
    
    @Column({nullable : false})
    ymd: string;            //년월일 ex) 2022/06/18

    @Column({nullable : false})
    origin_name: string     //원본 파일 명

    @Column({nullable : false})
    change_name: string     //중복제거 파일명

    @Column({nullable : false})
    file_type:string        //파일타입 ex) png,jpg
    
    @Column({default: 0 , type:'bigint'})
    size: number;

    @Column({default: 'systemAdmin'})
    rgstr_id: string;

    @Index()
    @Column({ type: 'timestamp' ,default: () => "CURRENT_TIMESTAMP"})
    rgstr_time: Date;


}