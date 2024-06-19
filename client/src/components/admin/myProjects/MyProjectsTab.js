import React, { useEffect, useState } from "react";
import MyProjectsHeader from "./MyProjectsHeader";
import MyProjectsList from "./MyProjectsList";
import { useDispatch } from "react-redux";
import { getAllReportessAction } from "../../../redux/actions/workSpace/workSpaceAction";
import { Grid } from "@mui/material";

const MyProjectsTab = () => {
  const [project, setProject] = useState("All");
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const size = 7;
  const dispatch = useDispatch();
  localStorage.setItem("selectedTabIndex", 1);
  localStorage.setItem("selectedSubTabIndex", 0);
  useEffect(() => {
    dispatch(
      getAllReportessAction(
        {
          projectId: project === "All" ? "" : project,
          page: currentPage,
          size: size,
        },
        selectedOption
      )
    );
  }, [project, selectedOption, currentPage]);
  return (
    <div>
      <MyProjectsHeader
        project={project}
        setProject={setProject}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Grid sx={{ paddingLeft: "20px" }}>
        <MyProjectsList
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
    </div>
  );
};

export default MyProjectsTab;
