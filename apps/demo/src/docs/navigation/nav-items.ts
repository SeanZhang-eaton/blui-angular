export type NavItem = {
  title: string;
  route: string;
  icon?: string;
  /** Image shown on the component catalog page. */
  image?: string;
  children?: NavItem[];
};

const catalog: NavItem = { title: 'All Components', route: 'components/component-catalog' };
const appBar: NavItem = { title: 'App Bar', route: 'components/app-bar', image: 'app-bar.png' };
const channelValue: NavItem = { title: 'Channel Value', route: 'components/channel-value', image: 'channel-value.png' };
const emptyState: NavItem = { title: 'Empty State', route: 'components/empty-state', image: 'empty-state.png' };
const hero: NavItem = { title: 'Hero', route: 'components/hero', image: 'hero.png' };
const infoListItem: NavItem = {
  title: 'Info List Item',
  route: 'components/info-list-item',
  image: 'info-list-item.png',
};
const listItemTag: NavItem = { title: 'List Item Tag', route: 'components/list-item-tag', image: 'list-item-tag.png' };
const mobileStepper: NavItem = { title: 'Mobile Stepper', route: 'components/mobile-stepper' };
const scoreCard: NavItem = { title: 'Score Card', route: 'components/score-card', image: 'scorecard.png' };
const spacer: NavItem = { title: 'Spacer', route: 'components/spacer' };
const threeLiner: NavItem = { title: 'Three Liner', route: 'components/three-liner', image: 'three-liner.png' };
const toolbarMenu: NavItem = { title: 'Toolbar Menu', route: 'components/toolbar-menu', image: 'toolbar-menu.png' };
const userMenu: NavItem = { title: 'User Menu', route: 'components/user-menu', image: 'user-menu.png' };

const drawerLayout: NavItem = { title: 'Drawer Layout', route: 'components/drawer-layout' };
const drawerDrawer: NavItem = { title: 'Drawer', route: 'components/drawer', image: 'drawer.png' };
const drawerHeader: NavItem = { title: 'Drawer Header', route: 'components/drawer-header' };
const drawerSubheader: NavItem = { title: 'Drawer Subheader', route: 'components/drawer-subheader' };
const drawerBody: NavItem = { title: 'Drawer Body', route: 'components/drawer-body' };
const drawerNavGroup: NavItem = { title: 'Drawer Nav Group', route: 'components/drawer-nav-group' };
const drawerNavItem: NavItem = { title: 'Drawer Nav Item', route: 'components/drawer-nav-item' };
const drawerFooter: NavItem = { title: 'Drawer Footer', route: 'components/drawer-footer' };

/** Navigation group with the drawer sub-components (not a page itself). */
const drawer: NavItem = {
  title: 'Drawer',
  route: 'components/drawer',
  children: [
    drawerLayout,
    drawerDrawer,
    drawerHeader,
    drawerSubheader,
    drawerBody,
    drawerNavGroup,
    drawerNavItem,
    drawerFooter,
  ],
};

export const COMPONENT_NAV_ITEMS = {
  appBar,
  channelValue,
  drawer,
  emptyState,
  hero,
  infoListItem,
  listItemTag,
  mobileStepper,
  scoreCard,
  spacer,
  threeLiner,
  toolbarMenu,
  userMenu,
};

export const DRAWER_NAV_ITEMS = {
  drawerLayout,
  drawerDrawer,
  drawerHeader,
  drawerSubheader,
  drawerBody,
  drawerNavGroup,
  drawerNavItem,
  drawerFooter,
};

export const APP_NAV_ITEMS = {
  catalog,
};

/** Items of the "Components" drawer group, in display order (same as the React docs). */
export const COMPONENTS_NAV_GROUP: NavItem[] = [catalog, ...Object.values(COMPONENT_NAV_ITEMS)];

/** Components shown on the catalog page (same as the React docs). */
export const CATALOG_ITEMS: NavItem[] = [
  { ...appBar, title: 'App Bar / Header' },
  channelValue,
  drawerDrawer,
  emptyState,
  hero,
  infoListItem,
  listItemTag,
  { ...scoreCard, title: 'Scorecard' },
  threeLiner,
  toolbarMenu,
  userMenu,
];

/** All pages that have documentation tabs (examples / api-docs / playground). */
export const DOC_PAGES: NavItem[] = [
  ...Object.values(COMPONENT_NAV_ITEMS).filter((item) => !item.children),
  ...Object.values(DRAWER_NAV_ITEMS),
];
