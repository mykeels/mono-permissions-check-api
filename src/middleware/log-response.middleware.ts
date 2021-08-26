import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const send = res.send;

  res.send = function (body?: any) {
    const _body = body instanceof Buffer ? body.toString() : body;
    res.body = _body;
    console.log(res);
    return send.call(this, body);
  };
  next();
}
