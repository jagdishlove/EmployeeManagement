import React, { useEffect ,useState } from "react";
import {
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyProjectsList({ ccurrentPage, setcCurrentPage }) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState([]);

  const navigate = useNavigate();

  const reportees = useSelector(
    (state) => state?.persistData?.workSpace?.reports || []
  );

  const reporteesPages = useSelector(
    (state) => state?.persistData?.workSpace?.reports || []
  );

  useEffect(() => {
    // Retrieve current page from local storage
    const storedPage = localStorage.getItem("ccurrentPage");
    if (storedPage) {
      setcCurrentPage(Number(storedPage));
    }
  }, [setcCurrentPage]);

  useEffect(() => {
    // Store current page in local storage whenever it changes
    localStorage.setItem("ccurrentPage", ccurrentPage);
  }, [ccurrentPage]);

  const toggleRowExpansion = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
      setExpandedProjects([]);
    }
  };

  const toggleProjectExpansion = (index) => {
    if (expandedProjects.includes(index)) {
      setExpandedProjects(
        expandedProjects.filter((projectIndex) => projectIndex !== index)
      );
    } else {
      setExpandedProjects([...expandedProjects, index]);
      setExpandedRows([]);
    }
  };

  const toggleViewLess = (index) => {
    setExpandedProjects(
      expandedProjects.filter((projectIndex) => projectIndex !== index)
    );
  };

  const totalPages = reporteesPages?.totalPages;

  const handlePrevPage = () => {
    if (ccurrentPage > 0) {
      setcCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (ccurrentPage < totalPages - 1) {
      setcCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleNavigate = (id) => {
    localStorage.setItem("ccurrentPage", JSON.stringify(ccurrentPage)); 
    navigate(`/userDetailPage/${id}`);
  };

  const recordsPerPage = 7; // Number of records to display per page
  const startIndex = ccurrentPage * recordsPerPage;
  
  return (
    <Grid
      container
      spacing={2}
      mt={3}
      sx={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "5px",
      }}
    >
      {totalPages > 0 && (
        <Grid container justifyContent="flex-end">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography variant="body1" sx={{ color: "#5E5E5E" }}>
              {ccurrentPage + 1} of {totalPages} Pages
            </Typography>
            <IconButton onClick={handlePrevPage} disabled={ccurrentPage === 0}>
              <KeyboardArrowLeftOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={handleNextPage}
              disabled={ccurrentPage === totalPages - 1}
            >
              <ChevronRightOutlinedIcon />
            </IconButton>
          </Stack>
        </Grid>
      )}
      <Grid container>
        <TableContainer
          component={Paper}
          sx={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Table
            sx={{
              borderTop: "1px solid #DADADA",
            }}
          >
            <TableHead >
              <TableRow >
                <TableCell
                  style={{ fontSize: "18px" }}
                >
                  <strong>S.No</strong>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }} >
                  <strong>Full Name</strong>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <strong>Designation</strong>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <strong>Skills</strong>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <strong>Mobile No</strong>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <strong>Reporting Manager</strong>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <strong>Project Name</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                textAlign: "center",
              }}
            >
              {reportees?.content?.length > 0 ? (
                <>
                  {reportees?.content?.map((row, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell style={{ fontSize: "16px" }}>{startIndex + index + 1}</TableCell>
                        <TableCell>
                        <Button
                            onClick={() => handleNavigate(row.id)}
                          >
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item sx={6}>
                              {row?.fileStorage ? (
                                <Avatar
                                  alt="Profile Picture"
                                  src={`data:image/png;base64,${row?.fileStorage?.data}`}
                                  sx={{
                                    border: "2px solid #A4A4A4",
                                  }}
                                />
                              ) : (
                                <Avatar
                                  sx={{
                                    color: "#fff",
                                    backgroundColor: " #4813B8",
                                  }}
                                >
                                  {row?.firstName?.charAt(0)}
                                </Avatar>
                              )}
                            </Grid>
                            <Grid item sx={6} style={{ fontSize: "16px", color:  "#1475E7", textDecoration:"underline" , textTransform: "none"}}>
                              {row?.firstName} {row?.lastName}
                            </Grid>
                          </Grid>
                          </Button>
                        </TableCell>
                        <TableCell style={{ fontSize: "16px" }}>{row?.designation}</TableCell>
                        <TableCell>
                          {row.employeeSkillMapping?.length > 0 && (
                            <Grid
                              sx={{
                                border: "1px solid #F3F3F3",
                                borderRadius: "5px",
                                backgroundColor: "#F3F3F3",
                                display: "flex", // Ensure items are laid out in a row
                                flexWrap: "nowrap", // Prevent items from wrapping
                                width: "210px",
                              }}
                            >
                              {row.employeeSkillMapping
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
                              {row.employeeSkillMapping.length > 1 && (
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
                                      <KeyboardArrowUpIcon />
                                    ) : (
                                      <KeyboardArrowDownIcon />
                                    )}
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          )}
                        </TableCell>

                        <TableCell style={{ fontSize: "16px" }}>{row?.phoneNumber}</TableCell>
                        <TableCell style={{ fontSize: "16px" }}>
                          {row?.managerFirstName} {row?.managerLastName}
                        </TableCell>
                        <TableCell sx={{ fontSize: "16px" }}>
                          <Box
                            sx={{
                              border: "1px solid #F3F3F3",
                              borderRadius: "5px",
                              backgroundColor: "#F3F3F3",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: {
                                xs: "100%", // Full width on small screens
                                sm: "250px", // Specific width on medium and larger screens
                                md: "200px",
                              },
                              height: "40px",
                              padding: "0 8px",
                            }}
                          >
                            <Box
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                              }}
                            >
                              {row?.projectName?.map((project, projectIndex) => (
                                <Typography
                                  key={projectIndex}
                                  sx={{
                                    marginLeft: projectIndex === 0 ? 0 : "3px",
                                    display: projectIndex < 1 ? "block" : "none", // Hide extra projects initially
                                    fontSize: "inherit",
                                  }}
                                >
                                  {project}
                                </Typography>
                              ))}
                            </Box>
                            {/* Conditionally render the button */}
                            {row.projectName.length > 1 && (
                              <Button
                                variant="text"
                                onClick={() => toggleProjectExpansion(index)}
                                sx={{
                                  fontSize: "20px",
                                  color: "#1475E7",
                                  paddingRight: "8px",
                                  minWidth: "auto", // Adjust button width to fit content
                                }}
                              >
                                {expandedProjects.includes(index) ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                  
                      </TableRow>
                      {expandedProjects.includes(index) && row.projectName.length > 1 ? (
                        <TableRow sx={{ border: "5px solid #EBEBEB" }}>
                          <TableCell colSpan={8}>
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="space-between"
                              sx={{
                                // border: "1px solid #EBEBEB",
                                backgroundColor: "#fff",
                                padding: "5px",
                              }}
                            >
                              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                {row.projectName.slice(1).join(", ")}
                              </Typography>
                              <Button
                                variant="text"
                                onClick={() => toggleViewLess(index)}
                                style={{ fontSize: "12px", color: "black" }}
                              >
                                <span style={{ marginRight: "5px" }}>View Less</span>
                                <KeyboardArrowUpIcon style={{ color: "#008080", marginLeft: "5px" }} />
                              </Button>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ) : null}

                      {expandedRows.includes(index) && (
                        <TableRow sx={{ border: "5px solid #EBEBEB" }}>
                          <TableCell colSpan={8}>
                            <Grid sx={{ backgroundColor: "#fff" }}>
                              {row?.employeeSkillMapping
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
                                        {employeeSkill.rating || 0}
                                      </>
                                    )}
                                  </Grid>
                                ))}
                              {row.employeeSkillMapping?.length > 1 && (
                                <Grid container xs={1.5} justifyContent="flex-end" style={{ marginLeft: "auto" }}>
                                  <Button onClick={() => toggleRowExpansion(index)}>
                                    {expandedRows.includes(index) ? (
                                      <>
                                        <span style={{ fontSize: "12px", color: "#000000" }}>View Less</span>
                                        <KeyboardArrowUpIcon style={{ color: "#008080", marginLeft: "5px" }} />
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
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box
                      colSpan={6}
                      mt={5}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Typography>Project Data Not Found</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
