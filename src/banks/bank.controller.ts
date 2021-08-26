import {
  controller,
  httpGet,
  queryParam,
  request,
  response,
} from "inversify-express-utils";
import { Request, Response } from "express";
import { compare } from "string-compare";
import BaseController from "../controllers/base.controller";
import { banks } from "./banks";

@controller("/banks")
export default class BankController extends BaseController {
  @httpGet("/")
  async getBanks(
    @request() req: Request,
    @response() res: Response,
    @queryParam("search") search: string
  ) {
    try {
      const threshold = 0.4;
      this.handleSuccess(
        req,
        res,
        search?.length === 1
          ? banks.filter((bank) =>
              bank.name?.toLowerCase().includes(search?.toLowerCase())
            )
          : banks
              .map((bank) => ({
                ...bank,
                matches: search
                  ? compare(bank.name.toLowerCase(), search.toLowerCase())
                  : 1,
              }))
              .sort((a, b) =>
                a.matches > b.matches ? -1 : a.matches < b.matches ? 1 : 0
              )
              .filter(({ matches }) => matches >= threshold)
      );
    } catch (err) {
      this.handleError(req, res, err);
    }
  }
}
