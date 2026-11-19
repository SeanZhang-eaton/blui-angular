import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../utils/test-utils';

import { DrawerComponent } from './drawer.component';
import { DrawerModule } from './drawer.module';
import { DRAWER_STATE } from './drawer-state-ref';

@Component({
  imports: [DrawerModule],
  template: `
    <blui-drawer>
      <blui-drawer-header id="test-header" />
    </blui-drawer>
  `,
})
class DrawerHeaderRenderTestComponent {}

@Component({
  imports: [DrawerModule],
  template: `
    <blui-drawer>
      <blui-drawer-subheader id="test-subheader" />
    </blui-drawer>
  `,
})
class DrawerSubheaderRenderTestComponent {}

@Component({
  imports: [DrawerModule],
  template: `
    <blui-drawer>
      <blui-drawer-body id="test-body" />
    </blui-drawer>
  `,
})
class DrawerBodyRenderTestComponent {}

@Component({
  imports: [DrawerModule],
  template: `
    <blui-drawer>
      <blui-drawer-footer id="test-footer" />
    </blui-drawer>
  `,
})
class DrawerFooterRenderTestComponent {}

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [
        DrawerHeaderRenderTestComponent,
        DrawerSubheaderRenderTestComponent,
        DrawerBodyRenderTestComponent,
        DrawerFooterRenderTestComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should render the drawer header', () => {
    const customFixture = TestBed.createComponent(DrawerHeaderRenderTestComponent);
    customFixture.detectChanges();
    void expect(customFixture.nativeElement.querySelector('#test-header')).toBeTruthy();
  });

  it('should render the drawer subheader', () => {
    const customFixture = TestBed.createComponent(DrawerSubheaderRenderTestComponent);
    customFixture.detectChanges();
    void expect(customFixture.nativeElement.querySelector('#test-subheader')).toBeTruthy();
  });

  it('should render the drawer body', () => {
    const customFixture = TestBed.createComponent(DrawerBodyRenderTestComponent);
    customFixture.detectChanges();
    void expect(customFixture.nativeElement.querySelector('#test-body')).toBeTruthy();
  });

  it('should render the drawer footer', () => {
    const customFixture = TestBed.createComponent(DrawerFooterRenderTestComponent);
    customFixture.detectChanges();
    void expect(customFixture.nativeElement.querySelector('#test-footer')).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    fixture.detectChanges();
    const classList = ['.blui-drawer-content', '.blui-drawer-hover-area'];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});

describe('DrawerComponent open on hover', () => {
  it('temporarily opens a closed drawer on hover and closes it on mouse leave', async () => {
    const fixture = TestBed.createComponent(DrawerComponent);
    fixture.componentRef.setInput('open', false);
    fixture.componentRef.setInput('openOnHoverDelay', 0);
    await fixture.whenStable();
    const state = fixture.debugElement.injector.get(DRAWER_STATE);
    const hoverArea: HTMLElement = fixture.nativeElement.querySelector('.blui-drawer-hover-area');

    hoverArea.dispatchEvent(new MouseEvent('mouseenter'));
    await new Promise((resolve) => setTimeout(resolve, 10));
    void expect(state.$tempOpen()).toBe(true);

    hoverArea.dispatchEvent(new MouseEvent('mouseleave'));
    void expect(state.$tempOpen()).toBe(false);
  });

  it('does not open on hover when openOnHover is false', async () => {
    const fixture = TestBed.createComponent(DrawerComponent);
    fixture.componentRef.setInput('open', false);
    fixture.componentRef.setInput('openOnHover', false);
    fixture.componentRef.setInput('openOnHoverDelay', 0);
    await fixture.whenStable();
    const state = fixture.debugElement.injector.get(DRAWER_STATE);

    fixture.nativeElement.querySelector('.blui-drawer-hover-area').dispatchEvent(new MouseEvent('mouseenter'));
    await new Promise((resolve) => setTimeout(resolve, 10));
    void expect(state.$tempOpen()).toBe(false);
  });
});
