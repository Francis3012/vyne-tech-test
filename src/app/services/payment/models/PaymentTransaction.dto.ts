import { Status } from './status';

export interface PaymentTransactionDTO {
	amount: number;
	createdAt: string;
	currency: string;
	description: string;
	id: string;
	status: Status
}
