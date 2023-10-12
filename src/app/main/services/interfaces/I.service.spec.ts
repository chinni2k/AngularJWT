/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { IService } from './I.service';

describe('Service: I', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should ...', inject([], (service: IService) => {
    expect(service).toBeTruthy();
  }));
});
