import { getRepository } from "typeorm"
import { BlogPostEntity } from "../entity/blog_post.entity"
import { UserEntity } from "../entity/users.entity"
import HttpException from "../exception/HttpException"

class BlogPostService {
    public blogPosts = BlogPostEntity
    public users = UserEntity

    public async getAllPosts(): Promise<any> {
        const blogPostRepository = getRepository(this.blogPosts)
        return await blogPostRepository.find()
    }

    public async getPostById(req: any): Promise<any> {
        const postId = req.params.id;
        const blogPostRepository = getRepository(this.blogPosts)
        return await blogPostRepository.findOne({ where: { id: postId, isActive: true } })
    }

    public async getPostWithFilters(req: any): Promise<any> {
        const { gender, age, userId } = req.query;

     
    }

    public async createPost(req: any): Promise<any> {
        const data = req.body;
        const userId = req.userId
        const blogPostRepository = getRepository(this.blogPosts)
        return await blogPostRepository.save({ ...data, user: userId })
    }

    public async updatePost(req: any): Promise<any> {
        const data = req.body;
        const userId = req.userId
        const postId = req.params.id
        const blogPostRepository = getRepository(this.blogPosts)
        const findPost = await blogPostRepository.findOne({ where: { id: postId, isActive: true } })
        if (!findPost) throw new HttpException(404, 'Post not found', 'FAILURE')

        if (userId != findPost.user) throw new HttpException(403, 'You are not authorized to udpate this post', 'FAILURE')

        return await blogPostRepository.update({ id: postId }, { ...data })
    }

    public async deletePost(req: any): Promise<any> {
        const userId = req.userId;
        const postId = req.params.id
        const blogPostRepository = getRepository(this.blogPosts)
        const findPost = await blogPostRepository.findOne({ where: { id: postId, isActive: true } })
        if (!findPost) throw new HttpException(404, 'Post not found', 'FAILURE')

        if (userId != findPost.user) throw new HttpException(403, 'You are not authorized to udpate this post', 'FAILURE')

        await blogPostRepository.delete({ id: postId })
        return findPost
    }

}

export default BlogPostService