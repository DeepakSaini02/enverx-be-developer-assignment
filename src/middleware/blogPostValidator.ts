import Joi from 'joi'
import { Request, NextFunction, Response } from 'express';
import HttpException from '../exception/HttpException';

const schema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    content: Joi.string().min(50).max(1000).required(),   
});


export const blogPostValidator = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const resValidation = await schema.validateAsync(req.body)
    if (resValidation.error) {
        next(new HttpException(400,resValidation.error.message ,'FAILURE'))
    }
    else
        next()
}
