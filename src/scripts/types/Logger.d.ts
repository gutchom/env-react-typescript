interface Log {
  data: string
  id: string
}

interface Restored {
  version: string
  lastUpdated: number
  history: Log[]
  depth: number
}

interface Logger<T> {
  readonly current: T
  readonly stamp: number
  jump(stamp: number): void
  undo(step: number): void
  redo(step: number): void
  save(data: T): void
  restore(): void
}
