import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectListAction } from "../../../redux/actions/approvals/projectListAction";
import { teamMemberListAction } from "../../../redux/actions/approvals/teamMemberListAction";
import { getTimesheetEntryApprovalAction } from "../../../redux/actions/timeSheet/timeSheetAction";
import { dateOptions, formatDateForApi } from "../../../utils/dateOptions";
import Dropdown from "../../forms/dropdown/dropdown";
import { adminHeaderStyle } from "./adminHeaderStyle";

const AdminSubHeader = ({
  setSelectedDate,
  selectedDate,
  setProjects,
  setTeamMember,
  projects,
  teamMember,
  newDateDashboard,
  setNewDateDashboard,
}) => {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const dispatch = useDispatch();
  const [getTeamMembersFromApi, setGetTeamMembersFromApi] = useState([]);
  const [getProjectListFromApi, setGetProjectListFromApi] = useState([]);

  const projectOptions = getProjectListFromApi
    ? [{ id: "All", projectName: "All" }, ...getProjectListFromApi]
    : [];
  const teamMemberOptions = getTeamMembersFromApi
    ? [{ id: "All", firstName: "All" }, ...getTeamMembersFromApi]
    : [];
  const projectList = useSelector(
    (state) => state?.nonPersist?.projectListData?.data
  );
  const teamMemberList = useSelector(
    (state) => state?.nonPersist?.teamMemberList?.teamMemberList
  );

  const approvalData = useSelector(
    (state) => state?.nonPersist?.timesheetData?.approvalTimesheetData
  );

  useEffect(() => {
    dispatch(projectListAction());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDate) {
      const data = {
        date:
          newDateDashboard === "All" ? "" : formatDateForApi(newDateDashboard),
        projectId: projects === "All" ? "" : projects || "",
        empId: teamMember === "All" ? "" : teamMember || "",
      };
      dispatch(getTimesheetEntryApprovalAction(data));
    }
  }, [projects, teamMember, projects, selectedDate]);

  useEffect(() => {
    setGetProjectListFromApi(projectList);
    setGetTeamMembersFromApi(teamMemberList);
  }, [projectList, teamMemberList]);

  const handleDateChange = (event) => {
    const { value } = event.target;

    setTeamMember("All");
    setNewDateDashboard(value);

    if (projects === "All") {
      setSelectedDate(value);
      return;
    }
    dispatch(
      teamMemberListAction({
        projectId: projects,
        timesheetDate: formatDateForApi(value),
      })
    );

    setSelectedDate(value);

    // Handle date change logic here // Selected date value
  };

  const handleProjectChange = (event) => {
    const { value } = event.target;
    if (value === "All") {
      setProjects(value);
      setGetTeamMembersFromApi([]);
      setTeamMember("");
    } else {
      setProjects(value);
      const payload = {
        projectId: value === "All" ? "" : value,
        timesheetDate: formatDateForApi(selectedDate),
      };
      dispatch(teamMemberListAction(payload));
      setTeamMember("All");
    }
    setProjects(value);
    if (value === "All") {
      setTeamMember("All");
    }

    const payload = {
      timesheetDate: formatDateForApi(selectedDate),
      projectId: value === "All" ? "" : value,
    };
    dispatch(teamMemberListAction(payload));
    // Handle date change logic here // Selected date value
  };

  const handleTeamMemberChange = (event) => {
    const { value } = event.target;
    if (value === "All") {
      setTeamMember("");
    }
    setTeamMember(value);
    // Handle date change logic here // Selected date value
  };

  return (
    <div>
      <Box style={{ ...style.adminSubHeader }}>
        <Grid container gap={{ sm: 0, md: 0, lg: 2, xs: 2 }}>
          <Grid item xs={12} sm={4} md={2} lg={4}>
            <Dropdown
              options={[{ id: "All", value: "All" }, ...dateOptions()]} // Add "All" option to the date dropdown
              value={newDateDashboard} // Pass the current selected value
              onChange={handleDateChange} // Pass the onChange function
              dropdownName="Date" // Pass the dropdown name
              title="Date"
              style={style.DateTimesheetDateTextField} // Pass any additional style
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Dropdown
              options={projectOptions} // Pass any additional options if needed
              value={projects} // Pass the current selected value
              onChange={handleProjectChange} // Pass the onChange function
              title="Project"
              dropdownName="Projects" // Pass the dropdown name
              style={style.TimesheetDateTextField} // Pass any additional style
              approve={true}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Dropdown
              options={teamMemberOptions} // Pass any additional options if needed
              value={teamMember || "All"}
              onChange={handleTeamMemberChange} // Pass the onChange function
              title="Team Member"
              dropdownName="teamMember" // Pass the dropdown name
              style={style.TimesheetDateTextField} // Pass any additional style
              approve={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3} margin={"auto"}>
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
                {approvalData?.numberOfElements
                  ? approvalData.numberOfElements
                  : "0"}
                /
                {approvalData?.totalElements ? approvalData.totalElements : "0"}
              </b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminSubHeader;
