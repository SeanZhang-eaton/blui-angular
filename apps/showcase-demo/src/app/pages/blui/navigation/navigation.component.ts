import { Component, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MobileStepperComponent } from '@bldc/angular-components';

@Component({
  selector: 'app-blui-navigation',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, MobileStepperComponent, MatButton],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BluiNavigationComponent {
  mobileStepperStep = 0;
}
