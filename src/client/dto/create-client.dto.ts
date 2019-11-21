export class CreateClientDto {
  readonly FullName: string;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
  readonly isAdmin: boolean;
  readonly isEnabled: boolean;
}
