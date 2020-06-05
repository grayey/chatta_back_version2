import { Injectable } from "@nestjs/common";
import { ResponseService } from "../services/ResponseHandler/response-handler.service";

@Injectable()
export class WhatsappService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(private responseService: ResponseService) {}

  async airtimePurcase(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message: "Your airtime purchase was successful",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async dataPurchase(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "You have successfully purchased a data bundle. Dial *256# to check your balance",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async openAccount(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "Thank you for your submission. Your account has been successfully created and your new account number is 0254585698",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async checkBalance(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "The balance on your account: 10215458745 is N998,254. Thanks for banking with us",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async payBill(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "Your bill payment has been successfully processed. Thanks for your patronage !",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
}
