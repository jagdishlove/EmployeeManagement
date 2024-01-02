import { Box, CircularProgress, Dialog, Typography } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  approveRejectLeavesAction,
  getApprovalLeaveTeamMemberAction,
  getLeaveRequestData,
} from "../../../redux/actions/leaves/approvalLeaveAction";
import DataCard from "./DataCard";
import ApprovalLeaveHeader from "./approvalLeaveHeader";

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
  const [error, setError] = useState({});

  // const [errorValidation, setErrorValidation] = useState({});

  const [leaveRequestId, setLeaveRequestId] = useState();

  const newSize = 5 * counter;

  useEffect(() => {
    if (dateData === "CALENDER") {
      const currentDate = dayjs().format("YYYY-MM-DD");
      payload.fromDate = selectedDate.format("YYYY-MM-DD");
      payload.toDate = currentDate;
    }

    setTeamMemberData("All");

    dispatch(getApprovalLeaveTeamMemberAction(payload));
  }, [dateData, selectedDate, dispatch]);

  const dateChangeHandler = (e) => {
    const { value } = e.target;
    setDateData(value);
  };

  const handleCalendarClick = () => {
    setIsOpenCalender(true);
  };

  const calendarDateAcceptHandler = async (date) => {
    setIsOpenCalender(false);

    if (dateData === "CALENDER") {
      const payload = {
        empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
        fromDate: date.format("YYYY-MM-DD"),
        toDate: dayjs().format("YYYY-MM-DD"),
        dateBand: dateData,
        size: newSize,
      };

      await dispatch(getLeaveRequestData(payload));
    }

    setSelectedDate(date);
    setIsOpenCalender(false);
  };

  const payload = {
    empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
    fromDate: dateData === "CALENDER" ? selectedDate.format("YYYY-MM-DD") : "",
    toDate: dateData === "CALENDER" ? dayjs().format("YYYY-MM-DD") : "",
    dateBand: dateData,
    size: 5 * counter,
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
    const fetchDataWithDelay = async () => {
      await fetchData();
    };

    fetchDataWithDelay();
  }, [TeamMemberData, dateData, selectedDate, counter]);

  const teamMemberSelectHandler = (e) => {
    setTeamMemberData(e.target.value);
  };

  const validationForm = (approverComment) => {
    let newErrors = "";
    if (!approverComment) {
      newErrors = "Please add details in the comments section.";
    }

    return newErrors;
  };

  const approveRejectLeavesHandler = (id, status, approverComment) => {
    const newErrors = validationForm(approverComment);
    const getDataPayload = {
      empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
      fromDate:
        dateData === "CALENDER" ? selectedDate.format("YYYY-MM-DD") : "",
      toDate: dateData === "CALENDER" ? dayjs().format("YYYY-MM-DD") : "",
      dateBand: dateData,
      size: 5 * counter,
    };
    if (Object.keys(newErrors).length === 0) {
      const payload = {
        leaveRequestId: id,
        approverComment,
        status,
      };
      setLeaveRequestId(id);
      dispatch(approveRejectLeavesAction(payload, getDataPayload));
      setError({});
    } else {
      setError(() => ({ [id]: newErrors }));
    }
  };

  const shouldDisableDate = (date) => {
    return dayjs(date).isAfter(dayjs(), "day"); // Disable future dates
  };

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    // dispatch(getLeaveRequestData(payload));
    const nextPage = 10 * counter;
    const nextPagePayload = {
      empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
      fromDate:
        dateData === "CALENDER" ? selectedDate.format("YYYY-MM-DD") : "",
      toDate: dateData === "CALENDER" ? dayjs().format("YYYY-MM-DD") : "",
      dateBand: dateData,
      size: nextPage,
    };

    dispatch(getLeaveRequestData(nextPagePayload));
    setCounter(counter);
  };

  return (
    <Box>
      <Dialog
        open={false}
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
            shouldDisableDate={shouldDisableDate}
            onAccept={calendarDateAcceptHandler} // Add this line
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

      {(getLeaveData?.content?.length ?? 0) === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>Oops! No leave requests found.</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={getLeaveData?.content?.length || 0}
          hasMore={getLeaveData?.totalElements > getLeaveData?.content?.length}
          next={fetchMore}
        >
          {getLeaveData?.content?.length > 0 ? (
            getLeaveData?.content.map((cardData) => (
              <Box key={cardData.leaveRequestId}>
                <DataCard
                  index={cardData.leaveRequestId}
                  cardData={cardData}
                  approval={true}
                  approveRejectLeavesHandler={approveRejectLeavesHandler}
                  leaveRequest={leaveRequestId}
                  error={error}
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
