import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Container, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputFields from "../../components/forms/customInputs/inputFields";
import ImpInformation from "../../components/importantInformation/impInformation";
import { resetErrorMessage } from "../../redux/actions/errors/errorsAction";
import { forgotPasswordAction } from "../../redux/actions/forgotPassword/forgotPasswordAction";
import { ForgotPasswordStyle } from "./forgotPasswordStyle";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 400);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorData = useSelector(
    (state) => state.persistData.errorMessages.error
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

    // Handle window resize event
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  localStorage.setItem("email", email);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    e.preventDefault();

    if (!email) {
      setEmailError("Email id Mandatory");
      dispatch(resetErrorMessage());
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      dispatch(resetErrorMessage());
    } else {
      // Clear error and submit form if validation passes
      setEmailError("");
      dispatch(forgotPasswordAction({ userName: email }, navigate));
    }
  };

  const theme = useTheme();
  const style = ForgotPasswordStyle(theme);

  return (
    <>
      <Container maxWidth={false} sx={style.fpwcontainer} disableGutters>
        <Grid container>
          <CssBaseline />
          <ImpInformation />
          <Grid item sx={style.gridRight} xs={12} sm={12} md={6} square>
            <Box>
              <Typography sx={style.inboxHeading} variant="h2">
                Forgot Password?
              </Typography>

              <Typography
                sx={{
                  ...style.inboxHeadingtwo,
                  "@media (min-width: 1024px) and (min-height: 768px)": {
                    fontSize: "12px",
                  },
                  "@media (min-width: 768px) and (min-height: 1024px) and (min-width: 820px) and (min-height: 1180px)":
                    {
                      fontWeight: "bold",
                      fontSize: "15px",
                    },
                }}
              >
                <i>
                  Don’t worry. It happens to the best of us. <br />
                  Luckily for you, help is one-step away.
                </i>{" "}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={style.formBox}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputFields
                      label={isMobile ? "Enter email.." : "Please enter your email address"}
                      type="email"
                      variant="outlined"
                      value={email}
                      name="email"
                      inputProps={{
                        endAdornment: !isMobile && (
                          <InputAdornment position="end">
                            <MailOutlineIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleOnChange}
                      error={emailError}
                      helperText={emailError}
                      fullWidth
                    />
                  </Grid>
                  {errorData && (
                    <Grid item xs={12}>
                      <Typography style={{ color: "red" }}>{errorData}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      sx={{
                        ...style.GreenButton, // Apply the default or custom styles
                      }}
                      variant="contained"
                      type="submit"
                      fullWidth
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          textTransform: "none",
                        }}
                      >
                        Click to send OTP
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ForgotPassword;
