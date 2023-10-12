import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');

  constructor() { }

  getRoleFromStore(): Observable<string> {
    return this.role$.asObservable();
  }

  setRoleForStore(role: string): void {
    this.role$.next(role);
  }

  getFullNameFromStore(): Observable<string> {
    return this.fullName$.asObservable();
  }

  setFullNameForStore(fullname: string): void {
    this.fullName$.next(fullname);
  }
}
