import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerHeaderComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
  DrawerSubheaderComponent,
} from '@bldc/angular-components';

import { Subscription } from 'rxjs';

import { PlaygroundService } from '../../../../../../services/playground/playground.service';
import { Knob } from '../../../../shared/scaffold/scaffold.component';

export type SubheaderPlaygroundKnobs = {
  divider: Knob;
  hideContentOnCollapse: Knob;
};

@Component({
  selector: 'app-subheader-playground',
  template: `@if (inputs) {
    <blui-drawer [open]="open">
      <blui-drawer-header title="Header Title">
        <button blui-icon mat-icon-button (click)="toggleDrawer()">
          <mat-icon>menu</mat-icon>
        </button>
      </blui-drawer-header>
      <blui-drawer-subheader
        [divider]="inputs.divider.value"
        [hideContentOnCollapse]="inputs.hideContentOnCollapse.value"
      >
        <div style="padding: 16px; min-width: 250px">Subheader Content Here</div>
      </blui-drawer-subheader>
      <blui-drawer-body>
        <blui-drawer-nav-group>
          <blui-drawer-nav-item title="Dashboard">
            <mat-icon blui-icon>dashboard</mat-icon>
          </blui-drawer-nav-item>
        </blui-drawer-nav-group>
      </blui-drawer-body>
    </blui-drawer>
  }`,
  imports: [
    MatIcon,
    DrawerComponent,
    DrawerHeaderComponent,
    MatIconButton,
    DrawerSubheaderComponent,
    DrawerBodyComponent,
    DrawerNavGroupComponent,
    DrawerNavItemComponent,
  ],
})
export class PlaygroundComponent implements AfterViewInit, OnDestroy {
  private readonly _playgroundService = inject(PlaygroundService);

  @Input() inputs: SubheaderPlaygroundKnobs;
  @Output() codeChange = new EventEmitter<string>();

  open = true;
  knobListener: Subscription;

  constructor() {
    this.knobListener = this._playgroundService.knobChange.subscribe((updatedKnobs: SubheaderPlaygroundKnobs) => {
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
    <blui-drawer-subheader${this._playgroundService.addOptionalProp(
      this.inputs,
      'divider',
      true
    )}${this._playgroundService.addOptionalProp(this.inputs, 'hideContentOnCollapse', true)}>
        <div style="padding: 16px; min-width: 250px">
            Subheader Content Here
        </div>
    </blui-drawer-subheader>
    <blui-drawer-body>
        <blui-drawer-nav-group>
            <blui-drawer-nav-item title="Dashboard">
                <mat-icon blui-icon>dashboard</mat-icon>
            </blui-drawer-nav-item>
        </blui-drawer-nav-group>
    </blui-drawer-body>
</blui-drawer>`;

    return this._playgroundService.removeEmptyLines(code);
  }
}
