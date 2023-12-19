export const ForgotPasswordStyle = (theme) => ({
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
    padding: { xs: "3rem", md: "10rem 9rem" },
    justifyContent: "center",
  },
  inboxHeading: {
    fontWeight: 800,
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
  },
  GreenButton: {
    borderRadius: "10px",
    color: "secondary.main",
    backgroundColor: "primary.main",
    width: "100%",
    marginTop: "20px",
    textTransform: " capitalize",
  },
});
