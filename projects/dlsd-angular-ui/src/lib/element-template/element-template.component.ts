import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  ViewContainerRef,
} from '@angular/core';

export const ELEMENT_TEMPLATE_CONFIG = new InjectionToken<{
  viewContainerRef: ViewContainerRef;
}>('Element template config token');

@Component({
  selector: 'lib-element-template',
  standalone: true,
  imports: [],
  templateUrl: './element-template.component.html',
  styleUrl: './element-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementTemplateComponent {
  constructor(
    @Inject(ELEMENT_TEMPLATE_CONFIG)
    protected config: { viewContainerRef: ViewContainerRef }
  ) {}
}
