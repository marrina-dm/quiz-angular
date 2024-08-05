import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (): boolean => {
  if (inject(AuthService).getLoggedIn()) {
    return true;
  }

  inject(Router).navigate(['/login']).then();
  return false;
};
