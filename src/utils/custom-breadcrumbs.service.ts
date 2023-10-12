import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomBreadcrumbsService {
  private breadcrumbsSubject = new BehaviorSubject<string[]>([]);

  breadcrumbs$ = this.breadcrumbsSubject.asObservable();
  constructor() {}

  public setBreadcrumbs(breadcrumbs: string[]): void {
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
