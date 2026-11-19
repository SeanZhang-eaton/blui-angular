import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../utils/test-utils';

import { AppBarComponent } from './app-bar.component';

@Component({
  standalone: true,
  imports: [AppBarComponent],
  template: `
    <blui-app-bar variant="collapsed">
      <div>title</div>
    </blui-app-bar>
  `,
})
class TestBasicUsageComponent {}

describe('AppBarComponent', () => {
  let component: TestBasicUsageComponent;
  let fixture: ComponentFixture<TestBasicUsageComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [TestBasicUsageComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestBasicUsageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    fixture.detectChanges();
    const classList = [
      '.blui-app-bar',
      '.mat-elevation-z4',
      '.blui-app-bar-content',
      '.blui-app-bar-background',
      '.blui-app-bar-collapsed',
      '.blui-app-bar-body-wrapper',
    ];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});

describe('AppBarComponent snap variant', () => {
  it('collapses after scrolling past the threshold and expands again at the top', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    let scrollTop = 0;
    Object.defineProperty(container, 'scrollTop', { get: () => scrollTop, configurable: true });
    const scrollTo = async (top: number): Promise<void> => {
      scrollTop = top;
      container.dispatchEvent(new Event('scroll'));
      await new Promise((resolve) => setTimeout(resolve, 20));
      await fixture.whenStable();
    };

    const fixture = TestBed.createComponent(AppBarComponent);
    const emitted: boolean[] = [];
    fixture.componentInstance.collapsedChange.subscribe((collapsed) => emitted.push(collapsed));
    fixture.componentRef.setInput('variant', 'snap');
    fixture.componentRef.setInput('expandedHeight', 200);
    fixture.componentRef.setInput('collapsedHeight', 64);
    fixture.componentRef.setInput('scrollContainerElement', container);
    await fixture.whenStable();
    void expect(emitted.at(-1)).toBe(false);

    await scrollTo(300);
    void expect(emitted.at(-1)).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 350));
    await scrollTo(0);
    void expect(emitted.at(-1)).toBe(false);
    container.remove();
  });
});
