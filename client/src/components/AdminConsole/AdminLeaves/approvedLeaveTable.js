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
            <TableCell style={{ color: "#ffffff", textAlign: "center" }}>
              Employee Name
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "center" }}>
              From Date
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "center" }}>
              To Date
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "center" }}>
              No of Days
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "center" }}>
              Leave Master ID
            </TableCell>
            <TableCell style={{ color: "#ffffff", textAlign: "center" }}>
              Approval Manager Name
            </TableCell>
            <TableCell style={{ color: "#ffffff" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ border: "1px dashed #008080" }}>
          {leavesData.map((leave) => (
            <TableRow
              key={leave.leaveRequestId}
              style={{ border: "1px dashed #008080" }}
            >
              <TableCell
                style={{ border: "1px dashed #008080" }}
              >{`${leave.employeeFirstName} ${leave.employeeLastName}`}</TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "center" }}
              >
                {leave.fromDate}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "center" }}
              >
                {leave.toDate}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "center" }}
              >
                {leave.noOfDays}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "center" }}
              >
                {leave.leaveMasterId}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "center" }}
              >
                {leave.approvalManagerName}
              </TableCell>
              <TableCell
                style={{ border: "1px dashed #008080", textAlign: "center" }}
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
