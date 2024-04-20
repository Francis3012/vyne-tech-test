import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PaymentsQueryDTO } from './query/payments-query.dto';
import { PaginatedDTO } from './models/Paginated.dto';
import { PaymentTransactionDTO } from './models/PaymentTransaction.dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
	private http = inject(HttpClient);
	private paymentDetails: BehaviorSubject<PaginatedDTO<PaymentTransactionDTO> | null> = new BehaviorSubject<PaginatedDTO<PaymentTransactionDTO> | null>(null);
	public loading: WritableSignal<boolean> = signal(false);
	public error: WritableSignal<HttpErrorResponse | null> = signal(null);

	getPaymentDetails(): Observable<PaginatedDTO<PaymentTransactionDTO> | null> {
		return this.paymentDetails.asObservable()
	}

	setPaymentDetails(query: PaymentsQueryDTO) {
		this.loading.set(true);
		let params = new HttpParams({
			fromObject: JSON.parse(JSON.stringify(
				{
					...query,
					createdAtStart: query?.createdAtStart?.toISOString().split('T')[0],
					createdAtEnd: query?.createdAtEnd?.toISOString().split('T')[0]
				}
			))
		})
		this.http.get<PaginatedDTO<PaymentTransactionDTO>>(`${environment.apiURL}/api/v1/payments`, { params: params })
			.pipe(
				catchError(error => throwError(() => error))
			)
			.subscribe({
				next: (resp) => {
					this.paymentDetails.next(resp);
					this.loading.set(false);
				},
				error: (error) => {
					this.error.set(error)
					this.loading.set(false);
				}
			})
	}
}
