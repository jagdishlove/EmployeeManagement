// MobileNavigation.js
import React from "react";
import { useHistory } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import NotificationsIcon from "@mui/icons-material/Notifications";

const MobileNavigation = () => {
  const history = useHistory();

  const handleNavigation = (path) => {
    history.push(path);
  };

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation>
        <BottomNavigationAction
          label="Dashboard"
          icon={<DashboardIcon />}
          onClick={() => handleNavigation("/dashboard")}
        />
        <BottomNavigationAction
          label="Timesheet"
          icon={<AccessTimeIcon />}
          onClick={() => handleNavigation("/timesheet")}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon />}
          onClick={() => handleNavigation("/profile")}
        />
        <BottomNavigationAction
          label="History"
          icon={<LibraryBooksIcon />}
          onClick={() => handleNavigation("/history")}
        />
        <BottomNavigationAction
          label="Notification"
          icon={<NotificationsIcon />}
          onClick={() => handleNavigation("/notifications")}
        />
      </BottomNavigation>
    </Box>
  );
};

export default MobileNavigation;
