import React, {useEffect} from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import useModal from "./hooks/useModal";

export interface IncludeModalProps {
  title?: string;
  message: React.ReactNode;
  handleClose?: (...arg: any[]) => any;
}

const IncludeModal = ({
  title,
  message,
  handleClose,

}: IncludeModalProps) => {
  const { hideModal } = useModal();

  const onClose = () => {
    if (handleClose) {
      handleClose();
    }
    hideModal();
  };


  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
      sx={{ whiteSpace: "break-spaces" }}
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {message}
      </DialogContent>
    </Dialog>
  );
};

export default IncludeModal;
