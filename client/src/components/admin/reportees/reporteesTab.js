import React, { useEffect, useState } from "react";
import ReporteesHeader from "./reporteesHeader";
import ReporteesList from "./reporteesList";
import { useDispatch, useSelector } from "react-redux";
import { getMyReportessAction } from "../../../redux/actions/approvals/Myreportees/MyreorteesAction";
import { Grid } from "@mui/material";

const ReporteesTab = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(
    JSON.parse(localStorage.getItem("currentPage")) || 0
  );
  const [breadcrumbs, setBreadcrumbs] = useState(
    JSON.parse(localStorage.getItem("breadcrumbs")) || []
  ); // retrieve breadcrumbs from localStorage
  const size = 7;
  const dispatch = useDispatch();
  localStorage.setItem("selectedTabIndex", 2);
  localStorage.setItem("selectedSubTabIndex", 0);
  const empId = useSelector((state) => state?.persistData?.loginDetails?.data?.empId);
  const userName = useSelector((state) => state?.persistData?.loginDetails?.data.userName);
  const lastBreadcrumbs = breadcrumbs[breadcrumbs.length - 1];

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
    if (empId) {
      dispatch(
        getMyReportessAction(
          {
            empId: breadcrumbs.length === 0 ? empId : lastBreadcrumbs.id,
            page: currentPage,
            size: size,
          },
          selectedOption
        )
      );
    }
  }, [empId, selectedOption, currentPage, dispatch]);

  const handleFetchReportees = (empId, firstName, lastName) => {
    setBreadcrumbs((prevBreadcrumbs) => {
      const breadcrumbExists = prevBreadcrumbs.some((breadcrumb) => breadcrumb.id === empId);
      if (!breadcrumbExists) {
        return [...prevBreadcrumbs, { id: empId, name: `${firstName} ${lastName}` }];
      }
      return prevBreadcrumbs;
    });
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

  useEffect(() => {
    localStorage.setItem("breadcrumbs", JSON.stringify(breadcrumbs)); // store breadcrumbs in localStorage
  }, [breadcrumbs]);
  localStorage.removeItem("currentPage");
  return (
    <div>
      <ReporteesHeader
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