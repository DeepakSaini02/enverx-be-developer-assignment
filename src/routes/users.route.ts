import { Router } from 'express';
import { userValidator } from '../middleware/userValidator';
import UserController from '../controllers/users.controller';

class UserRoute {
    public path = '/v1/users/'
    public router = Router()
    public userController = new UserController()

    constructor() {
        this.initializeRourtes()
    }
    private initializeRourtes() {
        this.router.post(`${this.path}createUser`, userValidator,this.userController.createUser)
        this.router.post(`${this.path}login`,this.userController.loginUser)
    }
}

export default UserRoute
