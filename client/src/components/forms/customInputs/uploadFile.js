import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import * as React from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ onChange, file }) {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      {file ? `File: ${file?.name || file}` : "Upload file"}
      <VisuallyHiddenInput
        type="file"
        accept=".doc, .docx, .zip, .jpg, .jpeg, .png, .xlsx, .xls,.pdf"
        onChange={onChange}
      />
    </Button>
  );
}
