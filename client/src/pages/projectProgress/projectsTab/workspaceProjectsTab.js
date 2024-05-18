import React from "react";
import ProjectTabSectionOne from "./projectTabSectionOne";
import ProjectTabSectionTwo from "./projectTabSectionTwo";
import ProjectTebSectionThree from "./projectTabSectionThree";

const WorkspaceProjectsTab = ({ project }) => {
  return (
    <div>
      <ProjectTabSectionOne project={project} />
      <ProjectTabSectionTwo project={project} />
      <ProjectTebSectionThree project={project} />
    </div>
  );
};

export default WorkspaceProjectsTab;
