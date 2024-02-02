import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const UsersAppliedLeave = ({ color }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const iconColor = color ? "#FFFFFF" : "#008080";

  const iconStyle = {
    fontSize: "25px",
    marginTop: "-3px",
    color: iconColor,

  };
  
  return (
    <Box>
      <IconButton onClick={handleIconClick}>
      <InfoIcon sx={iconStyle} />
      </IconButton>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "80%",
            bgcolor: "#ffffff",
            boxShadow: 24,
            p: 4,
            border: "5px solid #008080",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "0%",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "100%",
              bgcolor: "",
              color: "#008080",
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              sx={{ textDecoration: "underline" }}
            >
              User&apos;s Leave Applied
            </Typography>
          </Box>

          <Box sx={{ paddingTop: "30px", backgroundColor: "#ffffff" }}>
            <IconButton
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "#008080",
              }}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </IconButton>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>User Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Add your table rows here */}
                {/* Example row: */}
                <TableRow>
                  <TableCell>2024-01-01</TableCell>
                  <TableCell>2024-01-10</TableCell>
                  <TableCell>Sick LEave</TableCell>
                  <TableCell>Rajesh</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersAppliedLeave;
