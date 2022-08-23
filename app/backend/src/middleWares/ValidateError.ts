export default class ValidateError extends Error {
  public _status: number;
  public _message: string;

  constructor(status: number, message: string) {
    super();
    this._status = status;
    this._message = message;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }
}
