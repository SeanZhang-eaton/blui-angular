import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerHeaderComponent,
  DrawerLayoutComponent,
  DrawerLayoutVariantType,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
  SpacerComponent,
} from '@bldc/angular-components';

import { filter, map } from 'rxjs';

import { DrawerStateService } from '../services/drawer-state/drawer-state.service';
import { TabService } from '../services/tab/tab.service';
import { ThemeDesign, ThemeService } from '../services/theme/theme.service';
import { ViewportService } from '../services/viewport/viewport.service';

import { APP_NAV_ITEMS, COMPONENTS_NAV_GROUP, DOC_PAGES, NavItem } from './nav-items';

const TABS = ['examples', 'api-docs', 'playground'];

/** Removes the leading slash, query, fragment and the trailing documentation tab from a URL. */
function toRoute(url: string): string {
  const segments = url.split(/[?#]/)[0].split('/').filter(Boolean);
  if (TABS.includes(segments.at(-1) ?? '')) {
    segments.pop();
  }
  return segments.join('/');
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DrawerLayoutComponent,
    DrawerComponent,
    DrawerHeaderComponent,
    DrawerBodyComponent,
    DrawerNavGroupComponent,
    DrawerNavItemComponent,
    SpacerComponent,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatButtonToggleGroup,
    MatButtonToggle,
    RouterOutlet,
  ],
})
export class NavigationComponent {
  private readonly _router = inject(Router);
  private readonly _document = inject(DOCUMENT);
  private readonly _tabService = inject(TabService);
  protected readonly drawerState = inject(DrawerStateService);
  protected readonly viewport = inject(ViewportService);
  protected readonly theme = inject(ThemeService);

  protected readonly navItems = COMPONENTS_NAV_GROUP;

  /** Current route without the documentation tab, e.g. `components/hero`. */
  protected readonly $activeRoute = toSignal(
    this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => toRoute(event.urlAfterRedirects))
    ),
    { initialValue: toRoute(this._router.url) }
  );

  protected readonly $toolbarTitle = computed(() => {
    const route = this.$activeRoute();
    if (route === APP_NAV_ITEMS.catalog.route) {
      return 'Components';
    }
    return DOC_PAGES.find((item) => item.route === route)?.title ?? '';
  });

  protected readonly $variant = computed<DrawerLayoutVariantType>(() =>
    this.viewport.$isMedium() ? 'temporary' : 'permanent'
  );

  constructor() {
    // Scroll the content back to the top when navigating to another page.
    effect(() => {
      this.$activeRoute();
      this._document.querySelector('.mat-drawer-content')?.scrollTo({ top: 0 });
    });
  }

  protected isActive(item: NavItem): boolean {
    return item.route === this.$activeRoute();
  }

  protected hasActiveChild(item: NavItem): boolean {
    return !!item.children?.some((child) => this.isActive(child));
  }

  protected selectItem(item: NavItem): void {
    // Items with children only expand / collapse.
    if (item.children) {
      return;
    }
    const isDocPage = DOC_PAGES.includes(item);
    void this._router.navigateByUrl(
      isDocPage ? `/${item.route}/${this._tabService.getPreviousTab()}` : `/${item.route}`
    );
    if (this.viewport.$isMedium()) {
      this.drawerState.setDrawerOpen(false);
    }
  }

  protected goHome(): void {
    void this._router.navigateByUrl(`/${APP_NAV_ITEMS.catalog.route}`);
  }

  protected setDesign(design: ThemeDesign): void {
    this.theme.setDesign(design);
  }
}
