import { Component, OnInit } from '@angular/core';
import { PaymentListComponent } from '../../components/payment-list/payment-list.component';
import { PaymentService } from '../../services/payment.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-payment',
	standalone: true,
	imports: [PaymentListComponent],
	templateUrl: './payment.component.html',
	styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
	paymentDetails$!: Observable<any>

	constructor(private paymentService: PaymentService) {}

	ngOnInit(): void {
		this.paymentDetails$ = this.paymentService.getPaymentDetails()
		this.paymentService.setPaymentDetails()
	}
}
