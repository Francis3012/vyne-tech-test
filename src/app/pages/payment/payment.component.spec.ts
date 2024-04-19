import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { PaymentService } from '../../services/payment/payment.service';

describe('PaymentComponent', () => {
	let component: PaymentComponent;
	let fixture: ComponentFixture<PaymentComponent>;
	let mockPaymentService: PaymentService = jasmine.createSpyObj<PaymentService>('PaymentService', [
		'getPaymentDetails',
		'setPaymentDetails',
		'loading',
		'error'
	])

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PaymentComponent],
			providers: [
				{ provide: PaymentService, useValue: mockPaymentService }
			]
		})
		.compileComponents();

		fixture = TestBed.createComponent(PaymentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
