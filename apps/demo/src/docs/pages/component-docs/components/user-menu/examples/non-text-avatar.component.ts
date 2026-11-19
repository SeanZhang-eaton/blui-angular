import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { InfoListItemComponent, UserMenuComponent } from '@bldc/angular-components';

export const NON_TEXT_AVATAR = `<div style="display: flex; justify-content: space-between; width: 150px">
    <blui-user-menu avatarImage="assets/trex.png" [(open)]="open1">
        <mat-nav-list blui-menu-body [style.paddingTop.px]="0">
            <blui-info-list-item (click)="open1=false">
                <mat-icon blui-icon>settings</mat-icon>
                <div blui-title>Settings</div>
            </blui-info-list-item>
        </mat-nav-list>
    </blui-user-menu> 
    
    <blui-user-menu [(open)]="open2">
        <mat-icon blui-avatar>pets</mat-icon>
        <mat-nav-list blui-menu-body [style.paddingTop.px]="0">
            <blui-info-list-item (click)="open2=false">
                <mat-icon blui-icon>settings</mat-icon>
                <div blui-title>Settings</div>
            </blui-info-list-item>
        </mat-nav-list>
    </blui-user-menu> 
</div>
`;

@Component({
  selector: 'app-non-text-avatar-user-menu-demo',
  template: NON_TEXT_AVATAR,
  imports: [UserMenuComponent, MatNavList, InfoListItemComponent, MatIcon],
})
export class NonTextAvatarComponent {
  open1 = false;
  open2 = false;
}
