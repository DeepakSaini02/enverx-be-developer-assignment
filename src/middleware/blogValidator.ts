import Joi from 'joi'
import { Request, NextFunction, Response } from 'express';

const schema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    content: Joi.string().min(50).max(1000).required(),   
});


export const blogValidator = async (req: Request, res: Response, next: NextFunction) => {
    const resValidation = await schema.validateAsync(req.body)
    if (resValidation.error) {
        res.status(400).json({ error: resValidation.error });
    }
    else
        next()
}
