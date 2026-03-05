import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { count } from '../../../utils/test-utils';
import { DrawerComponent } from '../drawer.component';

import { DrawerLayoutComponent } from './public-api';

@Component({
  standalone: true,
  imports: [DrawerLayoutComponent, DrawerComponent],
  template: `
    <blui-drawer-layout variant="persistent">
      <blui-drawer blui-drawer id="test-drawer" />
      <div blui-content id="test-content"></div>
    </blui-drawer-layout>
  `,
})
class DrawerRenderTestComponent {}

describe('DrawerLayoutComponent', () => {
  let component: DrawerLayoutComponent;
  let fixture: ComponentFixture<DrawerLayoutComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [DrawerRenderTestComponent, DrawerLayoutComponent, NoopAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should render the drawer', () => {
    const customFixture = TestBed.createComponent(DrawerRenderTestComponent);
    customFixture.detectChanges();
    void expect(customFixture.nativeElement.querySelector('#test-drawer')).toBeTruthy();
  });

  it('should render the content', () => {
    const customFixture = TestBed.createComponent(DrawerRenderTestComponent);
    customFixture.detectChanges();
    void expect(customFixture.nativeElement.querySelector('#test-content')).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    const customFixture = TestBed.createComponent(DrawerRenderTestComponent);
    customFixture.detectChanges();
    const classList = ['.blui-drawer-layout-content', '.blui-drawer-layout-sidenav'];
    for (const className of classList) {
      count(customFixture, className);
    }
  });
});
