import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatListItem, MatNavList } from '@angular/material/list';

import { count } from '../../utils/test-utils';

import { UserMenuComponent } from './user-menu.component';

@Component({
  imports: [UserMenuComponent],
  selector: 'test-user-menu-custom-header',
  template: `
    <blui-user-menu avatarValue="HA" [(open)]="open">
      <div blui-menu-header>
        <div id="custom-header-test"></div>
      </div>
    </blui-user-menu>
  `,
})
class UserMenuCustomHeaderTestComponent {
  open = true;
}

@Component({
  imports: [UserMenuComponent, MatNavList, MatListItem],
  selector: 'test-user-menu-nav-items',
  template: `
    <blui-user-menu avatarValue="HA" [(open)]="open">
      <mat-nav-list blui-menu-body>
        <mat-list-item id="list-item-test">List Item 1</mat-list-item>
      </mat-nav-list>
    </blui-user-menu>
  `,
})
class UserMenuNavItemsTestComponent {
  open = true;
}

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [UserMenuCustomHeaderTestComponent, UserMenuNavItemsTestComponent, UserMenuComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    vi.spyOn(component, 'checkScreenSize').mockImplementation(() => false);
  });

  it('should initialize', () => {
    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should render text in the avatar', () => {
    fixture.componentRef.setInput('open', false);
    fixture.componentRef.setInput('avatarValue', 'HA');
    fixture.detectChanges();
    const avatar = fixture.nativeElement.querySelector('.blui-user-menu-avatar');
    void expect(avatar.textContent.trim()).toBe('HA');
  });

  it('should render the menu open is true', () => {
    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    let menu = document.getElementsByClassName('.blui-user-menu-overlay');
    void expect(menu).toBeTruthy();
    fixture.componentRef.setInput('open', true);
    component.$isMenuOpen.set(true);
    component.$useBottomSheet.set(false);
    fixture.detectChanges();
    menu = document.getElementsByClassName('.blui-user-menu-overlay');
    void expect(menu).toBeTruthy();
  });

  it('should render the title', () => {
    fixture.componentRef.setInput('menuTitle', 'Sample Title');
    fixture.componentRef.setInput('open', true);
    component.$isMenuOpen.set(true);
    component.$useBottomSheet.set(false);
    fixture.detectChanges();
    const title = document.getElementsByClassName('blui-user-menu-header-title')[0] as HTMLElement;
    void expect(title.textContent.trim()).toBe('Sample Title');
  });

  it('should render the subtitle', () => {
    fixture.componentRef.setInput('menuTitle', 'Sample Title');
    fixture.componentRef.setInput('menuSubtitle', 'Sample Subtitle');
    fixture.componentRef.setInput('open', true);
    component.$isMenuOpen.set(true);
    component.$useBottomSheet.set(false);
    fixture.detectChanges();
    const title = document.getElementsByClassName('blui-user-menu-header-subtitle')[0] as HTMLElement;
    void expect(title.textContent.trim()).toBe('Sample Subtitle');
  });

  it('should render the custom header', () => {
    const headerFixture = TestBed.createComponent(UserMenuCustomHeaderTestComponent);
    headerFixture.detectChanges();
    const header = document.getElementById('custom-header-test');
    void expect(header).toBeTruthy();
  });

  it('should render the nav items', () => {
    const listFixture = TestBed.createComponent(UserMenuNavItemsTestComponent);
    listFixture.detectChanges();
    const listItem = document.getElementById('list-item-test');
    void expect(listItem).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    fixture.componentRef.setInput('avatarValue', 'EM');
    fixture.componentRef.setInput('open', true);
    component.$isMenuOpen.set(true);
    component.$useBottomSheet.set(false);
    fixture.componentRef.setInput('menuTitle', 'Title');
    fixture.detectChanges();
    const fixtureClassList = ['.blui-user-menu-avatar', '.blui-user-menu-text-avatar'];
    const menuOverlayClassList = [
      'blui-user-menu-overlay-backdrop',
      'blui-user-menu-overlay',
      'blui-user-menu-header',
      'blui-user-menu-header-avatar',
    ];
    const bottomSheetClassList = ['blui-user-menu-bottomsheet', 'blui-user-menu-bottomsheet-backdrop'];
    for (const className of fixtureClassList) {
      count(fixture, className);
    }
    for (const className of menuOverlayClassList) {
      void expect(document.getElementsByClassName(className).length).toBe(1);
    }
    component.$useBottomSheet.set(true);
    component.$isMenuOpen.set(false);
    component.openBottomSheet();
    for (const className of bottomSheetClassList) {
      void expect(document.getElementsByClassName(className).length).toBe(1);
    }
  });
});

describe('UserMenuComponent responsive menu', () => {
  it('opens a bottom sheet when the screen is narrower than useBottomSheetAt', async () => {
    const bottomSheet = TestBed.inject(MatBottomSheet);
    const openSpy = vi.spyOn(bottomSheet, 'open');
    const fixture = TestBed.createComponent(UserMenuComponent);
    fixture.componentRef.setInput('useBottomSheetAt', Number.MAX_SAFE_INTEGER);
    await fixture.whenStable();

    fixture.componentInstance.openOverlay();
    await fixture.whenStable();
    void expect(openSpy).toHaveBeenCalledTimes(1);
    void expect(fixture.componentInstance.$isMenuOpen()).toBe(false);
    bottomSheet.dismiss();
  });

  it('opens the overlay menu instead of a bottom sheet when responsive behavior is disabled', async () => {
    const openSpy = vi.spyOn(TestBed.inject(MatBottomSheet), 'open');
    const fixture = TestBed.createComponent(UserMenuComponent);
    fixture.componentRef.setInput('useBottomSheetAt', 0);
    await fixture.whenStable();

    fixture.componentInstance.openOverlay();
    await fixture.whenStable();
    void expect(openSpy).not.toHaveBeenCalled();
    void expect(fixture.componentInstance.$isMenuOpen()).toBe(true);
  });
});
