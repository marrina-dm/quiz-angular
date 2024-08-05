import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {Location} from "@angular/common";

export const authForwardGuard: CanActivateFn = (): boolean => {
  if (inject(AuthService).getLoggedIn()) {
    inject(Location).back();
    return false;
  }
  return true;
};
