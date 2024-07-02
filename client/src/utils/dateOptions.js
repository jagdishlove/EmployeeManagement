import { format, parse, parseISO, subDays } from "date-fns";
import moment from "moment";

export const dateOptions = () => {
  const today = new Date();
  const dateOptions = [];

  for (let i = 0; i < 30; i++) {
    const date = subDays(today, i);
    const label = format(date, "MMM dd, yyyy");
    const value = format(date, "EEEE, MMMM d, yyyy");
    dateOptions.push({ label, value });
  }
  return dateOptions;
};

export const admindateOptions = () => {
  const today = new Date();
  const dateOptions = [];

  for (let i = 0; i < 3; i++) {
    const date = subDays(today, i);
    const label = format(date, "MMM dd, yyyy");
    const value = format(date, "EEEE, MMMM d, yyyy");
    dateOptions.push({ label, value });
  }
  return dateOptions;
};

const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(":");
  return new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
};

export const calculateTimeDifference = (fromTime, toTime) => {
  const from = moment(parseTime(fromTime));
  const to = moment(parseTime(toTime));
  const duration = moment.duration(to.diff(from));
  const hours = String(Math.floor(duration.asHours())).padStart(2, "0"); // Always two digits for hours
  const minutes = String(duration.minutes()).padStart(2, "0"); // Always two digits for minutes
  return `${hours}.${minutes}`;
};

export const modifyDataFormat = (data) => {
  const modifiedData = {};
  Object.keys(data).forEach((key) => {
    const itemList = data[key];
    if (Array.isArray(itemList) && itemList.length > 0) {
      modifiedData[key] = itemList.map((item) => ({
        id:
          item[`${key}Id`] ||
          item.id ||
          item.jobId ||
          item.status ||
          item.locationId,
        value: 
            item[`${key}Type`] ||
            item[`${key}Name`] ||
            item.projectName ||
            item.employmentType ||
            item.gender ||
            item.activityType ||
            item.jobType ||
            item.locationName ||
            item[key],
        }));
    } else {
      modifiedData[key] = [];
    }
  });

  return modifiedData;
};

export const formatDateForApi = (selectedDate) => {
  if (selectedDate === "All") {
    return "";
  } else {
    const parsedDate = parse(selectedDate, "EEEE, MMMM d, yyyy", new Date());
    const finalDate = format(parsedDate, "yyyy-MM-dd");
    return finalDate;
  }
};

// Transform dates from backend to desired format
export const transformDates = (dates) => {
  return dates?.map((dateStr) => {
    const date = parseISO(dateStr);
    return {
      label: format(date, "MMM dd, yyyy"),
      value: format(date, "EEEE, MMMM d, yyyy"),
    };
  });
};

export const adminTimeOptions = () => {
  const options = [];

  // Include options from 0 to 59
  for (let i = 0; i < 60; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }

  return options;
};
