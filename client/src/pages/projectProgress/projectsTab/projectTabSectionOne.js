import { Grid, Avatar, Typography, Tooltip } from "@mui/material";
import React from "react";
import GaugeMeter from "../projectsTab/gaugeMeterProject";
import LinearProgressThickness from "./linearProgress";
import { useSelector } from "react-redux";

const ProjectTabSectionOne = () => {
  const { dashboardProjectdetails } = useSelector(
    (state) => state?.nonPersist?.dashboardProjectdetails
  );
  const ColorBox = ({ color, tooltip, children }) => (
    <Tooltip title={tooltip}>
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
          }}
        >
          <Grid item xs={2}>
            <Avatar
              alt="Logo"
              src="https://s3-alpha-sig.figma.com/img/b73f/7d3f/3f97b55b8691134f55142949dcc75229?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i71qszz5yxZHlZnyS44WOkNW7yY4vpvANkFpV9YWiVpYxeqlnII-Nk8j0fFMQFtkUuno3g62HZujMPofiIZUFkzxKaFka6zAZkZIfBxENC~aUcHcVYGMZQaywgomW69Wi~Pq-o18woRlsnLPZ0v7C20wmbB9er64UWDbvU7xBm0IZ-6c9rjpPK6SLBTSs8aT385agX2E9sTyQizMsGx0FxS5QDlwU2pM0k2XDdTRQUBG79Ez3w2HVHpxgWowanHjuiERZGLdN0f2tRNpoEImvvM-uCeeN-TOEq4QwpWoCvDH4JBFPBGM6e9Hm9mdaL2ZLyV-tnsek3Z~5GziCPybyg__"
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6">
              {dashboardProjectdetails?.clientName}{" "}
            </Typography>
            <Typography variant="body1">
              <strong>Project Name:</strong>{" "}
              {dashboardProjectdetails?.projectName}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={2.6}
          lg={2.6}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectTabSectionOne;
