import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Edit as EditIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const UserDataListPage = ({ userData }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const Navigate = useNavigate();

  const handleViewInDetail = () => {
    Navigate("/userDetailPage");
  };

  const handleEditProfile = (id) => {
    Navigate(`/editUser/${id}`);
  };

  return (
    <Card
      style={{
        border: "1px solid darkgray",
        borderRadius: "10px",
        backgroundColor: userData?.status === "ACTIVE" ? "white" : "#F0F0F0",
      }}
    >
      <CardHeader
        avatar={
          userData?.fileStorage ? (
            <Avatar
              src={`data:${userData.fileStorage.fileType};base64,${userData.fileStorage.data}`}
              alt={userData.firstName}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: userData?.status === "ACTIVE" ? "#008080" : "#808080",
                color: "#fff",
              }}
            >
              {userData?.firstName.charAt(0)}
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
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Edit"
                  onClick={() => handleEditProfile(userData?.id)}
                />
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <Typography
            variant="body2"
            sx={{ color: "#1D1B20", fontSize: "16px" }}
          >{`${userData?.firstName} ${userData?.lastName} | ID: ${userData?.empId}`}</Typography>
        }
        subheader={
          <Typography
            variant="body2"
            sx={{ color: "#1D1B20", fontSize: "12px" }}
          >{`${userData?.designation}`}</Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2">
              <b style={{ color: "black" }}>Current Projects :</b>{" "}
              {userData.projectName.length > 0 && (
                <>
                  {userData.projectName.slice(0, 2).join(" | ")}
                  {userData.projectName.length > 2 && " | etc ..."}
                </>
              )}
            </Typography>{" "}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: "black" }}>Skill Set : </b>
              {userData.skills && userData.skills.length > 0 && (
                <>
                  {userData.skills.slice(0, 2).map((skill, id) => (
                    <React.Fragment key={id}>
                      {id > 0 && " | "}
                      {skill}
                    </React.Fragment>
                  ))}
                  {userData.skills.length > 2 && " |etc ..."}
                </>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: "black" }}>Reporting Manager : </b>{" "}
              {userData?.managerFirstName} {userData?.managerLastName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Grid
        item
        mb={2}
        mr={2}
        xs={12}
        display="flex"
        mt={2}
        justifyContent="flex-end"
      >
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <Link
            to={`/userDetailPage/${userData?.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                color: userData.status === "ACTIVE" ? "#008080" : "#808080",
                cursor: "pointer",
                backgroundColor:
                  userData.status === "ACTIVE" ? "white" : "#F0F0F0",
                borderRadius: "40px",
                padding: "10px 10px",
                border: "1px solid #79747E",
                "&:hover": {
                  backgroundColor:
                    userData.status === "ACTIVE" ? "#008080" : "none",
                  color: userData.status === "ACTIVE" ? "#fff" : "#808080",
                },
                fontWeight: "bold",
                textAlign: "end",
              }}
              onClick={handleViewInDetail}
            >
              View in detail
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Card>
  );
};

export default UserDataListPage;
