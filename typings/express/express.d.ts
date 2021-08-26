import jSend from 'jsend';

declare global {
  namespace Express {
    export interface Request {
      user: string;
      private_key: string;
      id: string;
      data: { [key: string]: string };
    }

    export interface Response {
      body: any;
      jSend: jSend;
    }
  }
}
