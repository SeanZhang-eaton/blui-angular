/** Menu items shared by the user menu examples. */
export const USER_MENU_ITEMS = [
  { title: 'Settings', icon: 'settings' },
  { title: 'Contact Us', icon: 'mail' },
  { title: 'Log Out', icon: 'logout' },
];

/**
 * Example template of a `<blui-user-menu>` listing `items`. Used both as the component template and as the code
 * snippet shown in the docs, so it is kept as a statically analyzable function returning a string.
 */
export function userMenuTemplate(userMenuAttributes: string): string {
  return `<blui-user-menu ${userMenuAttributes} [(open)]="open">
    <mat-nav-list blui-menu-body [style.paddingTop.px]="0">
        @for (item of items; track item.title) {
            <blui-info-list-item [dense]="true" (click)="open = false">
                <mat-icon blui-icon>{{ item.icon }}</mat-icon>
                <div blui-title>{{ item.title }}</div>
            </blui-info-list-item>
        }
    </mat-nav-list>
</blui-user-menu>
`;
}
