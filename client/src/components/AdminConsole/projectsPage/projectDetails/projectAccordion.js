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
  const [accordionDetails, setAccordionDetails] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Project Details
  const { projectDetailsData } = useSelector(
    (state) => state.nonPersist?.projectDetails
  );
  console.log("projectDetailsData", projectDetailsData);

  useEffect(() => {
    dispatch(getProjectDetailsAction(id));
  }, [id]);

  const handleExpand = () => {
    setAccordionDetails(!accordionDetails);
  };

  return (
    <div>
      <Accordion
        sx={{
          border: "1px solid #898989",
          width: "100%",
        }}
        onChange={handleExpand}
      >
        <AccordionSummary
          sx={{
            flexDirection: "row",
            "&.Mui-focusVisible": {
              background: "none",
            },
            width: "100%",
            backgroundColor: "#008080",
          }}
        >
          {accordionDetails ? (
            <RemoveIcon color="secondary" />
          ) : (
            <AddIcon color="secondary" />
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
        }}
        onChange={handleExpand}
      >
        <AccordionSummary
          sx={{
            flexDirection: "row",
            "&.Mui-focusVisible": {
              background: "none",
            },
            width: "100%",
            backgroundColor: "#008080",
          }}
        >
          {accordionDetails ? (
            <RemoveIcon color="secondary" />
          ) : (
            <AddIcon color="secondary" />
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
        }}
        onChange={handleExpand}
      >
        <AccordionSummary
          sx={{
            flexDirection: "row",
            "&.Mui-focusVisible": {
              background: "none",
            },
            width: "100%",
            backgroundColor: "#008080",
          }}
        >
          {accordionDetails ? (
            <RemoveIcon color="secondary" />
          ) : (
            <AddIcon color="secondary" />
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
                  <strong>Project Cost Incurred :</strong>
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
