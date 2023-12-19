import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ApprovalLeavesPage from "./approvalLeaves/approvalLeavesPage.js";
import MySpaceTab from "./mySpaceTab.js";
import ProjectsTab from "./projectsTab.js";
import ReporteesTab from "./reporteesTab.js";
import { adminHeaderStyle } from "./approvalTimesheets/adminHeaderStyle.js";
import TimesheetTab from "./approvalTimesheets/timesheetTab.js";

const AdminHeader = () => {
  console.log("hello");
  const theme = useTheme();
  const style = adminHeaderStyle(theme);
  const role = useSelector((state) => state?.persistData.data.role);
  const defaultTabIndex = role?.includes("APPROVER") ? 3 : 0;
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Box>
      {role.includes("APPROVER") ? (
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
                  marginLeft: "369px",
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
                  }}
                  onClick={() => setSelectedTab(0)}
                >
                  Timesheets
                </Tab>
                <Tab
                  style={{
                    borderRadius: "0px 0px 5px 5px",
                    backgroundColor: "#D4D7E3",
                    color: "#000000",
                    ...(selectedTab === 1 && {
                      backgroundColor: "#008080",
                      color: "#ffffff",
                    }),
                  }}
                  onClick={() => setSelectedTab(1)}
                >
                  Leaves
                </Tab>
              </TabList>
              <TabPanel>
                <TimesheetTab />
              </TabPanel>
              <TabPanel>
                <ApprovalLeavesPage />
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
