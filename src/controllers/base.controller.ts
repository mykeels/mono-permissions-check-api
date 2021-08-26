import { injectable } from "inversify";
import { Response, Request } from "express";
import HttpStatus from "http-status-codes";

import { ControllerError } from "./controller.errors";

@injectable()
export default class BaseController {
  /*
   * Determines the HTTP status code of an error
   * @param err Error object
   */
  getHTTPErrorCode(err) {
    // check if error code exists and is a valid HTTP code.
    if (err.code >= 100 && err.code < 600) return err.code;
    const mapping = {
      NOT_FOUND_ERROR: 404,
    };
    if (mapping[err?.type]) return mapping[err?.type];
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Handles operation success and sends a HTTP response
   * @param req Express request
   * @param res Express response
   * @param data Success data
   */
  handleSuccess(req: Request, res: Response, data: any, code = 200) {
    res.jSend.success(data, code);
  }

  /**
   * Handles operation error, sends a HTTP response and logs the error.
   * @param req Express request
   * @param res Express response
   * @param error Error object
   * @param message Optional error message. Useful for hiding internal errors from clients.
   */
  handleError(req: Request, res: Response, err: Error, message?: string) {
    /**
     * Useful when we call an asynchrous function that might throw
     * after we've sent a response to client
     */
    if (res.headersSent) return console.error(err);

    let { error_code } = <ControllerError>err;

    const errorMessage = message || err.message;

    res.jSend.error(null, errorMessage, this.getHTTPErrorCode(err), error_code);
  }
}
