import { Component } from '@angular/core';
import { BubbleCreateComponent } from './bubble-create/bubble-create.component';
import { BubbleStreamComponent } from './bubble-stream/bubble-stream.component';
import { BubbleService } from './bubble-service/bubble.service';

@Component({
  selector: 'app-bubble',
  standalone: true,
  imports: [BubbleCreateComponent, BubbleStreamComponent],
  templateUrl: './bubble.component.html',
  styleUrl: './bubble.component.scss'
})
export class BubbleComponent {

  constructor(protected readonly bubbleService: BubbleService){}

}
