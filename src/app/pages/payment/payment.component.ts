import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { PaymentListComponent } from '../../components/payment-list/payment-list.component';
import { PaymentService } from '../../services/payment/payment.service';
import { Observable } from 'rxjs';
import { LoadingStateComponent } from '../../components/loading-state/loading-state.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginatedDTO } from '../../services/payment/models/Paginated.dto';
import { PaymentTransactionDTO } from '../../services/payment/models/PaymentTransaction.dto';
import { FilterPaymentComponent } from '../../components/filter-payment/filter-payment.component';
import { PageEvent } from '@angular/material/paginator';
import { PaymentsQueryDTO } from '../../services/payment/query/payments-query.dto';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
	selector: 'app-payment',
	standalone: true,
	imports: [
		AsyncPipe,
		PaymentListComponent,
		LoadingStateComponent,
		FilterPaymentComponent
	],
	templateUrl: './payment.component.html',
	styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
	private paymentService = inject(PaymentService);
	paymentDetails$: Observable<PaginatedDTO<PaymentTransactionDTO> | null> = this.paymentService.getPaymentDetails();
	loading = this.paymentService.loading
	error = this.paymentService.error
	lastPaymentsQuery: PaymentsQueryDTO = {}

	ngOnInit(): void {
		this.paymentService.setPaymentDetails({ page: 0, size: 5 });
	}

	update(event: PaymentsQueryDTO) {
		this.lastPaymentsQuery = event;
		this.paymentService.setPaymentDetails({ ...this.lastPaymentsQuery });
	}
}
