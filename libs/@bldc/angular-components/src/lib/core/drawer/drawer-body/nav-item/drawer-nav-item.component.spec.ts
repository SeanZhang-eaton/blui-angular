import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { count } from '../../../../utils/test-utils';
import { DRAWER_STATE } from '../../drawer-state-ref';
import { DrawerState } from '../../drawerState';

import { DrawerNavItemComponent } from './drawer-nav-item.component';

@Component({
  template: `
    <blui-drawer-nav-item [hidden]="true">
        <blui-drawer-nav-item [hidden]="true">Test</blui-drawer-nav-item>
    </blui-drawer-nav-item>
    `,
})
class DrawerHiddenNavItemComponent {}

describe('DrawerNavItemComponent', () => {
  let component: DrawerNavItemComponent;
  let fixture: ComponentFixture<DrawerNavItemComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [DrawerHiddenNavItemComponent],
      imports: [DrawerNavItemComponent, NoopAnimationsModule],
      providers: [{ provide: DRAWER_STATE, useFactory: () => new DrawerState() }],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerNavItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should not render the nav item if hidden is true', () => {
    const hiddenFixture = TestBed.createComponent(DrawerHiddenNavItemComponent);
    hiddenFixture.detectChanges();
    const navItem = hiddenFixture.nativeElement.querySelector('.blui-drawer-nav-item-content');
    void expect(navItem).toBeFalsy();
  });

  it('should enforce class naming conventions', () => {
    component.incrementDepth(0);
    fixture.componentRef.setInput('selected', true);
    component.drawerState.setDrawerOpen(true);
    fixture.detectChanges();
    let classList = [
      '.blui-drawer-nav-item-content',
      '.blui-drawer-nested-nav-item',
      '.blui-drawer-nav-item-active-square',
      '.blui-drawer-nav-item-active',
      '.blui-drawer-nav-item-active-highlight',
      '.blui-drawer-nav-item-depth-1',
    ];
    for (const className of classList) {
      count(fixture, className);
    }
    component.drawerState.setDrawerVariant('rail');
    fixture.detectChanges();
    classList = ['.blui-drawer-nav-item-rail', '.blui-drawer-nav-item-rail-text'];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});
