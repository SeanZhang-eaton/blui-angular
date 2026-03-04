import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../../../utils/test-utils';
import { DRAWER_STATE } from '../../drawer-state-ref';
import { DrawerState } from '../../drawerState';

import { DrawerNavGroupComponent } from './drawer-nav-group.component';

describe('DrawerNavGroupComponent', () => {
  let component: DrawerNavGroupComponent;
  let fixture: ComponentFixture<DrawerNavGroupComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [DrawerNavGroupComponent],
      providers: [{ provide: DRAWER_STATE, useFactory: () => new DrawerState() }],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerNavGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should render the title if the drawer is open', () => {
    fixture.componentRef.setInput('title', 'test');
    component.drawerState.setDrawerOpen(true);
    fixture.detectChanges();
    void expect(fixture.nativeElement.querySelector('.blui-drawer-nav-group-title').innerHTML).toContain('test');
  });

  it('should hide the group title if the drawer is not open', () => {
    fixture.componentRef.setInput('title', 'test');
    fixture.detectChanges();
    void expect(fixture.nativeElement.querySelector('.blui-drawer-nav-group-title-closed')).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    fixture.componentRef.setInput('title', 'test');
    component.drawerState.setDrawerOpen(true);
    fixture.detectChanges();
    const classList = ['.blui-drawer-nav-group-content', '.blui-drawer-nav-group-title'];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});
