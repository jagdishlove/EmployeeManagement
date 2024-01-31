import { Edit as EditIcon } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const UserListPage = () => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const sections = [
    {
      title: "Frontend",
      users: [
        {
          name: "John Doe",
          id: "JD123",
          designation: "Frontend Developer",
          role: "Developer",
          experience: "5 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "React, JavaScript",
          manager: "Manager A",
          status: "active",
          teamMembers: [
            "User 1",
            "User 2",
            "User 3",
            "User 4",
            "User 5",
            "User 26",
            "User 27",
            "User 28",
            "User 29",
            "User 30",
          ],
        },
        {
          name: "Jane Smith",
          id: "JS456",
          designation: "UI/UX Designer",
          role: "Designer",
          experience: "3 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "UI/UX Design, Figma",
          manager: "Manager A",
          status: "active",
          teamMembers: ["User 6", "User 7", "User 8", "User 9", "User 10"],
        },
        {
          name: "David Brown",
          id: "DB101",
          designation: "Network Engineer",
          role: "Engineer",
          experience: "5 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Cisco, Networking",
          manager: "Manager C",
          teamMembers: ["User 26", "User 27", "User 28", "User 29", "User 30"],
        },
        {
          name: "David Brown",
          id: "DB101",
          designation: "Network Engineer",
          role: "Engineer",
          experience: "5 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Cisco, Networking",
          manager: "Manager C",
          status: "active",
          teamMembers: ["User 26", "User 27", "User 28", "User 29", "User 30"],
        },
      ],
    },
    {
      title: "Backend",
      users: [
        {
          name: "Bob Johnson",
          id: "BJ456",
          designation: "Backend Developer",
          role: "Developer",
          experience: "4 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Node.js, MongoDB",
          manager: "Manager B",
          status: "active",
          teamMembers: ["User 11", "User 12", "User 13", "User 14", "User 15"],
        },
        {
          name: "David Brown",
          id: "DB101",
          designation: "Network Engineer",
          role: "Engineer",
          experience: "5 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Cisco, Networking",
          manager: "Manager C",
          status: "active",
          teamMembers: ["User 26", "User 27", "User 28", "User 29", "User 30"],
        },
        {
          name: "David Brown",
          id: "DB101",
          designation: "Network Engineer",
          role: "Engineer",
          experience: "5 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Cisco, Networking",
          manager: "Manager C",
          teamMembers: ["User 26", "User 27", "User 28", "User 29", "User 30"],
        },
        {
          name: "Alice Turner",
          id: "AT789",
          designation: "Database Administrator",
          role: "Administrator",
          experience: "6 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "SQL, MongoDB",
          manager: "Manager B",
          status: "active",
          teamMembers: ["User 16", "User 17", "User 18", "User 19", "User 20"],
        },
      ],
    },
    {
      title: "DevOps",
      users: [
        {
          name: "David Brown",
          id: "DB101",
          designation: "Network Engineer",
          role: "Engineer",
          experience: "5 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Cisco, Networking",
          manager: "Manager C",
          status: "active",
          teamMembers: ["User 26", "User 27", "User 28", "User 29", "User 30"],
        },
        {
          name: "David Brown",
          id: "DB101",
          designation: "Network Engineer",
          role: "Engineer",
          experience: "5 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Cisco, Networking",
          manager: "Manager C",
          status: "active",
          teamMembers: ["User 26", "User 27", "User 28", "User 29", "User 30"],
        },
        {
          name: "Charlie Wilson",
          id: "CW789",
          designation: "DevOps Engineer",
          role: "Engineer",
          experience: "7 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Docker, Kubernetes",
          manager: "Manager C",
          teamMembers: ["User 21", "User 22", "User 23", "User 24", "User 25"],
        },
        {
          name: "David Brown",
          id: "DB101",
          designation: "Network Engineer",
          role: "Engineer",
          experience: "5 years",
          project: [{ project: "Project A" }, { project: "Project A" }],
          skills: "Cisco, Networking",
          manager: "Manager C",
          status: "active",
          teamMembers: ["User 26", "User 27", "User 28", "User 29", "User 30"],
        },
      ],
    },
  ];

  const colorsForAvatar = [
    "#BECCE3",
    "#7CE495",
    "#48D3FF",
    "#A197E4",
    "#333333",
  ]; // Add more colors as needed

  const getColorByIndex = (index, colors) => {
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };

  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuItemClick = (option, user) => {
    if (option === "Option 3") {
      setSelectedUser(user);
      setConfirmationDialogOpen(true);
    } else {
      setMenuAnchor(null);
    }
  };

  const handleDisableConfirmation = (user) => {
    console.log("Disabling user:", user);
    setConfirmationDialogOpen(false);
    setMenuAnchor(null);
  };

  return (
    <Box>
      <Grid container>
        {sections.map((section, index) => (
          <Grid key={index} mt={3} sx={{ width: "100%" }}>
            <Typography variant="h5" gutterBottom>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <span>{section.title}</span>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ color: "#49454F", cursor: "pointer", fontSize: "20px" }}
                >
                  View More <ChevronRightIcon />
                </Typography>
              </Box>
            </Typography>
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div
                style={{
                  overflowX: "auto",
                  width: "100%",
                  scrollbarWidth: "thin",
                  overflowY: "hidden",
                }}
              >
                <Grid container spacing={2}>
                  {section.users.map((user, userIndex) => (
                    <Grid item key={userIndex}>
                      <Card
                        style={{
                          border: "1px solid darkgray",
                          borderRadius: "10px",
                          padding: "8px",
                          width: "350px",
                          height: "100%",
                          backgroundColor:
                            user.status === "active" ? "white" : "#F0F0F0",
                        }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{
                                bgcolor:
                                  user.status === "active"
                                    ? "#008080"
                                    : "#808080",
                                color: "#fff",
                              }}
                            >
                              {user.name.charAt(0)}
                            </Avatar>
                          }
                          action={
                            <React.Fragment>
                              <IconButton
                                aria-label="settings"
                                onClick={(event) =>
                                  setMenuAnchor(event.currentTarget)
                                }
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                anchorEl={menuAnchor}
                                open={Boolean(menuAnchor)}
                                onClose={() => setMenuAnchor(null)}
                              >
                                <MenuItem
                                  selected={false}
                                  onClick={() =>
                                    handleMenuItemClick("Option 1")
                                  }
                                >
                                  <ListItemIcon>
                                    <ManageAccountsIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="Manage Role" />
                                </MenuItem>
                                <MenuItem
                                  selected={false}
                                  onClick={() =>
                                    handleMenuItemClick("Option 2")
                                  }
                                >
                                  <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="Edit" />
                                </MenuItem>
                                <MenuItem
                                  selected={false} // Replace with your logic to determine the selected item
                                  onClick={() =>
                                    handleMenuItemClick("Option 3")
                                  }
                                >
                                  <ListItemIcon>
                                    <DeleteIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="Disable" />
                                </MenuItem>
                              </Menu>
                            </React.Fragment>
                          }
                          title={
                            <Typography
                              variant="body2"
                              sx={{ color: "#1D1B20", fontSize: "16px" }}
                            >{`${user.name} | ID: ${user.id}`}</Typography>
                          }
                          subheader={
                            <Typography
                              variant="body2"
                              sx={{ color: "#1D1B20", fontSize: "12px" }}
                            >{`${user.designation} | ${user.role}`}</Typography>
                          }
                        />
                        <CardContent style={{ overflowY: "auto", flex: 1 }}>
                          <Typography variant="body2" color="textSecondary">
                            <b style={{ color: "black" }}>
                              Current Projects :{" "}
                            </b>
                            {Array.isArray(user.project)
                              ? user.project.map(
                                  (projectData, projectIndex) => (
                                    <React.Fragment key={projectIndex}>
                                      {projectIndex > 0 && " | "}
                                      {projectData.project}
                                    </React.Fragment>
                                  )
                                )
                              : user.project.project}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <b style={{ color: "black" }}>Skill Set : </b>{" "}
                            {user.skills}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <b style={{ color: "black" }}>
                              Reporting Manager :{" "}
                            </b>{" "}
                            {user.manager}
                          </Typography>
                        </CardContent>
                        <Grid padding={1}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >{`Team Members`}</Typography>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box display="flex" alignItems="center">
                              {user.teamMembers
                                .slice(0, 4)
                                .map((teamMember, teamMemberIndex) => (
                                  <Tooltip
                                    key={teamMemberIndex}
                                    title={teamMember}
                                    arrow
                                  >
                                    <Avatar
                                      key={teamMemberIndex}
                                      sx={{
                                        bgcolor: getColorByIndex(
                                          teamMemberIndex,
                                          colorsForAvatar
                                        ),
                                        width: 30,
                                        height: 30,
                                        marginLeft: "-6px",
                                        fontSize: 18,
                                        overflow: "hidden",
                                      }}
                                    >
                                      <span>{teamMember.charAt(0)}</span>
                                    </Avatar>
                                  </Tooltip>
                                ))}
                              {user.teamMembers.length > 4 && (
                                <Tooltip
                                  title={
                                    <React.Fragment>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        {user.teamMembers
                                          .slice(4, 7)
                                          .map((member, index) => (
                                            <div
                                              key={index}
                                              style={{ marginRight: "8px" }}
                                            >
                                              {member}
                                            </div>
                                          ))}
                                      </div>
                                      {user.teamMembers.length > 7 && (
                                        <div>
                                          +{user.teamMembers.length - 7} more
                                        </div>
                                      )}
                                    </React.Fragment>
                                  }
                                  arrow
                                >
                                  <Avatar
                                    sx={{
                                      bgcolor: "darkgray",
                                      width: 30,
                                      height: 30,
                                      marginLeft: "-4px",
                                      fontSize: 18,
                                      overflow: "hidden",
                                    }}
                                  >
                                    +{user.teamMembers.length - 4}
                                  </Avatar>
                                </Tooltip>
                              )}
                            </Box>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{
                                color:
                                  user.status === "active"
                                    ? "#008080"
                                    : "#808080",
                                cursor: "pointer",
                                backgroundColor:
                                  user.status === "active"
                                    ? "white"
                                    : "#F0F0F0",
                                borderRadius: "40px",
                                padding: "10px 10px",
                                border: "1px solid #79747E",
                                "&:hover": {
                                  backgroundColor:
                                    user.status === "active"
                                      ? "#008080"
                                      : "none",
                                  color:
                                    user.status === "active"
                                      ? "#fff"
                                      : "#808080",
                                },
                                fontWeight: "bold",
                              }}
                            >
                              View in detail
                            </Typography>
                          </Box>
                        </Grid>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => setConfirmationDialogOpen(false)}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              color: "#344054",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText mt={0}>
            <Box display="flex" alignItems="center">
              <Grid
                sx={{
                  background: "#FEF3F2",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              >
                <DeleteIcon
                  color="disabled"
                  sx={{
                    fontSize: "36px",
                    background: "#6D6D6D",
                    borderRadius: "50%",
                    padding: "8px",
                    color: "#DBDBDB",
                  }}
                />
              </Grid>
              <Grid ml={1}>
                <Typography variant="h6">Confirmation</Typography>
                <Typography variant="body">
                  Are you sure you want to disable this employee{" "}
                  <b>
                    &quot;{selectedUser?.name} Id: {selectedUser?.id}&quot;
                  </b>
                  ? This action cannot be undone.
                </Typography>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmationDialogOpen(false)}
            sx={{
              backgroundColor: "white",
              color: "#344054",
              border: "1px solid #D0D5DD",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDisableConfirmation(selectedUser)}
            color="error"
            sx={{
              backgroundColor: "#D92D20",
              color: "white",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#cc0000",
              },
            }}
          >
            Disable
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserListPage;
