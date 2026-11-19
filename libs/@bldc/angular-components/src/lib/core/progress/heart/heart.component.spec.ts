import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartComponent } from './heart.component';

describe('HeartComponent', () => {
  let component: HeartComponent;
  let fixture: ComponentFixture<HeartComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HeartComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(HeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    void expect(component).toBeTruthy();
  });
});

@Component({
  imports: [HeartComponent],
  template: `<heart-progress /><blui-heart-progress />`,
})
class TestLegacySelectorComponent {}

describe('HeartComponent legacy selector', () => {
  it('warns once when the deprecated <heart-progress> selector is used', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    TestBed.createComponent(TestLegacySelectorComponent).detectChanges();
    void expect(warn).toHaveBeenCalledTimes(1);
    void expect(warn).toHaveBeenCalledWith(expect.stringContaining('<heart-progress> is deprecated'));
    warn.mockRestore();
  });
});
