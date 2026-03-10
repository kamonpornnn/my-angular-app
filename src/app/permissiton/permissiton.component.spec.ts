import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissitonComponent } from './permissiton.component';

describe('PermissitonComponent', () => {
  let component: PermissitonComponent;
  let fixture: ComponentFixture<PermissitonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissitonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
