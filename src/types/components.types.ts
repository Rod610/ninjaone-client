import { ReactNode } from "react";

export interface IModalBase extends IComponentsBase {
  show: boolean;
  setShow: (show: boolean) => void;
}

export interface IModalsProps extends IModalBase {
  title: string;
}

interface IComponentsBase {
  children?: ReactNode;
}
