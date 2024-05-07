import { FormsModule } from '@angular/forms';
import { BubbleService } from './../bubble-service/bubble.service';
import { Component } from '@angular/core';
import { BubbleWordService } from '../../core/service/bubble-word.service';


@Component({
  selector: 'app-bubble-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bubble-create.component.html',
  styleUrl: './bubble-create.component.scss'
})
export class BubbleCreateComponent {
  constructor(protected readonly bubbleService: BubbleWordService){}

  addBubble(): void {
    this.bubbleService.findItemInArray(125266);
    this.bubbleService.findItemInMap(216566);
    this.bubbleService.getItemFromMap('125466');

  }

}
