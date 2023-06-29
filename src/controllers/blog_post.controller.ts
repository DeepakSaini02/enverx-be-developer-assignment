import BlogPostService from "../services/blog_post.service";
import { Request, NextFunction, Response } from "express";

class BlogPostController {
    public blogPostService = new BlogPostService()

    public getAllPosts = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const allPosts = await this.blogPostService.getAllPosts()
            res.status(200).json({ posts:allPosts, message: "Get all posts", status: "SUCCESS" })
        } catch (err) {
            next(err)
        }
    }

    public getPostById = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const allPosts = await this.blogPostService.getPostById(req)
            res.status(200).json({ posts:allPosts, message: "Get post with id", status: "SUCCESS" })
        } catch (err) {
            next(err)
        }
    }
    
    public getPostWithFilters = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const allPosts = await this.blogPostService.getPostWithFilters(req)
            res.status(200).json({ posts:allPosts, message: "Get all posts", status: "SUCCESS" })
        } catch (err) {
            next(err)
        }
    }

    public createPost = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const postDetails = await this.blogPostService.createPost(req)
            res.status(200).json({ posts:postDetails, message: "Post created", status: "SUCCESS" })
        } catch (err) {
            next(err)
        }
    }

    public udpatePost = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const postDetails = await this.blogPostService.updatePost(req)
            res.status(200).json({ posts:postDetails, message: "Post updated", status: "SUCCESS" })
        } catch (err) {
            next(err)
        }
    }

    public deletePost = async (req: any, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const postDetails = await this.blogPostService.deletePost(req)
            res.status(200).json({ posts:postDetails, message: "Post deleted", status: "SUCCESS" })
        } catch (err) {
            next(err)
        }
    }

}

export default BlogPostController