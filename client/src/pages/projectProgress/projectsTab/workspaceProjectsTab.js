import React, { useEffect } from "react";
import ProjectTabSectionOne from "./projectTabSectionOne";
import ProjectTabSectionTwo from "./projectTabSectionTwo";
import ProjectTebSectionThree from "./projectTabSectionThree";
import { useDispatch,  } from "react-redux";
import { dashboardProjectDetailsAction } from "../../../redux/actions/dashboard/project/dashboardProjectAction";

const WorkspaceProjectsTab = ({ project }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (project) {
      dispatch(dashboardProjectDetailsAction(project));
    }
  }, [project]);

 
  return (
    <div>
      <ProjectTabSectionOne project={project} />
      <ProjectTabSectionTwo project={project} />
      <ProjectTebSectionThree project={project} />
    </div>
  );
};

export default WorkspaceProjectsTab;
