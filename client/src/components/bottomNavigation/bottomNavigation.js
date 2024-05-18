import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the profile icon
import Dashboard from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { persistor } from "../../redux/store/store";

const pathToIndex = {
  "/dashboard": 0,
  "/timesheet": 1,
  "/history": 2,
};

const BottomNavigationMobile = ({ children, handleMenuClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(pathToIndex[location.pathname] || 0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOptionClick = (option) => {
    // Handle profile option click (e.g., navigate to profile or sign out)
    if (option === "profile") {
      // Handle profile click, for example, navigate to the profile page
      // ...
    } else if (option === "signout") {
      // Handle signout click, for example, perform signout logic
      // ...
    }

    // Close the profile menu
    handleProfileClose();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 3) {
      // Profile icon is clicked, show profile options
      handleProfileClick(event);
    } else {
      const indexToPath = Object.keys(pathToIndex).find(
        (key) => pathToIndex[key] === newValue
      );
      if (indexToPath) {
        navigate(indexToPath);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setValue(pathToIndex[location.pathname] || 0);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          zIndex: "100",
          marginTop: "20px",
        }}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction icon={<Dashboard />} />
          <BottomNavigationAction icon={<AccessTimeIcon />} />
          <BottomNavigationAction icon={<LibraryBooksIcon />} />
          <BottomNavigationAction
           
            icon={<AccountCircleIcon />}
          />
        </BottomNavigation>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleProfileOptionClick("profile")}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("selectedItem");
            localStorage.removeItem("selectedProject");
            persistor.purge(["login"]);
            window.location.href = "/";
            handleMenuClose;
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default BottomNavigationMobile;
