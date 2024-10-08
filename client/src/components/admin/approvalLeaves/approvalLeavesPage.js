import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
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
    (state) => state.persistData.approvalLeavesData
  );

  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [dateData, setDateData] = useState("THIS_WEEK");
  const [TeamMemberData, setTeamMemberData] = useState("All");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [error, setError] = useState({});
  const [pageCounter, setPageCounter] = useState(2);
  const [counter, setCounter] = useState(1);

  const [loading, setLoading] = useState(false);

  const [leaveRequestId, setLeaveRequestId] = useState();

  const newSize = 10 * counter;

  useEffect(() => {
    setTeamMemberData("All");
    dispatch(getApprovalLeaveTeamMemberAction(payload));
  }, [selectedDate, dispatch, dateData]);

  const dateChangeHandler = (e) => {
    const { value } = e.target;
    setDateData(value);
  };

  const handleCalendarClick = () => {
    setIsOpenCalender(true);
  };

  const calendarDateAcceptHandler = async () => {
    setIsOpenCalender(false);
    if (dateData === "CALENDER") {
      const payload = {
        empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
        fromDate: selectedDate?.format("YYYY-MM-DD"),
        toDate: dayjs().format("YYYY-MM-DD"),
        dateBand: dateData,
        size: newSize,
      };
      setPageCounter(2);
      await dispatch(getLeaveRequestData(payload));
    }
  };

  const payload = {
    empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
    fromDate: dateData === "CALENDER" ? selectedDate?.format("YYYY-MM-DD") : "",
    toDate: dateData === "CALENDER" ? dayjs().format("YYYY-MM-DD") : "",
    dateBand: dateData,
    size: 5 * 2,
  };

  const fetchData = async () => {
    dispatch(getLeaveRequestData(payload));
  };

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      await fetchData();
    };

    fetchDataWithDelay();
  }, [TeamMemberData, dateData]);

  const teamMemberSelectHandler = (e) => {
    setTeamMemberData(e.target.value);
  };

  const validationForm = (approverComment, status) => {
    let newErrors = "";
    if (!approverComment && status === "REJECTED") {
      newErrors = "Please add details in the comments section.";
    }
    return newErrors;
  };

  const cancleHandler = () => {
    setIsOpenCalender(false);
  };

  const ActionList = () => {
    return (
      <Box>
        <Button onClick={calendarDateAcceptHandler}>Okay</Button>
        <Button onClick={cancleHandler}>Cancel</Button>
      </Box>
    );
  };

  const approveRejectLeavesHandler = async (id, status, approverComment) => {
    const newErrors = validationForm(approverComment, status);

    if (approverComment == "") {
      approverComment = "APPROVED";
    }

    const getDataPayload = {
      empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
      fromDate:
        dateData === "CALENDER" ? selectedDate.format("YYYY-MM-DD") : "",
      toDate: dateData === "CALENDER" ? dayjs().format("YYYY-MM-DD") : "",
      dateBand: dateData,
      size: newSize,
    };

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      try {
        const payload = {
          leaveRequestId: id,
          approverComment,
          status,
        };

        setLeaveRequestId(id);
        await dispatch(approveRejectLeavesAction(payload, getDataPayload));
        setError({});
      } finally {
        setLoading(false);
      }
    } else {
      setError({ ...newErrors, [id]: newErrors });
    }
  };

  const shouldDisableDate = (date) => {
    return dayjs(date).isAfter(dayjs(), "day"); // Disable future dates
  };

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    // dispatch(getLeaveRequestData(payload));
    const nextPage = 10 * pageCounter;
    setCounter(counter + 1);
    const nextPagePayload = {
      empId: TeamMemberData === "All" ? "" : TeamMemberData || "",
      fromDate:
        dateData === "CALENDER" ? selectedDate.format("YYYY-MM-DD") : "",
      toDate: dateData === "CALENDER" ? dayjs().format("YYYY-MM-DD") : "",
      dateBand: dateData,
      size: nextPage,
    };

    dispatch(getLeaveRequestData(nextPagePayload));
    setPageCounter((counter) => counter + 1);
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
            sx={{
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
            }}
            defaultValue={dayjs()}
            value={selectedDate}
            shouldDisableDate={shouldDisableDate}
            onChange={(date) => setSelectedDate(date)}
            slots={{
              actionBar: ActionList,
            }}
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
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography> No leave requests found.</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={getLeaveData?.content?.length || 0}
          hasMore={getLeaveData?.totalElements > getLeaveData?.numberOfElements}
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
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>
              Loading..
            </h1>
          )}
        </InfiniteScroll>
      )}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(255, 255, 255, 0.7)"
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ApprovalLeavesPage;
