import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { InfoListItemComponent, UserMenuComponent } from '@bldc/angular-components';

export const PLACEMENT = `<blui-user-menu avatarValue="PO" [(open)]="open" [positions]="positions">
    <mat-nav-list blui-menu-body [style.paddingTop.px]="0">
        <blui-info-list-item (click)="open=false">
            <mat-icon blui-icon>settings</mat-icon>
            <div blui-title>Settings</div>
        </blui-info-list-item>
    </mat-nav-list>
</blui-user-menu> 
`;

@Component({
  selector: 'app-placement-user-menu-demo',
  template: PLACEMENT,
  imports: [UserMenuComponent, MatNavList, InfoListItemComponent, MatIcon],
})
export class PlacementOptionsComponent {
  open = false;

  positions = new ConnectionPositionPair(
    { originX: 'start', originY: 'bottom' },
    { overlayX: 'end', overlayY: 'bottom' }
  );
}
