import moment from 'moment'

const PREFIX = 'log-'
const min = 1

export default class Logger<T> implements Logger<T> {
  private noStorage: boolean = false
  private version: string
  private name: string
  private expireHours: number
  private history: Log[] = []
  private undoDepth = min

  constructor(version: string, name: string, expireHours: number) {
    this.version = version
    this.name = name
    this.expireHours = expireHours

    try {
      if (typeof window.sessionStorage === 'undefined') this.noStorage = true
      const x = '__storage_test__'
      localStorage.setItem(x, x)
      localStorage.removeItem(x)
      this.noStorage = false
    }
    catch (err) {
      this.noStorage = true
    }
  }

  private get depth(): number { return this.undoDepth }

  private set depth(next) {
    this.undoDepth = next > this.history.length ? this.history.length : next < min ? min : next
    this.write()
  }

  private get currentIndex(): number { return this.history.length - this.depth }

  get current(): T { return JSON.parse(this.history[this.currentIndex].data) }

  get stamp(): string { return this.history[this.currentIndex].id }

  jump(stamp: string): void {
    const index = this.history.findIndex(log => log.id === stamp)
    if (index > 0) this.depth = this.history.length - index
  }

  undo(step = min): void { this.depth += step < min ? min : step }

  redo(step = min): void { this.depth -= step < min ? min : step }

  save(data: T): void {
    const time = Date.now().toString(10)
    const json = JSON.stringify(data)
    this.history = this.history.slice(0, this.currentIndex + 1).concat({ data: json, id: json + time })
    this.depth = min
  }

  restore(): void | true {
    if (this.noStorage) return

    const json = localStorage.getItem(PREFIX + this.name)
    if (!json) return

    const restored: Restored = JSON.parse(json)

    if (restored.version !== this.version) {
      localStorage.removeItem(PREFIX + this.name)
      return
    }
    if (moment().diff(moment(restored.lastUpdated), 'hours', true) > this.expireHours) {
      localStorage.removeItem(PREFIX + this.name)
      return
    }

    this.history = this.history.concat(restored.history)
    this.depth = restored.depth

    return true
  }

  private write(): void {
    if (this.noStorage) return

    const log = {
      version: this.version,
      lastUpdated: Date.now(),
      history: this.history,
      depth: this.depth,
    }

    localStorage.setItem(PREFIX + this.name, JSON.stringify(log))
  }
}
