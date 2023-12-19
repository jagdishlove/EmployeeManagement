import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalLeaveDatesAction } from "../../../redux/actions/leaves/approvalLeaveAction";
import Dropdown from "../../forms/dropdown/dropdown";
import { adminHeaderStyle } from "../approvalTimesheets/adminHeaderStyle";

const ApprovalLeaveHeader = ({
  dateChangeHandler,
  dateData,
  TeamMemberData,
  teamMemberSelectHandler,
  handleCalendarClick

}) => {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const dispatch = useDispatch();

  const dates = useSelector(
    (state) =>
      state?.nonPersist?.approvalLeavesData?.approvalLeaveDatesData
        ?.dateRangeDto
  );

  const { content } = useSelector(
    (state) => state.nonPersist.approvalLeavesData.approvalLeaveTeamMemberData
  );

  const [getTeamMembersFromApi, setGetTeamMembersFromApi] = useState([]);

  const teamMemberOptions = [
    { id: "All", firstName: "All" },
    ...(getTeamMembersFromApi || []),
  ];

  useEffect(() => {
    setGetTeamMembersFromApi(content);
  }, [content]);

  useEffect(() => {
    dispatch(getApprovalLeaveDatesAction());
  }, [dispatch]);

  return (
    <div>
      <Box style={{ ...style.LeaveHeader }}>
        <Grid
          container
          justifyContent="flex-start"
          gap={{ sm: 1, md: 1, lg: 1, xs: 1 }}
        >
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography sx={{ color: "#ffffff" }}>Period</Typography>
           
            <FormControl style={{ background: "white" }} fullWidth>
              <Select
                value={dateData}
                onChange={dateChangeHandler}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                {dates?.map((option) => (
                  <MenuItem
                    key={option.name}
                    value={option.value}
                    onClick={option.name === "Calender" ? handleCalendarClick : undefined}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "rgb(0 128 128 / 68%)",
                      },
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography sx={{ color: "#ffffff" }}>Team Member</Typography>
            <Dropdown
              options={teamMemberOptions} // Pass any additional options if needed
              value={TeamMemberData}
              onChange={teamMemberSelectHandler} // Pass the onChange dates
              title=""
              dropdownName="teamMember" // Pass the dropdown name
              style={{ background: "white" }}
              approve={true}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ApprovalLeaveHeader;
