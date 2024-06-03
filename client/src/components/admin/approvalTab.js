import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ApprovalTab() {
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data.role
  );
  const isLeaveApprover = role?.includes("LEAVEAPPROVER");
  const navigate = useNavigate();
  const location = useLocation();

  // Load selected tab index from localStorage on component mount
  useEffect(() => {
    const storedTabIndex = localStorage.getItem("selectedSubTabIndex");
    if (storedTabIndex !== null) {
      setSelectedTab(parseInt(storedTabIndex));
    }
  }, []);

  // Update selected tab based on the current path
  useEffect(() => {
    if (location.pathname === "/workspace/Approval") {
      setSelectedTab(0);
    } else if (location.pathname === "/workspace/Approval/leaves") {
      setSelectedTab(1);
    }
  }, [location.pathname]);

  localStorage.setItem("selectedTabIndex", 2);

  // Function to handle tab click and navigation
  const handleNavigate = (index, type) => {
    setSelectedTab(index); // Update selected tab index
    localStorage.setItem("selectedSubTabIndex", index); // Save selected tab index to localStorage
    navigate(type); // Navigate to the specified route
  };

  return (
    <div>
      <Tabs selectedIndex={selectedTab} onSelect={(index) => handleNavigate(index, index === 0 ? "/workspace/Approval" : "/workspace/Approval/leaves")}>
        <TabList
          style={{
            borderBottom: "none",
            padding: 0,
            margin: "0px !important",
            marginLeft: "0px",
            marginTop: "-2.5px",
            textAlign: isMobile ? 'center' : 'left' 
          }}
        >
          <Tab
            style={{
              borderRadius: "0px 0px 5px 5px",
              ...(selectedTab === 0 && {
                backgroundColor: "#008080",
                color: "#ffffff",
              }),
              marginLeft: isMobile ? "0px" : isLeaveApprover ? "282px" : "343px",
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              height: "40px",
              width: "130px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "2px solid #008080",
            }}
          >
            <p style={{ marginLeft: "-10px" }}>Timesheet</p>
          </Tab>
          {isLeaveApprover && (
            <Tab
              style={{
                borderRadius: "0px 0px 5px 5px",
                ...(selectedTab === 1 && {
                  backgroundColor: "#008080",
                  color: "#ffffff",
                }),
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px",
                height: "40px",
                width: "130px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px solid #008080",
              }}
            >
              Leaves
            </Tab>
          )}
        </TabList>
        <TabPanel>
          <Outlet />
        </TabPanel>
        {isLeaveApprover && (
          <TabPanel>
            <Outlet />
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
}
