import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import prakat_logo from "../../assets/Prakat_Logo.png";
import MobLogo from "../../assets/mobLogo.png";
import useMobileScreen from "../../customHooks/useMobileScreen";
import { resetErrorMessage } from "../../redux/actions/errors/errorsAction";
import { login } from "../../redux/actions/login/loginAction";
import InputFields from "../forms/customInputs/inputFields";
import { LoginStyle } from "./loginStyle";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const mobile = useMobileScreen();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const style = LoginStyle(theme);
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

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    e.preventDefault();
    let hasError = false;

    if (!email) {
      setEmailError("Email is Mandatory.");
      dispatch(resetErrorMessage());
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      hasError = true;
      dispatch(resetErrorMessage());
    }
    if (!password) {
      setPasswordError("Password is Mandatory.");
      hasError = true;
      dispatch(resetErrorMessage());
    } else if (
      password.length < 8 || // Check for minimum length
      !/[A-Z]/.test(password) || // Check for at least one uppercase letter
      !/[a-z]/.test(password) || // Check for at least one lowercase letter
      !/\d/.test(password) || // Check for at least one digit
      !/[@#$%^&*!]/.test(password) // Check for at least one special character
    ) {
      setPasswordError("Invalid Password ");
      hasError = true;
      dispatch(resetErrorMessage());
    }
    // Additional validation for email
    if (password && !email) {
      setEmailError("Email is Mandatory");
      dispatch(resetErrorMessage());
    } else if (!hasError) {
      const payload = {
        userName: email,
        password,
      };
      setPasswordError(""); // Clear error and submit form if validation passes
      setEmailError("");
      dispatch(login(payload, navigate));
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is 'Enter' (key code 13)
    if (e.key === 'Enter') {
      // Prevent the default behavior of the 'Enter' key (form submission)
      e.preventDefault();
      // Call the handleSubmit function to handle the form submission
      handleSubmit(e);
    }
  };

  return (
    <Box sx={style.mainBoxRight}>
     <form onKeyPress={handleKeyPress}>
      {mobile ? (
        <Box sx={style.logoBox}>
          <img
            src={MobLogo}
            alt="Logo"
            style={{ width: "80%", maxWidth: "100%", height: "auto" }}
          />
        </Box>
      ) : (
        <Box sx={{ maxWidth: "100%", width: "100%", height: "auto" }}>
          <img
            src={prakat_logo}
            alt="Logo"
            style={{ width: "70%", maxWidth: "100%", height: "auto" }}
          />
        </Box>
      )}
      <Box
        p={2}
        bgcolor={theme.palette.primary.main}
        color={theme.palette.secondary.main}
        sx={style.boxIWill}
      >
        <Typography variant="h1" sx={style.IWillMobile}>
          I WILL
        </Typography>
      </Box>
      <Box sx={style.boxIWilltext}>
        <Typography fontSize={"30px"} fontWeight={"bold"} lineHeight={"20px"}>
          demonstrate utmost
        </Typography>
        <Typography fontSize={"50px"} fontWeight={"bold"}>
          INTEGRITY
        </Typography>
      </Box>

      <Box sx={style.inputOutsideBox}>
        <Box sx={style.inputOutsideBoxText}>
          <Typography
            sx={{
              ...style.formHeading,
              "@media (min-width: 1180px) and (min-height: 820px)": {
                fontWeight: "bold",
              },
              "@media (min-width:820px ) and (min-height: 1180px)": {
                fontWeight: "bold",
              },
            }}
          >
            Welcome Back 👋{" "}
          </Typography>
          <Typography sx={style.formHeading1}>
            Today is a new day. It&apos;s your day. You shape it.
          </Typography>
          <Typography sx={style.formHeading1}>
            Sign in to start managing your projects.
          </Typography>
        </Box>
        <Box component={"form"} onSubmit={handleSubmit} sx={style.inputBox1}>
          <InputFields
            styling="true"
            label="Email"
            type="email"
            name="email"
            placeholder="name@prakat.com"
            error={emailError}
            helper={emailError}
            onChange={handleOnChange}
            value={email}
            style={{ marginBottom: "15px" }}
          />

          <InputFields
            styling="true"
            label="Password"
            type="password"
            name="password"
            placeholder="At least 8 characters"
            error={passwordError}
            helper={passwordError}
            onChange={handleOnChange}
            value={password}
          />

          {errorData && (
            <Typography style={{ color: "red" }}>{errorData}</Typography>
          )}
          <Box>
            {!mobile && (
              <Typography
                component={Link}
                to="/forgot-password"
                onClick={() => dispatch(resetErrorMessage())}
                sx={style.fpDesktop}
              >
                Forgot Password?
              </Typography>
            )}
          </Box>
          {!mobile ? (
            <Button
              sx={style.signinButton}
              color="secondary"
              variant="contained"
              type="submit"
            >
              <Typography variant="h5" color="primary">
                Sign In
              </Typography>
            </Button>
          ) : (
            <Button
              sx={{
                ...style.loginButtonMobile,
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              <Typography variant="h6" color="secondary">
                Sign In
              </Typography>
            </Button>
          )}
          {mobile && (
            <Typography
              component={Link}
              to="/forgot-password"
              sx={style.fpMobile}
            >
              Forgot Password?
            </Typography>
          )}
        </Box>
      </Box>
      {!mobile ? (
        <Typography
          sx={{
            textAlign: "center",
            marginTop: "auto", // Pushes the text to the bottom
          }}
        >
          {" "}
          &copy; 2023 ALL RIGHTS RESERVED
        </Typography>
      ) : (
        <Typography sx={style.ARRMobile}>
          {" "}
          &copy; 2023 ALL RIGHTS RESERVED
        </Typography>
      )}
      </form>
    </Box>
  );
};

export default LoginForm;
