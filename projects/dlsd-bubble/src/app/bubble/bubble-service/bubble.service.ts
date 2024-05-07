import { Injectable, signal } from "@angular/core";
import { Bubble } from "../../models/bubble/bubble";


@Injectable({
  providedIn: 'root'
})
export class BubbleService {
  readonly bubble = signal<Partial<Bubble>>({});
  readonly bubbleRegistry = signal<Bubble[]>([]);

  constructor() { }

  addBubble(): void {
    if (!this.bubble().text?.length) return;

  }

  // createBubble(text: string, parent?: Bubble, categories: Record<string,string> = {}): void {
  // }

  updateBubble(bubble: Partial<Bubble>): void {
    this.bubble.set(bubble);
  }

  private registerNode(bubble: Bubble, nodes: Bubble[]): void {
  //   const words = bubble.text.split(' ');
  //   if (words.length > 1) {
  //     words.forEach((word) => {
  //       const parent = nodes.find((node) => node.text === word);
  //       if (parent) {
  //         parent.children.push(bubble);
  //         bubble.parent = parent;
  //       } else {
  //         const node = createBubble(nodes.length, word, null, {}, [bubble]);
  //         nodes.push(node);
  //       }
  //     });
  //   }

  //   const x: WordNoun<WordPluralityType.PLURAR> = {
  //     form: {
  //       plurality: WordPluralityType.PLURAR,
  //       gender: WordPlurarGenderType.MASCULINE,
  //       person: undefined
  //     }
  //   }
  //   // const node = createBubble(nodes.length, bubble.text);
  //   nodes.push(node);
  //   console.log(nodes);
  // }
  }
}
