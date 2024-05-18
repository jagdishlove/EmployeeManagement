import { Grid, Avatar, Typography, Tooltip, Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import GaugeMeter from "../projectsTab/gaugeMeterProject";
import LinearProgressThickness from "./linearProgress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectTabSectionOne = ({ project }) => {
  const [refreshData, setRefreshData] = React.useState({});
  const navigate = useNavigate();
  const { dashboardProjectdetails } = useSelector(
    (state) => state?.persistData?.dashboardProjectdetails
  );
  useEffect(() => {
    setRefreshData(dashboardProjectdetails);
    return () => {
      setRefreshData([]);
    };
  }, [dashboardProjectdetails]);
  // Check if dashboardProjectdetails.progress is NaN, if NaN set it to 0
  const progressValue = isNaN(refreshData?.progress)
    ? 0
    : Math.floor(refreshData?.progress);

  const ColorBox = ({ color, tooltip, children }) => (
    <Tooltip
      title={
        <Box
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "8px",
            maxWidth: "400px",
          }}
        >
          {tooltip}
        </Box>
      }
      PopoverProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            backgroundColor: "transparent", // To remove the default background color of the tooltip
          },
        },
      }}
    >
      <div
        style={{
          background: color,
          width: "16px",
          height: "10px",
        }}
      >
        {children}
      </div>
    </Tooltip>
  );

  const handleViewInDetail = (id) => {
    navigate(`/projectDetailPage/${id}`);
  };

  return (
    <div>
      <Grid
        container
        style={{ paddingTop: "20px", justifyContent: "space-between" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius:"5px"
          }}
        >
          <Grid item xs={2.5}>
            <Grid item>
              {refreshData?.clientFileStorage?.data ? (
                <img
                  src={`data:image/png;base64,${refreshData.clientFileStorage.data}`}
                  alt={refreshData.clientName}
                  style={{
                    width: "55px",
                    height: "60px",
                    borderRadius: "4px",
                    marginTop: "-40px",
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#008080",
                    width: "40px",
                    height: "40px",
                    borderRadius: "4px",
                    marginTop: "-40px",
                  }}
                >
                  {refreshData?.clientName?.charAt(0)}
                </Avatar>
              )}
            </Grid>
          </Grid>
          <Grid item xs={9.5}>
            <Typography variant="h6">{refreshData?.clientName} </Typography>
            <Typography variant="body1">
              <strong>Project Name:</strong> {refreshData?.projectName}
            </Typography>
            <Box style={{ textAlign: "right" }}>
              {" "}
              <Button
                style={{
                  color: "#1475E7",
                  textDecoration: "underline",
                  textTransform: "capitalize",
                }}
                onClick={() => handleViewInDetail(project.id)}
              >
                View project detail &gt; &gt;
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={2.8}
          lg={2.8}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius:"5px"
          }}
        >
          <GaugeMeter />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          gap={1}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            backgroundColor: "#ffffff",
            borderRadius:"5px"
          }}
        >
          <Grid container>
            <Grid item xs={12} display={"flex"} gap={1}>
              <ColorBox
                color="linear-gradient(90.24deg, #FF66FF 1.91%, #993D99 99.59%)"
                tooltip="Actual implementation cost is lower than the projected implementation cost of the project."
              />
              <ColorBox
                color="linear-gradient(90deg, #F93201 0%, #931E01 102.63%)"
                tooltip="Actual project implementation cost is more than 10% of the projected implementation cost."
              />
              <ColorBox
                color="linear-gradient(90deg, #DBE61D 0%, #7A8010 100%)"
                tooltip="Actual implementation cost of project is between 5-10% more than the estimated project implementation cost."
              />
              <ColorBox
                color="linear-gradient(90deg, #89B344 0%, #3B4D1D 101.58%)"
                tooltip="Actual implementation cost of project is still with 5% more than the projected implementation cost."
              />
            </Grid>

            <Grid item xs={12}>
              <LinearProgressThickness />
              <Typography variant="h6" textAlign={"center"}>
                <strong>Progress</strong>
                {""} {progressValue}%
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectTabSectionOne;
