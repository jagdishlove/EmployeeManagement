import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Dropdown from "../../forms/dropdown/dropdown";
import { useTheme } from "styled-components";
import { adminHeaderStyle } from "../approvalTimesheets/adminHeaderStyle";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";
import { projectListAction } from "../../../redux/actions/approvals/projectListAction";

export default function ReporteesHeader({
  project,
  setProject,
  setSelectedOption,
}) {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(searchUserAction(value));
  };

  const userData = useSelector(
    (state) => state?.persistData?.adminTimeSheet?.searchUserData?.result
  );

  useEffect(() => {
    dispatch(projectListAction());
  }, []);

  const projectList = useSelector(
    (state) => state?.persistData?.projectListData?.data || []
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
          options={userData || []}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={(e, data) => setSelectedOption(data)}
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
      <Grid item xs={4} mt={-3}>
        <b>Projects :</b>
        <Dropdown
          dropdownName="Projects"
          options={[{ id: "All", value: "All" }, ...projectList] || []}
          value={project}
          onChange={handleProjectListChnage}
          style={style.DateTimesheetDateTextField}
          valueKey="id"
          labelKey="projectNames"
        />
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
}
