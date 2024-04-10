import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    noOfDays: 0,
    cc: [],
    file: " ",
  };

  const [disableSave, setDisableSave] = useState("");
  const [leaveRqstData, setLeaveReqstData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(0);
  const [leaveBalance, setLeaveBalance] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [saveSubmitStatus, setSaveSubmitStatus] = useState(false);
  console.log(saveSubmitStatus);
  const dispatch = useDispatch();

  const leaveHistory = useSelector(
    (state) => state?.nonPersist?.leaveHistoryData?.data
  );

  const leaveBalances = useSelector(
    (state) => state?.nonPersist?.leavesData?.leaveBalanceData
  );

  const leaveTypeMasterData = useSelector(
    (state) => state.persistData.masterData?.leaveTypes
  );

  const result = leaveBalances.map((item) => {
    const leaveMasterId = parseInt(Object.keys(item)[0]);
    const matchingMasterData = leaveTypeMasterData.find(
      (data) => data.leaveMasterId === leaveMasterId
    );

    return {
      leaveMasterId,
      leaveType: matchingMasterData ? matchingMasterData.leaveType : undefined,
      numberDays: item[leaveMasterId],
    };
  });
  const leaveRequestType = useSelector(
    (state) => state.persistData.masterData?.leaveTypes
  );

  const findLeaveMasterId = (leaveType) => {
    const foundLeave = leaveRequestType.find(
      (leave) => leave.leaveType === leaveType
    );

    if (foundLeave) {
      return foundLeave.leaveMasterId;
    } else {
      // Handle the case when leave type is not found
      console.error(`Leave type "${leaveType}" not found`);
      return null; // or any default value
    }
  };

  const CompLeaveId = findLeaveMasterId("Compensatory Leave");
  const sickLeaveId = findLeaveMasterId("Sick Leave");
  const privilegeLeaveId = findLeaveMasterId("Privilege Leave");

  const hasNumberDaysGreaterThanZero = result.some(
    (leave) =>
      [CompLeaveId, sickLeaveId, privilegeLeaveId].includes(
        leave.leaveMasterId
      ) && leave.numberDays > 0
  );

  useEffect(() => {
    dispatch(fetchLeaveHistory({ page: currentPage }));
  }, [currentPage, leaveBalance]);
  useEffect(() => {
    setLeaveHistoryData(leaveHistory);
  }, [leaveHistory]);

  useEffect(() => {
    dispatch(getLeaveBalanceAction());
    setLeaveBalance(false);
  }, [dispatch, leaveBalance]);

  const addHistoryEntry = (entry) => {
    setHistoryData([...historyData, entry]);
  };

  const handleDeleteLeave = async (leaveId) => {
    setLoading(true);
    try {
      await dispatch(deleteLeave(leaveId));
      setLeaveHistoryData((prevData) => {
        const contentArray = Array.isArray(prevData.content)
          ? prevData.content
          : [];
        const newArray = contentArray.filter(
          (entry) => entry.leaveRequestId !== leaveId
        );
        return { ...prevData, content: newArray };
      });

      setLeaveBalance(true);
    } finally {
      setLoading(false);
    }
  };

  const onChangeFormDataHandler = (e, values, type) => {
    if (e.target?.value === 12 && hasNumberDaysGreaterThanZero) {
      setShowModal(true);
    }
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
        leaveRequestId: leaveRqstData.leaveRequestId || "",
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

  const { numberOfDays } = useSelector((state) => state?.nonPersist.leavesData);
  useEffect(() => {
    setLeaveReqstData((prevData) => ({
      ...prevData,
      noOfDays: numberOfDays,
    }));
  }, [numberOfDays]);

  const handleSaveLeaveApplyData = async (type) => {
    setSaveSubmitStatus((prev) => !prev);
    const payload = {
      ...leaveRqstData,
      manager: undefined,
    };
    const param = {
      action: type,
    };

    if (file) {
      payload.file = file;
    }
    // payload.cc = JSON.stringify(payload.cc);
    setLoading(true);
    try {
      if (type === "Save") {
        await dispatch(
          saveLeaveFormAction(payload, param, disableSave, setLeaveBalance)
        );
      } else if (type === "Submit") {
        setDisableSave("");
        await dispatch(
          saveLeaveFormAction(payload, param, disableSave, setLeaveBalance)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!formDataLoading && !leaveFormError) {
      // If form data loading is complete and there's no error, reset the form
      setLeaveReqstData(initialData);
      setFile("");
    }
  }, [formDataLoading, leaveFormError]);

  const clearErrorOnEdit = () => {
    setErrors({});
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setLeaveReqstData({ ...leaveRqstData, leaveMasterId: "" });
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            p: 4,
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Adding a subtle shadow
          }}
        >
          <CloseIcon
            onClick={() => {
              setShowModal(false);
              setLeaveReqstData({ ...leaveRqstData, leaveMasterId: "" });
            }}
            sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer" }}
          />
          <Typography sx={{ marginTop: 2, textAlign: "center" }}>
            You currently have leave balance
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Are you sure you want to apply for leave without pay?
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: 10 }}
              onClick={() => setShowModal(false)}
            >
              Okay
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setLeaveReqstData({ ...leaveRqstData, leaveMasterId: "" });
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

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
              hasNumberDaysGreaterThanZero={hasNumberDaysGreaterThanZero}
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
              onDeleteLeave={handleDeleteLeave}
              currentPage={currentPage}
              clearErrorOnEdit={clearErrorOnEdit}
            />
          </Grid>
        </Grid>
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
    </>
  );
};

export default LeavePage;
