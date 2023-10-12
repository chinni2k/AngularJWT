/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MainEmployeeService } from './main-employee.service';

describe('Service: MainEmployee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainEmployeeService]
    });
  });

  it('should ...', inject([MainEmployeeService], (service: MainEmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
