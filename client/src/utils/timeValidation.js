export const timeValidation = (data, selectedValue) => {
  let timeError = "";
  if (
    selectedValue.fromTime !== "" &&
    selectedValue.toTime !== "" &&
    selectedValue.toTime <= selectedValue.fromTime
  ) {
    timeError = "To Time cannot be less than or equal to From Time";
  }

  if (data && data.length > 0) {
    for (const entry of data) {
      const fromExistingTime = entry.startTime.slice(0, -3);

      const toExistingTime = entry.endTime.slice(0, -3);

      if (
        (selectedValue.fromTime >= fromExistingTime &&
          selectedValue.fromTime < toExistingTime) ||
        (selectedValue.toTime > fromExistingTime &&
          selectedValue.toTime <= toExistingTime)
      ) {
        timeError =
          "Selected time range partially overlaps with an existing range.";
        break;
      }

      if (
        selectedValue.fromTime < fromExistingTime &&
        selectedValue.toTime > toExistingTime
      ) {
        timeError =
          "Selected time range completely contains an existing range.";
        break;
      }
    }
  }

  return timeError;
};
