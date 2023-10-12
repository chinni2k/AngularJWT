/* tslint:disable:no-unused-variable */

import { Type } from '@angular/compiler';
import { TestBed, inject } from '@angular/core/testing';
import { GenericService } from './generic.service';

describe('Service: Generic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericService]
    });
  });

  it('should ...', inject([GenericService], (service: GenericService<Type>) => {
    expect(service).toBeTruthy();
  }));
});
