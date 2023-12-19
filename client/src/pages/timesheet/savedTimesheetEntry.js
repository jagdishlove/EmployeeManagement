import { Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimesheetRow from "../../components/timesheetRow/timesheetRow";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";

const SavedTimesheetEntry = ({
  selectedDate,
  setDisableSubmit,
  setDisableTimeSheetEntryForm,
  setDisabledWhileEditing,
}) => {
  const dispatch = useDispatch();
  const getTimesheetData = useSelector(
    (state) => state?.nonPersist?.timesheetData?.timeSheetData?.timesheetEntryId
  );

  const [editingId, setEditingId] = useState(null);
  const [showList, setShowList] = useState(false);

  const editButtonHandler = (id) => {
    setEditingId(id);
  };

  useEffect(() => {
    dispatch(masterDataAction());
  }, []);

  useEffect(() => {
    const delay = 200; // Adjust the delay in milliseconds as needed
    const timer = setTimeout(() => {
      setShowList(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isSubbmitedData = getTimesheetData?.some(
      (item) =>
        item.status === "SUBMITTED" ||
        item.status === "APPROVED" ||
        item.status === "REJECTED"
    );

    const isAllSubmittedOrApproved = () => {
      // Check if getTimesheetData is defined and not empty
      if (!getTimesheetData || getTimesheetData.length === 0) {
        return true; // Handle the case when the array is undefined or empty
      }

      // Check statuses and return the result as before
      const allSubmittedOrApproved = getTimesheetData.every(
        (item) =>
          item.status === "SUBMITTED" ||
          item.status === "APPROVED" ||
          item.status === "REJECTED"
      );

      return allSubmittedOrApproved;
    };

    const timesheetEntry = isAllSubmittedOrApproved;

    setDisableTimeSheetEntryForm(timesheetEntry);
    setDisableSubmit(isSubbmitedData);
  }, [getTimesheetData, selectedDate]);

  return (
    <div>
      {showList ? (
        getTimesheetData
          ?.slice() // Make a copy of the array to avoid mutating the original
          .sort((a, b) =>
            moment(a.startTime, "HH:mm:ss").diff(
              moment(b.startTime, "HH:mm:ss")
            )
          )
          .map((entry) => (
            <TimesheetRow
              key={entry.timesheetEntryId}
              id={entry.timesheetEntryId}
              data={entry}
              disabled={editingId !== entry.timesheetEntryId}
              editButtonHandler={editButtonHandler}
              selectedDate={selectedDate}
              setDisabledWhileEditing={setDisabledWhileEditing}
            />
          ))
      ) : (
        <Typography
          variant="h1"
          sx={{ textAlign: "center", marginTop: "2rem" }}
        >
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default SavedTimesheetEntry;
