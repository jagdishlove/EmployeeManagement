import React, { useEffect, useState } from "react";
import MyProjectsHeader from "./MyProjectsHeader";
import MyProjectsList from "./MyProjectsList";
import { useDispatch } from "react-redux";
import { getAllReportessAction } from "../../../redux/actions/workSpace/workSpaceAction";
import { Grid } from "@mui/material";

const MyProjectsTab = () => {
  const [project, setProject] = useState(
    localStorage.getItem("project") || "All"
  );
  const [selectedOption, setSelectedOption] = useState(
    JSON.parse(localStorage.getItem("selectedOption")) || ""
  );
  const [ccurrentPage, setcCurrentPage] = useState(
    JSON.parse(localStorage.getItem("ccurrentPage")) || 0
  ); // Use currentPage state
  const size = 7;
  const dispatch = useDispatch();

  localStorage.setItem("selectedTabIndex", 1);
  localStorage.setItem("selectedSubTabIndex", 0);

  useEffect(() => {
    localStorage.setItem("ccurrentPage", JSON.stringify(ccurrentPage)); // Store currentPage in local storage
    localStorage.setItem("project", project);
    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
    dispatch(
      getAllReportessAction(
        {
          projectId: project === "All" ? "" : project,
          page: ccurrentPage,
          size: size,
        },
        selectedOption
      )
    );
  }, [project, selectedOption, ccurrentPage, dispatch]);

  localStorage.removeItem("currentPage");
  return (
    <div>
      <MyProjectsHeader
        project={project}
        setProject={setProject}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setcCurrentPage={setcCurrentPage} // Pass setCurrentPage down to MyProjectsHeader
      />
      <Grid sx={{ paddingLeft: "20px" }}>
        <MyProjectsList
          ccurrentPage={ccurrentPage} // Pass currentPage down to MyProjectsList
          setcCurrentPage={setcCurrentPage} // Pass setCurrentPage down to MyProjectsList
        />
      </Grid>
    </div>
  );
};

export default MyProjectsTab;
