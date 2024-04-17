import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
	private paymentDetails: BehaviorSubject<any> = new BehaviorSubject([])

  	constructor(private http: HttpClient) { }

	getPaymentDetails() {
		return this.paymentDetails.asObservable()
	}

	setPaymentDetails() {
		this.http.get(`${environment.apiURL}/api/v1/payments?page=0&size=5`).subscribe(resp => {
			console.log(resp)
			this.paymentDetails.next(resp);
		})
	}
}
