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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { SearchEmployeeAndProject } from "../../../redux/actions/AdminConsoleAction/users/usersAction";
import useDebounce from "../../../utils/useDebounce";
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
}) {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState({
    searchTerm: "",
  });

  const debouncedValue = useDebounce(filterData.searchTerm);

  useEffect(() => {
    dispatch(SearchEmployeeAndProject(filterData));
  }, [debouncedValue]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setFilterData((prevFormData) => ({
      ...prevFormData,
      searchName: inputValue,
    }));
    if (inputValue.length >= 3) {
      dispatch(SearchEmployeeAndProject(filterData));
    }
  };

  const handleDesignationChnage = (e) => {
    setDesignationId(e.target.value);
  };
  const skills = useSelector((state) => state.persistData.masterData?.skill);

  const designation = useSelector(
    (state) => state.persistData.masterData?.designation
  );

  const searchData = useSelector(
    (state) => state?.nonPersist?.userDetails?.searchData
  );

  const onResetSkillFilterHandler = () => {
    setSkillsCheckedData([]);
  };

  const applySkillFilterHandler = () => {};
  const CustomMenu = (props) => {
    return (
      <components.Menu {...props}>
        {props.children}
        <Box
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            onClick={applySkillFilterHandler}
            style={{
              width: "100%",
              backgroundColor: "#008080",
              borderRadius: "10px",
              color: "#fff",
            }}
          >
            Apply
          </Button>
          <Button
            onClick={onResetSkillFilterHandler}
            style={{
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #008080",
              color: "#008080",
              marginTop: "5px",
            }}
          >
            Clear All
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
              sx={{
                borderRadius: "8px",
              }}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(event, data) => {
                setSelectedSearchOption(data);
              }}
              isSearchable={true}
              getOptionValue={(option) => option.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search by User Name, Project Name"
                  onChange={handleInputChange}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <SearchIcon />
                        {params.InputProps.startAdornment}
                      </>
                    ),
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
            Add New Users
          </Button>
        </Grid>
      </Grid>
      <Box style={{ ...style.adminSubHeader }}>
        <Grid container gap={{ sm: 0, md: 0, lg: 2, xs: 2 }}>
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

          <Grid item xs={12} sm={4} md={3} lg={2}>
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
                hideSelectedOptions={false}
                onChange={(selectedOptions) => {
                  setSkillsCheckedData(selectedOptions);
                }}
                options={skills}
                value={skillsCheckedData}
                components={{
                  Option: (props) => (
                    <InputOption
                      {...props}
                      skillsCheckedData={skillsCheckedData}
                    />
                  ),
                  Menu: CustomMenu,
                }}
                isClearable={false}
                controlShouldRenderValue={false}
                getOptionValue={(option) => option.skillId}
                getOptionLabel={(option) => option.skillName}
                isLoading={skills?.length === 0}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (baseStyles) => ({
                    ...baseStyles,
                    height: "55px",
                  }),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
          <Grid item margin={"auto"} alignItems="flex-end">
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
                {userData?.numberOfElements ? userData.numberOfElements : "0"}/
                {userData?.totalElements ? userData.totalElements : "0"}
              </b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
