import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminTimesheetHeader from "./adminTimesheetHeader";
import TimesheetRow from "../../timesheetRow/timesheetRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTimeSheetApprovers,
  getAllTimeSheetForAdmin,
} from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";

function AdminTimeSheet() {
  const [approver, setApprover] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [states] = useState("Submitted");
  const [pageCounter, setPageCounter] = useState(2);

  const [selectedSearchOption, setSelectedSearchOption] = useState("");
  const dispatch = useDispatch();

  const params = {
    status: "SUBMITTED",
  };

  const data = {
    status: "SUBMITTED",
    date:
      selectedDate !== "All"
        ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
        : "",
    approverId: approver === "All" ? "" : approver,
    size: pageCounter * 5,
  };

  useEffect(() => {
    dispatch(getAllTimeSheetApprovers(params));
  }, []);

  useEffect(() => {
    dispatch(getAllTimeSheetForAdmin(data, selectedSearchOption));
  }, [selectedDate, selectedSearchOption, approver]);

  const adminTimeSheetData = useSelector(
    (state) => state?.nonPersist?.adminTimeSheet?.allTimeSheetsForAdmin
  );

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    const nextPage = 10 * pageCounter;
    const nextPagePayload = {
      status: "SUBMITTED",
      date:
        selectedDate !== "All"
          ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
          : "",
      approverId: approver === "All" ? "" : approver,
      size: nextPage,
    };

    dispatch(getAllTimeSheetForAdmin(nextPagePayload, selectedSearchOption));
    setPageCounter((counter) => counter + 1);
  };

  return (
    <Grid>
      <AdminTimesheetHeader
        setApprover={setApprover}
        approver={approver}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        states={states}
        setSelectedSearchOption={setSelectedSearchOption}
      />
      {adminTimeSheetData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography> No TimeSheet requests found.</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={adminTimeSheetData?.content?.length || 0}
          hasMore={true}
          next={fetchMore}
        >
          {adminTimeSheetData ? (
            adminTimeSheetData?.content?.map((entry) => (
              <TimesheetRow
                key={entry.timesheetEntryId}
                data={entry}
                superAdmin={true}
              />
            ))
          ) : (
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>
              Loading..
            </h1>
          )}
        </InfiniteScroll>
      )}
    </Grid>
  );
}

export default AdminTimeSheet;
