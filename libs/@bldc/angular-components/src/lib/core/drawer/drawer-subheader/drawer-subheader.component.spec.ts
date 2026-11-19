import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../../utils/test-utils';
import { DRAWER_STATE } from '../drawer-state-ref';
import { DrawerState } from '../drawerState';

import { DrawerSubheaderComponent } from './drawer-subheader.component';

@Component({
  imports: [DrawerSubheaderComponent],
  template: `
    <blui-drawer-subheader>
      <div id="test-subheader-content">test subheader content</div>
    </blui-drawer-subheader>
  `,
})
class TestDrawerSubheaderComponent {}

describe('DrawerSubheaderComponent', () => {
  let component: DrawerSubheaderComponent;
  let fixture: ComponentFixture<DrawerSubheaderComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [TestDrawerSubheaderComponent],
      providers: [{ provide: DRAWER_STATE, useFactory: () => new DrawerState() }],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerSubheaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should render subheaderContent', () => {
    const customFixture = TestBed.createComponent(TestDrawerSubheaderComponent);
    customFixture.detectChanges();
    const content: HTMLElement = customFixture.nativeElement.querySelector('#test-subheader-content');
    void expect(content.innerHTML).toBe('test subheader content');
  });

  it('should enforce class naming conventions', () => {
    const customFixture = TestBed.createComponent(TestDrawerSubheaderComponent);
    customFixture.detectChanges();
    const classList = ['.blui-drawer-subheader', '.blui-drawer-subheader-content'];
    for (const className of classList) {
      count(customFixture, className);
    }
  });
});
