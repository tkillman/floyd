export type PriorityValue<T> = { value: T; priority: number };

export class PriorityQueue<T> {
  private values: PriorityValue<T>[] = [];

  enqueue(value: T, priority: number) {
    this.values.push({ value, priority });
    this.sort();
  }

  dequeue(): T | undefined {
    return this.values.shift()?.value;
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  isEmpty(): boolean {
    return this.values.length === 0;
  }
}
