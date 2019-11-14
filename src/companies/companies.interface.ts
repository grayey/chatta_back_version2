import { Document } from 'mongoose';

export interface CompaniesInterface extends Document {
    id?: string;
    company_name: string;
    domain_name: string;
    phone: number;
    contact_address: string;
    created_at: Date;
}
