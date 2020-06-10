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
  async transferFund(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "Your funds transfer is successful! Thanks for using our service",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async changePin(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message: "You have successfuly changed your PIN ! Please keep it safe",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async accountStatement(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "We just mailed you an attachment containing your statement of account. Thanks for using our service !",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async requestCard(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "We have received your request for a new card. We will process your card within 3 business days and contact you once it is ready for pick up",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async blockCard(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "Your card has been blocked ! You can request for a new card. Checkout the Request & Complaint options",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async complaint(req, res): Promise<any> {
    try {
      return this.responseService.requestSuccessful(res, {
        success: true,
        message:
          "Thanks for taking your time to reach out. We have received and escalated your complaint. We will get back to you on this shortly",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
}
