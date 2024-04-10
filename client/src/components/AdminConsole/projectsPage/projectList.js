import { Edit as EditIcon } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectList = ({ projectsData }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const Navigate = useNavigate();

  const handleViewInDetail = () => {
    Navigate(`/projectDetailPage/${projectsData.id}`);
  };

  const handleEditForm = () => {
    Navigate(`/EditForm/${projectsData?.id}`);
  };

  const startDateString = projectsData?.startDate;
  const endDateString = projectsData?.endDate;

  const actualEndDateString = projectsData?.actualEndDate; // Fetch the actual end date from projectsData
  const actualEndDate = dayjs(actualEndDateString, "YYYY-MM-DD");

  const startDate = dayjs(startDateString, "YYYY-MM-DD");
  const endDate = dayjs(endDateString, "YYYY-MM-DD");
  const currentDate = dayjs();

  // Calculate the total duration in days
  const totalDuration = endDate.diff(startDate, "day");

  // Calculate the remaining duration in days
  const remainingDuration = actualEndDate.isValid()
    ? actualEndDate.diff(currentDate, "day")
    : endDate.diff(currentDate, "day");
  // Calculate the progress percentage
  let progressPercentage;

  if (
    startDate.isValid() &&
    endDate.isValid() &&
    startDate.isSame(endDate, "day")
  ) {
    // If both start and end dates are valid and they are the same day
    progressPercentage = 100;
  } else if (startDate.isValid() && !endDate.isValid()) {
    // If start date is valid but end date is not
    progressPercentage = 0;
  } else if (actualEndDate.isValid() && actualEndDate.isBefore(endDate)) {
    // If actual end date is valid and it's before the current date
    progressPercentage = 100;
  } else {
    // Otherwise, calculate the progress based on the duration
    progressPercentage = Math.max(
      0,
      Math.min(100, ((totalDuration - remainingDuration) / totalDuration) * 100)
    );
  }

  // Format the progress percentage
  const formattedProgress =
    progressPercentage === 100 ? "100%" : progressPercentage.toFixed(0) + "%"; // Rounded to the nearest whole number

  const progressbarColor = () => {
    if (projectsData.status === "Ongoing") {
      return "blue";
    } else if (projectsData.status === "On Time") {
      return "primary";
    } else if (projectsData.status === "With Delay") {
      return "red";
    } else {
      return "secondary";
    }
  };

  return (
    <Card
      style={{
        border: "1px solid darkgray",
        borderRadius: "10px",
      }}
    >
      <CardHeader
        avatar={
          projectsData?.fileStorage?.data ? (
            <Avatar
              src={`data:image/png;base64,${projectsData.fileStorage.data}`}
              alt={projectsData.clientName}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
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
              }}
            >
              {projectsData?.clientName.charAt(0)}
            </Avatar>
          )
        }
        action={
          <>
            <IconButton
              aria-label="settings"
              onClick={(event) => setMenuAnchor(event.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem selected={false}>
                <ListItemIcon>
                  <EditIcon fontSize="small" onClick={handleEditForm} />
                </ListItemIcon>
                <ListItemText primary="Edit" onClick={handleEditForm} />
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <Typography
            variant="body2"
            sx={{ color: "#1D1B20", fontSize: "16px" }}
          >
            {projectsData?.clientName}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            sx={{ color: "#1D1B20", fontSize: "12px" }}
          >
            {projectsData?.projectName}
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: "black" }}>Country : </b>{" "}
              {projectsData?.country}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: "black" }}>Domain : </b>{" "}
              {projectsData?.domainName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: "black" }}>Project Manager : </b>{" "}
              {projectsData?.projectManager}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {projectsData.status === "Yet To Start" ? (
              <></>
            ) : (
              <Typography variant="body2" color="textSecondary">
                <b style={{ color: "black" }}>Start Date : </b>{" "}
                {projectsData?.startDate}
                <b style={{ color: "black", marginLeft: "10px" }}>
                  End Date :{" "}
                </b>{" "}
                {projectsData?.endDate}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {projectsData.status === "Yet To Start" ? (
              <></>
            ) : (
              <>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography variant="body2" fontWeight="bold">
                      Progress
                    </Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="end">
                    <Typography variant="body2" fontWeight="bold">
                      {formattedProgress}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LinearProgress
                      variant="determinate"
                      value={progressPercentage.toFixed(2)}
                      color={progressbarColor()}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={12} display="flex" mt={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{
                color: "#008080",
                backgroundColor: "white",
                borderRadius: "40px",
                padding: "10px", // Adjust padding as needed
                border: "1px solid #79747E",
                "&:hover": {
                  backgroundColor: "#008080",
                  color: "#fff",
                },
                fontWeight: "bold",
                textAlign: "end",
              }}
              onClick={handleViewInDetail}
            >
              View in detail
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectList;
