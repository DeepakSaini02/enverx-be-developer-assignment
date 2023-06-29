import config from '../configs/development.json'
import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { UserEntity } from '../entity/users.entity';
import HttpException from '../exception/HttpException';


const authValidator = async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.header('Authorization') === undefined) {
            next(new HttpException(401,'Authentication token missing','EXPIRED'))
        }

        const Authorization = req.header('Authorization').split('Bearer ')[1] || null;

        const secretKey: string = config['secretKey'];
        const verificationResponse: any = jwt.verify(Authorization, secretKey);
        const userId = verificationResponse.id;

        const userRepository = getRepository(UserEntity)
        const findUser = await userRepository.findOne({ where: { id: userId, isActive: true } })

        if (findUser) {
            req['user'] = findUser;
            req['userId'] = userId
            next();
        } else {
            next(new HttpException(403,'Wrong authentication token','EXPIRED'))
        }

    } catch (error:any) {
        console.log(error?.message);
        next(error)
    }
};

export default authValidator;
