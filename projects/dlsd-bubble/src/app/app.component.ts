import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BubbleComponent } from './bubble/bubble.component';
import { MainBarComponent } from './layout/main-bar/main-bar.component';
import { BubbleTargetComponent } from './bubble/bubble-target/bubble-target.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BubbleComponent, MainBarComponent, BubbleTargetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
