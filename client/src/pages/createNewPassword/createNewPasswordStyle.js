export const CreateNewPasswordStyle = (theme) => ({
  fpwcontainer: {
    display: "flex",
    height: "100vh",
    background: {
      xs: theme.palette.primary.main,
      md: theme.palette.primary.main,
    },
    flexWrap: "wrap",
    overflowY: "scroll",
    justifyContent: "center",
  },
  gridRight: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: (t) =>
      t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
    borderTopLeftRadius: { xs: "0px", md: "80px" },
    borderBottomLeftRadius: { xs: "0px", md: "80px" },
    px: { xs: "3rem", md: "8rem" },
    py: { xs: "3rem", md: "2rem" },
    justifyContent: "center",
  },
  inboxHeading: {
    fontWeight: 800,
    mt: 4,
    textAlign: "center",
    color: "primary.main",
  },
  inboxHeadingtwo: {
    fontWeight: 600,
    textAlign: "center",
    color: "primary.main",
    my: "10px",
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15px",
    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
      WebkitTextFillColor: theme.palette.getContrastText(
        theme.palette.secondary.main
      ),
    },
  },
  GreenButton: {
    borderRadius: "10px",
    color: "secondary.main",
    backgroundColor: "primary.main",
    width: "100%",
    marginTop: "20px",
  },
  resend:{
    backgroundColor: "transparent",
    color: "#008080",
    marginRight: "5px",
  },
  capitalizefont:{
    textTransform: "capitalize !important",
  }
 

  


});
