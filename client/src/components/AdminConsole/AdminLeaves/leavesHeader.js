import React from "react";
import { Autocomplete, Box, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";
import Dropdown from "../../forms/dropdown/dropdown";
import { useTheme } from "@mui/material/styles";
import { adminHeaderStyle } from "../../admin/approvalTimesheets/adminHeaderStyle";
import { admindateOptions } from "../../../utils/dateOptions";

const LeavesHeader = ({
  setSelectedSearchOption,
  selectedDate,
  setSelectedDate,
  approver,
  setApprover,
  leaveStatus,
  setLeaveStatus,
  setSelectedCards,
}) => {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length >= 3) {
      dispatch(searchUserAction(inputValue));
    }
  };

  const userData = useSelector(
    (state) => state?.persistData?.adminTimeSheet?.searchUserData?.result
  );

  const handleDateChnage = (e) => {
    setSelectedDate(e.target.value);
    setSelectedCards([]);
  };

  const handleApproveChange = (e) => {
    setApprover(e.target.value);
    setSelectedCards([]);
  };

  const approverList = useSelector(
    (state) => state?.persistData?.adminLeaves?.leavesApproversData
  );

  const adminLeavesData = useSelector(
    (state) => state?.persistData?.adminLeaves?.allLeavesForAdmin
  );

  const handleStatusChnage = (e) => {
    setLeaveStatus(e.target.value);
    setApprover("All");
  };

  const status = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.approverStatus
  );

  return (
    <div>
      {" "}
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Leaves
      </Typography>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />
      <Grid>
        <Box>
          <Autocomplete
            sx={{
              borderRadius: "8px",
              width: isMobile? "70%" : "40%",
            }}
            options={userData || []}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            onChange={(event, data) => {
              setSelectedSearchOption(data);
            }}
            isSearchable={true}
            getOptionValue={(option) => option.id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search by User Name"
                onChange={handleChange}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <SearchIcon />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                  endAdornment: null,

                  style: { borderRadius: "20px" },
                }}
              />
            )}
          />
        </Box>
        <Box style={{ ...style.adminSubHeader }}>
          <Grid container gap={{ sm: 0, md: 0, lg: 2, xs: 2 }}>
            <Grid item xs={12} sm={4} md={2} lg={3}>
              <Dropdown
                options={[{ id: "All", value: "All" }, ...admindateOptions()]}
                value={selectedDate}
                dropdownName="Date" // Pass the dropdown name
                title="Date"
                style={style.DateTimesheetDateTextField} // Pass any additional style
                onChange={handleDateChnage}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Dropdown
                options={[{ id: "All", value: "All" }, ...approverList]} // Pass any additional options if needed
                value={approver} // Pass the current selected value
                onChange={handleApproveChange} // Pass the onChange function
                title="Approvers"
                dropdownName="Approvers" // Pass the dropdown name
                style={style.TimesheetDateTextField} // Pass any additional style
                approve={true}
                valueKey="id"
                labelKey="approverName"
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Dropdown
                options={status}
                value={leaveStatus}
                onChange={handleStatusChnage}
                title="Status"
                dropdownName="Status" // Pass the dropdown name
                style={style.TimesheetDateTextField} // Pass any additional style
                approve={true}
                labelKey="name"
                valueKey="value"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} margin={"auto"}>
              <Typography
                variant="h6"
                color={"secondary"}
                textAlign={"right"}
                sx={{ textWrap: "nowrap" }}
                marginTop={1}
              >
                <b>
                  {" "}
                  Total Entries{" "}
                  {adminLeavesData?.numberOfElements
                    ? adminLeavesData.numberOfElements
                    : "0"}
                  /
                  {adminLeavesData?.totalElements
                    ? adminLeavesData.totalElements
                    : "0"}
                </b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default LeavesHeader;
