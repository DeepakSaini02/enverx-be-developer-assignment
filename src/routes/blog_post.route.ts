import { Router } from 'express';
import { blogPostValidator } from '../middleware/blogPostValidator';
import BlogPostController from '../controllers/blog_post.controller';
import authValidator from '../middleware/authValidator';
// import 

class BlogPostRoute {
    public path = '/v1/posts/'
    public router = Router()
    public postController = new BlogPostController()

    constructor() {
        this.initializeRourtes()
    }
    private initializeRourtes() {
        this.router.get(`${this.path}getAllPosts`, authValidator, this.postController.getAllPosts)
        this.router.get(`${this.path}getPostById/:id`, authValidator, this.postController.getPostById)
        this.router.get(`${this.path}getPostWithFilters`, authValidator, this.postController.getPostWithFilters)
        this.router.post(`${this.path}posts`, authValidator, blogPostValidator, this.postController.createPost)
        this.router.put(`${this.path}posts/:id`, authValidator,this.postController.udpatePost)
        this.router.delete(`${this.path}posts/:id`, authValidator,this.postController.deletePost)
    }
}

export default BlogPostRoute
