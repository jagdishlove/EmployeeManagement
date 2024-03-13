import { useTheme } from "@emotion/react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { adminHeaderStyle } from "../../admin/approvalTimesheets/adminHeaderStyle";
import Dropdown from "../../forms/dropdown/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getClientProjectNameSearchAction } from "../../../redux/actions/AdminConsoleAction/projects/projectsAction";

export default function ProjectHeader({
  projectsData,
  projects,
  setProjects,
  handleChange,
}) {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const projectStatus = useSelector(
    (state) => state.persistData.masterData?.projectStatus
  );

  // Handle change for  dropdown
  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setProjects(value);
  };

  const handleAddUser = () => {
    Navigate("/projectForm");
  };

  const clientProjectSearchData = useSelector(
    (state) => state?.nonPersist?.projectDetails?.clientProjectNameSearchData
  );

  const handleInputChangeClientSearch = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length >= 0) {
      dispatch(getClientProjectNameSearchAction(inputValue));
    }
  };
  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={12} md={4} lg={5}>
          <Box>
            <Autocomplete
              isMulti={true}
              isSearchable={true}
              options={clientProjectSearchData?.result || []}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(e, data) => handleChange(data)}
              name="clientProjectSearch"
              isLoading={clientProjectSearchData?.length === 0}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search by  Client and Project Name"
                  onChange={handleInputChangeClientSearch}
                  InputProps={{
                    ...params.InputProps,
                    style: { borderRadius: "20px" },
                  }}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={6.5}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            style={{ borderRadius: "10px" }}
            onClick={handleAddUser}
          >
            Add New Project
          </Button>
        </Grid>
      </Grid>
      <Box style={{ ...style.projectSubHeader }}>
        <Grid container gap={{ sm: 0, md: 0, lg: 2, xs: 2 }}>
          <Grid item xs={12} sm={4} md={2} lg={3}>
            <Dropdown
              value={projects}
              onChange={handleDropdownChange}
              dropdownName="projectStatus"
              options={projectStatus}
              style={{
                ...style.DateTimesheetDateTextField,
                border: "1px solid silver",
                borderRadius: "5px",
              }}
              valueKey="statusName"
              labelKey="statusValue"
              name="projectStatus"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            md={2}
            lg={3}
            margin={"auto"}
            alignItems="flex-end"
          >
            <Typography
              variant="h7"
              color={"secondary"}
              textAlign={"right"}
              sx={{ textWrap: "nowrap" }}
              marginTop={4}
            >
              <b>
                {" "}
                Total Entries{" "}
                {projectsData?.numberOfElements
                  ? projectsData.numberOfElements
                  : "0"}
                /
                {projectsData?.totalElements ? projectsData.totalElements : "0"}
              </b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
