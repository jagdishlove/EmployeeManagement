import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
const Dropdown = ({
  options,
  value,
  disabled,
  onChange,
  title,
  dropdownName,
  style,
  name = "",
  valueKey,
  labelKey,
}) => {
  const handleDropdownChange = (event) => {
    onChange(event, dropdownName);
  };

  return (
    <FormControl sx={style} fullWidth>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={
          options?.length === 1
            ? options[0].id ||
              options[0].value ||
              options[0].projectName ||
              options[0].activityId
            : value
        }
        name={name}
        placeholder={title}
        onChange={handleDropdownChange}
        disabled={disabled}
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: "none" },
        }}
      >
        {options?.map((option, index) => (
          <MenuItem
            key={index}
            value={
              option.id ||
              option.value ||
              option.projectName ||
              option.sessionName ||
              option.leaveMasterId ||
              option.skillName ||
              option.gender ||
              option.bandName ||
              option.employmentType ||
              option.managerName ||
              option.complexityName ||
              option.projectType  ||
              option[valueKey]
            }
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgb(0 128 128 / 68%)",
              },
            }}
          >
            {option.value ||
              option.projectName ||
              option.firstName ||
              option.activityType ||
              option.sessionValue ||
              option.leaveType ||
              option.skillName ||
              option.gender ||
              option.bandName ||
              option.employmentType ||
              option.managerName ||
              option.complexityName ||
              option.projectType ||
            
              option[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
