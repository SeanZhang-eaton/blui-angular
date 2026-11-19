import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { SHOWCASE_NAV } from './navigation';

describe('AppComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(appRoutes)],
    });
  });

  it.each(SHOWCASE_NAV.flatMap((group) => group.items).map((item) => [item.pageTitle, item.route]))(
    'shows "%s" in the toolbar for %s',
    async (pageTitle, route) => {
      const fixture = TestBed.createComponent(AppComponent);
      await TestBed.inject(Router).navigateByUrl(route);
      await fixture.whenStable();
      void expect(fixture.componentInstance.$title()).toBe(pageTitle);
    }
  );

  it('uses the persistent drawer on desktop', () => {
    const fixture = TestBed.createComponent(AppComponent);
    void expect(fixture.componentInstance.$variant()).toBe('persistent');
  });

  it('toggles the dark theme on the body', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    (fixture.nativeElement.querySelector('.toggle-theme') as HTMLElement).click();
    await fixture.whenStable();
    void expect(document.body.classList).toContain('blui-blue-dark');
    void expect(document.body.classList).not.toContain('blui-blue');
  });

  it('toggles the text direction', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const toggle = fixture.nativeElement.querySelector('.toggle-direction') as HTMLElement;
    toggle.click();
    void expect(fixture.componentInstance.$isRtl()).toBe(true);
    toggle.click();
    void expect(fixture.componentInstance.$isRtl()).toBe(false);
  });
});
