import express from 'express';
import { createDatabaseConnection } from './database/connection';
import UserRoute from './routes/users.route';
import BlogPostRoute from './routes/blog_post.route';
import errorMiddleware from './middleware/error.middleware';

const userRoute = new UserRoute()
const blogPost = new BlogPostRoute()
const app = express();

app.use(express.json());

app.use('/', userRoute.router);
app.use('/', blogPost.router);

app.use(errorMiddleware);
const port =process.env.port || 3000
app.listen(port, async () => {
    console.log('server starts');
    //connect to the database using typeorm
    try {
        await createDatabaseConnection()
    } catch (err) {
        console.log('connection error not able to connect server', err);
    }
})















