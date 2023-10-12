import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth_services/auth.service';

export const authGuard: CanActivateFn = (state): boolean => {
  const auth = inject(AuthService);
  const route = inject(Router);
  const token = auth.getToken();
  if (auth.isLoggedIn()) {
    // route.navigate(['main/dashboard']);
    return true;
  } else
    Swal.fire({
      icon: 'error',
      text: 'Kindly Please do login..',
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: '#1783aa',
    }).then(() => route.navigate(['auth', 'login']));

  return false;
};
