export const InputFieldsStyle = (theme) => ({
  loginTextField: {
    "& .MuiOutlinedInput-root": {
       borderRadius: "12px",
      background: { xs: theme.palette.secondary.main, md: "white" },
      "&.Mui-focused fieldset": {
        border: "2px solid #008080",
      },
      "&:hover fieldset": {
        border: "2px solid #008080",
      },
    },
  },
  
});
