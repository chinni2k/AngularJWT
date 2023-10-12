/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddHubComponent } from './add-hub.component';

describe('AddHubComponent', () => {
  let component: AddHubComponent;
  let fixture: ComponentFixture<AddHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
