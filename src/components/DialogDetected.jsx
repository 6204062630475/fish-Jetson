import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [imageList, setImageList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    axios.get("https://fish-api-0fmm.onrender.com/get-img").then((response) => {
      const base64Images = response.data;
      setImageList(base64Images);
    });
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
        endIcon={<box-icon name='image' color='white' ></box-icon>}
      >
        ภาพล่าสุด
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          {"ผลการตรวจจับ"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            {imageList.map((base64String, index) => (
              <img key={index} src={`data:image/jpeg;base64,${base64String}`} alt={`captured ${index}`} width={'100%'} style={{ display: "block", margin: "auto", marginBottom: "10px" }}/>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            ปิด
          </Button>
          <Button color="success" onClick={handleClickOpen} autoFocus>
            รีเฟรช
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
