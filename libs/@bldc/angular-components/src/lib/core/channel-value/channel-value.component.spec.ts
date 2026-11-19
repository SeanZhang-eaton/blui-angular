import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { count } from '../../utils/test-utils';

import { ChannelValueComponent } from './channel-value.component';
import { ChannelValueModule } from './channel-value.module';

@Component({
  imports: [ChannelValueModule],
  template: `
    <blui-channel-value value="Icon Test">
      <div id="channel-value-test-icon"></div>
    </blui-channel-value>
  `,
})
class TestIconComponent {}

describe('ChannelValueComponent', () => {
  let component: ChannelValueComponent;
  let fixture: ComponentFixture<ChannelValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelValueModule, TestIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelValueComponent);
    fixture.componentRef.setInput('value', '');
    component = fixture.componentInstance;
  });

  it('should initialize', () => {
    fixture.componentRef.setInput('value', 'test');
    fixture.detectChanges();
    void expect(component).toBeTruthy();
  });

  it('should render a value', () => {
    fixture.componentRef.setInput('value', 'Test Value');
    fixture.detectChanges();
    const value = fixture.nativeElement.querySelector('.blui-channel-value-value');
    void expect(value.textContent.trim()).toBe('Test Value');
  });

  it('should render 0 integer value', () => {
    fixture.componentRef.setInput('value', 0);
    fixture.detectChanges();
    const value = fixture.nativeElement.querySelector('.blui-channel-value-value');
    void expect(value.textContent.trim()).toBe('0');
  });

  it('should render units to the left', () => {
    fixture.componentRef.setInput('value', 'Test Value');
    fixture.componentRef.setInput('units', 'hz');
    fixture.componentRef.setInput('prefix', false);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.blui-channel-value-content');
    const units = fixture.nativeElement.querySelector('.blui-channel-value-units');
    void expect(units.textContent.trim()).toBe('hz');
    void expect(container.children[2]).toBe(units);
  });

  it('should render units to the right', () => {
    fixture.componentRef.setInput('value', '74');
    fixture.componentRef.setInput('units', 'C');
    fixture.componentRef.setInput('prefix', true);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.blui-channel-value-content');
    const units = fixture.nativeElement.querySelector('.blui-channel-value-units');
    void expect(units.textContent.trim()).toBe('C');
    void expect(container.children[1]).toBe(units);
  });

  it('should render an icon', () => {
    const iconFixture = TestBed.createComponent(TestIconComponent);
    iconFixture.detectChanges();
    const icon = iconFixture.nativeElement.querySelector('#channel-value-test-icon');
    void expect(icon).toBeTruthy();
  });

  it('should enforce class naming conventions', () => {
    fixture.componentRef.setInput('value', '123');
    fixture.componentRef.setInput('units', 'hz');
    fixture.detectChanges();
    const classList = [
      '.blui-channel-value-content',
      '.blui-channel-value-units',
      '.blui-channel-value-icon-wrapper',
      '.blui-channel-value-value',
    ];
    for (const className of classList) {
      count(fixture, className);
    }
  });

  it('should add space between value and unit since default is auto', () => {
    fixture.componentRef.setInput('value', '123');
    fixture.componentRef.setInput('units', 'hz');
    fixture.componentRef.setInput('prefix', true);
    fixture.detectChanges();
    const classList = [
      '.blui-channel-value-content',
      '.blui-channel-value-units',
      '.blui-channel-value-icon-wrapper',
      '.blui-channel-value-value',
      '.blui-channel-value-units-prefix',
    ];
    for (const className of classList) {
      count(fixture, className);
    }
  });

  it('should not add space between value and unit', () => {
    fixture.componentRef.setInput('value', '123');
    fixture.componentRef.setInput('units', 'hz');
    fixture.componentRef.setInput('unitSpace', 'hide');
    fixture.detectChanges();
    const classList = [
      '.blui-channel-value-content',
      '.blui-channel-value-units',
      '.blui-channel-value-icon-wrapper',
      '.blui-channel-value-value',
      '.blui-channel-value-remove-space',
    ];
    for (const className of classList) {
      count(fixture, className);
    }
  });

  it('should not add space between value and unit if whitelist prefix added', () => {
    fixture.componentRef.setInput('value', '74');
    fixture.componentRef.setInput('units', '$');
    fixture.componentRef.setInput('prefix', true);
    fixture.detectChanges();
    const units = fixture.nativeElement.querySelector('.blui-channel-value-units-prefix');
    void expect(units).toBeNull();
  });

  it('should not add space between value and unit if whitelist prefix added', () => {
    fixture.componentRef.setInput('value', '74');
    fixture.componentRef.setInput('units', '%');
    fixture.detectChanges();
    const units = fixture.nativeElement.querySelector('.blui-channel-value-units-suffix');
    void expect(units).toBeNull();
  });
});
