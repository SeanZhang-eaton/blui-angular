import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'blui-user-menu-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-menu-avatar.component.html',
  host: {
    class: 'blui-user-menu-avatar',
  },
})
export class UserMenuAvatarComponent {
  readonly $avatarValue = input<string>(undefined, { alias: 'avatarValue' });
  readonly $avatarImage = input<string>(undefined, { alias: 'avatarImage' });
}
