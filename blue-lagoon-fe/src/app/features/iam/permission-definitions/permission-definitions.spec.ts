import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionDefinitions } from './permission-definitions';

describe('PermissionDefinitions', () => {
  let component: PermissionDefinitions;
  let fixture: ComponentFixture<PermissionDefinitions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionDefinitions],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionDefinitions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
