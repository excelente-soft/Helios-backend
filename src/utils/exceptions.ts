import { StatusCode } from '@interfaces/status.interface';

class ControlledException {
  message: string;
  code: StatusCode;

  constructor(message: string, code: StatusCode = StatusCode.BAD_REQUEST) {
    this.message = message;
    this.code = code;
  }
}

export default {
  ControlledException,
};
