import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BubbleWordService {
  array = signal<number[]>([]);
  map = signal<Map<string, number>>(new Map());

  constructor() {
    const array = [];
    const map = new Map<string, number>();
    for (let i = 0; i < 1000000; i++) {
      array.push(i);
      map.set(`${i}`, i);
    }
    this.array.set(array);
    this.map.set(map);
  }

  getItemFromMap(key: string): void {
    const start = new Date();
    console.log(start);
    this.map().get(key);
    const end = new Date();
    console.log(end);
  }

  findItemInMap(v: number): void {
    const start = new Date();
    console.log(start);
    Object.entries(this.map()).find((key, value) => value === v);
    const end = new Date();
    console.log(end);
  }

  findItemInArray(v: number): void {
    const start = new Date();
    console.log(start);
    this.array().find((key, value) => value === v);
    const end = new Date();
    console.log(end);
  }
}
