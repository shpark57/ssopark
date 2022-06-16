import {Entity, Column, PrimaryGeneratedColumn , Index , Unique , OneToMany ,JoinColumn , ManyToOne} from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

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

    @OneToMany(type => Menu , menu => menu.parent_id)
    children : Menu[]
}