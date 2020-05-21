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
    private responseService: ResponseService
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
  async sendCallToActionEmail(
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
        if (
          !(payload["callToAction"] === "scheduleMeeting" || payload["callToAction"] === "requestDemo"
        ) ){
          return this.responseService.clientError(res, "please include a valid call to action");
        }
        if (
          payload["callToAction"] &&
          payload["email"] &&
          payload["name"] &&
          payload["callToAction"] &&
          payload["parentValue"]
        ) {
          if (
            payload["callToAction"] === "scheduleMeeting" &&
            !payload["date"]
          ) {
            return this.responseService.clientError(res, "date is missing");
          }
        } else {
          return this.responseService.clientError(
            res,
            "one or more fields is missing"
          );
        }

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
            message:
              payload["callToAction"] === "requestDemo"
                ? `Thank you for your interest in our ${
                    payload["parentValue"]
                  } services. One of your agents will contact you via the email address you provided with instructions on how to access the demo.`
                : `Thank you for your interest in our ${
                    payload["parentValue"]
                  } Your meeting has been scheduled successfully. One of our agents will contact you on the scheduled date`,
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
