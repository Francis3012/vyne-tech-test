import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'payment',
		loadComponent: () => import('./pages/payment/payment.component').then(mod => mod.PaymentComponent)
	},
	{
		path: '**',
		redirectTo: 'payment'
	}
];
