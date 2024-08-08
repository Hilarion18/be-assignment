export class ErrorForBreakingPromise extends Error {
  constructor(msg, resFn, flag) {
    super(msg)
    this.name = 'ErrorForBreakingPromise'
    this.resFn = resFn
    this.flag = flag
  }
}
