import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import styles from "./Pagination.module.css";

export default function BasicTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const maxRecords = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
        console.log("first");
      } catch (error) {
        alert("Failed to fetch Data.");
        console.log(error);
      }
    };
    getData();
  }, []);
  //pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, data.length);

    setCurrentData([...data].slice(startIndex, endIndex));
    setTotalPages(Math.ceil(data.length / maxRecords));
  }, [data, currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <h2 style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        Employee Data Table
      </h2>
      <TableContainer
        component={Paper}
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ background: "#32804e" }}>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={styles.paginationWrapper}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <p>{currentPage}</p>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </Box>
    </>
  );
}
