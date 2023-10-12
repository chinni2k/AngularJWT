import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth_services/auth.service';

export const loginguardGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if (localStorage.getItem('token') === null || '') {
    _router.navigate(['auth', 'login']);
    return true;
  } else if (localStorage.getItem('token'))
    _router.navigate(['main', 'dashboard']);

  return false;
};
