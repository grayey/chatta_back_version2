export class CreateTreeDto {
  readonly id?: string;
  readonly clientId: string;
  readonly identity: string;
  readonly prompt: string;
  readonly response: object;
  readonly date: Date;
}
