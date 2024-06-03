import React, { useState, useEffect } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Tab, TabList, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { adminHeaderStyle } from "./approvalTimesheets/adminHeaderStyle";
import { Outlet, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data?.role
  );
  const navigate = useNavigate();
  const style = adminHeaderStyle();
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const storedIndex = localStorage.getItem("selectedTabIndex");
    if (storedIndex !== null) {
      setSelectedTabIndex(parseInt(storedIndex));
    }
  }, []);

  const handleTabClick = (index, type) => {
    setSelectedTabIndex(index);
    localStorage.setItem("selectedTabIndex", index);
    navigate(type);
  };

  const isAdminOrLeaveApprover =
    role && (role.includes("APPROVER") || role.includes("LEAVEAPPROVER"));

  return (
    <>
      <Box>
        <Tabs
          selectedIndex={selectedTabIndex}
          onSelect={(index) => setSelectedTabIndex(index)}
          style={{ textAlign: isMobile ? 'center' : 'left' }}
        >
          <TabList style={style.tablistStyle}
          >
            {isAdminOrLeaveApprover ? (
              <>
                {!isMobile && (
                  <>
                    <Tab onClick={() => handleTabClick(0, "/workspace")}>
                      My Space
                    </Tab>
                    <Tab onClick={() => handleTabClick(1, "reportees")}>
                      My Reportees
                    </Tab>
                  </>
                )}
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
