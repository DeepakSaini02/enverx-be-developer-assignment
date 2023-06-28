import Joi from 'joi'
import { Request, NextFunction, Response } from 'express';

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
        res.status(400).json({ error: resValidation.error });
    }
    else
        next()
}