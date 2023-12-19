import React from "react";
import { LoginStyle } from "./loginStyle.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import LoginForm from "./loginForm.js";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const theme = useTheme();
  const style = LoginStyle(theme);
  const refreshLogoutFlag = localStorage.getItem("refreshLogout");
 
  useEffect(() => {
    if (refreshLogoutFlag) {
     
      toast.success("You have been logout.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    localStorage.removeItem("refreshLogout");
  }, [refreshLogoutFlag]);
  return (
    <Box sx={style.container}>
      <Box sx={style.mainBox}>
        <Typography sx={style.heading} variant="h1">
          THE PRAKAT MANTRAS
        </Typography>
        <Box sx={style.quoteCommonBox}>
          <Box sx={style.quoteBox1}>
            <Typography sx={style.IWill} variant="h1">
              I
            </Typography>
            <Typography sx={style.IWill} variant="h1">
              WILL
            </Typography>
          </Box>
          <Box sx={style.quoteContainer}>
            <Typography sx={style.quoteText1}>demonstrate utmost</Typography>
            <Typography sx={style.quoteText2}>
              <span style={style.quoteBold}>INTEGRITY</span>
            </Typography>
            <Typography sx={style.quoteText3}>
              keep <span style={style.quoteBold}>LEARNING</span>
            </Typography>
            <Typography sx={style.quoteText3}>
              take new <span style={style.quoteBold}>INITIATIVES</span>
            </Typography>
          </Box>
        </Box>
        <Box sx={style.quoteCommonBox}>
          <Box sx={style.quoteBox2}>
            <Typography color={"secondary"} variant="h1">
              I
            </Typography>
            <Typography color={"secondary"} variant="h1">
              WILL
            </Typography>
          </Box>
          <Box sx={style.quoteContainer}>
            <Typography sx={style.quoteText4}>
              <span style={style.quoteBold}>SHARE</span> my knowledge
            </Typography>
            <Typography sx={style.quoteText3}>create a</Typography>
            <Typography sx={style.quoteText2}>
              <span style={style.quoteBold}>CULTURE OF EXCELLENCE</span>
            </Typography>
            <Typography sx={style.quoteText3}>
              be an <span style={style.quoteBold}>IDEATOR / INNOVATOR</span>{" "}
            </Typography>
          </Box>
        </Box>
        <Box sx={style.quoteCommonBox}>
          <Box sx={style.quoteBox3}>
            <Typography color={"secondary"} variant="h1">
              I
            </Typography>
            <Typography color={"secondary"} variant="h1">
              WILL
            </Typography>
          </Box>
          <Box sx={style.quoteContainer}>
            <Typography sx={style.quoteText1}>strive to be a</Typography>
            <Typography sx={style.quoteText2}>
              <span style={style.quoteBold}>THOUGHT LEADER</span>
            </Typography>
            <Typography sx={style.quoteText3}>work towards a</Typography>
            <Typography sx={style.quoteText2}>
              <span style={style.quoteBold}>COLLABORATIVE APPROACH</span>
            </Typography>
            <Typography sx={style.quoteText3}>
              be the <span style={style.quoteBold}>SOUL </span>of Prakat’s
              Vision
            </Typography>
          </Box>
        </Box>
      </Box>
      <LoginForm theme={theme} />
    </Box>
  );
};

export default Login;
