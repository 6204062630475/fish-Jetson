import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "boxicons";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          borderRadius: "20px",
          backgroundColor: "#00aa9f",
          "&:hover": {
            backgroundColor: "#00aa9f",
          },
        }}
        endIcon={<box-icon name='message-dots' color="white" ></box-icon>}
      >
        แจ้งปัญหา/ติดต่อเรา
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{"แจ้งปัญหา"}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <p>
              <h4>โทร:088-888-8888</h4>
            </p>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <p>
              <h4>อีเมล: CountFish@kmutnb.co.th</h4>
            </p>
          </DialogContentText>
          <Button onClick={handleClose} autoFocus>
            ปิด
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
