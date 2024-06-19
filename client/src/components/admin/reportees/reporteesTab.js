import React, { useEffect, useState } from "react";
import ReporteesHeader from "./reporteesHeader";
import ReporteesList from "./reporteesList";
import { useDispatch, useSelector } from "react-redux";
import { getMyReportessAction } from "../../../redux/actions/approvals/Myreportees/MyreorteesAction";
import { Grid } from "@mui/material";

const ReporteesTab = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const size = 7;
  const dispatch = useDispatch();
  localStorage.setItem("selectedTabIndex", 2);
  localStorage.setItem("selectedSubTabIndex", 0);

  const empId = useSelector((state) => state?.persistData?.loginDetails?.data?.empId);

  useEffect(() => {
    if (empId) {
      console.log("empId", empId);
      dispatch(
        getMyReportessAction(
          {
            empId: empId,
            page: currentPage,
            size: size,
          },
          selectedOption
        )
      );
    }
  }, [empId, selectedOption, currentPage, dispatch]);

  return (
    <div>
      <ReporteesHeader
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
