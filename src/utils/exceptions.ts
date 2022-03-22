import { StatusCode } from '@interfaces/status.interface';

export class ControlledException {
  message: string;
  code: StatusCode;

  constructor(message: string, code: StatusCode = StatusCode.BAD_REQUEST) {
    this.message = message;
    this.code = code;
  }
}
