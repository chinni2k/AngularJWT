/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomBreadcrumbsService } from './custom-breadcrumbs.service';

describe('Service: CustomBreadcrumbs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomBreadcrumbsService]
    });
  });

  it('should ...', inject([CustomBreadcrumbsService], (service: CustomBreadcrumbsService) => {
    expect(service).toBeTruthy();
  }));
});
