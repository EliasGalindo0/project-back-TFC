export default class ValidateError extends Error {
  private _status: number;

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
    this.message = message;
  }

  get status() {
    return this._status;
  }
}
