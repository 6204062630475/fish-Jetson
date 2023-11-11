import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {
  IconButton,
  Button,
  Input,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HistoryChart from "./HistoryChart";
import "./History.css";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "boxicons";
import Dialog from "./DialogGuide";
import DialogHelp from "./DialogContact";
dayjs.extend(isBetween);
function History() {
  //table Data
  const [csvData, setCsvData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //Chart Data
  const [chartData, setchartData] = useState([]);
  const [backupChart, setBackupChart] = useState([]); //for reset button
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sameday, setsameday] = useState(false);
  const [mode, setMode] = useState("chart");

  const handleStartDateChange = (event) => {
    console.log("setStartDate: ", event.target.value);
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    console.log("setEndDate: ", event.target.value);
    setEndDate(event.target.value);
  };

  const handleFilter = () => {
    const startDateObj = dayjs(startDate);
    const endDateObj = dayjs(endDate);
    console.log(startDate, endDate);
    const filteredChartData = csvData.filter((row) => {
      const rowDate = dayjs(row.DATETIME, "D/M/YYYY");
      return dayjs(rowDate).isBetween(startDateObj, endDateObj, "day", "[]");
    });
    console.log(filteredChartData);
    setchartData(filteredChartData.reverse());
    setsameday(startDate == endDate); //เช็คว่าเป็นวันเดียวกัน
    console.log(sameday);
  };

  const resetFilter = () => {
    setchartData(backupChart);
    setsameday(false);
    setStartDate("");
    setEndDate("");
  };
  useEffect(() => {
    console.log("OpenHistory");
    // เรียกใช้ API เพื่อดึงข้อมูล CSV
    axios.get("http://localhost:3001/get-data").then((response) => {
      // ตัวอย่างข้อมูล CSV
      const Data = response.data;
      // แปลง CSV เป็นอาร์เรย์
      const lines = Data.trim().split("\n");
      const headers = lines[0].split(",").map((header) => header.trim()); // แก้ไขนี้
      const csvArray = lines.slice(1).map((line) => {
        const values = line.split(",").map((value) => value.trim()); // แก้ไขนี้
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        return row;
      });
      const clonedCsvArray = [...csvArray].reverse(); // Clone csvArray ก่อนที่จะ reverse เพราะหาก reverse แล้วข้างบนจะโดนผลกระทบไปด้วย
      setCsvData(clonedCsvArray); // .reverse() คือเรียงข้อมูลจากล่างขึ้นบน
      setBackupChart(csvArray);
      setchartData(csvArray);
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedData = csvData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
    //เปลี่ยนMode
  const handleChangeMode = () => {
    if (mode === "chart") {
      setMode("table");
    } else {
      setMode("chart");
    }
  };

  return (
    <>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div style={{position:"absolute",top: "86%",right: "1%",}}>
        <Dialog />
      </div>
      
      <Button
        variant="contained"
        id="Change"
        onClick={handleChangeMode}
        style={{
          position: "absolute",
          top: "90px",
          right: "1%",
          borderRadius: "20px",
          backgroundColor: "#00aa9f",
          "&:hover": {
            backgroundColor: "#00aa9f", 
          },
        }}
        startIcon={<box-icon name='chevron-left' type='solid' color='#ffffff' ></box-icon>}
        endIcon= {mode === "chart" ? <box-icon name='table' rotate='270' color='white'/> : <box-icon name='line-chart' color='white' />}
      >
        {mode === "chart" ? <p style={{fontSize: "16px",fontWeight: "400", margin:0}}>แสดงตาราง</p> : <p style={{fontSize: "16px",fontWeight: "400", margin:0}}>แสดงกราฟ</p>}
      </Button>
      {mode === "chart" ? (
        <div className="PaperWrapper" id="Chart">
          <Paper
            elevation={5}
            sx={{ overflow: "hidden", borderRadius: "20px" }}
            className="CenterPaper2"
          >
            <h2>กราฟค่าเฉลี่ยรายวัน</h2>
            <div className="input-container">
              <Input
                type="date"
                id="startdate"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <Input
                type="date"
                id="enddate"
                value={endDate}
                onChange={handleEndDateChange}
              />
              <Button variant="outlined" onClick={handleFilter} color="success" sx={{borderRadius: "20px"}}>
                กำหนดวัน
              </Button>
              <Button variant="outlined" onClick={resetFilter} sx={{borderRadius: "20px"}}>
                แสดงทั้งหมด
              </Button>
            </div>

            <HistoryChart data={chartData} sameday={sameday} />
          </Paper>
        </div>
      ) : (
        <div className="PaperWrapper" id="Table">
          <Paper
            sx={{ overflow: "hidden", borderRadius: "20px" }}
            className="CenterPaper"
          >
            <h2>ตารางประวัติการนับ</h2>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table
                stickyHeader
                aria-label="sticky table"
                className="TableContainer"
              >
                <TableHead>
                  <TableRow >
                    <TableCell style={{ textAlign: "center", width: "45%",fontSize: "16px", fontWeight: "bold"}}>
                      จำนวน
                    </TableCell>
                    <TableCell style={{ textAlign: "center",fontSize: "16px", fontWeight: "bold"}}>
                      วันเวลาที่นับ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: "center", width: "45%" }}>
                        {row.FISH}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.DATETIME}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="จำนวนแถว"
              component="div"
              count={csvData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
      <div style={{position:"absolute",top: "92%",right: "1%"}}>
        <DialogHelp/>
      </div>
    </>
  );
}

export default History;
