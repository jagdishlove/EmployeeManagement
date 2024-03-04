import { IconButton, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import ProjectAccordion from "./projectAccordion";
import { Button } from "@mui/material";
import { BorderColorOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetailsAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import { useParams } from "react-router-dom/dist";

const ProjectDetailPage = () => {
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

  const projectId = useSelector(
    (state) => state.nonPersist.projectDetails?.projectId
  );

  useEffect(() => {}, [projectId]);

  const Navigate = useNavigate();
  const handleBackClick = () => {
    Navigate("/projects");
  };

  const handleEditProject = () => {
    Navigate(`/EditForm/${id}`);
  };
  return (
    <>
      <div
        className="Heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        <IconButton
          style={{ color: "silver" }}
          onClick={() => handleBackClick()}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">
          <b>Project Detail</b>
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />
      <Grid container>
        <Grid
          item
          xs={12}
          md={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "30px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<BorderColorOutlined />}
            style={{ borderRadius: "10px" }}
            onClick={handleEditProject}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={2}>
          <img
            src={`data:${projectDetailsData?.client?.fileStorage?.fileType};base64,${projectDetailsData?.client?.fileStorage?.data}`}
            alt="Logo"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5">
            {projectDetailsData?.client?.clientName}
          </Typography>
          <Typography variant="body2">
            {projectDetailsData?.client?.address?.addressLine1}{" "}
            {projectDetailsData?.client?.address?.addressLine2}
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <GaugeChart
            id="gauge-chart1"
            arcPadding={0.1}
            cornerRadius={0.2}
            percent={0.7}
            textColor="#333"
            formatTextValue={(value) => `${Math.round(value * 100)}%`}
          />
        </Grid>
      </Grid>

      <Grid
        container
        gap={2}
        sx={{
          border: "1px solid #ADADAD",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          marginTop: "20px",
          p: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>Project Name :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.projectName}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>Start Date :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.startDate}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>End Date :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.endDate}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>Actual End Date :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.actualEndDate}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>Domain :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.domain?.domainName}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>Project Manager :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.projectManager}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>Project Lead :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.projectTechLead}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>Project Category :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.jobType?.jobType}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong>Complexity :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {projectDetailsData?.complexity}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              <strong> Project Activities :</strong>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {projectDetailsData?.activities?.map((activity) => (
              <Typography variant="body1" key={activity.activityId}>
                {activity.activityType}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          marginTop: "20px",
        }}
      >
        <Grid item sx={12} md={12}>
          <ProjectAccordion />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDetailPage;
