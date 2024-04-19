import { Component, Input, OnChanges, OnInit, SimpleChanges, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PaymentsQueryDTO } from '../../services/payment/query/payments-query.dto';
import { Status } from '../../services/payment/models/status';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-filter-payment',
	standalone: true,
	imports: [
		MatPaginatorModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatSelectModule,
		MatButtonModule,
		FormsModule
	],
	providers: [provideNativeDateAdapter()],
	templateUrl: './filter-payment.component.html',
	styleUrl: './filter-payment.component.scss'
})
export class FilterPaymentComponent implements OnChanges {
	@Input({ required: true }) totalNumberOfItems: number | undefined;
	@Input({ required: true }) pageIndex: number | undefined;
	@Input({ required: true }) lastPaymentsQuery!: PaymentsQueryDTO;
	@Input({ required: true }) numberOfPages: number | undefined;
	onFilterChange = output<PaymentsQueryDTO>();

	createdAtStart: Date | undefined;
	createdAtEnd: Date | undefined;

	status: string | undefined;
	statuses: string[] = [
		'CAPTURED',
		'COMPLETED',
		'CREATED',
		'FAILED',
		'SETTLED'
	];

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['lastPaymentsQuery']) {
			this.status = changes['lastPaymentsQuery'].currentValue.status ?? undefined;
			this.createdAtStart = changes['lastPaymentsQuery'].currentValue.createdAtStart ?? undefined
			this.createdAtEnd = changes['lastPaymentsQuery'].currentValue.createdAtEnd ?? undefined
			if (changes['numberOfPages'].currentValue - 1 < changes['pageIndex'].currentValue) {
				this.pageIndex = changes['numberOfPages'].currentValue - 1;
				this.updateFilter();
			}
		}
	}

	handlePageEvent(event: PageEvent) {
		this.totalNumberOfItems = event.length;
		this.pageIndex = event.pageIndex;
		this.updateFilter()
	}

	updateFilter() {
		let filter: PaymentsQueryDTO = {
			page: this.pageIndex,
			createdAtStart: this.createdAtStart,
			createdAtEnd: this.createdAtEnd,
			status: this.status ? Status[this.status as Status] : undefined
		};
		this.onFilterChange.emit(filter)
	}

	clearFilter() {
		if (Object.keys(this.lastPaymentsQuery).length) {
			let filter: PaymentsQueryDTO = {};
			this.onFilterChange.emit(filter)
		}
	}
}
