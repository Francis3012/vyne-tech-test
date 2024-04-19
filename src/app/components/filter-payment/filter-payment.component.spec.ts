import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPaymentComponent } from './filter-payment.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing'
describe('FilterPaymentComponent', () => {
	let component: FilterPaymentComponent;
	let fixture: ComponentFixture<FilterPaymentComponent>;
	let loader: HarnessLoader;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FilterPaymentComponent],
			providers: [provideAnimations()]
		})
		.compileComponents();

		fixture = TestBed.createComponent(FilterPaymentComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call updateFilter() when clicking paginator element', async () => {
		component.totalNumberOfItems = 25;
		component.pageIndex = 0;

		const updateFilterSpy = spyOn(component, 'updateFilter');
		const matPaginator = await loader.getHarness(MatPaginatorHarness);
		await matPaginator.goToNextPage()

		expect(await matPaginator.getPageSize()).toBe(5)
		expect(updateFilterSpy).toHaveBeenCalled()
	})
});
