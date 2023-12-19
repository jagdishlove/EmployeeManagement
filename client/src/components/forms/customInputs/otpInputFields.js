import { Box, FormHelperText } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";

const OTPInputFields = ({ otp, onChange, otpError }) => {
  const handleInputChange = (value) => {
    if (onChange) {
      // Allow only numeric values
      const numericValue = value.replace(/\D/g, '');
      onChange(numericValue);
    }
  };
  return (
    <Box>
      <MuiOtpInput
          sx={{
            gap: 1,
                  }}
        onChange={handleInputChange}
        value={otp}
        TextFieldsProps={{
          type: "text",
          name: "otp",
          inputProps: {
            pattern: "[0-9]*", // Only allow numeric values
            style: {
              borderRadius: "50%", // Set border radius for the input
              "& MuiOtpInput-TextField": {
                borderRadius: "50%",
              },
            },
          },
        }}
        length={6}
      />
      {otpError && <FormHelperText error>{otpError}</FormHelperText>}
    </Box>
  );
};

export default OTPInputFields;
