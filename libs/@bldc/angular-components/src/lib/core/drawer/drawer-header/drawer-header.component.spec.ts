import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { count } from '../../../utils/test-utils';
import { DRAWER_STATE } from '../drawer-state-ref';
import { DrawerState } from '../drawerState';

import { DrawerHeaderComponent } from './drawer-header.component';

@Component({
  standalone: true,
  imports: [DrawerHeaderComponent],
  template: ` <blui-drawer-header title="title" subtitle="subtitle" /> `,
})
class TestDrawerHeaderComponent {}

@Component({
  standalone: true,
  imports: [DrawerHeaderComponent],
  template: `
    <blui-drawer-header>
      <div blui-title-content id="test-title-content">test title content</div>
    </blui-drawer-header>
  `,
})
class TestDrawerHeaderWithTitleContentComponent {}

@Component({
  standalone: true,
  imports: [DrawerHeaderComponent, MatIcon],
  template: `
    <blui-drawer-header>
      <button id="test-icon" mat-icon-button blui-icon>
        <mat-icon>menu</mat-icon>
      </button>
    </blui-drawer-header>
  `,
})
class TestDrawerHeaderWithIconComponent {}

describe('DrawerHeaderComponent', () => {
  let component: DrawerHeaderComponent;
  let fixture: ComponentFixture<DrawerHeaderComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [
        TestDrawerHeaderComponent,
        TestDrawerHeaderWithTitleContentComponent,
        TestDrawerHeaderWithIconComponent,
      ],
      providers: [{ provide: DRAWER_STATE, useFactory: () => new DrawerState() }],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.componentRef.setInput('title', 'test title');
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.blui-drawer-header-title'));
    void expect(title.nativeElement.innerHTML.trim()).toBe('test title');
  });

  it('should render subtitle', () => {
    fixture.componentRef.setInput('title', 'test title');
    fixture.componentRef.setInput('subtitle', 'test subtitle');
    fixture.detectChanges();
    const subtitle = fixture.debugElement.query(By.css('.blui-drawer-header-subtitle'));
    void expect(subtitle.nativeElement.innerHTML.trim()).toBe('test subtitle');
  });

  it('should render titleContent', () => {
    const customFixture = TestBed.createComponent(TestDrawerHeaderWithTitleContentComponent);
    customFixture.detectChanges();
    const content: HTMLElement = customFixture.nativeElement.querySelector('#test-title-content');
    void expect(content.innerHTML).toBe('test title content');
  });

  it('should render icon', () => {
    const customFixture = TestBed.createComponent(TestDrawerHeaderWithIconComponent);
    customFixture.detectChanges();
    const icon: HTMLElement = customFixture.nativeElement.querySelector('#test-icon');
    void expect(icon).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    const customFixture = TestBed.createComponent(TestDrawerHeaderComponent);
    customFixture.detectChanges();
    const classList = [
      '.blui-drawer-header',
      '.blui-drawer-header-content',
      '.blui-drawer-header-background',
      '.blui-drawer-header-content',
      '.blui-drawer-header-icon-wrapper',
      '.blui-drawer-header-title-wrapper',
      '.blui-drawer-header-title',
      '.blui-drawer-header-subtitle',
    ];
    for (const className of classList) {
      count(customFixture, className);
    }
  });
});
