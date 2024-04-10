import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { Collapse, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import kairos_logo from "../../assets/kairos_logo.png";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import Header from "../header/header";
import { SidebarStyle } from "./sidebarStyle";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    zIndex: 5,
    width: `calc(100% - ${200}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(window.innerWidth >= 600); // Set the initial state based on screen width
  // Initialize the selected item from local storage or set a default value
  const [selectedItem, setSelectedItem] = useState(
    localStorage.getItem("selectedItem") || "Timesheet"
  );

  const role = useSelector((state) => state?.persistData.data.role);

  const superAdmin = role?.includes("SUPERADMIN");
  const admin = role?.includes("ADMIN");

  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const style = SidebarStyle(theme);
  // const mobile = useMobileScreen();

  const handleResize = () => {
    setOpen(window.innerWidth >= 900); // Update the state when the screen width changes
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemClick = (text) => {
    setSelectedItem(text);
    // Save the selected item to local storage
    localStorage.setItem("selectedItem", text);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // For header
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAdminMenuClick = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };

  const handleDashboardMenuClick = () => {
    setDashboardMenuOpen(!dashboardMenuOpen);
  };

  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#ffffff" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              bgcolor: "#008080",
              "&:hover": {
                bgcolor: "#008080", // Set the same color as the background color to remove the hover effect
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Header
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: { ...style.sideBarColor },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: "100%",
            width: "100%",
            height: "auto",
          }}
        >
          <img
            src={kairos_logo}
            alt="Logo"
            style={{
              width: "70%",
              maxWidth: "100%",
              height: "auto",
              marginTop: "20px",
              marginLeft: "10px",
            }}
          />
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              marginLeft: "0px",
              marginTop: "40px",
              display: open ? "block" : "none",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChevronLeftIcon style={{ color: "#FFFFFF" }} />
          </IconButton>
        </Box>

        <List sx={{ color: "secondary.main", marginTop: "50px" }}>
          <ListItem key="Dashboard" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleDashboardMenuClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={style.sidebarItem}
                  >
                    Dashboard
                  </Typography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
              {dashboardMenuOpen ? (
                <KeyboardArrowDownIcon sx={{ color: "white" }} />
              ) : (
                <KeyboardArrowRightIcon
                  sx={{ color: "white", marginLeft: "-5px" }}
                />
              )}
            </ListItemButton>
            {/* Submenu items for the Dashboard Menu */}
            <Collapse in={dashboardMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {[
                  { text: "ProjectProgress", url: "/projectProgress" },
                  { text: "Workspace", url: "/workspace" },
                ].map((item) => (
                  <ListItem
                    key={item.text}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <Link
                      to={item.url}
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                        onClick={() => handleItemClick(item.text)}
                        selected={selectedItem === item.text}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          {/* Add appropriate icons for Project Progress and Workspace */}
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary=<Typography
                            variant="body1"
                            fontWeight="bold"
                            sx={style.sidebarItem}
                            style={{ textAlign: "end" }}
                          >
                            {item.text === "ProjectProgress"
                              ? "Project Progress"
                              : item.text}
                          </Typography>
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </ListItem>

          {[
            { text: "Timesheet", url: "/timesheet", icon: <AccessTimeIcon /> },
            { text: "Leaves", url: "/leaves", icon: <HolidayVillageIcon /> },
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <Link
                to={item.url}
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => handleItemClick(item.text)}
                  selected={selectedItem === item.text}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary=<Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={style.sidebarItem}
                    >
                      {item.text}
                    </Typography>
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          {(superAdmin || admin) && (
            <ListItem
              key="Admin Console"
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleAdminMenuClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={style.sidebarItem}
                    >
                      Admin Console
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {adminMenuOpen ? (
                  <KeyboardArrowDownIcon sx={{ color: "white" }} />
                ) : (
                  <KeyboardArrowRightIcon
                    sx={{ color: "white", marginLeft: "-5px" }}
                  />
                )}
              </ListItemButton>
              {/* Submenu items for the Admin Menu */}
              <Collapse in={adminMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {[
                    { text: "Projects", url: "/projects" },
                    { text: "Users", url: "/users" },
                    { text: "Admintimesheet", url: "/Admintimesheet" },
                    { text: "Adminleaves", url: "/adminLeaves" },
                    { text: "MasterData", url: "/masterData" },
                  ].map((item) => (
                    <ListItem
                      key={item.text}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <Link
                        to={item.url}
                        style={{ textDecoration: "none", color: "#ffffff" }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                          onClick={() => handleItemClick(item.text)}
                          selected={selectedItem === item.text}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary=<Typography
                              variant="body1"
                              fontWeight="bold"
                              sx={style.sidebarItem}
                              style={{ textAlign: "end" }}
                            >
                              {item.text === "Adminleaves"
                                ? "Leaves"
                                : item.text === "Admintimesheet"
                                ? "Timesheet"
                                : item.text}
                            </Typography>
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader handleDrawerClose={handleDrawerClose} />
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
