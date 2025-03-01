import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type CustomDialogPros = {
  children: React.ReactElement;
  handleClose: () => void;
  isDialogOpen: boolean;
  title: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  shouldDisablePrimaryButton?: boolean;
  primaryButtonHandler: () => void;
  secondaryButtonHandler: () => void;
};

const CustomDialog: React.FC<CustomDialogPros> = ({
  isDialogOpen,
  shouldDisablePrimaryButton,
  children,
  handleClose,
  primaryButtonHandler,
  primaryButtonText,
  secondaryButtonHandler,
  secondaryButtonText = "Cancel",
  title,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isDialogOpen}
      slots={{ transition: Transition }}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={primaryButtonHandler}
          variant="contained"
          disabled={shouldDisablePrimaryButton}
        >
          {primaryButtonText}
        </Button>
        <Button
          onClick={secondaryButtonHandler}
          variant="contained"
          color="error"
        >
          {secondaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
