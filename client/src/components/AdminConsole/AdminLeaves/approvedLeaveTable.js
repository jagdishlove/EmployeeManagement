import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ApprovedLeaveTable = ({ leavesData }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: "40px" }}>
      <Table style={{ border: "1px dashed #008080" }}>
        <TableHead>
          <TableRow
            style={{
              backgroundColor: "#008080",
              color: "#ffffff",
              border: "1px dashed #008080",
            }}
          >
            <TableCell style={{ color: "#ffffff", textAlign: "left", fontSize:"18px" }}>
              Employee Name
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "left" , fontSize:"18px"}}>
              From Date
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "left" , fontSize:"18px"}}>
              To Date
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "left", fontSize:"18px" }}>
              No of Days
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "left", fontSize:"18px" }}>
              Leave Master ID
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "left", fontSize:"18px" }}>
              Approval Manager Name
            </TableCell>
            <TableCell style={{ color: "#ffffff", fontSize:"18px" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ border: "1px dashed #008080" }}>
          {leavesData.map((leave) => (
            <TableRow
              key={leave.leaveRequestId}
              style={{ border: "1px dashed #008080" }}
            >
              <TableCell
                style={{ border: "1px dashed #008080", fontSize:"16px" }}
              >{`${leave.employeeFirstName} ${leave.employeeLastName}`}</TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "left" , fontSize:"16px"}}
              >
                {leave.fromDate}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "left" , fontSize:"16px"}}
              >
                {leave.toDate}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "left" , fontSize:"16px"}}
              >
                {leave.noOfDays}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "left", fontSize:"16px" }}
              >
                {leave.leaveMasterId}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "left", fontSize:"16px" }}
              >
                {leave.approvalManagerName}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "left", fontSize:"16px" }}
              >
                {leave.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApprovedLeaveTable;
