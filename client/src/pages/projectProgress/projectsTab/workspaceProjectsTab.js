import React, { useEffect } from "react";
import ProjectTabSectionOne from "./projectTabSectionOne";
import ProjectTabSectionTwo from "./projectTabSectionTwo";
import ProjectTebSectionThree from "./projectTabSectionThree";
import { useDispatch } from "react-redux";
import { dashboardProjectDetailsAction } from "../../../redux/actions/dashboard/project/dashboardProjectAction";
// import ProjectTabSectionFour from "./projectTabSectionFour";

const WorkspaceProjectsTab = ({ project }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dashboardProjectDetailsAction(project));
  }, [project]);

  return (
    <div>
      <ProjectTabSectionOne project={project} />
      <ProjectTabSectionTwo project={project} />
      <ProjectTebSectionThree project={project} />
      {/* <ProjectTabSectionFour /> */}
    </div>
  );
};

export default WorkspaceProjectsTab;
