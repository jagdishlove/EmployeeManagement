import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Dropdown from "../../forms/dropdown/dropdown";
import { useTheme } from "styled-components";
import { adminHeaderStyle } from "../approvalTimesheets/adminHeaderStyle";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";
import { projectListAction } from "../../../redux/actions/approvals/projectListAction";

export default function ReporteesHeader() {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const dispatch = useDispatch();

  const [project, setProject] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(searchUserAction(value));
  };

  const userData = useSelector(
    (state) => state?.nonPersist?.adminTimeSheet?.searchUserData
  );

  useEffect(() => {
    dispatch(projectListAction());
  }, []);

  const projectList = useSelector(
    (state) => state?.nonPersist?.projectListData?.data
  );

  const handleProjectListChnage = (e) => {
    const { value } = e.target;
    setProject(value);
  };
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={4}>
        <Autocomplete
          isMulti={true}
          isSearchable={true}
          options={userData?.result || []}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          // onChange={(e, data) => setSelectedSearchOption(data)}
          name="UserName"
          isLoading={userData?.length === 0}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search by User Name"
              onChange={handleChange}
              InputProps={{
                ...params.InputProps,
                style: { borderRadius: "50px" },
                startAdornment: (
                  <>
                    <SearchIcon />
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: null,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Dropdown
          dropdownName="projects"
          title="projects"
          options={projectList}
          value={project}
          onChange={handleProjectListChnage}
          style={style.DateTimesheetDateTextField}
          valueKey="id"
          labelKey="projectName"
        />
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
}
