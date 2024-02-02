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
  handleCalendarClick,
}) => {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const dispatch = useDispatch();

 



  const { getLeaveData } = useSelector(
    (state) => state.nonPersist.approvalLeavesData
  );

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
          gap={{ sm: 0, md: 2, lg: 2, xs: 2 }}
        >
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography sx={{ color: "#ffffff",fontSize:'15px' ,marginTop:"5px" }}>Period</Typography>

            <FormControl style={{ background: "white" , borderRadius:"5px"}} fullWidth>
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
                    onClick={
                      option.name === "Calender"
                        ? handleCalendarClick
                        : undefined
                    }
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
            <Typography sx={{ color: "#ffffff",fontSize:'15px',marginTop:"5px" }}>Team Member</Typography>
            <Dropdown
              options={teamMemberOptions} // Pass any additional options if needed
              value={TeamMemberData}
              onChange={teamMemberSelectHandler} // Pass the onChange dates
              title=""
              dropdownName="teamMember" // Pass the dropdown name
              style={{ background: "white", borderRadius:"5px" }}
              approve={true}
            />
          </Grid>
         
          <Grid item xs={12} sm={12} md={4} lg={5} margin={"auto"}>
          <Typography
            variant="h6"
            color={"secondary"}
            textAlign={"right"}
            sx={{ textWrap: "nowrap" }}
            marginTop={4}
            >
              <b>
                {" "}
                Total Entries{" "}
                {getLeaveData?.numberOfElements
                  ? getLeaveData.numberOfElements
                  : "0"}
                /
                {getLeaveData?.totalElements ? getLeaveData.totalElements : "0"}
              </b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ApprovalLeaveHeader;
