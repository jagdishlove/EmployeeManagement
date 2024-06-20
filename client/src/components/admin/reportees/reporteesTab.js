import React, { useEffect, useState } from "react";
import ReporteesHeader from "./reporteesHeader";
import ReporteesList from "./reporteesList";
import { useDispatch, useSelector } from "react-redux";
import { getMyReportessAction } from "../../../redux/actions/approvals/Myreportees/MyreorteesAction";
import { Grid } from "@mui/material";

const ReporteesTab = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const size = 7;
  const dispatch = useDispatch();
  localStorage.setItem("selectedTabIndex", 2);
  localStorage.setItem("selectedSubTabIndex", 0);

  const empId = useSelector((state) => state?.persistData?.loginDetails?.data?.empId);
  const userName = useSelector((state) => state?.persistData?.loginDetails?.data.userName);

  useEffect(() => {
    if (empId) {
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

  const handleFetchReportees = (empId, firstName, lastName) => {
    setBreadcrumbs((prevBreadcrumbs) => [
      ...prevBreadcrumbs,
      { id: empId, name: `${firstName} ${lastName}` }
    ]);
    dispatch(
      getMyReportessAction(
        {
          empId: empId,
          page: currentPage,
          size: 7,
        }
      )
    );
  };

  const handleBreadcrumbClick = (empId, index) => {
    if (index === -1) {
      setBreadcrumbs([]);
      dispatch(
        getMyReportessAction(
          {
            empId: empId,
            page: 0,
            size: 7,
          }
        )
      );
    } else {
      setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, index + 1));
      dispatch(
        getMyReportessAction(
          {
            empId: empId,
            page: 0,
            size: 7,
          }
        )
      );
    }
    setCurrentPage(0);
  };

  return (
    <div>
      <ReporteesHeader
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        breadcrumbs={breadcrumbs}
        handleBreadcrumbClick={handleBreadcrumbClick}
        userName={userName}
        userEmpId={empId}
      />
      <Grid sx={{ paddingLeft: "20px" }}>
        <ReporteesList
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleFetchReportees={handleFetchReportees}
        />
      </Grid>
    </div>
  );
};

export default ReporteesTab;
