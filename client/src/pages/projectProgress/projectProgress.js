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
  CircularProgress,
} from "@mui/material";
import WorkspaceProjectsTab from "./projectsTab/workspaceProjectsTab";
import WorkspaceEffortsTab from "./effortsTab/workspaceEffortsTab";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import { Stack, IconButton } from "@mui/material";
import TeamMemebrs from "../../assets/Team_Members.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectListAction } from "../../redux/actions/workSpace/workSpaceAction";
import {
  dashboardProjectDetailsAction,
  dashboardProjectResourcesAction,
} from "../../redux/actions/dashboard/project/dashboardProjectAction";
import Select, { components } from "react-select";
import smileAnimated from "../../assets/No_Data_found.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [showNoDataMessage, setShowNoDataMessage] = useState(null);

  const { dashboardProjectResources } = useSelector(
    (state) => state?.persistData?.dashboardProjectdetails
  );


  var { dashboardProjectdetailsLoading } = useSelector(
    (state) => state?.persistData?.dashboardProjectdetails
  );

  const { projectList, projectListLoading } = useSelector(
    (state) => state?.persistData?.workSpace
  );

  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data.role
  );

  localStorage.setItem("selectedTabIndex", 0);

  const superAdmin = role?.includes("SUPERADMIN");

  useEffect(() => {
    dispatch(getAllProjectListAction());
  }, []);

  const [project, setProject] = useState(null);
  // const [loading, setIsLoading] = useState(false);
  const params = {
    page: currentPage,
    size: 3,
  };
  let storedProject = localStorage.getItem("selectedProject");
  storedProject = JSON.parse(storedProject);
  useEffect(() => {
    // setIsLoading(true);
    if (projectList?.length > 0 && !storedProject) {
      // setIsLoading(false);
      setProject(projectList[0]);
    } else {
      // setIsLoading(false);
      setProject(storedProject);
    }
  }, [projectList]);

  useEffect(() => {
    if (project) {
      dispatch(dashboardProjectResourcesAction(project?.id, params));
      // setDataLoaded(true);
    }
  }, [projectList, currentPage, project]);

  const handleProjectListChnage = (selectedOption) => {
    if (selectedOption.id !== project.id) {
      setExpandedRows([]);
    }
    setProject(selectedOption);
    localStorage.setItem("selectedProject", JSON.stringify(selectedOption));
  };

  useEffect(() => {
    if (project) {
      // Simulating fetching project details
      setTimeout(() => {
        dashboardProjectdetailsLoading;
      }, 500);
    }
  }, [project]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const totalPages = dashboardProjectResources?.totalPages;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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

  const Navigate = useNavigate();

  const handleNavigate = () => {
    Navigate(`/EditForm/${project?.id}`);
  };

  useEffect(() => {
    if (project) {
      dispatch(dashboardProjectDetailsAction(project.id)).then((response) => {
        if (response) {
          setShowNoDataMessage(
            !response?.startDate ||
              !response?.endDate ||
              !response?.totalResources
          );
        }
      });
    }
  }, [project]);

  // Check if any of the required fields are missing or null

  const recordsPerPage = 3; // Number of records to display per page
  const startIndex = currentPage * recordsPerPage;

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
              disabled={dashboardProjectdetailsLoading}
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
            {projectListLoading ? (
              <Grid
                container
                spacing={0}
                mt={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
              </Grid>
            ) : showNoDataMessage ? (
              <Grid
                container
                spacing={0}
                mt={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  container
                  spacing={0}
                  mt={1}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    backgroundColor: "#fff",
                    height: "400px",
                  }}
                >
                  <Lottie
                    animationData={smileAnimated}
                    loop
                    autoplay
                    style={{
                      color: "yellow",
                      width: "100px",
                    }}
                  />

                  <Typography
                    mt={5}
                    sx={{
                      color: "#B2B2B2",
                      fontSize: "28px",
                    }}
                  >
                    No Data Present
                  </Typography>

                  <Typography
                    mt={5}
                    sx={{
                      color: "#B2B2B2",
                      fontSize: "22px",
                    }}
                  >
                    Project Data is mandatory to view the progress in dashboard
                  </Typography>
                  <Grid
                    container
                    justifyContent="flex-end"
                    sx={{
                      textAlign: "right",
                      color: "#1475E7",
                      fontSize: "18px",
                      textDecoration: "underline",
                      textDecorationColor: "#1475E7",
                    }}
                  >
                    {superAdmin ? (
                      <>
                        <Typography mt={5} mr={4} onClick={handleNavigate}>
                          Complete The Data For {project?.projectName}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography mt={5} mr={4}>
                          Contact Admin to Complete The Data For{" "}
                          {project?.projectName}
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <>
                <WorkspaceProjectsTab project={project} />
              </>
            )}
          </TabPanel>
          <TabPanel>
            <WorkspaceEffortsTab project={project?.id} role={project?.role} />
          </TabPanel>
        </Tabs>
      </Box>

      {projectListLoading ? (
        <></>
      ) : showNoDataMessage ? (
        <></>
      ) : (
        <>
          <Grid
            container
            mt={"10px"}
            sx={{
              padding: "20px",
              boxShadow: "2",
              marginRight: "10px",
              backgroundColor: "#FFFFFF",
              borderRadius: "5px",
            }}
          >
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                <img src={TeamMemebrs} />
                <Typography
                  margin={2}
                  variant="h5"
                  style={{ fontWeight: "600" }}
                >
                  {" "}
                  Team Members
                </Typography>
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

            <TableContainer component={Paper} sx={{ overflowY: "auto" }}>
              <Table style={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "600",
                        width: "10%",
                        fontSize: "18px",
                      }}
                    >
                      S.No
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "600",
                        width: "30%",
                        fontSize: "18px",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "600",
                        width: "20%",
                        fontSize: "18px",
                      }}
                    >
                      Designation
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "600",
                        width: "35%",
                        fontSize: "18px",
                      }}
                    >
                      Skills
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "600",
                        width: "20%",
                        fontSize: "18px",
                      }}
                    >
                      Total No. of Hours
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "600",
                        width: "20%",
                        fontSize: "18px",
                      }}
                    >
                      Logged In Hours
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: "600",
                        width: "20%",
                        fontSize: "18px",
                      }}
                    >
                      Hours Left
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardProjectResources?.content?.map((row, index) => (
                    <React.Fragment key={row.resourceId}>
                      <TableRow>
                        <TableCell style={{ fontSize: "16px" }}>
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              {row?.fileStorage ? (
                                <>
                                  <Avatar
                                    alt="Profile Picture"
                                    src={`data:image/png;base64,${row?.fileStorage?.data}`}
                                    sx={{
                                      border: "2px solid #A4A4A4",
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  <Avatar
                                    sx={{
                                      color: "#fff",
                                      backgroundColor: " #4813B8",
                                    }}
                                  >
                                    {row?.employeeName.charAt(0)}
                                  </Avatar>
                                </>
                              )}
                            </Grid>
                            <Grid item style={{ fontSize: "16px" }}>
                              {row.employeeName}
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell style={{ fontSize: "16px" }}>
                          {row.designation}
                        </TableCell>
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
                                      alignItems="center"
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
                                    </Grid>
                                  ))}
                                {row.employeeSkills.length > 2 && (
                                  <Grid
                                    item
                                    xs={2}
                                    alignItems="center"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                      marginLeft: "auto",
                                    }}
                                  >
                                    <Button
                                      onClick={() => toggleRowExpansion(index)}
                                      style={{ justifyContent: " flexEnd" }}
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

                        <TableCell style={{ fontSize: "16px" }}>
                          {row.occupancyHours}
                        </TableCell>

                        <TableCell style={{ fontSize: "16px" }}>
                          {" "}
                          {row.loggedInHours}{" "}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              position: "relative",
                              display: "inline-flex",
                            }}
                          >
                            <CircularProgressbar
                              value={row.hoursLeft}
                              styles={{
                                root: { width: "80px" },
                                path: {
                                  stroke:
                                    parseInt(row.loggedInHours) >
                                    parseInt(row.occupancyHours)
                                      ? "#FF0000"
                                      : "#4CAF50",
                                },
                                text: { fontSize: "14px", fill: "#000" },
                              }}
                            />
                            <Box
                              sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                variant="caption"
                                component="div"
                                style={{
                                  lineHeight: "15px",
                                  fontWeight: "bold",
                                }}
                              >
                                {`${Math.abs(row.hoursLeft.split(" ")[0])} Hrs`}
                                <br />
                                {`${Math.abs(
                                  row.hoursLeft.split(" ")[2]
                                )} Mins`}
                                <br />
                                {parseFloat(row.loggedInHours) >
                                parseFloat(row.occupancyHours)
                                  ? "exceed"
                                  : "left"}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                      {expandedRows.includes(index) && (
                        <TableRow sx={{ border: "5px solid #EBEBEB" }}>
                          <TableCell colSpan={7}>
                            <Grid container>
                              {expandedRows.includes(index) &&
                                row.employeeSkills
                                  .slice(1)
                                  .map((employeeSkill, skillIndex) => (
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
                                        {employeeSkill?.rating || 0}
                                      </>
                                    </Grid>
                                  ))}

                              {row.employeeSkills?.length > 1 && (
                                <Grid
                                  container
                                  justifyContent="flex-end"
                                  display={"flex"}
                                  flexDirection={"row"}
                                >
                                  <Button
                                    style={{
                                      padding: "0px",
                                    }}
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
        </>
      )}
    </Grid>
  );
};

export default ProjectProgress;
