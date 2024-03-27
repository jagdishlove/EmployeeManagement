import React, { useEffect, useState } from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Accordion,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectDetailsAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import ProjectedHoursWatch from "./ProjectedHoursComponent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ProjectAccordion = () => {
  const [accordionDetails1, setAccordionDetails1] = useState(false);
  const [accordionDetails2, setAccordionDetails2] = useState(false);
  const [accordionDetails3, setAccordionDetails3] = useState(false);
  // State to track whether full description is shown or not
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Project Details
  const { projectDetailsData } = useSelector(
    (state) => state.nonPersist?.projectDetails
  );

  useEffect(() => {
    dispatch(getProjectDetailsAction(id));
  }, [id]);

  const handleExpand1 = () => {
    setAccordionDetails1(!accordionDetails1);
  };

  // Function to toggle full description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Calculate word count of description
  const wordCount = projectDetailsData?.description
    ? projectDetailsData.description.split(/\s+/).length
    : 0;

  const handleExpand2 = () => {
    setAccordionDetails2(!accordionDetails2);
  };

  const handleExpand3 = () => {
    setAccordionDetails3(!accordionDetails3);
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Accordion
        sx={{
          border: "1px solid #898989",
          width: "100%",
          position: "relative",
        }}
        onChange={handleExpand1}
      >
        <AccordionSummary
          sx={{
            flexDirection: "row",
            "&.Mui-focusVisible": {
              background: "none",
            },
            width: "100%",
            backgroundColor: "#008080",
            position: "relative",
          }}
        >
          {accordionDetails1 ? (
            <RemoveIcon
              color="secondary"
              sx={{
                position: "absolute", // Position the icon absolutely
                top: "10px", // Adjust the top position as needed
                right: "15px", // Adjust the right position as needed
              }}
            />
          ) : (
            <AddIcon
              color="secondary"
              sx={{
                position: "absolute", // Position the icon absolutely
                top: "10px", // Adjust the top position as needed
                right: "15px", // Adjust the right position as needed
              }}
            />
          )}
          <Typography variant="h6" color="secondary" ml={3}>
            Project Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            justifyContent={"center"}
            py={4}
            backgroundColor={"#F4FCF2"}
            borderRadius={"10px"}
            border={"1px solid #898989"}
            marginTop={"10px"}
          >
            <Grid
              container
              item
              sm={12}
              md={10}
              style={{ paddingBottom: "20px" }}
            >
              {showFullDescription ? (
                projectDetailsData?.description // Render full description
              ) : (
                <React.Fragment>
                  {projectDetailsData?.description && wordCount > 200 ? ( // Render truncated description
                    <>
                      {projectDetailsData.description
                        .split(" ")
                        .slice(0, 200)
                        .join(" ")}
                      ...
                    </>
                  ) : (
                    projectDetailsData?.description
                  )}
                </React.Fragment>
              )}
              {projectDetailsData?.description &&
                wordCount > 200 && ( // Render button only if description is long
                  <Button
                    onClick={toggleDescription}
                    color="primary"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      marginLeft: "auto",
                      border: "1px solid black",
                    }}
                  >
                    {showFullDescription ? "View Less" : "View More"}
                  </Button>
                )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          border: "1px solid #898989",
          width: "100%",
          position: "relative",
        }}
        onChange={handleExpand2}
      >
        <AccordionSummary
          sx={{
            flexDirection: "row",
            "&.Mui-focusVisible": {
              background: "none",
            },
            width: "100%",
            backgroundColor: "#008080",
            position: "relative",
          }}
        >
          {accordionDetails2 ? (
            <RemoveIcon
              color="secondary"
              sx={{
                position: "absolute", // Position the icon absolutely
                top: "10px", // Adjust the top position as needed
                right: "15px", // Adjust the right position as needed
              }}
            />
          ) : (
            <AddIcon
              color="secondary"
              sx={{
                position: "absolute", // Position the icon absolutely
                top: "10px", // Adjust the top position as needed
                right: "15px", // Adjust the right position as needed
              }}
            />
          )}
          <Typography variant="h6" color="secondary" ml={3}>
            Project Resources
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "20px " }}>
          <Grid
            container
            py={4}
            backgroundColor={"#F4FCF2"}
            borderRadius={"10px"}
            border={"1px solid #898989"}
          >
            <Grid
              container
              justifyContent={"center"}
              py={1}
              backgroundColor={"#F4FCF2"}
            >
              <Grid item sm={12} md={10}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "10px",
                  }}
                >
                  {/* Example usage */}
                  <div style={{ marginRight: "-0.4rem" }}>
                    <ProjectedHoursWatch
                      hours={
                        projectDetailsData?.projectedImplementationHours ||
                        "0 Hrs 0 mins"
                      }
                    />
                  </div>
                  <div
                    style={{
                      borderRight: "2px solid #008080",
                      borderTop: "1px solid #008080",
                      borderBottom: "1px solid #008080",
                      paddingRight: "0.7rem",
                      paddingTop: "0.7rem",
                      paddingBottom: "0.7rem",
                      paddingLeft: "0.7rem",
                      borderRadius: "0 20px 20px 0",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <strong> Projected Implementation Hours:</strong>
                  </div>
                </div>
                {projectDetailsData?.projectResources?.length > 0 && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow
                          style={{
                            backgroundColor: "#008080",
                            color: "#ffffff",
                          }}
                        >
                          <TableCell style={{ color: "#ffffff" }}>
                            Sl. No
                          </TableCell>
                          <TableCell style={{ color: "#ffffff" }}>
                            Name
                          </TableCell>
                          <TableCell style={{ color: "#ffffff" }}>
                            Designation
                          </TableCell>
                          <TableCell style={{ color: "#ffffff" }}>
                            Skill
                          </TableCell>
                          <TableCell style={{ color: "#ffffff" }}>
                            Occupancy Hours
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {projectDetailsData?.projectResources?.map(
                          (resources, index) => (
                            <TableRow key={resources?.resourceId}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                <Grid container spacing={2}>
                                  <Grid item xs={4}>
                                    <Avatar
                                      sx={{
                                        color: "#fff",
                                      }}
                                    >
                                      {resources?.employeeName.charAt(0)}
                                    </Avatar>
                                  </Grid>
                                  <Grid item xs={8} mt={1}>
                                    {resources.employeeName}
                                  </Grid>
                                </Grid>
                              </TableCell>
                              <TableCell>{resources?.designation}</TableCell>
                              <TableCell>
                                {resources.employeeSkills?.length > 0 && (
                                  <Grid
                                    container
                                    sx={{
                                      border: "1px solid ##F3F3F3",
                                      borderRadius: "5px",
                                      backgroundColor: "#F3F3F3",
                                      overflow: "auto",
                                    }}
                                  >
                                    {resources.employeeSkills
                                      .slice(
                                        0,
                                        expanded
                                          ? resources.employeeSkills.length
                                          : 2
                                      )
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
                                                        : employeeSkill.rating >=
                                                            5 &&
                                                          employeeSkill.rating <=
                                                            7
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
                                    {resources.employeeSkills.length > 2 && (
                                      <Grid
                                        item
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "flex-end",
                                          marginLeft: "auto", // Pushes the button to the right
                                        }}
                                      >
                                        <Button
                                          onClick={toggleExpand}
                                          // endIcon={<KeyboardArrowDownIcon />}
                                        >
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

                              <TableCell>{resources?.occupancyHours}</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          border: "1px solid #898989",
          width: "100%",
          position: "relative",
        }}
        onChange={handleExpand3}
      >
        <AccordionSummary
          sx={{
            flexDirection: "row",
            "&.Mui-focusVisible": {
              background: "none",
            },
            width: "100%",
            backgroundColor: "#008080",
            position: "relative",
          }}
        >
          {accordionDetails3 ? (
            <RemoveIcon
              color="secondary"
              sx={{
                position: "absolute", // Position the icon absolutely
                top: "10px", // Adjust the top position as needed
                right: "15px", // Adjust the right position as needed
              }}
            />
          ) : (
            <AddIcon
              color="secondary"
              sx={{
                position: "absolute", // Position the icon absolutely
                top: "10px", // Adjust the top position as needed
                right: "15px", // Adjust the right position as needed
              }}
            />
          )}
          <Typography variant="h6" color="secondary" ml={3}>
            Project Cost Allocation
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "20px " }}>
          <Grid
            container
            justifyContent={"center"}
            py={4}
            backgroundColor={"#F4FCF2"}
            borderRadius={"10px"}
            border={"1px solid #898989"}
          >
            {projectDetailsData?.costIncurredDetails?.length > 0 && (
              <Grid
                container
                item
                sm={12}
                md={10}
                style={{ paddingBottom: "20px" }}
              >
                <Grid item xs={6}>
                  <Typography variant="h5">
                    <strong>Cost Incurred Details:</strong>
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid item sm={12} md={10}>
              {projectDetailsData?.costIncurredDetails?.length > 0 && (
                <TableContainer
                  component={Paper}
                  style={{ border: "1px solid #008080" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow
                        style={{ backgroundColor: "#008080", color: "#ffffff" }}
                      >
                        <TableCell style={{ color: "#ffffff" }}>
                          Sl. No
                        </TableCell>
                        <TableCell style={{ color: "#ffffff" }}>
                          Item Name
                        </TableCell>
                        <TableCell style={{ color: "#ffffff" }}>
                          Cost Incurred
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projectDetailsData?.costIncurredDetails?.map(
                        (costIncurred, index) => (
                          <TableRow key={costIncurred?.costIncurredId}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{costIncurred?.itemName}</TableCell>
                            <TableCell>
                              {" "}
                              ₹{costIncurred?.costIncurred}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
            <Grid container item sm={12} md={10} style={{ paddingTop: "20px" }}>
              <Grid item xs={4}>
                <Typography variant="h5">
                  <strong>Project Cost Allocation :</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              gap={2}
              sm={12}
              md={10}
              style={{ paddingTop: "10px" }}
            >
              <Grid
                item
                sm={12}
                md={10}
                display={"inline-flex"}
                direction={"row"}
              >
                <Grid item xs={5}>
                  <Typography variant="body1">
                    <strong>Project Budget :</strong>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">
                    ₹ {projectDetailsData?.projectBudget}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                sm={12}
                md={10}
                display={"inline-flex"}
                direction={"row"}
              >
                <Grid item xs={5}>
                  <Typography variant="body1">
                    <strong> Projected Implementation Cost :</strong>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">
                    ₹ {projectDetailsData?.projectedImplementationCost}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                sm={12}
                md={10}
                display={"inline-flex"}
                direction={"row"}
              >
                <Grid item xs={5}>
                  <Typography variant="body1">
                    <strong>Other Costs Incurred : :</strong>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">
                    ₹ {projectDetailsData?.otherCostsIncurred}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                sm={12}
                md={10}
                display={"inline-flex"}
                direction={"row"}
              >
                <Grid item xs={5}>
                  <Typography variant="body1">
                    <strong>Project Revenue :</strong>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">
                    ₹ {projectDetailsData?.projectRevenue}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                sm={12}
                md={10}
                display={"inline-flex"}
                direction={"row"}
              >
                <Grid item xs={5}>
                  <Typography variant="body1">
                    <strong>Project Profit :</strong>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">
                    ₹ {projectDetailsData?.projectProfit}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProjectAccordion;
