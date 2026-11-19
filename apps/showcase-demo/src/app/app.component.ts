import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDivider } from '@angular/material/divider';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  DrawerLayoutComponent,
  DrawerLayoutVariantType,
  InfoListItemComponent,
  SpacerComponent,
  UserMenuComponent,
} from '@bldc/angular-components';

import { filter, map } from 'rxjs';

import { DrawerComponent } from './drawer/drawer.component';
import { RtlService } from './services/rtl.service';
import { StateService } from './services/state.service';
import { ThemeDesign, ThemeService } from './services/theme.service';
import { ViewportService } from './services/viewport.service';
import { findNavItem } from './navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    MatIcon,
    MatNavList,
    MatDivider,
    MatTooltip,
    MatButtonToggleGroup,
    MatButtonToggle,
    DrawerComponent,
    MatToolbarModule,
    MatButtonModule,
    DrawerLayoutComponent,
    SpacerComponent,
    UserMenuComponent,
    InfoListItemComponent,
  ],
})
export class AppComponent {
  private readonly _stateService = inject(StateService);
  private readonly _viewportService = inject(ViewportService);
  private readonly _rtlService = inject(RtlService);
  private readonly _router = inject(Router);
  protected readonly theme = inject(ThemeService);

  readonly $isRtl = signal(false);
  readonly $userMenuOpen = signal(false);

  /** Title of the current page, shown in the toolbar. */
  readonly $title = toSignal(
    this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => findNavItem(event.urlAfterRedirects)?.pageTitle ?? '')
    ),
    { initialValue: '' }
  );

  readonly $isMobile = this._viewportService.$isSmall;
  readonly $variant = computed<DrawerLayoutVariantType>(() => (this.$isMobile() ? 'temporary' : 'persistent'));

  menuGroups = [
    {
      items: [
        {
          title: 'Account Settings',
          icon: 'settings',
        },
        {
          title: 'Log Out',
          icon: 'logout',
        },
      ],
    },
    {
      title: 'Contact Us',
      items: [
        {
          title: 'eatonhelp@eaton.com',
          icon: 'send',
        },
        {
          title: '1-866-905-9988',
          icon: 'mail',
        },
      ],
    },
  ];

  constructor() {
    // Brightlayer UI icons are copied from `@brightlayer-ui/icons-svg` to `assets/blui-icons` (see vite.app.config.mts).
    const sanitizer = inject(DomSanitizer);
    inject(MatIconRegistry).addSvgIconResolver((name, namespace) =>
      namespace === 'blui-icons' ? sanitizer.bypassSecurityTrustResourceUrl(`assets/blui-icons/${name}.svg`) : null
    );
  }

  closeDrawer(): void {
    this._stateService.setDrawerOpen(false);
  }

  openDrawer(): void {
    this._stateService.setDrawerOpen(true);
  }

  toggleTheme(): void {
    this.theme.toggleMode();
  }

  setDesign(design: ThemeDesign): void {
    this.theme.setDesign(design);
  }

  toggleDirectionality(): void {
    this.$isRtl.update((isRtl) => !isRtl);
    this._rtlService.setRTL(this.$isRtl());
  }
}
