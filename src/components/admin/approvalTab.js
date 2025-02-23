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
    } else if (isLeaveApprover && location.pathname === "/workspace/Approval/leaves") {
      setSelectedTab(1);
    } else if (!isLeaveApprover && location.pathname === "/workspace/Approval/Ratings") {
      setSelectedTab(1); // For non-leave approver, Ratings will be the second tab
    } else if (location.pathname === "/workspace/Approval/Ratings") {
      setSelectedTab(2);
    }
  }, [location.pathname, isLeaveApprover]);

  localStorage.setItem("selectedTabIndex", 3);

  // Function to handle tab click and navigation
  const handleNavigate = (index) => {
    setSelectedTab(index); // Update selected tab index
    localStorage.setItem("selectedSubTabIndex", index); // Save selected tab index to localStorage

    if (index === 0) {
      navigate("/workspace/Approval");
    } else if (index === 1) {
      if (isLeaveApprover) {
        navigate("/workspace/Approval/leaves");
      } else {
        navigate("/workspace/Approval/Ratings");
      }
    } else {
      navigate("/workspace/Approval/Ratings");
    }
  };

  localStorage.removeItem("currentPage", "pcurrentPage");
  localStorage.removeItem("pcurrentPage");

  return (
    <div>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={handleNavigate}
      >
        <TabList
          style={{
            borderBottom: "none",
            padding: 0,
            margin: "0px !important",
            marginLeft: isLeaveApprover ? "-35px" : "60px",
            marginTop: "-2.5px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Tab
            style={{
              borderRadius: "0px 0px 5px 5px",
              ...(selectedTab === 0 && {
                backgroundColor: "#008080",
                color: "#ffffff",
              }),
              marginLeft: isMobile
                ? "0px"
                : isLeaveApprover
                ? "420px"
                : "343px",
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              height: "40px",
              width: isLeaveApprover ? "100px" : "130px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "2px solid #008080",
            }}
          >
            <p style={{ marginLeft: isLeaveApprover ? "-20px" : "-10px" }}>
              Timesheet
            </p>
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
                width: "100px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px solid #008080",
              }}
            >
              <p style={{ marginLeft: "-15px" }}>Leaves</p>
            </Tab>
          )}
          <Tab
            style={{
              borderRadius: "0px 0px 5px 5px",
              ...(selectedTab === (isLeaveApprover ? 2 : 1) && {
                backgroundColor: "#008080",
                color: "#ffffff",
              }),
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              height: "40px",
              width: isLeaveApprover ? "100px" : "130px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "2px solid #008080",
            }}
          >
            <p style={{ marginLeft: isLeaveApprover ? "-20px" : "-10px" }}>
              Ratings
            </p>
          </Tab>
        </TabList>
        <TabPanel>
          <Outlet />
        </TabPanel>
        {isLeaveApprover && (
          <TabPanel>
            <Outlet />
          </TabPanel>
        )}
        <TabPanel>
          <Outlet />
        </TabPanel>
      </Tabs>
    </div>
  );
}
