import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import {
  DrawerBodyComponent,
  DrawerComponent as BLUIDrawerComponent,
  DrawerFooterComponent,
  DrawerHeaderComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
} from '@bldc/angular-components';

import { filter, map } from 'rxjs';

import { SHOWCASE_NAV, ShowcaseNavGroup, ShowcaseNavItem } from '../navigation';
import { StateService } from '../services/state.service';
import { ViewportService } from '../services/viewport.service';

@Component({
  selector: 'app-showcase-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatButtonModule,
    BLUIDrawerComponent,
    DrawerNavItemComponent,
    DrawerNavGroupComponent,
    DrawerFooterComponent,
    DrawerHeaderComponent,
    DrawerBodyComponent,
  ],
  styleUrl: './drawer.component.scss',
  template: `
    <blui-drawer class="showcase-demo-drawer" [open]="stateService.$drawerOpen()">
      <blui-drawer-header title="Showcase App" class="test-background-image">
        <button class="showcase-menu-button" mat-icon-button blui-icon (click)="clickMenuButton()">
          <mat-icon>menu</mat-icon>
        </button>
      </blui-drawer-header>
      <blui-drawer-body>
        <blui-drawer-nav-group>
          @for (group of navGroups; track group.title) {
            <blui-drawer-nav-item [title]="group.title" [expanded]="hasActiveItem(group)" [divider]="true">
              @for (item of group.items; track item.route) {
                <blui-drawer-nav-item
                  [class]="'nav-menu' + item.title"
                  [title]="item.title"
                  [selected]="item.route === $activeRoute()"
                  (itemSelect)="selectItem(item)"
                />
              }
              @if (group.icon === 'blui') {
                <i blui-icon class="blui-pxblue_small"></i>
              } @else {
                <mat-icon blui-icon>{{ group.icon }}</mat-icon>
              }
            </blui-drawer-nav-item>
          }
        </blui-drawer-nav-group>
      </blui-drawer-body>
      <blui-drawer-footer>
        <img src="assets/EatonLogo.svg" alt="Eaton logo" width="170" style="align-self: center; padding: 16px" />
      </blui-drawer-footer>
    </blui-drawer>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent {
  protected readonly stateService = inject(StateService);
  private readonly _viewportService = inject(ViewportService);
  private readonly _router = inject(Router);

  protected readonly navGroups = SHOWCASE_NAV;

  /** Path of the current page, e.g. `/templates/alarms`. */
  readonly $activeRoute = toSignal(
    this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/)[0])
    ),
    { initialValue: '' }
  );

  readonly $activeGroup = computed(() =>
    this.navGroups.find((group) => group.items.some((item) => item.route === this.$activeRoute()))
  );

  protected hasActiveItem(group: ShowcaseNavGroup): boolean {
    return this.$activeGroup() === group;
  }

  selectItem(item: ShowcaseNavItem): void {
    this.navigate(item.route);
    if (this._viewportService.isSmall()) {
      this.stateService.setDrawerOpen(false);
    }
  }

  navigate(url: string): void {
    void this._router.navigateByUrl(url);
  }

  clickMenuButton(): void {
    this.stateService.setDrawerOpen(!this.stateService.getDrawerOpen());
  }
}
