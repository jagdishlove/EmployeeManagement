export const TimesheetStyle = (theme, approval, data) => ({
  TimesheetTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      background: { xs: theme?.palette?.secondary?.main, md: "white" },
      fontSize: "15px",
    },
    "& .MuiContainer-root": {
      paddingLeft: "0px",
      paddingRight: "0px",
      marginTop: "-5px",
    },

    "&  .MuiInputLabel-root": {
      backgroundColor: "#ffffff",
      borderRadius: "5px",
      padding: "0px 5px",
      color: "#8897AD",
    },
  },
  timesheetEntryUI: {
    backgroundColor: "#fffff",
   
    border: "2px solid #008080",
    padding: approval && data ? "1.5rem" : "1rem",
    position: "relative",
    "@media (max-width: 900px )": {
      marginBottom: data ? "2rem" : "3rem",
    },
  },
  TimesheetTextFieldToTime: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      background: { xs: theme?.palette?.secondary?.main, md: "white" },
      fontSize: "15px",
      marginTop: "2px",
      paddingTop: "1px",
    },
    "& .MuiContainer-root": {
      paddingLeft: "0px",
      paddingRight: "0px",
    },

    "&  .MuiInputLabel-root": {
      backgroundColor: "#ffffff",
      borderRadius: "5px",
      padding: "0px 5px",
      color: "#8897AD",
    },
  },
  TimesheetTextField1: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      background: { xs: theme?.palette?.secondary?.main, md: "#DEE1E5" },
      color: "#000000",
    },
    "&  .MuiInputLabel-root": {
      backgroundColor: "#008080",
      borderRadius: "5px",
      border: "2px solid #ffffff",
      padding: "0px 5px",
      marginLeft: "-3px",
      color: "#ffffff",
    },
    "&  .MuiInputLabel-root.Mui-focused": {
      color: "#ffffff",
    },
  },
  TimesheetManagerTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      background: { xs: theme?.palette?.secondary?.main, md: "#DEE1E5" },
      color: "#000000",
      marginTop: { xs: "15px", sm: "15px", md: "0px", lg: "0px" },
    },
    "&  .MuiInputLabel-root": {
      backgroundColor: "#008080",
      borderRadius: "5px",
      border: "2px solid #ffffff",
      padding: "0px 5px",
      marginLeft: "-3px",
      marginTop: { xs: "15px", sm: "15px", md: "0px", lg: "0px" },
      color: "#ffffff",
    },
    "&  .MuiInputLabel-root.Mui-focused": {
      color: "#ffffff",
    },
  },

  timesheetCol7: {
    display: "flex",
    flexDirection: { xs: "row", sm: "row", md: "row", lg: "row" },
  },
  timesheetCol4: {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    // padding: "0px 10px",
  },

  timesheetCol2: {
    minWidth: { md: "35%", lg: "38%" },
  },

  TimesheetDateTextField: {
    "& .MuiOutlinedInput-root": {
      background: { xs: theme?.palette?.secondary?.main, md: "white" },
      fontSize: "15px",
      fontWeight: "bold",
      marginLeft: "-24px",
    },

    "&  .MuiInputLabel-root": {
      backgroundColor: "#ffffff",
      borderRadius: "5px",
      padding: "0px 5px",
      marginLeft: "-3px",
      marginTop: "0px",
      color: "#8897AD",
    },
  },
  timesheetCol3: {
    padding: { xs: "0px 10px 0px 10px", md: "20px 10px 0px 10px" },
  },
  iconDesign: {
    display: "flex",
    flexDirection: {
      xs: "row",
      sm: "row",
      md: "column",
      lg: "column",
    },
    alignItems: "normal",
  },
  IconStyle: {
    cursor: "pointer",
    color: "#008080",
  },
  refreshIconStyle: {
    cursor: "pointer",
    color: "#008080",
  },
  InfoIconStyle: {
    cursor: "pointer",
    fontSize: "30px",
    color: "#008080",
  },
  AddIconStyle: {
    cursor: "pointer",
   
    color: "#ffffff",
  },
  timesheetManagerCol: {
    justifyContent: {
      xs: "flex-start",
      sm: "flex-start",
      md: "normal",
      lg: "  normal;",
    },
    marginTop: { xs: "5px", sm: "5px", md: "0px", lg: "0px" },
  },
  mobile_timesheet: {
    paddingTop: { xs: "200px" },
  },
  starSec: {
    marginTop: { xs: "15px", sm: "15px", md: "0px", lg: "0px" },
  },
});
