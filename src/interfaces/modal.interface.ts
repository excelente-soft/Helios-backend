export interface IModal {
  message: string;
  type: ModalType;
}

export enum ModalType {
  Error = 'Error',
  Success = 'Success',
  Info = 'Info',
}
