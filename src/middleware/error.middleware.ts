import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  try {
    console.error(error,'error middleware')
    const httpStatus: number = error.httpStatus || 500;
    const message: any = error.message || 'Something went wrong';
    const status: string = error.status || 'FAILURE';    
    
    res.status(httpStatus).json({ message, status });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
