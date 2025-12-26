import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'blui-user-menu-avatar',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="blui-user-menu-avatar-content">
      @if (avatarValue) {
        <div class="mat-h2 blui-user-menu-text-avatar">{{ avatarValue }}</div>
      }
      @if (avatarImage) {
        <img [src]="avatarImage" alt="User Menu Avatar" />
      }
      <ng-content></ng-content>
    </div>
    `,
    host: {
        class: 'blui-user-menu-avatar',
    },
    imports: [],
})
export class UserMenuAvatarComponent {
  @Input() avatarValue: string;
  @Input() avatarImage: string;
}
