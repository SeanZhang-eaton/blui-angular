import { Component } from '@angular/core';

export const BASIC = `<blui-toolbar-menu label="label">
    <ng-container blui-toolbar-menu-items>
        <button mat-menu-item>Menu Item 1</button>
        <button mat-menu-item>Menu Item 2</button>
        <button mat-menu-item>Menu Item 3</button>
    </ng-container>
</blui-toolbar-menu> 
`;

@Component({
  standalone: false,
  selector: 'app-basic-toolbar-menu-demo',
  template: BASIC,
})
export class BasicComponent {}
