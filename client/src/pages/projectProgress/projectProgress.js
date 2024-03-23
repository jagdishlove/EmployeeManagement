import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import WorkspaceProjectsTab from "./projectsTab/workspaceProjectsTab";
import WorkspaceEffortsTab from "./effortsTab/workspaceEffortsTab";

const ProjectProgress = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Project Progress Dashboard
      </Typography>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #C0C0C0",
        }}
      />

      <Box sx={{ width: "100%" }}>
        <Tabs>
          <TabList
            style={{
              borderBottom: "none",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Tab style={{ borderRadius: " 5px" }}>Projects</Tab>
            <Tab style={{ borderRadius: " 5px" }}>Efforts</Tab>
          </TabList>
          <TabPanel>
            <WorkspaceProjectsTab />
          </TabPanel>
          <TabPanel>
            <WorkspaceEffortsTab />
          </TabPanel>
        </Tabs>
      </Box>
    </div>
  );
};

export default ProjectProgress;
