import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the profile icon
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"; // Import an icon for the new link
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { persistor } from "../../redux/store/store";
import { useSelector } from "react-redux";

const pathToIndex = {
  "/workspace/Approval": 0,
  "/timesheet": 1,
  "/history": 2,
};

const BottomNavigationMobile = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(pathToIndex[location.pathname] || 0);
  const [anchorEl, setAnchorEl] = useState(null);

  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data?.role
  );

  const superAdmin = role?.includes("SUPERADMIN");
  const admin = role?.includes("ADMIN");
  const approver = role?.includes("APPROVER");
  const leaveApprover = role?.includes("LEAVEAPPROVER");
  
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const empId = useSelector(
    (state) => state?.persistData?.loginDetails?.data?.empId
  );

  const handleProfileOptionClick = (option) => {
    if (option === "profile") {
      navigate(`/userDetailPage/${empId}`);
    } else if (option === "signout") {
      // Handle signout click, for example, perform signout logic
    }

    handleProfileClose();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 3) {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleProfileClose();
      }
    };

    if (anchorEl) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

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
          {(superAdmin || admin || approver || leaveApprover) && (
            <BottomNavigationAction icon={<WorkspacePremiumIcon />} />
          )}
          <BottomNavigationAction icon={<AccessTimeIcon />} />
          <BottomNavigationAction icon={<LibraryBooksIcon />} />
          <BottomNavigationAction icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
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
            handleProfileClose();
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default BottomNavigationMobile;
