import { getAllLeavesForAdminAction } from "../../../redux/actions/AdminConsoleAction/leaves/adminLeaveAction";
import LeavesHeader from "./leavesHeader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import DataCard from "../../admin/approvalLeaves/DataCard";

const AdminLeaves = ({ approveRejectLeavesHandler }) => {
  const dispatch = useDispatch();
  const [selectedSearchOption, setSelectedSearchOption] = useState("");
  const SUBMITTED = "SUBMITTED";
  const [leaveStatus, setLeaveStatus] = useState(SUBMITTED);
  const [selectedDate, setSelectedDate] = useState("All");
  const [approver, setApprover] = useState("All");
  const [pageCounter, setPageCounter] = useState(2);
  const [resultFilterData, setResultFilterData] = useState([]);

  const getPayload = {
    size: 5 * 2,
    status: leaveStatus,
    date:
      selectedDate !== "All"
        ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
        : "",
    approverId: approver === "All" ? "" : approver,
  };

  useEffect(() => {
    dispatch(getAllLeavesForAdminAction(selectedSearchOption, getPayload));
  }, [leaveStatus, selectedDate, approver, dispatch, selectedSearchOption]);

  const adminLeavesData = useSelector(
    (state) => state?.nonPersist?.adminLeaves?.allLeavesForAdmin
  );

  useEffect(() => {
    setResultFilterData(adminLeavesData);
  }, [adminLeavesData]);

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    const nextPage = 10 * pageCounter;
    const nextPagePayload = {
      size: nextPage,
      status: leaveStatus,
      date:
        selectedDate !== "All"
          ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
          : "",
      approverId: approver === "All" ? "" : approver,
    };

    dispatch(
      getAllLeavesForAdminAction(
        nextPagePayload,
        getPayload,
        selectedSearchOption
      )
    );
    setPageCounter((counter) => counter + 1);
  };

  return (
    <div>
      <LeavesHeader
        setSelectedSearchOption={setSelectedSearchOption}
        setLeaveStatus={setLeaveStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setApprover={setApprover}
        approver={approver}
      />
      {resultFilterData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No Project Data Found</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={adminLeavesData?.content?.length || 0}
          hasMore={true}
          next={fetchMore}
        >
          {adminLeavesData?.content?.map((cardData) => (
            <DataCard
              key={cardData.leaveRequestId}
              cardData={cardData}
              // index={cardData.leaveRequestId}
              approveRejectLeavesHandler={approveRejectLeavesHandler}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default AdminLeaves;
