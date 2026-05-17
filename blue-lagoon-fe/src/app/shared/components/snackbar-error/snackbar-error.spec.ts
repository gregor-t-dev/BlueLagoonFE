import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarError } from './snackbar-error';

describe('SnackbarError', () => {
  let component: SnackbarError;
  let fixture: ComponentFixture<SnackbarError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarError],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
