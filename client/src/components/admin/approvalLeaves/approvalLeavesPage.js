import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Dialog } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  approveRejectLeavesAction,
  getApprovalLeaveTeamMemberAction,
  getLeaveRequestData,
} from "../../../redux/actions/leaves/approvalLeaveAction";
import DataCard from "./DataCard";
import ApprovalLeaveHeader from "./approvalLeaveHeader";
import InfiniteScroll from "react-infinite-scroll-component";

const ApprovalLeavesPage = () => {
  const dispatch = useDispatch();
  const { getLeaveData } = useSelector(
    (state) => state.nonPersist.approvalLeavesData
  );

  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [dateData, setDateData] = useState("THIS_WEEK");
  const [TeamMemberData, setTeamMemberData] = useState("All");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [counter, setCounter] = useState(2);

  const newSize = 5 * counter;

  useEffect(() => {
    const payload = {
      fromDate: "",
      toDate: "",
      dateBand: dateData,
    };

    if (dateData === "CALENDER") {
      const currentDate = dayjs().format("YYYY-MM-DD");
      payload.fromDate = selectedDate.format("YYYY-MM-DD");
      payload.toDate = currentDate;
      setIsOpenCalender(true);
    }

    setTeamMemberData("All");

    setTeamMemberData("All");

    dispatch(getApprovalLeaveTeamMemberAction(payload));
  }, [dateData, selectedDate, setIsOpenCalender, dispatch]);

  const dateChangeHandler = (e) => {
    const { value } = e.target;
    setDateData(value);
  };

  const handleCalendarClick = () => {
    setIsOpenCalender(true);
  };

  const calendarDateChangeHandler = (date) => {
    setIsOpenCalender(false);
    setSelectedDate(date);

    const payload = {
      fromDate: date.format("YYYY-MM-DD"),
      toDate: dayjs().format("YYYY-MM-DD"),
      dateBand: dateData,
      size: newSize,
    };

    if (dateData === "CALENDER") {
      dispatch(getLeaveRequestData(payload));
    } else {
      setTeamMemberData("All");
      setTeamMemberData("All");
    }
  };

  const payload = {
    empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
    fromDate: dateData === "CALENDER" ? selectedDate.format("YYYY-MM-DD") : "",
    toDate: dateData === "CALENDER" ? dayjs().format("YYYY-MM-DD") : "",
    dateBand: dateData,
    size: 2 * counter,
  };

  const fetchData = async () => {
    if (TeamMemberData || dateData === "CALENDER") {
      dispatch(getLeaveRequestData(payload));
    }
  };

  useEffect(() => {
    if (dateData === "CALENDER") {
      return;
    }
    setTimeout(() => {
      fetchData();
    }, 500);
  }, [TeamMemberData, dateData, selectedDate]);

  const teamMemberSelectHandler = (e) => {
    setTeamMemberData(e.target.value);
  };

  const approveRejectLeavesHandler = (id, status, approverComment) => {
    const payload = {
      leaveRequestId: id,
      approverComment,
      status,
    };
    dispatch(approveRejectLeavesAction(payload));
    fetchData();
  };

  const shouldDisableDate = (date) => {
    return dayjs(date).isAfter(dayjs(), "day"); // Disable future dates
  };

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    dispatch(getLeaveRequestData(payload));
    const nextPage = counter + 1;
    setCounter(nextPage);
  };

  return (
    <Box>
      <Dialog
        open={isOpenCalender}
        onClose={() => setIsOpenCalender(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            sx={{ overflow: "scroll" }}
            onClose={() => {
              setIsOpenCalender(false);
            }}
            defaultValue={dayjs()}
            value={selectedDate}
            shouldDisableDate={shouldDisableDate} // function to disable future dates
            onChange={calendarDateChangeHandler}
          />
        </LocalizationProvider>
      </Dialog>
      <ApprovalLeaveHeader
        setIsOpenCalender={setIsOpenCalender}
        isOpenCalender={isOpenCalender}
        dateChangeHandler={dateChangeHandler}
        dateData={dateData}
        TeamMemberData={TeamMemberData}
        teamMemberSelectHandler={teamMemberSelectHandler}
        handleCalendarClick={handleCalendarClick} // Pass the callback function
      />
      {getLeaveData?.content?.length === 0 ? (
        <p>No available data</p>
      ) : (
        <InfiniteScroll
          dataLength={getLeaveData?.content?.length || 0}
          hasMore={getLeaveData?.totalElements > getLeaveData?.content.length}
          next={fetchMore}
        >
          {getLeaveData ? (
            getLeaveData?.content?.map((cardData) => (
              <Box key={cardData.leaveRequestId}>
                <DataCard
                  key={cardData.leaveRequestId}
                  cardData={cardData}
                  approveRejectLeavesHandler={approveRejectLeavesHandler}
                />
              </Box>
            ))
          ) : (
            <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default ApprovalLeavesPage;
