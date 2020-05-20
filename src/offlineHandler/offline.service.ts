import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Offline } from "./interfaces/offline.interface";
import { EmailService } from "../services/Email/email.service";
import { ResponseService } from "../services/ResponseHandler/response-handler.service";
import { Tree } from "../tree/interfaces/tree.interface";
import { Model } from "mongoose";

@Injectable()
export class OfflineService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel("Tree") private treeModel: Model<Tree>,
    private emailService: EmailService,
    private responseService: ResponseService,
  ) {}

  async validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async sendOfflineMessage(payload: Offline, req, res): Promise<Offline> {
    if (!(await this.validateEmail(payload.email))) {
      return this.responseService.clientError(
        res,
        "please enter a valid email"
      );
    }
    try {
      const sentEmail = this.emailService.sendOfflineMail(payload);
      if (sentEmail) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: "An email has been sent successfully ",
        });
      }
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async sendRequestDemoMessage(
    id: String,
    payload: Offline,
    req,
    res
  ): Promise<Offline> {
    try {
      const conversationTree =
        (await this.treeModel.findOne({ phone: id })) ||
        (await this.treeModel
          .findOne({ _id: id })
          .populate("clientId")
          .exec());
      if (conversationTree) {
        const user = conversationTree.clientId;
        const { email, name } = user;

        const sendUserEmail =
          payload["callToAction"] === "requestDemo"
            ? this.emailService.sendRequestDemoEmail(payload)
            : this.emailService.sendRequestScheduleEmail(payload);
        const sendAdminEmail = this.emailService.sendEmailToAdmin({
          ...payload,
          adminEmail: email,
          adminName: name,
        });

        if (sendUserEmail && sendAdminEmail) {
          return this.responseService.requestSuccessful(res, {
            success: true,
            message: "An email has been sent successfully ",
          });
        }
      }
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async sendScheduleMeetingMessage(
    payload: Offline,
    req,
    res
  ): Promise<Offline> {
    try {
      const sentEmail = this.emailService.sendRequestScheduleEmail(payload);
      if (sentEmail) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: "An email has been sent successfully ",
        });
      }
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
}
