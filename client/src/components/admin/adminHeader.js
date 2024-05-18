import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Tab, TabList, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { adminHeaderStyle } from "./approvalTimesheets/adminHeaderStyle";
import { Outlet, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // State to track selected tab index
  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data?.role
  );
  const navigate = useNavigate();
  const style = adminHeaderStyle(); // Ensure adminHeaderStyle returns the correct styles object

  // Effect to load previously selected tab index from localStorage on component mount
  useEffect(() => {
    const storedIndex = localStorage.getItem("selectedTabIndex");
    if (storedIndex !== null) {
      setSelectedTabIndex(parseInt(storedIndex));
    }
  }, []);

  // Function to handle tab click and navigation
  const handleTabClick = (index, type) => {
    setSelectedTabIndex(index); // Update selectedTabIndex state
    localStorage.setItem("selectedTabIndex", index); // Save selectedTabIndex to localStorage
    navigate(type); // Navigate to the specified route
  };

  const isAdminOrLeaveApprover =
    role && (role.includes("APPROVER") || role.includes("LEAVEAPPROVER"));

  return (
    <>
      <Box>
        <Tabs
          selectedIndex={selectedTabIndex}
          onSelect={(index) => setSelectedTabIndex(index)}
        >
          <TabList style={style.tablistStyle}>
            {isAdminOrLeaveApprover ? (
              <>
                <Tab onClick={() => handleTabClick(0, "/workspace")}>
                  My Space
                </Tab>
                <Tab onClick={() => handleTabClick(1, "reportees")}>
                 My Reportees
                </Tab>
                <Tab onClick={() => handleTabClick(2, "Approval")}>
                  Approvals
                </Tab>
              </>
            ) : (
              <Tab onClick={() => handleTabClick(0, "/workspace")}>
                My Space
              </Tab>
            )}
          </TabList>
        </Tabs>
      </Box>
      <Grid>
        <Outlet />
      </Grid>
    </>
  );
};

export default AdminHeader;
