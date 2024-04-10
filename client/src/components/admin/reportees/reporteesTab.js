import React, { useEffect, useState } from "react";
import ReporteesHeader from "./reporteesHeader";
import ReporteesList from "./reporteesList";
import { useDispatch } from "react-redux";
import { getAllReportessAction } from "../../../redux/actions/workSpace/workSpaceAction";
import { Grid } from "@mui/material";

const ReporteesTab = () => {
  const [project, setProject] = useState("All");
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllReportessAction(
        { projectId: project === "All" ? "" : project },
        selectedOption
      )
    );
  }, [project, selectedOption]);
  return (
    <div>
      <ReporteesHeader
        project={project}
        setProject={setProject}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Grid sx={{ paddingLeft: "20px" }}>
        <ReporteesList />
      </Grid>
    </div>
  );
};

export default ReporteesTab;
