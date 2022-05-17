export interface IModal {
  message: string;
  type: ModalType;
}

export enum ModalType {
  ERROR = 'Error',
  SUCCESS = 'Success',
  INFO = 'Info',
}
