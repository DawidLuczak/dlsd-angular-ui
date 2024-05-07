import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss'
})
export class ColorsComponent {
  protected readonly BASIC_COLORS = ['red', 'green', 'blue', 'yellow', "lime", "pink", "gray-blue"];
}
