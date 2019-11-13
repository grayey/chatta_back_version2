export class CreateClientDto {
  readonly id?: string;
  readonly fullName: string;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
  readonly isVerified: boolean;
  readonly date: Date;
  readonly isAdmin: boolean;
}
