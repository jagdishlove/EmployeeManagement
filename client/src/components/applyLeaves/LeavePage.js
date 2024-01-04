import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLeave,
  getLeaveBalanceAction,
  getNumbersOfDaysAction,
  saveLeaveFormAction,
} from "../../redux/actions/leaves/leaveAction";
import { fetchLeaveHistory } from "../../redux/actions/leaves/leaveHistoryActions";
import HolidayList from "./HolidayList";
import LeaveHeader from "./LeaveHeader";
import LeaveHistory from "./LeaveHistory";
import LeaveBalance from "./leaveBalance";
import LeaveRequestForm from "./leaveRequestForm";

const LeavePage = () => {
  const managerData = useSelector(
    (state) => state.persistData.masterData?.manager
  );

  const { leaveFormError, formDataLoading } = useSelector(
    (state) => state?.nonPersist?.leavesData
  );

  const [historyData, setHistoryData] = useState([]);
  const [leaveHistoryData, setLeaveHistoryData] = useState([]);
  const [leaveDelete, setLeaveDelete] = useState(true);
  const [errors, setErrors] = useState({});

  const [file, setFile] = useState(null);

  const initialData = {
    leaveRequestId: "",
    fromDate: dayjs(new Date()),
    toDate: dayjs(new Date()),
    fromSession: "",
    toSession: "",
    leaveMasterId: "",
    comments: "",
    manager: managerData.managerName || "",
    cc: [] || "",
    file: file || " ",
  };

  const [disableSave, setDisableSave] = useState("");
  const [leaveRqstData, setLeaveReqstData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(0);
  const [leaveBalance, setLeaveBalance] = useState(false);

  const [saveSubmitStatus, setSaveSubmitStatus] = useState(false);

  const dispatch = useDispatch();

  const leaveHistory = useSelector(
    (state) => state?.nonPersist?.leaveHistoryData?.data
  );

  const clearFile = () => {
    setFile(null);
  };

  useEffect(() => {
    dispatch(fetchLeaveHistory({ page: currentPage }));
  }, [dispatch, saveSubmitStatus, leaveDelete, currentPage, leaveBalance]);

  useEffect(() => {
    setLeaveHistoryData(leaveHistory);
  }, [leaveHistory, leaveDelete, leaveBalance]);

  useEffect(() => {
    dispatch(getLeaveBalanceAction());
    setLeaveBalance(false);
  }, [dispatch, leaveBalance]);

  const addHistoryEntry = (entry) => {
    setHistoryData([...historyData, entry]);
  };

  const handleDeleteLeave = (leaveId) => {
    dispatch(deleteLeave(leaveId)).then(() => {
      setLeaveHistoryData((prevData) => {
        const contentArray = Array.isArray(prevData.content)
          ? prevData.content
          : [];
        const newArray = contentArray.filter(
          (entry) => entry.leaveRequestId !== leaveId
        );
        return { ...prevData, content: newArray };
      });
      setLeaveDelete(true);
      setLeaveBalance(true);
      setLeaveBalance(true);
    });
  };

  const onChangeFormDataHandler = (e, values, type) => {
    if (type === "fromDate" || type === "toDate") {
      const formattedDate = dayjs(e).format("YYYY-MM-DD");
      setLeaveReqstData((prevData) => ({
        ...prevData,
        [type]: formattedDate,
      }));
    } else if (type !== "cc") {
      const { value, name } = e.target;
      setLeaveReqstData((prevData) => ({
        ...prevData,
        [name]: value.toString(),
      }));
    } else {
      setLeaveReqstData((prevData) => ({
        ...prevData,
        [type]: values,
      }));
    }
  };

  useEffect(() => {
    if (
      leaveRqstData.fromDate &&
      leaveRqstData.toDate &&
      leaveRqstData.fromSession &&
      leaveRqstData.toSession &&
      leaveRqstData.leaveMasterId
    ) {
      const payload = {
        fromDate: leaveRqstData.fromDate,
        fromSession: leaveRqstData.fromSession,
        toDate: leaveRqstData.toDate,
        toSession: leaveRqstData.toSession,
        leaveMasterId: leaveRqstData.leaveMasterId,
      };
      dispatch(getNumbersOfDaysAction(payload));
    }
  }, [
    leaveRqstData.fromDate,
    leaveRqstData.toDate,
    leaveRqstData.fromSession,
    leaveRqstData.toSession,
    leaveRqstData.leaveMasterId,
  ]);

  const handleSaveLeaveApplyData = async (type) => {
    setSaveSubmitStatus((prev) => !prev);
    const payload = {
      ...leaveRqstData,
      manager: undefined,
    };
    const param = {
      action: type,
    };

    payload.file = leaveRqstData.file;

    if (type === "Save") {
      payload.cc = JSON.stringify(payload.cc);
      dispatch(saveLeaveFormAction(payload, param, disableSave));
      setLeaveBalance(true);
      setLeaveBalance(true);
    } else if (type === "Submit") {
      setDisableSave("");
      payload.cc = JSON.stringify(payload.cc);
      dispatch(saveLeaveFormAction(payload, param, disableSave));
      setLeaveBalance(true);
      setLeaveBalance(true);
    }
  };

  useEffect(() => {
    if (!formDataLoading && !leaveFormError) {
      // If form data loading is complete and there's no error, reset the form
      setLeaveReqstData(initialData);
      setFile(null);
    }
  }, [formDataLoading, leaveFormError]);

  const clearErrorOnEdit = () => {
    setErrors({});
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <LeaveHeader />
        </Grid>

        <Grid item xs={12} sm={8} md={8} lg={8}>
          <LeaveBalance leave={leaveBalance} />
          <LeaveRequestForm
            addHistoryEntry={addHistoryEntry}
            onChangeFormDataHandler={onChangeFormDataHandler}
            leaveRqstData={leaveRqstData}
            handleSaveLeaveApplyData={handleSaveLeaveApplyData}
            disableSave={disableSave}
            setErrors={setErrors}
            errors={errors}
            setFile={setFile}
            file={file}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} display={"flex"}>
          <div
            style={{
              borderLeft: "2px dashed rgba(0, 128, 128, 0.4)",
              height: "100%",
              marginLeft: "-10px",
              marginRight: "10px",
            }}
          ></div>
          <HolidayList />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <LeaveHistory
            setDisableSave={setDisableSave}
            setLeaveReqstData={setLeaveReqstData}
            setCurrentPage={setCurrentPage}
            historyData={leaveHistoryData}
            setLeaveDelete={setLeaveDelete}
            onDeleteLeave={handleDeleteLeave}
            currentPage={currentPage}
            clearErrorOnEdit={clearErrorOnEdit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeavePage;
