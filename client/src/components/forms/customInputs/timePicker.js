import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import React from "react";

const TimePicker = ({ label, disabled, value, onChangeHandler, sx }) => {
  const parsedTime = value ? dayjs(value, "HH:mm") : null;
  // const [selectedTime, setSelectedTime] = useState(parsedTime);

  const handleTimeChange = (time) => {
    // setSelectedTime(time);
    // Construct a new Date object with the selected time
    const parsedTime = dayjs(time);
    const formattedDefaultTime = parsedTime.format("HH:mm");

    onChangeHandler(formattedDefaultTime);
  };

  const timePickerValue = parsedTime?.isValid() ? parsedTime : null;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        label={label}
        value={timePickerValue}
        sx={sx}
        onChange={handleTimeChange}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
