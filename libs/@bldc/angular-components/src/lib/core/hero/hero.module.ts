import { NgModule } from '@angular/core';

import { HeroComponent } from './hero.component';
import { HeroBannerComponent } from './hero-banner.component';

@NgModule({
  imports: [HeroComponent, HeroBannerComponent],
  exports: [HeroComponent, HeroBannerComponent],
})
export class HeroModule {}
