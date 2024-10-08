import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deleteResourcesAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";

const AllResourcesTable = ({ handleEdit, id }) => {
  const dispatch = useDispatch();
  const allResourcesData = useSelector(
    (state) => state.persistData.projectDetails?.allResourcesData
  );

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleExpand = (resourceId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(resourceId)
        ? prevExpandedRows.filter((id) => id !== resourceId)
        : [...prevExpandedRows, resourceId]
    );
  };

  if (!allResourcesData || !Array.isArray(allResourcesData)) {
    return <p>No resources available</p>;
  }

  const projectId = useSelector(
    (state) => state.persistData.projectDetails?.projectId
  );

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={12} sm={8} md={12} lg={12}>
        {allResourcesData?.length > 0 && (
          <Typography variant="h3" gutterBottom>
            <strong> Added Project Resources</strong>
          </Typography>
        )}
        {allResourcesData?.length > 0 && (
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: "#008080",
                    color: "#ffffff",
                  }}
                >
                  <TableCell style={{ color: "#ffffff", width: "15%" }}>
                    Sl. No
                  </TableCell>
                  <TableCell style={{ color: "#ffffff", width: "25%" }}>
                    Name
                  </TableCell>
                  <TableCell style={{ color: "#ffffff", width: "20%" }}>
                    Designation
                  </TableCell>
                  <TableCell style={{ color: "#ffffff", width: "30%" }}>
                    Skill
                  </TableCell>
                  <TableCell style={{ color: "#ffffff", width: "20%" }}>
                    Occupancy Hours
                  </TableCell>
                  <TableCell
                    style={{ color: "#ffffff", width: "15%" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map through each employee data and render a row for each */}
                {allResourcesData?.map((allResources, index) => (
                  <>
                    <TableRow key={allResources.resourceId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            {allResources?.fileStorage ? (
                              <>
                                <Avatar
                                  alt="Profile Picture"
                                  src={`data:image/png;base64,${allResources?.fileStorage?.data}`}
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
                                  {allResources?.employeeName.charAt(0)}
                                </Avatar>
                                </>
                            )}
                              </Grid>
                            <Grid item xs={8} mt={1}>
                              {allResources.employeeName}
                            </Grid>
                          </Grid>
                      </TableCell>
                      <TableCell>{allResources.designation}</TableCell>
                      <TableCell
                        style={{
                          maxWidth: "240px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {allResources.employeeSkills?.length > 0 && (
                          <Grid
                            container
                            sx={{
                              border: "1px solid #F3F3F3",
                              borderRadius: "5px",
                              backgroundColor: "#F3F3F3",
                              overflow: "auto",
                            }}
                          >
                            {allResources.employeeSkills
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
                            {allResources.employeeSkills.length > 1 && (
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
                                  style={{
                                    padding: "0px",
                                    minWidth: "auto",
                                  }}
                                  onClick={() => toggleExpand(index)}
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
                        )}
                      </TableCell>

                      <TableCell>{allResources.occupancyHours}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <EditIcon
                            onClick={() =>
                              handleEdit(
                                allResources.employeeId,
                                allResources.resourceId
                              )
                            }
                          />
                        </IconButton>

                        <IconButton color="primary">
                          <DeleteIcon
                            onClick={() =>
                              dispatch(
                                deleteResourcesAction(
                                  allResources.resourceId,
                                  projectId || id
                                )
                              )
                            }
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {expandedRows.includes(index) ? (
                      <>
                        <TableRow sx={{ border: "5px solid #EBEBEB" }}>
                          <TableCell colSpan={6}>
                            <Grid container sx={{ backgroundColor: "#fff" }}>
                              {expandedRows.includes(index) &&
                                allResources.employeeSkills
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
                                        {employeeSkill.rating}
                                      </>

                                    </Grid>
                                  ))}
                            </Grid>
                            {allResources.employeeSkills?.length > 1 && (
                              <Grid
                                container
                                justifyContent="flex-end"
                                display={"flex"}
                                flexDirection={"row"}
                                width={"auto"}
                              >
                                <Button
                                  style={{ padding: "0px" }}
                                  onClick={() => toggleExpand(index)}
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
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default AllResourcesTable;
