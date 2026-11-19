import { Component } from '@angular/core';
import { InfoListItemComponent } from '@bldc/angular-components';

export const SUBTITLE = `<blui-info-list-item>
    <div blui-title>Info List Item</div>
    <div blui-subtitle>this is a subtitle within an InfoListItem</div>
</blui-info-list-item>
`;

@Component({
  selector: 'app-with-subtitle-info-list-item-demo',
  template: SUBTITLE,
  imports: [InfoListItemComponent],
})
export class WithSubtitleComponent {}
