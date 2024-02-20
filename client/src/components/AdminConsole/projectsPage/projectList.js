import { Edit as EditIcon } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
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
    Navigate("/projectDetailPage");
  };

  const startDateString = projectsData.startDate;
   const endDateString = projectsData.endDate;
 
  
  const startDate = dayjs(startDateString, 'YYYYMM-DD-');
  const endDate = dayjs(endDateString, 'YYYYMM-DD-');
  const currentDate = dayjs();
  
  // Calculate the total duration in days
  const totalDuration = endDate.diff(startDate, 'day');
  
  // Calculate the remaining duration in days
  const remainingDuration = endDate.diff(currentDate, 'day');
  
  // Calculate the progress percentage
  const progressPercentage = Math.max(0, Math.min(100, ((totalDuration - remainingDuration) / totalDuration) * 100));

  return (
    <Card
      style={{
        border: "1px solid darkgray",
        borderRadius: "10px",
      }}
    >
      <CardHeader
        avatar={
          <img
            src=""
            alt="Logo"
            style={{
              width: 40, // Set the width as needed
              height: 40, // Set the height as needed
              borderRadius: "50%", // Optional: Add a border-radius for a circular shape
            }}
          />
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
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <Typography
            variant="body2"
            sx={{ color: "#1D1B20", fontSize: "16px" }}
          >
            {projectsData?.projectName}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            sx={{ color: "#1D1B20", fontSize: "12px" }}
          >
            {projectsData?.description}
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
              <b style={{ color: "black" }}>Domain : </b> {projectsData?.domainName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: "black" }}>Project Manager : </b>{" "}
              {projectsData?.projectManager}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: "black" }}>Start Date : </b>{" "}
              {projectsData?.startDate}
              <b style={{ color: "black" }}>End Date : </b>{" "}
              {projectsData?.endDate}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight={"bold"}>
                  Progress
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="end">
                <Typography variant="body2" fontWeight={"bold"}>
                  {progressPercentage.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LinearProgress variant="determinate" value={progressPercentage.toFixed(2)}/>
             
              </Grid>
            </Grid>
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
