import { Dialog, makeStyles } from "@material-ui/core";
import React from "react";
import SignIn from "../comps/SignIn";

interface SignInDialogProps {
  open: boolean;
  onClose?: () => void;
}

const mcs = makeStyles((theme) => ({
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
}));
const SignInDialog: React.FC<SignInDialogProps> = ({ open, onClose }) => {
  const c = mcs();
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: c.dialogPaper }}>
      <SignIn onClose={onClose} />
    </Dialog>
  );
};

export default SignInDialog;
