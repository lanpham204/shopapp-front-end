import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if(token) {
        req = req.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          },
      });
      }
     }
  return next(req);
};
