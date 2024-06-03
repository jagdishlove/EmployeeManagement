export const LoginStyle = (theme) => ({
  container: {
    display: "flex",
    padding: "1rem",
    height: "100vh",
    background: {
      xs: theme.palette.secondary.main,
      md: theme.palette.primary.main,
    },
    width: "100%",
    flexWrap: "wrap",
    overflowY: "scroll",
    justifyContent: "center",
    textAlign: "center",
  },
  mainBox: {
    paddingTop: "50px",
    paddingLeft: "20px",
    background: {
      xs: theme.palette.secondary.main,
      md: theme.palette.secondary.main,
    },
    flexDirection: "column",
    borderRadius: "50px",
    minWidth: "200px",
    width: { xs: "100%", sm: "100%", md: "50%" },
    textAlign: "center",
    display: { xs: "none", sm: "none", md: "flex" },
  },
  heading: {
    color: "primary.main",
    fontWeight: "bolder",
    letterSpacing: "3px",
    fontSize: "200px",
  },
  quoteCommonBox: {
    m: "20px",
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  quoteBox1: {
    borderTopLeftRadius: "50px",
    display: { xs: "none", sm: "block" },
    textAlign: "center",
    backgroundColor: "primary.main",
    p: "20px",
  },
  quoteBox2: {
    display: { xs: "none", sm: "block" },
    textAlign: "center",
    backgroundColor: "primary.main",
    p: "20px",
  },
  quoteBox3: {
    borderBottomLeftRadius: "50px",
    display: { xs: "none", sm: "block" },
    textAlign: "center",
    backgroundColor: "primary.main",
    p: "20px",
  },
  IWill: {
    color: "secondary.main",
  },
  quoteContainer: {
    textAlign: "left",
  },
  quoteText1: {
    fontWeight: "500",
    fontSize: "15px",
    opacity: ".8",
    color: "gray.main",
    letterSpacing: "3px",
  },
  quoteText2: {
    fontWeight: "bold",
    fontSize: "15px",
    color: "black",
    opacity: "0.8",
    letterSpacing: "3px",
  },
  quoteText3: {
    fontWeight: "500",
    fontSize: "15px",
    opacity: ".8",
    marginTop: "0.5rem",
    color: "gray.main",
    letterSpacing: "3px",
  },
  quoteText4: {
    fontWeight: "500",
    fontSize: "15px",
    opacity: ".8",
    color: "gray.main",
    letterSpacing: "3px",
  },

  quoteBold: {
    fontSize: "17px",
    color: "black",
    fontWeight: "bolder",
  },

  ////Login Form Section/////

  mainBoxRight: {
    display: "flex",
    flexDirection: "column",
    color: { xs: "black", md: theme.palette.secondary.main },
    gap: { xs: "1rem", md: "3rem" },
    width: { xs: "100%", md: "49%" },
  },
  logoBox: {
    maxWidth: "100%",
    width: "100%",
    height: "auto",
    marginTop: "20px",
  },
  boxIWill: {
    display: {
      xs: "block",
      md: "none",
      borderTopRightRadius: "10px",
      borderTopLeftRadius: "10px",

      textAlign: "center",
      marginTop: "20px",
      padding: "20px",
    },
  },
  boxIWilltext: {
    display: {
      xs: "block",
      md: "none",
      textAlign: "center",
      marginTop: "10px",
    },
  },
  IWillMobile: {
    fontWeight: "bold",
  },

  inputOutsideBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
  },
  inputOutsideBoxText: {
    width: { xs: "90%", md: "60%" },
    textAlign: { xs: "center", md: "left" },
    color: { xs: "#0C1421", md: "#ffffff" },
  },
  formHeading: {
    fontWeight: "400",
    fontSize: "24px",
  },
  formHeading1: {
    fontWeight: "400",
    fontSize: "14px",
  },
  inputBox1: {
    display: "flex",
    flexDirection: "column",
    gap: "0rem",
    width: { xs: "100%", md: "60%" },
    textAlign: { xs: "left", md: "left" },

    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
      WebkitTextFillColor: theme.palette.getContrastText(
        theme.palette.secondary.main
      ),
    },
  },
  inputBox2: {
    marginTop: "16px",
    flexDirection: "column",
    gap: "0rem",
    height: "10%",
    width: { xs: "100%", md: "100%" },
    textAlign: { xs: "left", md: "left" },
  },
  fpDesktop: {
    margin: "15px 0px",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    width: "fit-content",
    alignSelf: "self-end",
    float: "right",
  },
  fpMobile: {
    marginTop: "10px",
    textAlign: "right",
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  signinButton: {
    borderRadius: "12px",
    padding: "15px 0px",
    color: "secondary.main",
    textTransform: " capitalize",
  },
  loginButtonMobile: {
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    padding: "10px",
    textTransform: " capitalize",
    marginTop: "30px",
  },
  ARRMobile: {
    marginTop: "100px",
  },
});
