import Joi from 'joi'
import { Request, NextFunction, Response } from 'express';
import HttpException from '../exception/HttpException';

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age: Joi.number().integer().min(18).max(100).required(),
    gender: Joi.string().required()
});


export const userValidator = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const resValidation = await schema.validateAsync(req.body)
    if (resValidation.error) {
        next(new HttpException(400,resValidation.error.message ,'FAILURE'))
    }
    else
        next()
}