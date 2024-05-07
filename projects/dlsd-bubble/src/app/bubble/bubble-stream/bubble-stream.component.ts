import { Component, input } from '@angular/core';
import { Bubble } from '../../models/bubble/bubble';

@Component({
  selector: 'app-bubble-stream',
  standalone: true,
  imports: [],
  templateUrl: './bubble-stream.component.html',
  styleUrl: './bubble-stream.component.scss'
})
export class BubbleStreamComponent {
  bubbles = input<Bubble[]>();
}
