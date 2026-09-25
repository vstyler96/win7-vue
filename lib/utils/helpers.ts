let idCounter = 0

/** Unique DOM id for label/for and aria wiring. */
export function uniqueId(prefix = 'win'): string {
  return `${prefix}-${++idCounter}`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Returns a new array with `value` added, or removed if already present. */
export function toggleIn<T>(list: readonly T[], value: T): T[] {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value]
}
