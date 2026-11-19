import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { InfoListItemComponent, UserMenuComponent } from '@bldc/angular-components';

export const BOTTOMSHEET = `<blui-user-menu avatarValue="BS" [(open)]="open" [useBottomSheetAt]="100_000">
    <mat-nav-list blui-menu-body [style.paddingTop.px]="0">
        <blui-info-list-item *ngFor="let item of items" [dense]="true" (click)="open = false">
            <mat-icon blui-icon>{{item.icon}}</mat-icon>
            <div blui-title>{{item.title}}</div>
        </blui-info-list-item>
    </mat-nav-list>
</blui-user-menu> 
`;

@Component({
  selector: 'app-bottom-sheet-user-menu-demo',
  template: BOTTOMSHEET,
  imports: [UserMenuComponent, MatNavList, NgFor, InfoListItemComponent, MatIcon],
})
export class BottomsheetComponent {
  open = false;

  items = [
    {
      title: 'Settings',
      icon: 'settings',
    },
    {
      title: 'Contact Us',
      icon: 'mail',
    },
    {
      title: 'Log Out',
      icon: 'logout',
    },
  ];
}
