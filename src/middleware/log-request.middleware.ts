import { Request, Response, NextFunction } from 'express';

/**
 * Express Middleware that logs incoming HTTP requests.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  next();
};
