import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../redux/actions/projects/projectsAction";
const Projects = () => {
  const [projects, setProjects] = useState(false);
  const dispatch = useDispatch();

  const payload = {
    size: 5 * 2,
  };
  const projectsData = useSelector(
    (state) => state?.nonPersist?.projectDetails?.projectsData
  );
  console.log("projectsData", projectsData);

  useEffect(() => {
    dispatch(getAllProjects(payload));
  }, [projects]);
  return (
    <div>
      <Typography variant="h4" setProjects={setProjects}>
        Projects
      </Typography>
    </div>
  );
};

export default Projects;
