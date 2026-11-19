import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerFooterComponent,
  DrawerHeaderComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
} from '@bldc/angular-components';

import { Subscription } from 'rxjs';

import { PlaygroundService } from '../../../../../../services/playground/playground.service';
import { Knob } from '../../../../shared/scaffold/scaffold.component';

export type DrawerFooterPlaygroundKnobs = {
  divider: Knob;
  hideContentOnCollapse: Knob;
};

@Component({
  selector: 'app-footer-playground',
  template: `@if (inputs) {
    <blui-drawer [open]="open">
      <blui-drawer-header title="Header Title">
        <button blui-icon mat-icon-button (click)="toggleDrawer()">
          <mat-icon>menu</mat-icon>
        </button>
      </blui-drawer-header>
      <blui-drawer-body>
        <blui-drawer-nav-group>
          <blui-drawer-nav-item title="Nav Item 1">
            <mat-icon blui-icon>looks_one</mat-icon>
          </blui-drawer-nav-item>
        </blui-drawer-nav-group>
      </blui-drawer-body>
      <blui-drawer-footer [hideContentOnCollapse]="inputs.hideContentOnCollapse.value" [divider]="inputs.divider.value">
        <div style="padding: 16px; min-width: 250px">Footer Content Here</div>
      </blui-drawer-footer>
    </blui-drawer>
  }`,
  imports: [
    DrawerComponent,
    DrawerHeaderComponent,
    MatIconButton,
    DrawerBodyComponent,
    DrawerNavGroupComponent,
    DrawerNavItemComponent,
    DrawerFooterComponent,
  ],
})
export class PlaygroundComponent implements AfterViewInit, OnDestroy {
  private readonly _playgroundService = inject(PlaygroundService);

  @Input() inputs: DrawerFooterPlaygroundKnobs;
  @Output() codeChange = new EventEmitter<string>();

  open = true;
  knobListener: Subscription;

  constructor() {
    this.knobListener = this._playgroundService.knobChange.subscribe((updatedKnobs: DrawerFooterPlaygroundKnobs) => {
      this.inputs = updatedKnobs;
      this._emitNewCodeChanges();
    });
  }

  ngAfterViewInit(): void {
    this._emitNewCodeChanges();
  }

  ngOnDestroy(): void {
    if (this.knobListener) {
      this.knobListener.unsubscribe();
    }
  }

  toggleDrawer(): void {
    this.open = !this.open;
    this.codeChange.emit(this._createGeneratedCode());
  }

  private _emitNewCodeChanges(): void {
    setTimeout(() => {
      this.codeChange.emit(this._createGeneratedCode());
    });
  }

  private _createGeneratedCode(): string {
    const code = `
<blui-drawer [open]="${this.open}">
    <blui-drawer-header title="Header Title">
        <button blui-icon mat-icon-button>
            <mat-icon>menu</mat-icon>
        </button>
    </blui-drawer-header>
    <blui-drawer-body>
        <blui-drawer-nav-group>
            <blui-drawer-nav-item title="Nav Item 1">
                <mat-icon blui-icon>looks_one</mat-icon>
            </blui-drawer-nav-item>
        </blui-drawer-nav-group>
    </blui-drawer-body>
    <blui-footer${this._playgroundService.addOptionalProp(
      this.inputs,
      'divider',
      true
    )}${this._playgroundService.addOptionalProp(this.inputs, 'hideContentOnCollapse', true)}>
        <div style="padding: 16px; min-width: 250px">
            Footer Content Here
        </div>    
    </blui-footer>
</blui-drawer>`;

    return this._playgroundService.removeEmptyLines(code);
  }
}
