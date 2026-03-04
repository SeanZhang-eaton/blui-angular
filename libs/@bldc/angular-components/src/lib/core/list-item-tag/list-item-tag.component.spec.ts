import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { count } from '../../utils/test-utils';

import { ListItemTagComponent } from './list-item-tag.component';

describe('ListItemTagComponent', () => {
  let component: ListItemTagComponent;
  let fixture: ComponentFixture<ListItemTagComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [ListItemTagComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    void expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    fixture.detectChanges();
    const classList = ['.blui-list-item-tag-content', '.blui-list-item-tag-label'];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});
