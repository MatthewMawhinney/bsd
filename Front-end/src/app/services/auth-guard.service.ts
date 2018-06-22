import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) { }

  canActivate() {
    if (this.registerService.isValid()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
