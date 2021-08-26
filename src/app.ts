import express, { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import requestID from 'express-request-id';
import cors from 'cors';
import helmet from 'helmet';
import responseTime from 'response-time';
import env from './env';
import container from './ioc';
import logRequestMiddleware from './middleware/log-request.middleware';
import jsendMiddleware from './middleware/jsend.middleware';
import logResponseMiddleware from './middleware/log-response.middleware';
import { version } from "../package.json";

export default class App {
  private server: InversifyExpressServer;

  constructor() {
    const serverOptions = { rootPath: env.api_version };
    this.server = new InversifyExpressServer(container, null, serverOptions);

    this.registerMiddlewares();
    this.registerHandlers();
  }

  /**
   * Registers middlewares on the application server
   */
  private registerMiddlewares() {
    this.server.setConfig((app: Application) => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));

      app.disable('x-powered-by');
      app.use(helmet());
      app.use(
        cors({
          allowedHeaders: [
            'Public-Key',
            'Authorization',
            'Content-Type',
            'Content-Length',
            'Location'
          ],
          exposedHeaders: [
            'Public-Key',
            'Authorization',
            'Content-Type',
            'Content-Length',
            'Location'
          ]
        })
      );
      app.use(responseTime());
      app.use(requestID());

      app.use(logRequestMiddleware);
      app.use(logResponseMiddleware);

      app.use(jsendMiddleware);

      app.enable('trust proxy');
    });
  }

  /**
   * Registers utility handlers
   */
  private registerHandlers() {
    this.server.setErrorConfig((app: Application) => {
      app.get('/', (_, res) => res.status(200).json({ status: 'UP' }));
      app.get('/version', (_, res) => res.status(200).json({ version }));
      app.use((_, res) => res.status(404).send("Whoops! Route doesn't exist."));
    });
  }

  /**
   * Applies all routes and configuration to the server, returning the express application server.
   */
  build() {
    const app = this.server.build();
    return app;
  }
}
