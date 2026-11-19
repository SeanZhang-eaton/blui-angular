import { Routes } from '@angular/router';

import { APP_NAV_ITEMS, COMPONENT_NAV_ITEMS as C, DRAWER_NAV_ITEMS as D } from './navigation/nav-items';

/** A component doc page with `examples` / `api-docs` / `playground` tabs. */
function docPage(route: string, loadComponent: Routes[number]['loadComponent']): Routes {
  return [
    { path: route, redirectTo: `${route}/examples`, pathMatch: 'full' },
    { path: `${route}/:tab`, loadComponent },
  ];
}

/** Routes used before 11.0 (`components/drawer/layout` ...), kept so existing links keep working. */
const legacyDrawerRoutes: Routes = (
  [
    ['layout', D.drawerLayout],
    ['header', D.drawerHeader],
    ['subheader', D.drawerSubheader],
    ['body', D.drawerBody],
    ['nav-group', D.drawerNavGroup],
    ['nav-item', D.drawerNavItem],
    ['footer', D.drawerFooter],
  ] as const
).flatMap(([legacy, item]) => [
  { path: `components/drawer/${legacy}`, redirectTo: `/${item.route}/examples`, pathMatch: 'full' as const },
  { path: `components/drawer/${legacy}/:tab`, redirectTo: `/${item.route}/:tab` },
]);

export const appRoutes: Routes = [
  { path: '', redirectTo: APP_NAV_ITEMS.catalog.route, pathMatch: 'full' },
  {
    path: APP_NAV_ITEMS.catalog.route,
    title: 'Components',
    loadComponent: () => import('./pages/catalog/catalog.component').then((m) => m.CatalogComponent),
  },
  ...legacyDrawerRoutes,
  ...docPage(C.appBar.route, () =>
    import('./pages/component-docs/components/app-bar/app-bar-doc.component').then((m) => m.AppBarDocComponent)
  ),
  ...docPage(C.channelValue.route, () =>
    import('./pages/component-docs/components/channel-value/channel-value-doc.component').then(
      (m) => m.ChannelValueDocComponent
    )
  ),
  ...docPage(D.drawerLayout.route, () =>
    import('./pages/component-docs/components/drawer/drawer-layout/drawer-layout-doc.component').then(
      (m) => m.DrawerLayoutDocComponent
    )
  ),
  ...docPage(D.drawerDrawer.route, () =>
    import('./pages/component-docs/components/drawer/drawer/drawer-doc.component').then((m) => m.DrawerDocComponent)
  ),
  ...docPage(D.drawerHeader.route, () =>
    import('./pages/component-docs/components/drawer/drawer-header/drawer-header-doc.component').then(
      (m) => m.DrawerHeaderDocComponent
    )
  ),
  ...docPage(D.drawerSubheader.route, () =>
    import('./pages/component-docs/components/drawer/drawer-subheader/drawer-subheader-doc.component').then(
      (m) => m.DrawerSubheaderDocComponent
    )
  ),
  ...docPage(D.drawerBody.route, () =>
    import('./pages/component-docs/components/drawer/drawer-body/drawer-body-doc.component').then(
      (m) => m.DrawerBodyDocComponent
    )
  ),
  ...docPage(D.drawerNavGroup.route, () =>
    import('./pages/component-docs/components/drawer/drawer-nav-group/drawer-nav-group-doc.component').then(
      (m) => m.DrawerNavGroupDocComponent
    )
  ),
  ...docPage(D.drawerNavItem.route, () =>
    import('./pages/component-docs/components/drawer/drawer-nav-item/drawer-nav-item-doc.component').then(
      (m) => m.DrawerNavItemDocComponent
    )
  ),
  ...docPage(D.drawerFooter.route, () =>
    import('./pages/component-docs/components/drawer/drawer-footer/drawer-footer-doc.component').then(
      (m) => m.DrawerFooterDocComponent
    )
  ),
  ...docPage(C.emptyState.route, () =>
    import('./pages/component-docs/components/empty-state/empty-state-doc.component').then(
      (m) => m.EmptyStateDocComponent
    )
  ),
  ...docPage(C.hero.route, () =>
    import('./pages/component-docs/components/hero/hero-doc.component').then((m) => m.HeroDocComponent)
  ),
  ...docPage(C.infoListItem.route, () =>
    import('./pages/component-docs/components/info-list-item/info-list-item-doc.component').then(
      (m) => m.InfoListItemDocComponent
    )
  ),
  ...docPage(C.listItemTag.route, () =>
    import('./pages/component-docs/components/list-item-tag/list-item-tag-doc.component').then(
      (m) => m.ListItemTagDocComponent
    )
  ),
  ...docPage(C.mobileStepper.route, () =>
    import('./pages/component-docs/components/mobile-stepper/mobile-stepper-doc.component').then(
      (m) => m.MobileStepperDocComponent
    )
  ),
  ...docPage(C.scoreCard.route, () =>
    import('./pages/component-docs/components/score-card/score-card-doc.component').then((m) => m.ScoreCardDocComponent)
  ),
  ...docPage(C.spacer.route, () =>
    import('./pages/component-docs/components/spacer/spacer-doc.component').then((m) => m.SpacerDocComponent)
  ),
  ...docPage(C.threeLiner.route, () =>
    import('./pages/component-docs/components/three-liner/three-liner-doc.component').then(
      (m) => m.ThreeLinerDocComponent
    )
  ),
  ...docPage(C.toolbarMenu.route, () =>
    import('./pages/component-docs/components/toolbar-menu/toolbar-menu-doc.component').then(
      (m) => m.ToolbarMenuDocComponent
    )
  ),
  ...docPage(C.userMenu.route, () =>
    import('./pages/component-docs/components/user-menu/user-menu-doc.component').then((m) => m.UserMenuDocComponent)
  ),
  { path: '**', redirectTo: APP_NAV_ITEMS.catalog.route },
];
