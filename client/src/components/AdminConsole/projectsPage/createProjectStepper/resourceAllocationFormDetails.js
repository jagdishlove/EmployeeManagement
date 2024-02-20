import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";
import ProjectResourcesModal from "./projectResourcesModal";
import useDebounce from "../../../../utils/useDebounce";
import { getAllocationSearch } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  skillsCheckedData,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  console.log("skillsCheckedData", skillsCheckedData);

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
        <Checkbox checked={skillsCheckedData?.includes(rest.data)} />
      </Box>
    </components.Option>
  );
};

const ResourceAllocationFormDetails = () => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchData, setSearchData] = useState();
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [skillsCheckedData, setSkillsCheckedData] = useState([]);
  const debouncedValue = useDebounce(searchData);

  console.log("selectedOptions", selectedOptions);

  useEffect(() => {
    const params = {
      query: searchData || "",
      skillIds: "",
    };

    dispatch(getAllocationSearch(params));
  }, [debouncedValue]);

  const masterSkillData = useSelector(
    (state) => state?.persistData?.masterData?.skill
  );
  console.log("masterSkillData", masterSkillData);

  const theme = useTheme();
  const style = TimesheetStyle(theme);

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectedimplementationhours: "",
  });

  const handleInputChange = (event, data) => {
    setSelectedOptions(data);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { allocationSearchData } = useSelector(
    (state) => state?.nonPersist?.projectDetails
  );

  //   For Table

  //   const handleTableInputChange = (data) => {
  //     setSelectedOptionsTable(data);
  //   };

  const handleRadioSelect = (id) => {
    setSelectedRadio(id);
    setIsModalOpen(true);
  };

  const handleTimeInputChange = (event) => {
    const input = event.target.value;
    const numericInput = input.replace(/\D/g, ""); // Remove non-numeric characters

    // Format the numeric input to HH:MM format
    const formattedInput = numericInput.replace(/(\d{2})(\d{2})/, "$1:$2");

    // Set the formatted input to state
    setTimeInput(formattedInput);
  };

  const handleConfirm = () => {
    // Add your logic for handling the confirmation with the timeInput value
    console.log("Selected time:", timeInput);
    setIsModalOpen(false); // Close the modal after confirmation
  };

  const startDateHandler = () => {};

  const endDateHandler = () => {};

  const actualEndDateHandler = () => {};

  const handleSaveAndNext = () => {
    Navigate("/costallocation");
  };

  // Name and Designation Search

  const applySkillFilterHandler = () => {
    if (skillsCheckedData.length > 0) {
      const getSkillId = skillsCheckedData
        .map((item) => item.skillId)
        .join(",");
      const params = {
        query: searchData || "",
        skillIds: getSkillId,
      };
      dispatch(getAllocationSearch(params));
    }
  };

  const onResetSkillFilterHandler = () => {
    setSkillsCheckedData([]);
  };

  const CustomMenu = (props) => {
    return (
      <components.Menu {...props}>
        {props.children}
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "10px",
          }}
        >
          <button onClick={applySkillFilterHandler}>Apply</button>
          <button onClick={onResetSkillFilterHandler}>Reset</button>
        </Box>
      </components.Menu>
    );
  };


  return (
    <div>
      {/* Resource Allocation */}
      <div
        className="Heading"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6">
          <b> Resource Allocation </b>
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid silver",
        }}
      />

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          <Typography variant="body1" fontWeight="bold">
            Add Project Resources
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={8} md={9} lg={9}>
              <TextField
                value={searchData}
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchData(e.target.value)}
              />
              <Box
                display={"flex"}
                gap={2}
                justifyContent={"flex-start"}
                alignItems={"center"}
                p={1}
              >
                {skillsCheckedData?.map((selectedSkills) => {
                  return (
                    <Box
                      sx={{
                        background: "lightgray",
                        padding: "5px",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      key={selectedSkills.skillId}
                    >
                      <Typography>{selectedSkills?.skillName}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={3} lg={3}>
              <FormControl style={{ marginLeft: "15px", width: "90%" }}>
                <Select
                  isSearchable={false}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(options) => {
                    setSkillsCheckedData(options.map((opt) => opt));
                  }}
                  options={masterSkillData}
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
                  isLoading={masterSkillData?.length === 0}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "55px",
                    }),
                  }}
                />
                {/* <Select
                  isMulti
                  labelId="dropdown-label"
                  placeholder="Skill Sets"
                  getOptionValue={(option) => option.skillId}
                  getOptionLabel={(option) => option.skillName}
                  isLoading={masterSkillData?.length === 0}
                  options={masterSkillData}
                  isSearchable={false}
                  id="dropdown"
                  components={{
                    Option: InputOption,
                  }}
                  onChange={(options) => {
                    if (Array.isArray(options)) {
                      setSkillsCheckedData(options.map((opt) => opt.value));
                    }
                  }}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "55px",
                    }),
                  }}
                /> */}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          {allocationSearchData.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell>Select</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allocationSearchData.map((option) => (
                    <TableRow key={option.employeeId}>
                      <TableCell>{option.employeeName}</TableCell>
                      <TableCell>{option.employeeDesignation}</TableCell>
                      <TableCell>
                        {option.skills.length > 0 && (
                          <div>
                            {option.skills.map((skill, index) => (
                              <React.Fragment key={index}>
                                {index > 0 && ", "}
                                {skill}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Radio
                          checked={selectedRadio === option.id}
                          onChange={() => handleRadioSelect(option.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* Modal component */}
                <ProjectResourcesModal
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  {/* Content of your modal */}
                  <div style={{ marginTop: "20px" }}>
                    {/* Add time input field */}
                    <TextField
                      placeholder="Enter Occupancy Hrs ( HH : MM )"
                      value={timeInput}
                      onChange={handleTimeInputChange}
                      fullWidth
                      margin="normal"
                    />

                    {/* Add Confirm and Cancel buttons */}
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <Button
                        variant="outlined"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirm}
                        ml={2}
                      >
                        Confirm
                      </Button>
                    </Box>
                  </div>
                </ProjectResourcesModal>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>

      {/* Resource Allocation */}
      <div
        className="Heading"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6">
          <b> Project Duration </b>
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid silver",
        }}
      />

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          <Typography variant="body1" fontWeight="bold">
            Projected Implementation Hours
          </Typography>
          <TextField
            placeholder="Projected Implementation Hours"
            name="projectedimplementationhours"
            value={formData.projectedimplementationhours}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="column"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ marginTop: "15px" }}
            >
              start Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="toDate"
                format="ddd, MMM DD,YYYY"
                value={dayjs()}
                onChange={startDateHandler}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="column"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ marginTop: "15px" }}
            >
              End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="endDate"
                fullWidth
                format="ddd, MMM DD,YYYY"
                value={dayjs()}
                onChange={endDateHandler}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="column"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ marginTop: "15px" }}
            >
              Actual End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="actualEndDate"
                fullWidth
                format="ddd, MMM DD,YYYY"
                value={dayjs()}
                onChange={actualEndDateHandler}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // onClick={(e) => formHandleSubmit(e, "Save")}
            >
              Save
            </Button>
            <Button
              onClick={handleSaveAndNext}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save & Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResourceAllocationFormDetails;
