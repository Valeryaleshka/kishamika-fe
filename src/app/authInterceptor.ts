import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './services/user/user.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const authToken = userService.getUser()?.accessToken ?? '';

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
