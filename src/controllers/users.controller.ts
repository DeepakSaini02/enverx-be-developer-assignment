import UserService from "../services/users.service";
import { Request, NextFunction, Response } from "express";

class UserController {
    public userService = new UserService()

    public createUser = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const userDetails = await this.userService.createUser(req.body)
            res.status(200).json({ userDetails, message: "user created successfully", status: "SUCCESS" })
        } catch (err) {
            next(err)
        }
    }

    public loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const { token, findUser } = await this.userService.loginUser(req.body);
          res.status(200).json({ data: findUser, token, message: 'login', status: 'SUCCESS' });
        } catch (error) {
          next(error);
        }
      };
}

export default UserController