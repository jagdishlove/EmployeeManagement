import {
  Box,
  Button,
  FormControl,
  Grid,
  Typography,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
import Dropdown from "../../forms/dropdown/dropdown";
import { useTheme } from "@emotion/react";
import { adminHeaderStyle } from "../../admin/approvalTimesheets/adminHeaderStyle";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import { useState } from "react";
import { SearchEmployeeAndProject } from "../../../redux/actions/AdminConsoleAction/users/usersAction";
import SearchIcon from "@mui/icons-material/Search";

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box>{children}</Box>
        <Checkbox color="primary" checked={isSelected} />
      </Box>
    </components.Option>
  );
};

export default function UserHerders({
  userData,
  skillsCheckedData,
  setSkillsCheckedData,
  designationId,
  setDesignationId,
  setSelectedSearchOption,
  setFilteredSkills,
  filteredSkills,
}) {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length >= 3) {
      dispatch(SearchEmployeeAndProject(inputValue));
    }
  };

  const handleDesignationChnage = (e) => {
    setDesignationId(e.target.value);
  };
  const skills = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.skill
  );

  const designation = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.designation
  );

  const searchData = useSelector(
    (state) => state?.persistData?.userDetails?.searchData
  );

  const CustomMenu = (props) => {
    const { innerProps, children, selectProps } = props;

    const applySkillFilterHandler = () => {
      setSkillsCheckedData(filteredSkills);

      selectProps.onMenuClose();
    };

    const onResetSkillFilterHandler = () => {
      setSkillsCheckedData([]);
      setFilteredSkills([]);
      selectProps.onMenuClose();
    };

    return (
      <components.Menu {...props}>
        {children}
        <Box
          style={{
            position: "absolute",
            bottom: "-50px",
            left: 0,
            right: 0,
            padding: "10px",
            background: "white",
            border: "1px solid lightgray",
            display: "flex",
            justifyContent: "flex-end",
          }}
          {...innerProps}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={onResetSkillFilterHandler}
            style={{
              border: "1px solid #008080",
              borderRadius: "20px",
              color: "#008080",
              "&:hover": {
                backgroundColor: "#008080",
                color: "white",
              },
            }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={applySkillFilterHandler}
            style={{
              borderRadius: "20px",
              marginLeft: "10px",
            }}
          >
            Apply
          </Button>
        </Box>
      </components.Menu>
    );
  };

  const handleAddUser = () => {
    Navigate("/userForm");
  };

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={12} md={4} lg={5}>
          <Box>
            <Autocomplete
              options={searchData?.result || []}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(e, data) => setSelectedSearchOption(data)}
              name="UsernameProjectSearch"
              isLoading={searchData?.length === 0}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  value={
                    skillsCheckedData.length > 0
                      ? skillsCheckedData[0]?.skillName
                      : null
                  }
                  placeholder="Search by User Name, Project Name"
                  onChange={handleInputChange}
                  InputProps={{
                    ...params.InputProps,
                    style: { borderRadius: "20px" },
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
            startIcon={<PersonAddAlt1RoundedIcon />}
            style={{ borderRadius: "10px" }}
            onClick={handleAddUser}
          >
            <span style={{ textTransform: "none" }}> Add New Users</span>
          </Button>
        </Grid>
      </Grid>
      <Box style={{ ...style.adminSubHeader }}>
        <Grid container gap={{ sm: 0, md: 0, lg: 2, xs: 3 }}>
          <Grid item xs={12} sm={4} md={2} lg={3}>
            <Dropdown
              options={[
                { id: "All", value: "All" },
                ...(Array.isArray(designation) ? designation : []),
              ]}
              value={designationId}
              dropdownName="Designation"
              title="Designation"
              style={style.DateTimesheetDateTextField}
              valueKey="designationId"
              onChange={handleDesignationChnage}
              labelKey="designationName"
            />
          </Grid>

          <Grid item xs={12} sm={5} md={5} lg={2.5}>
            <Typography
              sx={{ color: "#ffffff", fontSize: "14px", marginTop: "-20px" }}
            >
              Skills
            </Typography>
            <FormControl fullWidth style={{ borderRadius: "5px" }}>
              <Select
                isSearchable={false}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false} // Set hideSelectedOptions to true
                onChange={(selectedOptions) => {
                  // Update filteredSkills to include all selected options
                  setFilteredSkills(selectedOptions);
                }}
                options={skills}
                value={filteredSkills}
                isClearable={false}
                controlShouldRenderValue={true}
                getOptionValue={(option) => option.skillId}
                getOptionLabel={(option) => option.skillName}
                isLoading={skills?.length === 0}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (baseStyles) => ({
                    ...baseStyles,
                    overflow: "auto",
                    height: "55px",
                    position: "relative",
                  }),
                }}
                components={{
                  Option: (props) => (
                    <InputOption
                      {...props}
                      skillsCheckedData={filteredSkills}
                    />
                  ),
                  Menu: CustomMenu,
                  MultiValueRemove: () => null,
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid
      item
      xs={12}
      lg
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        textAlign: { xs: "center", lg: "right" },
        mt: { xs: 2, lg: 0 },
      }}
    >
      <Typography
        variant="h7"
        color="secondary"
        sx={{ whiteSpace: "nowrap" }}
      >
        <b>
          Total Users {userData?.numberOfElements ? userData.numberOfElements : "0"}/
          {userData?.totalElements ? userData.totalElements : "0"}
        </b>
      </Typography>
    </Grid>
        </Grid>
      </Box>
    </div>
  );
}
