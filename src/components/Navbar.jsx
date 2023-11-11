import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import guppyImage from "../assets/logofish.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import "boxicons";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeActive = location.pathname === "/";
  const isHistoryActive = location.pathname === "/history";
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "white" }}>
        <Toolbar style={{ display: "flex", alignItems: "center" }}>
          <img
            src={guppyImage}
            alt="Counting Guppy"
            style={{
              verticalAlign: "middle",
              width: "auto",
              height: "64px",
              marginRight: "10px",
              position: "absolute"
            }}
          />
          <div className="CenterAppbar">
            <div className="CenterNav-Container">
              <Button
                variant="h6"
                style={{ color: isHomeActive ? "#00aa9f":"black",backgroundColor: isHomeActive ? "#CCEEEB" : "", fontSize: "1.1em",borderRadius: "10px"}}
                onClick={() => handleNavigate("/")}
                startIcon={<box-icon type='solid' name='camera'></box-icon>}
              >
                หน้านับจำนวน
              </Button>
              {/* <Button
                variant="h6"
                style={{ color: isHistoryActive ? "#00aa9f":"black",backgroundColor: isHistoryActive ? "#CCEEEB" : "", fontSize: "1.1em" ,borderRadius: "10px",}}
                onClick={() => handleNavigate("/history")}
                startIcon={<box-icon name='history' color={isHistoryActive ? '#00aa9f' : 'gray'}></box-icon>}
              >
                ประวัติการนับ
              </Button> */}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
