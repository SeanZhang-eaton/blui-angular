import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardImage } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { CATALOG_ITEMS } from '../../navigation/nav-items';

/** Overview of all components, similar to the React docs component catalog. */
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardImage, MatCardContent, RouterLink],
})
export class CatalogComponent {
  protected readonly items = CATALOG_ITEMS;
}
