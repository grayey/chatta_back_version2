export class CreatePaymentDto {
  readonly id?: string;
  readonly reference: string;
  readonly message: string;
  readonly name: string;
  readonly email: string;
  readonly amount: string;
}
