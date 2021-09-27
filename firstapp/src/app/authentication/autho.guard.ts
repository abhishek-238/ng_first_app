import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthoService } from './autho.service';

@Injectable({
  providedIn: 'root'
})

export class AuthoGuard implements CanActivate {
  constructor(private _authoservice:AuthoService,private _router:Router){
    if(!_authoservice.GetAuthenticate()){
      _router.navigate(["/login"])
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authoservice.GetAuthenticate();
  }
  
}
