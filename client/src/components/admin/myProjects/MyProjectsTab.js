import React, { useEffect, useState } from "react";
import MyProjectsHeader from "./MyProjectsHeader";
import MyProjectsList from "./MyProjectsList";
import { useDispatch } from "react-redux";
import { getAllReportessAction } from "../../../redux/actions/workSpace/workSpaceAction";
import { Grid } from "@mui/material";

const MyProjectsTab = () => {
  const [project, setProject] = useState("All");
  const [selectedOption, setSelectedOption] = useState("");
  const [pcurrentPage, setpCurrentPage] = useState(
    JSON.parse(localStorage.getItem("pcurrentPage")) || 0
  );
  const size = 7;
  const dispatch = useDispatch();
  localStorage.setItem("selectedTabIndex", 1);
  localStorage.setItem("selectedSubTabIndex", 0);
  useEffect(() => {
    localStorage.setItem("pcurrentPage", JSON.stringify(pcurrentPage));
    dispatch(
      getAllReportessAction(
        {
          projectId: project === "All" ? "" : project,
          page: pcurrentPage,
          size: size,
        },
        selectedOption
      )
    );
  }, [project, selectedOption, pcurrentPage]);
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
          pcurrentPage={pcurrentPage}
          setpCurrentPage={setpCurrentPage}
        />
      </Grid>
    </div>
  );
};

export default MyProjectsTab;
