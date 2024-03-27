import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ApprovalLeavesPage from "./approvalLeaves/approvalLeavesPage.js";
import { adminHeaderStyle } from "./approvalTimesheets/adminHeaderStyle.js";
import TimesheetTab from "./approvalTimesheets/timesheetTab.js";
import MySpaceTab from "./mySpaceTab.js";
import ProjectsTab from "./projectsTab.js";
import ReporteesTab from "./reportees/reporteesTab.js";

const AdminHeader = () => {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);
  const role = useSelector((state) => state?.persistData.data.role);
  const defaultTabIndex = role?.includes("APPROVER") ? 3 : 0;
  const [selectedTab, setSelectedTab] = useState(0);

  // Check if the user has the "LEAVEAPPROVER" role
  const isLeaveApprover = role?.includes("LEAVEAPPROVER");

  return (
    <Box>
      {role.includes("APPROVER") || isLeaveApprover ? (
        <Tabs defaultIndex={defaultTabIndex}>
          <TabList style={style.tablistStyle}>
            <Tab>My Space</Tab>
            <Tab>Projects</Tab>
            <Tab>Reportees</Tab>
            <Tab>Approvals</Tab>
          </TabList>
          <TabPanel>
            <MySpaceTab />
          </TabPanel>
          <TabPanel>
            <ProjectsTab />
          </TabPanel>
          <TabPanel>
            <ReporteesTab />
          </TabPanel>
          <TabPanel>
            {/* Nested Tabs for sub-tabs under Approvals */}
            <Tabs>
              <TabList
                style={{
                  borderBottom: "none",
                  padding: 0,
                  margin: "0px !important",
                  marginLeft: "0px",
                  marginTop: "-2.5px",
                }}
              >
                {/* No border-bottom for the sub-tabs */}
                <Tab
                  style={{
                    borderRadius: "0px 0px 5px 5px",
                    ...(selectedTab === 0 && {
                      backgroundColor: "#008080",
                      color: "#ffffff",
                    }),
                    marginLeft: isLeaveApprover ? "390px" : "454px",
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    height: "40px",
                    width: "130px",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "2px solid #008080",
                  }}
                  onClick={() => setSelectedTab(0)}
                >
                  <p style={{ marginLeft: "-10px" }}>Timesheet </p>
                </Tab>
                {/* Render the "Leaves" tab only for users with "LEAVEAPPROVER" role */}
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
                    onClick={() => setSelectedTab(1)}
                  >
                    Leaves
                  </Tab>
                )}
              </TabList>
              <TabPanel>
                <TimesheetTab />
              </TabPanel>
              <TabPanel>
                {/* Render the "ApprovalLeavesPage" only for users with "LEAVEAPPROVER" role */}
                {isLeaveApprover && <ApprovalLeavesPage />}
              </TabPanel>
            </Tabs>
          </TabPanel>
        </Tabs>
      ) : (
        <Tabs>
          <TabList style={style.tablistStyle}>
            <Tab>My space</Tab>
          </TabList>
          <TabPanel>
            <MySpaceTab />
          </TabPanel>
        </Tabs>
      )}
    </Box>
  );
};

export default AdminHeader;
