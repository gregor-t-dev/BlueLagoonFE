import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarInfo } from './snackbar-info';

describe('SnackbarInfo', () => {
  let component: SnackbarInfo;
  let fixture: ComponentFixture<SnackbarInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
