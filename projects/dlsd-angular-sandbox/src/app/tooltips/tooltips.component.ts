import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TooltipDirective } from 'dlsd-angular-ui';

@Component({
  selector: 'app-tooltips',
  standalone: true,
  imports: [TooltipDirective],
  templateUrl: './tooltips.component.html',
  styleUrl: './tooltips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipsComponent {}
