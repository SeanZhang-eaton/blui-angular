import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../utils/test-utils';
import { ChannelValueComponent } from '../channel-value/channel-value.component';

import { HeroComponent } from './hero.component';

@Component({
  standalone: true,
  imports: [HeroComponent, ChannelValueComponent],
  template: `
    <blui-hero label="Duration">
      <blui-channel-value value="60" units="hours" />
    </blui-hero>
  `,
})
class TestChannelValueComponent {}

@Component({
  standalone: true,
  imports: [HeroComponent],
  template: `
    <blui-hero label="Duration">
      <div blui-primary id="test-primary-icon">Icon</div>
    </blui-hero>
  `,
})
class TestPrimaryIconComponent {}

@Component({
  standalone: true,
  imports: [HeroComponent],
  template: `
    <blui-hero label="Duration" value="60" units="hours">
      <div blui-secondary id="test-secondary-icon">Icon</div>
    </blui-hero>
  `,
})
class TestSecondaryIconComponent {}

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, TestChannelValueComponent, TestPrimaryIconComponent, TestSecondaryIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it('should initialize', () => {
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should render a label', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.blui-hero-label');
    void expect(label.innerHTML).toBe('Test Label');
  });

  it('should create and render a blui-channel-value', () => {
    fixture.componentRef.setInput('label', 'Temp');
    fixture.componentRef.setInput('value', '80');
    fixture.componentRef.setInput('units', 'C');
    fixture.detectChanges();
    const value = fixture.nativeElement.querySelector('.blui-channel-value-value');
    const units = fixture.nativeElement.querySelector('.blui-channel-value-units');
    void expect(value.textContent.trim()).toBe('80');
    void expect(units.textContent.trim()).toBe('C');
  });

  it('should accept and project a blui-channel-value', () => {
    const channelValueFixture = TestBed.createComponent(TestChannelValueComponent);
    channelValueFixture.detectChanges();
    const value = channelValueFixture.nativeElement.querySelector('.blui-channel-value-value');
    const units = channelValueFixture.nativeElement.querySelector('.blui-channel-value-units');
    void expect(value.textContent.trim()).toBe('60');
    void expect(units.textContent.trim()).toBe('hours');
  });

  it('should render an icon', () => {
    const iconFixture = TestBed.createComponent(TestPrimaryIconComponent);
    iconFixture.detectChanges();
    const icon = iconFixture.nativeElement.querySelector('#test-primary-icon');
    void expect(icon).toBeTruthy();
  });

  it('should render a secondary icon', () => {
    const iconFixture = TestBed.createComponent(TestSecondaryIconComponent);
    iconFixture.detectChanges();
    const icon = iconFixture.nativeElement.querySelector('#test-secondary-icon');
    void expect(icon).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    const classList = [
      '.blui-hero-content',
      '.blui-hero-primary-wrapper',
      '.blui-hero-channel-value-wrapper',
      '.blui-hero-label',
    ];
    for (const className of classList) {
      count(fixture, className);
    }
  });
});
