import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { BlogPostEntity } from './blog_post.entity';

@Entity('users')
@Unique(['email'])
@Index(['email'])
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    age!: number;

    @Column()
    gender!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => BlogPostEntity, blog => blog.user)
    blog!: BlogPostEntity[];

    @Column({ nullable: true, default: true })
    isActive!: boolean;

    @Column()
    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt!: Date;

}


