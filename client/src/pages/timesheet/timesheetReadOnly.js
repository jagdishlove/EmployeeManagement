import { Box, Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimesheetRow from "../../components/timesheetRow/timesheetRow";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";

const TimesheetReadOnly = ({ selectedDate, setShowHistoryTimesheet }) => {
  const dispatch = useDispatch();
  const getTimesheetData = useSelector(
    (state) => state?.nonPersist?.timesheetData?.timeSheetData?.timesheetEntryId
  );

  useEffect(() => {
    dispatch(masterDataAction());
  }, []);

  const handleSubmit = () => {
    setShowHistoryTimesheet(false);
  };
  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Back
      </Button>
      {getTimesheetData ? (
        getTimesheetData?.map((entry) => (
          <TimesheetRow
            isHistory="true"
            key={entry.timesheetEntryId}
            id={entry.timesheetEntryId}
            data={entry}
            disabled={entry.timesheetEntryId}
            selectedDate={selectedDate}
          />
        ))
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <h1>No data present</h1>
        </Box>
      )}
    </Container>
  );
};

export default TimesheetReadOnly;
