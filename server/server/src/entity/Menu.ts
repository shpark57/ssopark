import {Entity, Column, PrimaryGeneratedColumn , Index , Unique , OneToMany ,JoinColumn , ManyToOne} from "typeorm";


@Entity()
export class Menu {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Menu)
    @JoinColumn({ name: 'parent_id' })
    @Column({nullable : true})
    parent_id:number;

    @Column({nullable : false})
    name:string;

    @Column({nullable : false})
    list_order:number;

    @Column({nullable : true})
    url:string;

    @Column({nullable : true})
    icon:string;

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

    @OneToMany(type => Menu , menu => menu.parent_id)
    children : Menu[]
}