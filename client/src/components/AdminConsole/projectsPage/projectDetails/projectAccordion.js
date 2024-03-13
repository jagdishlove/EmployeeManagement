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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectDetailsAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";

const ProjectAccordion = () => {
  const [accordionDetails1, setAccordionDetails1] = useState(false);
  const [accordionDetails2, setAccordionDetails2] = useState(false);
  const [accordionDetails3, setAccordionDetails3] = useState(false);
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

  const handleExpand2 = () => {
    setAccordionDetails2(!accordionDetails2);
  };

  const handleExpand3 = () => {
    setAccordionDetails3(!accordionDetails3);
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
        <AccordionDetails>{projectDetailsData?.description}</AccordionDetails>
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
            justifyContent={"center"}
            py={4}
            backgroundColor={"#F4FCF2"}
            borderRadius={"10px"}
            border={"1px solid #898989"}
          >
            <Grid item sm={12} md={10}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow
                      style={{ backgroundColor: "#008080", color: "#ffffff" }}
                    >
                      <TableCell style={{ color: "#ffffff" }}>Sl. No</TableCell>
                      <TableCell style={{ color: "#ffffff" }}>Name</TableCell>
                      <TableCell style={{ color: "#ffffff" }}>
                        Designation
                      </TableCell>
                      <TableCell style={{ color: "#ffffff" }}>Skill</TableCell>
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
                          <TableCell>{resources?.employeeName}</TableCell>
                          <TableCell>{resources?.designation}</TableCell>
                          <TableCell>{resources?.skills?.join(", ")}</TableCell>
                          <TableCell>{resources?.occupancyHours}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
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

            <Grid item sm={12} md={10}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow
                      style={{ backgroundColor: "#008080", color: "#ffffff" }}
                    >
                      <TableCell style={{ color: "#ffffff" }}>Sl. No</TableCell>
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
                          <TableCell>{costIncurred?.costIncurred}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
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
                    {projectDetailsData?.projectBudget}
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
                    {projectDetailsData?.projectedImplementationCost}
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
                    {projectDetailsData?.otherCostsIncurred}
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
                    {projectDetailsData?.projectRevenue}
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
                    {projectDetailsData?.projectProfit}
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
