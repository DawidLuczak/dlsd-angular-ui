import { Component, input } from '@angular/core';
import { Bubble } from '../../models/bubble/bubble';

@Component({
  selector: 'app-bubble-details',
  standalone: true,
  imports: [],
  templateUrl: './bubble-details.component.html',
  styleUrl: './bubble-details.component.scss'
})
export class BubbleDetailsComponent {
  bubble = input.required<Bubble>;
}
