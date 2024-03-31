import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import Box from "@mui/material/Box";
import {
  Avatar,
  Grid,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import WorkspaceProjectsTab from "./projectsTab/workspaceProjectsTab";
import WorkspaceEffortsTab from "./effortsTab/workspaceEffortsTab";
import Dropdown from "../../components/forms/dropdown/dropdown";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import { Stack, IconButton } from "@mui/material";
import TeamMemebrs from "../../assets/Team Members.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectListAction } from "../../redux/actions/workSpace/workSpaceAction";
import { dashboardProjectResourcesAction } from "../../redux/actions/dashboard/project/dashboardProjectAction";
import { TimesheetStyle } from "../timesheet/timesheetStyle";
const ProjectProgress = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const { dashboardProjectResources } = useSelector(
    (state) => state?.nonPersist?.dashboardProjectdetails
  );

  useEffect(() => {
    
    dispatch(getAllProjectListAction());
  }, []);

  const projectList = useSelector(
    (state) => state?.nonPersist?.workSpace?.projectList
  );
  const [project, setProject] = useState(
    projectList.length > 0 ? projectList[0].id : ""
  );

  useEffect(() => {
    if (project) {
      dispatch(dashboardProjectResourcesAction(project));
    }
  }, [project]);

  const handleProjectListChnage = (e) => {
    const { value } = e.target;
    setProject(value);
  };
  
  const totalPages = 3;

  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Project Progress Dashboard
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Dropdown
            title="Projects"
            options={projectList}
            value={project}
            dropdownName="Projects" // Pass the dropdown name
            onChange={handleProjectListChnage}
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              width: "90%",
              marginRight: "5%",
              borderRadius: "5px",
            }}
            labelKey="projectName"
            valueKey="id"
          />
        </Grid>
      </Grid>
      <div
        style={{
          width: "100%",

          margin: "15px 0px",
          border: "1px solid #C0C0C0",
        }}
      />

      <Box sx={{ width: "100%" }}>
        <Tabs>
          <TabList
            style={{
              borderBottom: "none",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Tab style={{ borderRadius: " 5px" }}>Projects</Tab>
            <Tab style={{ borderRadius: " 5px" }}>Efforts</Tab>
          </TabList>
          <TabPanel>
            <WorkspaceProjectsTab project={project} />
          </TabPanel>
          <TabPanel>
            <WorkspaceEffortsTab project={project} />
          </TabPanel>
        </Tabs>
      </Box>
      <Grid
        container
        mt={"20px"}
        sx={{
          padding: "20px",
          boxShadow: "2",
          marginRight: "10px",
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6} display={"flex"} flexDirection={"row"}>
            <img src={TeamMemebrs} />
            <Typography margin={2}> Timesheet Breakdown</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="flex-end">
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography variant="body1" sx={{ color: "#5E5E5E" }}>
                  {currentPage + 1} of {totalPages}Pages
                </Typography>
                <IconButton
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  <KeyboardArrowLeftOutlinedIcon />
                </IconButton>

                <IconButton
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                >
                  <ChevronRightOutlinedIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Skills</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Total No. of Hours
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Logged In Hours
                </TableCell>

                <TableCell style={{ fontWeight: "bold" }}>Hours Left</TableCell>

                {/* Add more TableCells for additional columns */}
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardProjectResources?.content?.map((row) => (
                <TableRow key={row.resourceId}>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Avatar src={row.image} />
                      </Grid>
                      <Grid item>{row.employeeName}</Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    {row.employeeSkills.length > 0 && (
                      <Grid
                        container
                        sx={{
                          border: "1px solid ##F3F3F3",
                          borderRadius: "5px",
                          backgroundColor: "#F3F3F3",
                          overflow: "auto",
                        }}
                      >
                        {row.employeeSkills
                          .slice(0, expanded ? row.employeeSkills.length : 3) // Slice the array based on expansion state
                          .map((employeeSkill, index) => (
                            <Grid
                              item
                              key={index}
                              sx={{
                                border: "1px solid #AEAEAE",
                                borderRadius: "8px",
                                padding: "4px",
                                margin: "5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                color: "#000000",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              <React.Fragment key={index}>
                                {index > 0 && ""}
                                <span style={{ color: "black" }}>
                                  {employeeSkill.skillName}
                                </span>{" "}
                                {employeeSkill.rating && (
                                  <>
                                    <StarOutlinedIcon
                                      style={{
                                        backgroundColor:
                                          employeeSkill.rating < 5
                                            ? "#90DC90"
                                            : employeeSkill.rating >= 5 &&
                                              employeeSkill.rating <= 7
                                            ? "#E6E62C"
                                            : "#E38F75",
                                        color: "#ffff",
                                        borderRadius: "50%",
                                        width: 15,
                                        height: 15,
                                        marginTop: 0,
                                        marginLeft: 2,
                                        marginRight: 2,
                                      }}
                                    />
                                    {employeeSkill.rating}
                                  </>
                                )}
                              </React.Fragment>
                            </Grid>
                          ))}
                        {row.employeeSkills.length > 2 && ( // Render expand/collapse button
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              marginLeft: "auto", // Pushes the button to the right
                            }}
                          >
                            <Button onClick={toggleExpand}>
                              {expanded ? (
                                <>
                                  View Less
                                  <KeyboardArrowUpIcon />
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <KeyboardArrowDownIcon />
                                </>
                              )}
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    )}
                  </TableCell>

                  <TableCell>{row.occupancyHours}</TableCell>

                  <TableCell>{row.loggedInHours}</TableCell>
                  <TableCell>
                    <CircularProgressbar
                      value={row.hoursLeft} // Assuming `row.hoursLeft` is a numerical value
                      text={`${row.hoursLeft} hrs left`}
                      styles={{
                        root: { width: "70px" },
                        path: { stroke: "#4CAF50" },
                        text: { fontSize: "10px", fill: "#000" },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default ProjectProgress;
