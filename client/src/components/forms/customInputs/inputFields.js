import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import useMobileScreen from "../../../customHooks/useMobileScreen";
import { InputFieldsStyle } from "./inputFieldsStyle";
const InputFields = ({
  label,
  type,
  name,
  inputProps,
  styling,
  value,
  error,
  onChange,
  placeholder,
  ...props
}) => {
  const mobile = useMobileScreen();
  const theme = useTheme();
  const style = InputFieldsStyle(theme);
  const isPassword = type === "password"; // Check if the input type is "password"
  const isEmail = type === "email"; 
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {styling ? (
        <InputLabel htmlFor={name}>
          <Typography color={mobile ? "black" : "secondary"}>
            {label}
          </Typography>
        </InputLabel>
      ) : (
        ""
      )}

      <TextField
        {...props}
        sx={{
          ...(styling ? style.loginTextField : ""), 
          width: '100%',
          marginLeft: "auto",
          marginRight: "auto",
        }}
        label={styling ? "" : label}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        error={!!error}
        helperText={error}
        InputProps={
          isPassword
            ? {
                // Only add InputProps if it's a password input
                inputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
              : isEmail && inputProps // Show mail icon only if isEmail and showMailIcon is true
            ? {
                endAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }
            : undefined // Set InputProps to undefined for non-password inputs
        }
        id={name}
      />
    </>
  );
};

export default InputFields;
