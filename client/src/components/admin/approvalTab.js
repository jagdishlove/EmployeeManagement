import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ApprovalTab() {
  const [selectedTab, setSelectedTab] = useState(0);
  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data.role
  );
  const isLeaveApprover = role?.includes("LEAVEAPPROVER");
  const navigate = useNavigate();

  // Load selected tab index from localStorage on component mount
  useEffect(() => {
    const storedTabIndex = localStorage.getItem("selectedSubTabIndex");
    if (storedTabIndex !== null) {
      setSelectedTab(parseInt(storedTabIndex));
    }
  }, []);
  localStorage.setItem("selectedTabIndex", 2);
  // Function to handle tab click and navigation
  const handleNavigate = (index, type) => {
    setSelectedTab(index); // Update selected tab index
    localStorage.setItem("selectedSubTabIndex", index); // Save selected tab index to localStorage
    navigate(type); // Navigate to the specified route
  };

  return (
    <div>
      <Tabs>
        <TabPanel>
          <TabList
            style={{
              borderBottom: "none",
              padding: 0,
              margin: "0px !important",
              marginLeft: "0px",
              marginTop: "-2.5px",
            }}
          >
            <Tab
              onClick={() => handleNavigate(0, "/workspace/Approval")}
              style={{
                borderRadius: "0px 0px 5px 5px",
                ...(selectedTab === 0 && {
                  backgroundColor: "#008080",
                  color: "#ffffff",
                }),
                marginLeft: isLeaveApprover ? "282px" : "343px",
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
              <p style={{ marginLeft: "-10px" }}>Timesheet </p>
            </Tab>
            {isLeaveApprover && (
              <Tab
                onClick={() => handleNavigate(1, "/workspace/Approval/leaves")}
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
        </TabPanel>
      </Tabs>
      <br />
      <Outlet />
    </div>
  );
}
