import { Component, input, signal } from '@angular/core';
import { Bubble } from '../../models/bubble/bubble';
import { BubbleTargetListComponent } from './bubble-target-list/bubble-target-list.component';
import { BubbleService } from '../bubble-service/bubble.service';

@Component({
  selector: 'app-bubble-target',
  standalone: true,
  imports: [BubbleTargetListComponent],
  templateUrl: './bubble-target.component.html',
  styleUrl: './bubble-target.component.scss'
})
export class BubbleTargetComponent {
  target = input<Bubble>();

  protected expanded = signal<boolean>(false);

  constructor(protected readonly bubbleService: BubbleService){}

  protected toggleList(): void {
    this.expanded.set(!this.expanded())
  }
}
