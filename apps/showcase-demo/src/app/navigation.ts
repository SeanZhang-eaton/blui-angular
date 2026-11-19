export type ShowcaseNavItem = {
  /** Text in the drawer. */
  title: string;
  /** Text in the toolbar. */
  pageTitle: string;
  route: string;
};

export type ShowcaseNavGroup = {
  title: string;
  /** Material icon name, or `blui` for the Brightlayer UI logo. */
  icon: string;
  items: ShowcaseNavItem[];
};

export const SHOWCASE_NAV: ShowcaseNavGroup[] = [
  {
    title: 'Brightlayer UI Components',
    icon: 'blui',
    items: [
      {
        title: 'Data Display',
        pageTitle: 'Brightlayer UI Data Display',
        route: '/blui-components/data-display-components',
      },
      { title: 'Navigation', pageTitle: 'Brightlayer UI Navigation', route: '/blui-components/navigation-components' },
      { title: 'Surfaces', pageTitle: 'Brightlayer UI Surfaces', route: '/blui-components/surface-components' },
      { title: 'Typography', pageTitle: 'Typography', route: '/blui-components/typography' },
    ],
  },
  {
    title: 'Material Components',
    icon: 'category',
    items: [
      {
        title: 'Data Display',
        pageTitle: 'Material Data Display',
        route: '/material-components/data-display-components',
      },
      { title: 'Feedback', pageTitle: 'Material Feedback', route: '/material-components/feedback-components' },
      { title: 'Inputs', pageTitle: 'Material Inputs', route: '/material-components/input-components' },
      { title: 'Navigation', pageTitle: 'Material Navigation', route: '/material-components/navigation-components' },
      { title: 'Surfaces', pageTitle: 'Material Surfaces', route: '/material-components/surface-components' },
    ],
  },
  {
    title: 'Page Templates',
    icon: 'layers',
    items: [
      { title: 'Alarms', pageTitle: 'Alarms', route: '/templates/alarms' },
      { title: 'Dashboard', pageTitle: 'Dashboard', route: '/templates/dashboard' },
      { title: 'Settings', pageTitle: 'Settings', route: '/templates/settings' },
    ],
  },
];

/** Returns the nav item for a URL (query and fragment are ignored). */
export function findNavItem(url: string): ShowcaseNavItem | undefined {
  const path = url.split(/[?#]/)[0];
  return SHOWCASE_NAV.flatMap((group) => group.items).find((item) => item.route === path);
}
