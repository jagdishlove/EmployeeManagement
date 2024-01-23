import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
const ModalCust = ({ children, ...props }) => {
  const { open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        p={4}
        sx={{
          position: "absolute",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflowY: "auto",
          maxHeight: "80vh", // Set the maximum height for the modal
        }}
      >
        <IconButton
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#008080",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalCust;
