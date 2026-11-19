import { Component } from '@angular/core';
import { DrawerComponent, DrawerHeaderComponent } from '@bldc/angular-components';

export const WITH_SUBTITLE = `<blui-drawer style="width: 250px">
    <blui-drawer-header title="Title" subtitle="Subtitle"></blui-drawer-header>
</blui-drawer>
`;

@Component({
  selector: 'app-with-subtitle-drawer-header-demo',
  template: WITH_SUBTITLE,
  imports: [DrawerComponent, DrawerHeaderComponent],
})
export class WithSubtitleComponent {}
