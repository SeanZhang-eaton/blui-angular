import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';

import { SHOWCASE_NAV } from '../navigation';

import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DrawerComponent],
      providers: [provideRouter([{ path: '**', children: [] }])],
    });
  });

  it('navigates to the route of the selected nav item', async () => {
    const fixture = TestBed.createComponent(DrawerComponent);
    await fixture.whenStable();
    const navigateSpy = vi.spyOn(fixture.componentInstance, 'navigate').mockImplementation(() => undefined);
    const routes = SHOWCASE_NAV.flatMap((group) => group.items).map((item) => item.route);
    const navItems = fixture.debugElement.queryAll(By.css('[class*="nav-menu"]'));
    void expect(navItems.length).toBe(routes.length);

    navItems.forEach((navItem) => navItem.triggerEventHandler('itemSelect', undefined));
    void expect(navigateSpy.mock.calls.map(([url]) => url)).toEqual(routes);
  });
  it('selects the nav item of the current route and expands its group', async () => {
    const fixture = TestBed.createComponent(DrawerComponent);
    await TestBed.inject(Router).navigateByUrl('/templates/dashboard');
    await fixture.whenStable();
    void expect(fixture.componentInstance.$activeRoute()).toBe('/templates/dashboard');
    void expect(fixture.componentInstance.$activeGroup()?.title).toBe('Page Templates');
  });
});
