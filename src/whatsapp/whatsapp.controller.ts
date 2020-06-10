import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  Get,
  Body,
  UseGuards,
  Res,
  Req,
} from "@nestjs/common";
import { Response, Request } from "express";
import { WhatsappService } from "./whatsapp.service";

@Controller("api/v1/whatsapp")
export class WhatsappController {
  constructor(private whatsappService: WhatsappService) {}

  @Post("airtime")
  airtime(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.airtimePurcase(req, res);
  }
  @Post("data")
  data(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.dataPurchase(req, res);
  }
  @Post("open-account")
  accountOpening(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.openAccount(req, res);
  }
  @Post("check-balance")
  checkAccountBalance(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.checkBalance(req, res);
  }
  @Post("pay-bill")
  payBill(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.payBill(req, res);
  }
  @Post("transfer")
  transferFund(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.transferFund(req, res);
  }
  @Post("change-pin")
  changePin(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.changePin(req, res);
  }
  @Post("account-statement")
  accountStatement(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.accountStatement(req, res);
  }
  @Post("request-card")
  requestCard(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.requestCard(req, res);
  }
  @Post("block-card")
  blockCard(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.blockCard(req, res);
  }
  @Post("complaint")
  complaint(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.whatsappService.complaint(req, res);
  }
}
