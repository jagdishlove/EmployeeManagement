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
  FormControl,
} from "@mui/material";
import WorkspaceProjectsTab from "./projectsTab/workspaceProjectsTab";
import WorkspaceEffortsTab from "./effortsTab/workspaceEffortsTab";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import { Stack, IconButton } from "@mui/material";
import TeamMemebrs from "../../assets/Team Members.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectListAction } from "../../redux/actions/workSpace/workSpaceAction";
import { dashboardProjectResourcesAction } from "../../redux/actions/dashboard/project/dashboardProjectAction";
import Select, { components } from "react-select";

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box>{children}</Box>
      </Box>
    </components.Option>
  );
};

const ProjectProgress = () => {
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const { dashboardProjectResources } = useSelector(
    (state) => state?.nonPersist?.dashboardProjectdetails
  );

  useEffect(() => {
    dispatch(getAllProjectListAction());
  }, []);

  const projectList = useSelector(
    (state) => state?.nonPersist?.workSpace?.projectList
  );
  console.log("projectList", projectList);
  const [project, setProject] = useState(
    projectList.length > 0 ? projectList[0] : ""
  );

  useEffect(() => {
    if (projectList?.length > 0) {
      setProject(projectList[0]);
      dispatch(dashboardProjectResourcesAction(projectList[0]?.id));
    }
  }, [projectList]);

  const handleProjectListChnage = (selectedOption) => {
    setProject(selectedOption);
    dispatch(dashboardProjectResourcesAction(selectedOption?.id));
  };

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

  const rowsPerPage = 3; // Number of rows per page
  const totalRows = dashboardProjectResources?.content?.length || 0;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = Math.min(
    startIndex + rowsPerPage,
    dashboardProjectResources?.content?.length
  );

  const toggleRowExpansion = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const CustomMenu = (props) => {
    const { children } = props;

    return <components.Menu {...props}>{children}</components.Menu>;
  };

  useEffect(() => {
    // Add class to body tag when component mounts
    document.body.classList.add("project-progress-body");
    // Remove class from body tag when component unmounts
    return () => {
      document.body.classList.remove("project-progress-body");
    };
  }, []);

  return (
    <Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Project Progress Dashboard
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth style={{ borderRadius: "5px" }}>
            <Select
              isSearchable={false}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              onChange={handleProjectListChnage}
              options={projectList}
              value={project}
              isClearable={false}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.projectName}
              isLoading={projectList?.length === 0}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  overflow: "auto",
                  height: "55px",
                }),
              }}
              components={{
                Option: (props) => <InputOption {...props} project={project} />,
                Menu: CustomMenu,
                MultiValueRemove: () => null,
              }}
            />
          </FormControl>
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
        <Tabs
          selectedIndex={activeTab}
          onSelect={(index) => setActiveTab(index)}
        >
          <TabList
            style={{
              borderBottom: "none",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Tab
              style={{
                borderRadius: " 5px",
                backgroundColor: activeTab === 0 ? "#008080" : "#FFFFFF",
                color: activeTab === 0 ? "#ffffff" : "#808080",
              }}
            >
              Projects
            </Tab>
            <Tab
              style={{
                borderRadius: " 5px",
                backgroundColor: activeTab === 1 ? "#008080" : "#FFFFFF",
                color: activeTab === 1 ? "#ffffff" : "#808080",
              }}
            >
              Efforts
            </Tab>
          </TabList>
          <TabPanel>
            <WorkspaceProjectsTab project={project?.id} />
          </TabPanel>
          <TabPanel>
            <WorkspaceEffortsTab project={project?.id} role={project?.role} />
          </TabPanel>
        </Tabs>
      </Box>
      {/* <Outlet /> */}
      <Grid
        container
        mt={"20px"}
        sx={{
          padding: "20px",
          boxShadow: "2",
          marginRight: "10px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6} display={"flex"} flexDirection={"row"}>
            <img src={TeamMemebrs} />
            <Typography margin={2}> Timesheet Members</Typography>
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
                  {currentPage + 1} of {totalPages} Pages
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
          <Table style={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", width: "30%" }}>
                  Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: "20%" }}>
                  Designation
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: "30%" }}>
                  Skills
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: "20%" }}>
                  Total No. of Hours
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: "20%" }}>
                  Logged In Hours
                </TableCell>

                <TableCell style={{ fontWeight: "bold", width: "20%" }}>
                  Hours Left
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardProjectResources?.content
                ?.slice(startIndex, endIndex)
                .map((row, index) => (
                  <React.Fragment key={row.resourceId}>
                    <TableRow>
                      <TableCell>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <Avatar
                              sx={{
                                color: "#fff",
                                backgroundColor: " #4813B8",
                              }}
                            >
                              {row?.employeeName.charAt(0)}
                            </Avatar>
                          </Grid>
                          <Grid item>{row.employeeName}</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>{row.designation}</TableCell>
                      <TableCell
                        style={{
                          maxWidth: "240px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row.employeeSkills?.length > 0 && (
                          <React.Fragment>
                            <Grid
                              container
                              sx={{
                                border: "1px solid #F3F3F3",
                                borderRadius: "5px",
                                backgroundColor: "#F3F3F3",
                                overflow: "auto",
                              }}
                            >
                              {row.employeeSkills
                                .slice(0, 1)
                                .map((employeeSkill, skillIndex) => (
                                  <Grid
                                    item
                                    key={skillIndex}
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
                                  </Grid>
                                ))}
                              {row.employeeSkills.length > 0 && (
                                <Grid
                                  item
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    marginLeft: "auto",
                                  }}
                                >
                                  <Button
                                    onClick={() => toggleRowExpansion(index)}
                                  >
                                    {expandedRows.includes(index) ? (
                                      <>
                                        <KeyboardArrowUpIcon />
                                      </>
                                    ) : (
                                      <>
                                        <KeyboardArrowDownIcon />
                                      </>
                                    )}
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          </React.Fragment>
                        )}
                      </TableCell>

                      <TableCell>{row.occupancyHours}</TableCell>

                      <TableCell> {row.loggedInHours.split(" ")[0]} </TableCell>
                      <TableCell>
                        <CircularProgressbar
                          value={row.hoursLeft} // Assuming `row.hoursLeft` is a numerical value
                          text={`${row.hoursLeft.split(" ")[0]}hrs left`}
                          styles={{
                            root: { width: "80px" },
                            path: { stroke: "#4CAF50" },
                            text: { fontSize: "14px", fill: "#000" },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    {expandedRows.includes(index) && (
                      <TableRow sx={{ border: "5px solid #EBEBEB" }}>
                        <TableCell colSpan={6}>
                          <Grid sx={{ backgroundColor: "#fff" }}>
                            {expandedRows.includes(index) &&
                              row.employeeSkills.map(
                                (employeeSkill, skillIndex) => (
                                  <Grid
                                    item
                                    key={skillIndex}
                                    sx={{
                                      border: "1px solid #AEAEAE",
                                      borderRadius: "8px",
                                      padding: "4px",
                                      margin: "5px",
                                      display: "block",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                      color: "#000000",
                                      backgroundColor: "#ffffff",
                                      float: "left",
                                    }}
                                  >
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
                                  </Grid>
                                )
                              )}
                            {row.employeeSkills?.length > 1 && (
                              <Grid
                                container
                                justifyContent="flex-end"
                                display={"flex"}
                                flexDirection={"row"}
                                width={"auto"}
                              >
                                <Button
                                  style={{ padding: "0px" }}
                                  onClick={() => toggleRowExpansion(index)}
                                >
                                  {expandedRows.includes(index) ? (
                                    <>
                                      View Less
                                      <KeyboardArrowUpIcon />
                                    </>
                                  ) : (
                                    <>
                                      <KeyboardArrowDownIcon />
                                    </>
                                  )}
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProjectProgress;
