import { Component, input, signal } from '@angular/core';
import { Bubble } from '../../../models/bubble/bubble';
import { BubbleService } from '../../bubble-service/bubble.service';

@Component({
  selector: 'app-bubble-target-list',
  standalone: true,
  imports: [],
  templateUrl: './bubble-target-list.component.html',
  styleUrl: './bubble-target-list.component.scss'
})
export class BubbleTargetListComponent {
  bubble = input<Bubble>();
  
  protected root = signal<Bubble[]>([]);

  constructor(private bubbleService: BubbleService){
    this.initBubbleRoot();
  }

  private initBubbleRoot(): void {
    const parent = this.bubble()?.parent;
    if (!parent) {
      this.root.set(this.bubbleService.bubbleRegistry());
    } else {
      this.root.set(parent.children);
    }
  }
}
