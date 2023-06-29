import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('blogPost')
@Index(['user'])
export class BlogPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ name: 'userId', type: 'integer', nullable: false })
    @ManyToOne(() => UserEntity, user => user.blog)
    user: number;

    @Column({ nullable: true, default: true })
    isActive: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    constructor() {
        this.id = 0
        this.title = ''
        this.content = ''
        this.user = 0
        this.isActive = true
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}


