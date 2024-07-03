import { Grid, InputLabel, Typography } from "@mui/material";
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
          options?.length === 1 && !options.every((obj) => "jobType" in obj) 
          && !options.every((obj) => "locationId" in obj) && !options.every((obj) => "designationId" in obj) 
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
              option[valueKey] ||
              option.id ||
              option.firstName ||
              option.value ||
              option.projectName ||
              option.sessionName ||
              option.leaveMasterId ||
              option.skillName ||
              option.genderId ||
              option.bandId ||
              option.empTypeId ||
              option.manager ||
              option.designationId ||
              option.gender ||
              option.bandName ||
              option.employmentType ||
              option.managerName ||
              option.complexityName ||
              option.projectType
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
              option.manager ||
              option.designationName ||
              option.managerName ||
              option.complexityName ||
              option.projectType ||
              (option.approverName && option.count ? (
                <Grid container alignItems="center" >
      <Grid item xs={10} zeroMinWidth>
        <Typography variant="body1" noWrap>
          {option.approverName}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <div
          style={{
            color: "#fff",
            textAlign: "center",
            backgroundColor: "red",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {option.count}
        </div>
      </Grid>
    </Grid>
              ) : (
                ""
              )) ||
              option.dataValue ||
              option[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
