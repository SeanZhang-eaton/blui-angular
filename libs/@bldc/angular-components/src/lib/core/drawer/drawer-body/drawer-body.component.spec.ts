import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../../utils/test-utils';
import { DRAWER_STATE } from '../drawer-state-ref';
import { DrawerState } from '../drawerState';

import { DrawerBodyComponent } from './drawer-body.component';
import { DrawerBodyModule } from './drawer-body.module';

describe('DrawerBodyComponent', () => {
  let component: DrawerBodyComponent;
  let fixture: ComponentFixture<DrawerBodyComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [DrawerBodyModule],
      providers: [{ provide: DRAWER_STATE, useFactory: () => new DrawerState() }],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerBodyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    fixture.detectChanges();
    const classList = ['.blui-drawer-body-content'];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});
