export class CreateClientDto {
  readonly Full_name: string;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
  readonly isAdmin: boolean;
}
