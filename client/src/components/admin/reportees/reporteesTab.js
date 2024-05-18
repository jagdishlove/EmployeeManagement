import React, { useEffect, useState } from "react";
import ReporteesHeader from "./reporteesHeader";
import ReporteesList from "./reporteesList";
import { useDispatch } from "react-redux";
import { getAllReportessAction } from "../../../redux/actions/workSpace/workSpaceAction";
import { Grid } from "@mui/material";

const ReporteesTab = () => {
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
      <ReporteesHeader
        project={project}
        setProject={setProject}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Grid sx={{ paddingLeft: "20px" }}>
        <ReporteesList
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
    </div>
  );
};

export default ReporteesTab;
