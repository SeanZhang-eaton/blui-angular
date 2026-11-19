import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { provideMarkdown } from 'ngx-markdown';

import { DOC_PAGES } from './navigation/nav-items';
import { appRoutes } from './app.routes';

describe('documentation routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes), provideHttpClient(), provideHttpClientTesting(), provideMarkdown()],
    });
  });

  it('shows the component catalog by default', async () => {
    const harness = await RouterTestingHarness.create('/');
    void expect(harness.routeNativeElement?.querySelectorAll('.catalog-card').length).toBeGreaterThan(0);
  });

  it.each(DOC_PAGES.map((page) => [page.title, page.route]))('renders the %s documentation page', async (_, route) => {
    const harness = await RouterTestingHarness.create(`/${route}/examples`);
    void expect(harness.routeNativeElement?.querySelector('app-component-doc-scaffold')).toBeTruthy();
  });

  it('redirects the pre-11.0 drawer routes', async () => {
    await RouterTestingHarness.create('/components/drawer/nav-item/api-docs');
    void expect(TestBed.inject(Router).url).toBe('/components/drawer-nav-item/api-docs');
  });
});
