
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';

@Injectable()
export class UnSavedGuard implements CanDeactivate<any> {
  canDeactivate(component: any,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    return window.confirm('確定離開此頁？已填的資料將不會被保存。');
  }
}
