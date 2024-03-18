import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Dropdown from "../../forms/dropdown/dropdown";
import { adminHeaderStyle } from "../../admin/approvalTimesheets/adminHeaderStyle";
import { admindateOptions } from "../../../utils/dateOptions";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";

export default function AdminTimesheetHeader({
  approver,
  setApprover,
  states,
  selectedDate,
  setSelectedDate,
  setSelectedSearchOption,
  setStatus,
}) {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(searchUserAction(e?.target?.value));
  };

  const handleApproveChange = (e) => {
    setApprover(e.target.value);
  };

  const handleDateChnage = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleStatusChnage = (e) => {
    setStatus(e.target.value);
    setApprover("All");
  };

  const status = useSelector(
    (state) => state.persistData.masterData?.approverStatus
  );

  const userData = useSelector(
    (state) => state?.nonPersist?.adminTimeSheet?.searchUserData
  );

  const approverList = useSelector(
    (state) => state?.nonPersist?.adminTimeSheet?.approversData
  );

  const adminTimeSheetData = useSelector(
    (state) => state?.nonPersist?.adminTimeSheet?.allTimeSheetsForAdmin
  );

  return (
    <Grid>
      {" "}
      <Typography variant="h4" gutterBottom fontWeight="bold">
        TIMESHEET
      </Typography>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />
      <Grid item xs={12} sm={12} md={4} lg={5}>
        <Box>
          <Autocomplete
            isMulti={true}
            isSearchable={true}
            options={userData?.result || []}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            onChange={(e, data) => setSelectedSearchOption(data)}
            name="UserName"
            sx={{
              width: "40%",
            }}
            isLoading={userData?.length === 0}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search by User Name"
                onChange={handleChange}
                InputProps={{
                  ...params.InputProps,
                  style: { borderRadius: "50px" },
                  startAdornment: (
                    <>
                      <SearchIcon />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                  endAdornment: null,
                }}
              />
            )}
          />
        </Box>
      </Grid>
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
              value={states}
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
                {adminTimeSheetData?.numberOfElements
                  ? adminTimeSheetData.numberOfElements
                  : "0"}
                /
                {adminTimeSheetData?.totalElements
                  ? adminTimeSheetData.totalElements
                  : "0"}
              </b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
