import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerHeaderComponent,
  DrawerLayoutComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
} from '@bldc/angular-components';

import { Subscription } from 'rxjs';

import { PlaygroundService } from '../../../../../../services/playground/playground.service';
import { Knob } from '../../../../shared/scaffold/scaffold.component';

type MultiComponentKnobs = DrawerLayoutPlaygroundProps & { condensed: Knob; disableRailTooltip: Knob };

export type DrawerLayoutPlaygroundProps = {
  width: Knob;
  variant: Knob;
};

@Component({
  selector: 'app-layout-playground',
  template: `<blui-drawer-layout
    [variant]="inputs.variant.value"
    [width]="inputs.width.value"
    (backdropClick)="toggleDrawer()"
  >
    <blui-drawer
      blui-drawer
      [open]="open"
      [condensed]="inputs.condensed.value"
      [disableRailTooltip]="inputs.disableRailTooltip.value"
    >
      @if (inputs.variant.value !== 'rail') {
        <blui-drawer-header title="Title">
          @if (inputs.variant.value !== 'permanent') {
            <button mat-icon-button blui-icon (click)="toggleDrawer()">
              <mat-icon>{{ getDrawerIcon() }}</mat-icon>
            </button>
          }
        </blui-drawer-header>
      }
      <blui-drawer-body>
        <blui-drawer-nav-group>
          <blui-drawer-nav-item title="Devices">
            <mat-icon blui-icon>devices</mat-icon>
          </blui-drawer-nav-item>
          <blui-drawer-nav-item title="Locations">
            <mat-icon blui-icon>place</mat-icon>
          </blui-drawer-nav-item>
          <blui-drawer-nav-item title="Legal">
            <mat-icon blui-icon>gavel</mat-icon>
          </blui-drawer-nav-item>
        </blui-drawer-nav-group>
      </blui-drawer-body>
    </blui-drawer>
    <div blui-content>
      @if (inputs.variant.value === 'temporary') {
        <mat-toolbar color="primary">
          <button style="margin-left: -8px" mat-icon-button (click)="toggleDrawer()">
            <mat-icon>menu</mat-icon>
          </button>
          <div style="margin-left: 24px">Toolbar</div>
        </mat-toolbar>
      }
      <div style="padding: 1rem">App Content Here.</div>
    </div>
  </blui-drawer-layout>`,
  imports: [
    DrawerLayoutComponent,
    DrawerComponent,
    DrawerHeaderComponent,
    MatIconButton,
    DrawerBodyComponent,
    DrawerNavGroupComponent,
    DrawerNavItemComponent,
    MatToolbar,
  ],
})
export class PlaygroundComponent implements AfterViewInit, OnDestroy {
  private readonly _playgroundService = inject(PlaygroundService);

  @Input() inputs: MultiComponentKnobs;
  @Output() codeChange = new EventEmitter<string>();

  open = true;
  knobListener: Subscription;

  constructor() {
    this.knobListener = this._playgroundService.knobChange.subscribe((updatedKnobs: MultiComponentKnobs) => {
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

  getDrawerIcon(): string {
    return this.inputs.variant.value === 'temporary' ? 'close' : 'menu';
  }

  toggleDrawer(): void {
    if (this.inputs.variant.value === 'permanent') {
      return;
    }
    this.open = !this.open;
    this._emitNewCodeChanges();
  }

  private _emitNewCodeChanges(): void {
    setTimeout(() => {
      this.codeChange.emit(this._createGeneratedCode());
    });
  }

  private _renderOptionalToolbar(): string {
    if (this.inputs.variant.value === 'temporary') {
      return `
        <mat-toolbar color="primary">
            <button style="margin-left: -8px" mat-icon-button (click)="open = !open">
                <mat-icon>menu</mat-icon>
            </button>
            <div style="margin-left: 24px">Toolbar</div>
        </mat-toolbar>`;
    }
    return '';
  }

  private _renderOptionalHeaderIcon(): string {
    if (this.inputs.variant.value === 'permanent') {
      return '';
    }
    return `
            <button mat-icon-button blui-icon (click)="open=!open">
                <mat-icon>${this.getDrawerIcon()}</mat-icon>
            </button>   
        `;
  }

  private _renderOptionalHeader(): string {
    if (this.inputs.variant.value !== 'rail') {
      return `
        <blui-drawer-header title="Title">
            ${this._renderOptionalHeaderIcon()}
        </blui-drawer-header>`;
    }
    return '';
  }

  private _createGeneratedCode(): string {
    const code = `
<blui-drawer-layout${this._playgroundService.addOptionalProp(
      this.inputs,
      'variant',
      true
    )}${this._playgroundService.addOptionalProp(this.inputs, 'width', true)} (backdropClick)="open=false">
    <blui-drawer blui-drawer [open]="${this.open}"${this._playgroundService.addOptionalProp(
      this.inputs,
      'condensed',
      true
    )}${this._playgroundService.addOptionalProp(this.inputs, 'disableRailTooltip', true)}>
        ${this._renderOptionalHeader()}
        <blui-drawer-body>
            <blui-drawer-nav-group>
                <blui-drawer-nav-item title="Devices">
                    <mat-icon blui-icon>devices</mat-icon>
                </blui-drawer-nav-item>
                <blui-drawer-nav-item title="Locations">
                    <mat-icon blui-icon>place</mat-icon>
                </blui-drawer-nav-item>
                <blui-drawer-nav-item title="Legal">
                    <mat-icon blui-icon>gavel</mat-icon>
                </blui-drawer-nav-item>
            </blui-drawer-nav-group>
        </blui-drawer-body>
    </blui-drawer>
    <div blui-content>
        ${this._renderOptionalToolbar()}
        <div style="padding: 1rem">App Content Here.</div>
    </div>
</blui-drawer-layout>
`;
    return this._playgroundService.removeEmptyLines(code);
  }
}
