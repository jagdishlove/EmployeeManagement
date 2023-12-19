
import { Box, Container, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import InputFields from "../../components/forms/customInputs/inputFields";
import OTPInputFields from "../../components/forms/customInputs/otpInputFields";
import ImpInformation from "../../components/importantInformation/impInformation";
import { resetErrorMessage } from "../../redux/actions/errors/errorsAction";
import {
  forgotPasswordAction,
  resetPassword,
} from "../../redux/actions/forgotPassword/forgotPasswordAction";
import { CreateNewPasswordStyle } from "./createNewPasswordStyle";

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorData = useSelector(
    (state) => state.nonPersist.errorMessages.error
  );

  useEffect(() => {
    // Check if the page has not been reloaded yet (using local storage)
    const pageReloaded = localStorage.getItem("pageReloaded");

    if (!pageReloaded) {
      // Reload the page
      window.location.reload();
      // Set the local storage to prevent further reloads
      localStorage.setItem("pageReloaded", "true");
    } else {
      // Clear any error message if the page has been reloaded
      dispatch(resetErrorMessage());
    }
  }, [dispatch]);

  const otpHandleChange = (data) => {
    setOtp(data);
    setOtpError("");
  };

  const location = useLocation();

  const handleResendOtp = () => {
    dispatch(
      forgotPasswordAction(
        { userName: location.state.email.userName },
        navigate
      )
    );
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
      setPasswordError("");
    } else if (name === "confirmNewPassword") {
      setConfirmNewPassword(value);
      setConfirmNewPasswordError("");
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
   
    if (!otp) {
      setOtpError("Please enter the OTP");
       dispatch(resetErrorMessage());
       return;
    }
    if (!password) {
      setPasswordError("Enter new Password");
       dispatch(resetErrorMessage());
    }
    
    if (!confirmNewPassword) {
      setConfirmNewPasswordError("Confirm new Password");
      dispatch(resetErrorMessage());
    } else if (password !== confirmNewPassword) {
      setConfirmNewPasswordError("Password do not match");
      dispatch(resetErrorMessage());
    }  else {
      const passwordError = getPasswordErrorMessage();
      if (passwordError) {
        setPasswordError(passwordError);
        dispatch(resetErrorMessage());
        return;
      }
      setPasswordError(""); // Clear error and submit form if validation passes
      setConfirmNewPasswordError("");
      const otpsealedobject = localStorage.getItem("otpSealedObject");
      const payload = {
        otp,
        otpsealedobject,
        newPassword: password,
      };
         dispatch(resetPassword(payload, navigate));
      } 
  };

  const theme = useTheme();
  const style = CreateNewPasswordStyle(theme);
  const validationCriteria = [
    {
      condition: password.length < 8,
      message: "Password must contain 8 characters, one digit [0-9], one special character[~!@#$%^&*()]",
    },
    {
      condition: !/[A-Z]/.test(password),
      message: "one uppercase letter",
    },
    {
      condition: !/[a-z]/.test(password),
      message: "one lowercase letter",
    },
    {
      condition: !/\d/.test(password),
      message: "at least one digit",
    },
    {
      condition: !/[@#$%^&*!]/.test(password),
      message: "at least one special character",
    },
  ];

  const getPasswordErrorMessage = () => {
    const failedCriteria = [];

    for (const criterion of validationCriteria) {
      if (criterion.condition) {
        failedCriteria.push(criterion.message);
      }
    }
  
    if (failedCriteria.length > 0) {
      return failedCriteria.join(", ");
    }
    return "";
  };

  return (
    <>
      <Container maxWidth={false} sx={style.fpwcontainer} disableGutters>
        <Grid container>
          <CssBaseline />
          <ImpInformation />
          <Grid item sx={style.gridRight} xs={12} sm={12} md={6} square>
            {/* OTP Box Section Starts  */}
            <Box>
              <Typography sx={{...style.inboxHeading, "@media (min-width: 1024px) and (min-height: 768px)": {
                      fontSize:"19px"
                      },
                      "@media (min-width: 768px) and (min-height: 1024px) and (min-width: 820px) and (min-height: 1180px)": {
                        fontSize:"24px"
                      }}} variant="h2">
              ENTER VERIFICATION CODE
              </Typography>
              <Typography sx={style.inboxHeadingtwo} variant="h6">
                <i> Hint: Look for it in your Inbox</i>
              </Typography>
              <Box sx={style.formBox}>
                <Box
                  component="form"
                  onSubmit={onHandleSubmit}
                  sx={style.formBox}
                >
                  <OTPInputFields
                    onChange={otpHandleChange}
                    otp={otp}
                    otpError={otpError}
                  />
                  {errorData && (
                    <Typography style={{ color: "red" }}>
                      {errorData}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6" sx={{...style.resend,"@media (min-width: 1024px) and (min-height: 768px)": {
                      fontSize:"13px"
                      }}}>
                    If you did not receieve code
                  </Typography>
                 
                  <Typography
                      
                      color="ActiveBorder"
                      onClick={handleResendOtp}
                      style={{ cursor: "pointer",transition: "font-weight 0.2s", 
                      fontWeight: "normal", paddingTop:"3px" }}
                      onMouseEnter={(e) => {e.target.style.color = "#008080";
                                             e.target.style.fontWeight = "bolder";
                                             e.target.style.fontSize = "18px"; }} 
                      onMouseLeave={(e) => {e.target.style.color = "ActiveBorder";
                                             e.target.style.fontWeight = "normal";
                                             e.target.style.fontSize = "16px"; }}
                    >
                      RESEND
                    </Typography>

                 
                  
                </Box>
              </Box>
            </Box>
            {/* OTP Box Section Ends  */}
            {/* Create New PW Box Section Starts  */}
            <Box>
              <Typography sx={{...style.inboxHeading, "@media (min-width: 1024px) and (min-height: 768px)": {
                      fontSize:"19px"
                      },
                      "@media (min-width: 768px) and (min-height: 1024px) and (min-width: 820px) and (min-height: 1180px)": {
                        fontSize:"24px"
                      }}} variant="h2">
              CREATE NEW PASSWORD
              </Typography>
              <Typography sx={{...style.inboxHeadingtwo, "@media (min-width: 1024px) and (min-height: 768px)": {
                      fontSize:"11px"
                      },
                      "@media (min-width: 768px) and (min-height: 1024px) and (min-width: 820px) and (min-height: 1180px)": {
                        fontSize:"15px"
                      }}} variant="h6">
                <i>
                  Tip: Pick a strong, yet
                  unforgettable one this time
                </i>
              </Typography>
              <Box
                component="form"
                onSubmit={onHandleSubmit}
                sx={style.formBox}
              >
                <InputFields
                  label="Enter New Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  name="password"
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleOnChange}
                  error={passwordError}
                  helperText={passwordError}
                />
                <br />
                <InputFields
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  value={confirmNewPassword}
                  name="confirmNewPassword"
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                       
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleOnChange}
                  error={confirmNewPasswordError}
                  helperText={confirmNewPasswordError}
                />
                <Box>
                  <Button
                     sx={{
                      ...style.GreenButton, // Apply the default or custom styles
                    }}
                    variant="contained"
                    type="submit"
                    onClick={onHandleSubmit}
                  >
                    <Typography variant="h6" sx={style.capitalizefont} >Sign In</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateNewPassword;
