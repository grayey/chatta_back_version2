export class CreateFormDto {
  readonly company_id: string;
  readonly form_name: string;
  readonly action_url: string;
  readonly is_payment: string;
  readonly form_fields: any[];
  readonly created_at: string;
  readonly updated_at: string;
}
