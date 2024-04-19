import { Component, Input } from '@angular/core';
import { PaymentTransactionDTO } from '../../services/payment/models/PaymentTransaction.dto';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [DatePipe, MatExpansionModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {
	@Input() paymentDetails!: PaymentTransactionDTO[] | undefined;
}
