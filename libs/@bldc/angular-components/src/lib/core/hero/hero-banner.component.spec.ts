import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../utils/test-utils';

import { HeroComponent } from './hero.component';
import { HeroBannerComponent } from './hero-banner.component';

@Component({
  standalone: true,
  imports: [HeroBannerComponent, HeroComponent],
  template: `
    <blui-hero-banner>
      <blui-hero label="Hero 1" value="96" units="/100" />
      <blui-hero label="Hero 2" value="96" units="/100" />
    </blui-hero-banner>
  `,
})
class TestRenderHeroesComponent {}

describe('HeroBannerComponent', () => {
  let fixture: ComponentFixture<HeroBannerComponent>;
  let component: HeroBannerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBannerComponent, TestRenderHeroesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBannerComponent);
    component = fixture.componentInstance;
  });

  it('should initialize', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should render a divider', () => {
    fixture.componentRef.setInput('divider', true);
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('.blui-hero-banner-divider');
    void expect(divider).toBeTruthy();
  });

  it('should not render a divider', () => {
    fixture.componentRef.setInput('divider', false);
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('.blui-hero-banner-divider');
    void expect(divider).toBeFalsy();
  });

  it('should render two heroes', () => {
    const heroFixture = TestBed.createComponent(TestRenderHeroesComponent);
    heroFixture.detectChanges();
    const heroes = heroFixture.nativeElement.querySelectorAll('.blui-hero');
    void expect(heroes.length).toBe(2);
  });

  it('should enforce class naming conventions', () => {
    fixture.componentRef.setInput('divider', true);
    fixture.detectChanges();
    const classList = ['.blui-hero-banner-content', '.blui-hero-banner-divider'];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});
