import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeartComponent } from './heart.component';

describe('HeartComponent', () => {
  let component: HeartComponent;
  let fixture: ComponentFixture<HeartComponent>;

  beforeEach(waitForAsync((): void => {
    void TestBed.configureTestingModule({
      imports: [HeartComponent],
    }).compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(HeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    void expect(component).toBeTruthy();
  });
});
