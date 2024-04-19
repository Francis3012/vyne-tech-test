import { Status } from '../models/status';

export interface PaymentsQueryDTO {
	createdAtEnd?: Date;
	createdAtStart?: Date;
	page?: number;
	size?: number;
	status?: Status;
}
