import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { provideMarkdown } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes), provideHttpClient(), provideHttpClientTesting(), provideMarkdown()],
    });
  });

  it('highlights the active nav item and shows its title in the toolbar', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl('/components/hero/api-docs');
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    void expect(element.querySelector('.toolbar-title')?.textContent?.trim()).toBe('Hero');
    void expect(element.querySelector('.blui-drawer-nav-item-active')?.textContent).toContain('Hero');
  });

  it('toggles the dark theme on the body', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    void expect(document.body.classList).toContain('blui-blue');

    (fixture.nativeElement.querySelector('[aria-label="Switch to dark theme"]') as HTMLElement).click();
    await fixture.whenStable();
    void expect(document.body.classList).toContain('blui-blue-dark');
    void expect(document.body.classList).not.toContain('blui-blue');
  });
});
