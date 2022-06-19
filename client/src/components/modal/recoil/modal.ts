import { atom } from "recoil";
import { MODAL_TYPES } from "../GlobalModal";
import { ConfirmModalProps } from "../ConfirmModal";
import { AlertModalProps } from "../AlertModal";
import { DefaultModalProps } from "../DefaultModal";

export interface ConfirmModalType {
  modalType: typeof MODAL_TYPES.ConfirmModal;
  modalProps: ConfirmModalProps;
}

export interface AlertModalType {
  modalType: typeof MODAL_TYPES.AlertModal;
  modalProps: AlertModalProps;
}
export interface DefaultModalType {
  modalType: typeof MODAL_TYPES.DefaultModal;
  modalProps: DefaultModalProps;
}

export type ModalType = ConfirmModalType | AlertModalType | DefaultModalType;

export const modalState = atom<ModalType | null>({
  key: "modalState",
  default: null
});
