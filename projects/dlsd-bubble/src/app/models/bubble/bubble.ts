import { BubbleWord } from "./bubble-words";

export interface Bubble {
  id: number;
  text: BubbleWord<unknown, unknown>[];
  categories: Record<string, string>;
  parent?: Bubble | null;
  children: Bubble[];
  connections: Bubble[];
}

export interface BubbleCategory {
  name: string;
  type: string;
}
