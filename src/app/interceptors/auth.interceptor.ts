import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const reqWithHeader = req.clone({
		headers: req.headers.set('Authorization', 'Basic ' + btoa(`${environment.user}:${environment.pass}`)),
	});
  	return next(reqWithHeader);
};
