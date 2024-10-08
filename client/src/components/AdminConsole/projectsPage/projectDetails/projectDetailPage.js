import { IconButton, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import ProjectAccordion from "./projectAccordion";
import { Button } from "@mui/material";
import { BorderColorOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetailsAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import { useParams } from "react-router-dom/dist";
import GaugeMeter from "./gaugeMeter";
import OnTime from "../../../../assets/On Time.svg";
import Ongoing from "../../../../assets/Ongoing.svg";
import Withdelay from "../../../../assets/with delay.svg";
import Yettostart from "../../../../assets/Yet to start.svg";
import { CircularProgress } from "@mui/material";
const ProjectDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Project Details
  const { projectDetailsData } = useSelector(
    (state) => state.persistData?.projectDetails
  );

  const { projectDetailsDataLoading } = useSelector(
    (state) => state.persistData?.projectDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetailsAction(id));
    }
  }, [id]);

  const projectId = useSelector(
    (state) => state.persistData.projectDetails?.projectId
  );

  useEffect(() => { }, [projectId]);

  const Navigate = useNavigate();

  const handleBackClick = () => {
    if (role.includes("SUPERADMIN")) {
      Navigate("/projects");
    } else {
      Navigate(-1);
    }
  };

  const handleEditProject = () => {
    Navigate(`/EditForm/${id}`);
  };
  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data.role
  );

  const isSuperAdmin = role?.includes("SUPERADMIN");

  const address = projectDetailsData?.client?.address;

  return (
    <>
      {projectDetailsDataLoading ? (
        <div style={{ textAlign: "center" }}>
          {" "}
          <CircularProgress />
        </div>
      ) : (
        <>
          <div
            className="Heading"
            style={{ display: "flex", alignItems: "center" }}
          >
            <IconButton
              style={{ color: "silver" }}
              onClick={() => handleBackClick()}
            >
              <ArrowBackIcon
                sx={{
                  color: "#000000",
                }}
              />
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
            {isSuperAdmin ? (
              <>
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
                    color="secondary"
                    startIcon={<BorderColorOutlined />}
                    onClick={handleEditProject}
                    style={{
                      padding: "10px 40px",
                      fontWeight: "bold",
                      color: "#008080",
                      border: "1px solid #008080",
                    }}
                  >
                    Edit
                  </Button>
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
          <Grid container marginBottom={"40px"}>
            <Grid item xs={12} md={2} lg={1.5}>
              {projectDetailsData?.client?.fileStorage?.data ? (
                <img
                  alt="Profile Picture"
                  src={`data:image/png;base64,${projectDetailsData?.client?.fileStorage?.data}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "2px solid #A4A4A4",
                    borderRadius: "4px", // Adjust the border radius for a square shape
                  }}
                />
              ) : (
                <Typography
                  variant="h1"
                  sx={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    backgroundColor: "#008080",
                    border: "1px solid #008080",
                    borderRadius: "4px", // Adjust the border radius for a square shape
                  }}
                >
                  {projectDetailsData?.client?.clientName
                    ? projectDetailsData?.client?.clientName[0].toUpperCase()
                    : ""}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="h4" fontWeight={"bold"}>
                {projectDetailsData?.client?.clientName}
              </Typography>
              <Typography fontSize={"18px"}>
                {address?.addressLine1 && `${address.addressLine1}`}
                {address?.addressLine1 && address?.addressLine2 && `, `}
                {address?.addressLine2 && `${address.addressLine2}`}
                {(address?.addressLine1 || address?.addressLine2) && address?.city?.dataValue && `, `}
                {address?.city?.dataValue && `${address.city.dataValue}`}
                {(address?.addressLine1 || address?.addressLine2 || address?.city?.dataValue) && address?.state?.dataValue && `, `}
                {address?.state?.dataValue && `${address.state.dataValue}`}
                {(address?.addressLine1 || address?.addressLine2 || address?.city?.dataValue || address?.state?.dataValue) && address?.country?.dataValue && `, `}
                {address?.country?.dataValue && `${address.country.dataValue}`} <br />
                {projectDetailsData?.client?.phone}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{ display: "flex", justifyContent: "right" }}
            >
              <GaugeMeter />
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
            <Grid container spacing={2} sx={{ marginTop: "5px" }}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Project Name :</strong>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">
                  {projectDetailsData?.projectName}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <img
                  src={
                    projectDetailsData?.status === "Ongoing"
                      ? Ongoing
                      : projectDetailsData?.status === "On Time"
                        ? OnTime
                        : projectDetailsData?.status === "With Delay"
                          ? Withdelay
                          : projectDetailsData?.status === "Yet To Start"
                            ? Yettostart
                            : ""
                  }
                  alt="image"
                  height={45}
                  style={{
                    marginRight: "5px",
                    marginLeft: "-10px",
                    marginTop: "-20px",
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Start Date :</strong>
                </Typography>
              </Grid>
              <Grid item xs={4}>
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
                  {projectDetailsData?.projectManager?.name}
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
                  {projectDetailsData?.projectTechLead?.name}
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
                <div>
                  {projectDetailsData?.activities?.map((activity, index) => (
                    <Typography
                      variant="body1"
                      key={activity.activityId}
                      sx={{
                        border: "1px solid #008080",
                        borderRadius: "8px",
                        padding: "4px",
                        margin: "1px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: "#000000",
                        backgroundColor: "#ffffff",
                        display: "inline-block",
                        marginRight:
                          index !== projectDetailsData.activities.length - 1
                            ? "1px"
                            : "0px",
                      }}
                    >
                      {activity.activityType}
                    </Typography>
                  ))}
                </div>
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
      )}
    </>
  );
};

export default ProjectDetailPage;
