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
import ReporteesTab from "./reporteesTab.js";

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
                }}
              >
                {/* No border-bottom for the sub-tabs */}
                <Tab
                  style={{
                    borderRadius: "0px 0px 5px 5px",
                    backgroundColor: "#D4D7E3",
                    color: "#000000",
                    ...(selectedTab === 0 && {
                      backgroundColor: "#008080",
                      color: "#ffffff",
                    }),
                    
                    marginLeft:'360px',
                    width:'200px',
                    height:'70px',
                    textAlign:'center'
                  }}
                  onClick={() => setSelectedTab(0)}
                >
                  <p style={{marginTop:'13px'}}>Timesheet</p> 
                </Tab>
                {/* Render the "Leaves" tab only for users with "LEAVEAPPROVER" role */}
                {isLeaveApprover && (
                  <Tab
                    style={{
                      borderRadius: "0px 0px 5px 5px",
                      backgroundColor: "#D4D7E3",
                      color: "#000000",
                      ...(selectedTab === 1 && {
                        backgroundColor: "#008080",
                        color: "#ffffff",
                      }),
                      width:'200px',
                      height:'70px',
                      textAlign:'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => setSelectedTab(1)}
                  >
                   <p style={{marginTop:'13px'}}>Leaves</p> 
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
            <ProjectsTab />
          </TabPanel>
        </Tabs>
      )}
    </Box>
  );
};

export default AdminHeader;
