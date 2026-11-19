import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../utils/test-utils';

import { ThreeLinerComponent } from './three-liner.component';

@Component({
  imports: [ThreeLinerComponent],
  template: `
    <blui-three-liner>
      <div blui-title>title</div>
      <div blui-subtitle>title</div>
      <div blui-info>title</div>
    </blui-three-liner>
  `,
})
class TestBasicUsageComponent {}

describe('ThreeLinerComponent', () => {
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
      '.blui-three-liner-content',
      '.blui-three-liner-title',
      '.blui-three-liner-subtitle',
      '.blui-three-liner-info',
    ];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});

@Component({
  imports: [ThreeLinerComponent],
  template: `
    <blui-three-liner title="Fallback title">
      @if ($showTitle()) {
        <div blui-title id="projected-title">Projected title</div>
      }
    </blui-three-liner>
  `,
})
class TestToggledContentComponent {
  readonly $showTitle = signal(false);
}

describe('ThreeLinerComponent projected content changes', () => {
  it('hides the input text once content is projected after the first render', async () => {
    const fixture = TestBed.createComponent(TestToggledContentComponent);
    await fixture.whenStable();
    const title = (): HTMLElement => fixture.nativeElement.querySelector('.blui-three-liner-title');
    void expect(title().textContent).toContain('Fallback title');

    fixture.componentInstance.$showTitle.set(true);
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve));
    await fixture.whenStable();
    void expect(title().textContent).toContain('Projected title');
    void expect(title().textContent).not.toContain('Fallback title');
  });
});
