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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";
import ProjectResourcesModal from "./projectResourcesModal";
import useDebounce from "../../../../utils/useDebounce";
import {
  getAllResourcesAction,
  getAllocationSearch,
  // getProjectDetailsAction,
  getResourceDetailsPopupAction,
  saveCreateProjectAction,
  saveCreateResourcesAction,
} from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AllResourcesTable from "./allResourcesTable";
import Dropdown from "../../../forms/dropdown/dropdown";
import { adminTimeOptions } from "../../../../utils/dateOptions";

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

const ResourceAllocationFormDetails = () => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchData, setSearchData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [timeInput, setTimeInput] = useState("");
  const [skillsCheckedData, setSkillsCheckedData] = useState([]);
  const [descCheckedData, setDescCheckedData] = useState([]);
  const debouncedValue = useDebounce(searchData);
  console.log("selectedOptions", selectedOptions);
  const [saveButton, setSaveButton] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);

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
  const masterDesigData = useSelector(
    (state) => state?.persistData?.masterData?.designation
  );

  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const [showAllResourcesTable, setShowAllResourcesTable] = useState(false);
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectedimplementationhours: "",
    occupancyHours: "",
    occupancyMinutes: "",
    startDate: null,
    endDate: null,
    actualEndDate: null,
  });
  console.log("formData", formData);
  const [selectedOccupancyHours, setSelectedOccupancyHours] = useState(null);

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
  const { resourceDetailsPopupData } = useSelector(
    (state) => state?.nonPersist?.projectDetails
  );

  const handleRadioSelect = (id) => {
    // setSelectedRadio(id);
    setIsModalOpen(true);
    setEmployeeId(id);
    dispatch(getResourceDetailsPopupAction(id));
  };

  const handleTimeInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const projectId = useSelector(
    (state) => state.nonPersist.projectDetails?.projectId
  );
  console.log("projectId", projectId);

  const [employeeId, setEmployeeId] = useState();

  const handleConfirm = async (e) => {
    e.preventDefault();
    const payload = {
      employeeId: employeeId,
      projectId: projectId,
      occupancyHours: formData.occupancyHours * 60 + formData.occupancyMinutes,
    };
    console.log("payload", payload);

    if (selectedOccupancyHours !== null) {
      // Perform Update
      payload.resourceId = selectedOccupancyHours;
    }

    try {
      await dispatch(saveCreateResourcesAction(payload));
    } finally {
      await dispatch(getAllResourcesAction(projectId));
    }

    // setTimeInput("");
    setSelectedOccupancyHours(null);
    setFormData({
      occupancyHours: "",
    });
    setIsModalOpen(false); // Close the modal after confirmation

    // Set the state to true to display the AllResourcesTable component
    setShowAllResourcesTable(true);
  };

  //for displaying the table after confirm
  useEffect(() => {
    dispatch(getAllResourcesAction(projectId));
    setShowAllResourcesTable(true);
  }, [projectId]);

  //Edit
  const allResourcesData = useSelector(
    (state) => state.nonPersist.projectDetails?.allResourcesData
  );

  const handleEdit = (employeeId, resourceId) => {
    // setIsEditing(true);
    setEmployeeId(employeeId);
    dispatch(getResourceDetailsPopupAction(employeeId));
    setIsModalOpen(true);

    const selectedOccupancyHours = allResourcesData.find(
      (item) => item.resourceId === resourceId
    );
    console.log("selectedOccupancyHours", selectedOccupancyHours);

    const durationString = `${selectedOccupancyHours?.occupancyHours}`;
    console.log("durationString", durationString);
    // Function to parse the duration and return hours and minutes
    const parseDuration = (durationString) => {
      const regex = /(\d+)Hrs (\d+)mins/;
      const match = durationString.match(regex);
      console.log("match", match);

      if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        return { hours, minutes };
      }

      // Return default values or handle invalid input
      return { hours: 0, minutes: 0 };
    };

    // Example usage
    const { hours, minutes } = parseDuration(durationString);

    // Now you can use 'hours' and 'minutes' in your UI fields (occupancyHours and occupancyMins)
    console.log("Hours:", hours);
    console.log("Minutes:", minutes);

    setFormData({
      occupancyHours: hours,
      occupancyMinutes: minutes,
    });
    setSelectedOccupancyHours(resourceId);
  };

  const handleDateChange = (name, date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    console.log("name", name);
    console.log("date", date);
    setFormData({
      ...formData,
      [name]: formattedDate,
    });
  };

  useEffect(() => {
    if (projectId && saveButton) Navigate(`/projectDetailPage/${projectId}`);
  }, [projectId, saveButton]);

  //Save
  const handleSaveData = async (e, type) => {
    if (type === "save") {
      setSaveButton(true);
    } else if (type === "next") {
      setSaveButton(true);
    }
    e.preventDefault();

    const getResourcespayload = {
      stage: 2,
    };
    const payload = {
      id: projectId,
      projectedImplementationHours: formData.projectName,
      startDate: formData?.startDate,
      endDate: formData?.endDate,
      actualEndDate: formData?.actualEndDate,
    };
    console.log("payloadddd", payload);
    await dispatch(saveCreateProjectAction(payload, getResourcespayload));
  };

  useEffect(() => {
    if (projectId && saveButton) Navigate(`/projectDetailPage/${projectId}`);
  }, [projectId, saveButton]);

  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    // Save data first
    await handleSaveData(e, "next");
    Navigate("/projects");
  };

  const CustomMenu = (props) => {
    const { innerProps, children } = props;
    const applySkillFilterHandler = () => {
      const getSkillId = skillsCheckedData
        .map((item) => item.skillId)
        .join(",");
      const params = {
        query: searchData || "",
        skillIds: getSkillId,
      };
      dispatch(getAllocationSearch(params));
    };

    const onResetSkillFilterHandler = () => {
      setSkillsCheckedData([]);
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
            justifyContent: "space-between",
          }}
          {...innerProps}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={applySkillFilterHandler}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onResetSkillFilterHandler}
          >
            Reset
          </Button>
        </Box>
      </components.Menu>
    );
  };

  const CustomMenuDesc = (props) => {
    const { innerProps, children } = props;
    const applySkillFilterHandler = () => {
      const getSkillId = descCheckedData
        ?.map((item) => item.designationId)
        .join(",");
      const params = {
        query: searchData || "",
        designationIds: getSkillId,
      };
      dispatch(getAllocationSearch(params));
    };

    const onResetSkillFilterHandler = () => {
      setDescCheckedData([]);
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
            justifyContent: "space-between",
          }}
          {...innerProps}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={applySkillFilterHandler}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onResetSkillFilterHandler}
          >
            Reset
          </Button>
        </Box>
      </components.Menu>
    );
  };

  const handleOptionChange = (selected) => {
    setSkillsCheckedData(selected);
  };
  const handleOptionChangeDesc = (selected) => {
    setDescCheckedData(selected);
  };

  // for not clear the form we are calling Projectdetails
  // const projectDetailsData = useSelector(
  //   (state) => state.nonPersist.projectDetails?.projectDetailsData
  // );
  // console.log("projectDetailsData", projectDetailsData);

  // useEffect(() => {
  //   if (projectId) {
  //     dispatch(getProjectDetailsAction(projectId));
  //   }
  // }, [projectId]);

  // useEffect(() => {
  //   if (projectDetailsData) {
  //     setFormData({
  //       projectedImplementationHours:
  //         projectDetailsData?.projectedImplementationHours || "",
  //       startDate: projectDetailsData?.startDate || "",
  //       endDate: projectDetailsData?.endDate || "",
  //       actualEndDate: projectDetailsData?.actualEndDate || "",
  //     });
  //   }
  // }, [projectDetailsData]);

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
            <Grid item xs={12} sm={8} md={6} lg={6}>
              <TextField
                value={searchData}
                sx={{ width: "100%" }}
                placeholder="Search by Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={3} lg={3}>
              <FormControl style={{ marginLeft: "15px", width: "90%" }}>
                <Select
                  isSearchable={false}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder="Designation"
                  hideSelectedOptions={false}
                  onChange={handleOptionChangeDesc}
                  options={masterDesigData}
                  value={descCheckedData}
                  components={{
                    Option: InputOption,
                    Menu: CustomMenuDesc,
                  }}
                  isClearable={false}
                  controlShouldRenderValue={false}
                  getOptionValue={(option) => option.designationId}
                  getOptionLabel={(option) => option.designationName}
                  isLoading={masterSkillData?.length === 0}
                  styles={{
                    placeholder: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "55px",
                      background: "#008080",
                      color: "white !important",
                    }),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8} md={3} lg={3}>
              <FormControl style={{ marginLeft: "15px", width: "90%" }}>
                <Select
                  isSearchable={false}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder="Skill Set"
                  hideSelectedOptions={false}
                  onChange={handleOptionChange}
                  options={masterSkillData}
                  value={skillsCheckedData}
                  components={{
                    Option: InputOption,
                    Menu: CustomMenu,
                  }}
                  isClearable={false}
                  controlShouldRenderValue={false}
                  getOptionValue={(option) => option.skillId}
                  getOptionLabel={(option) => option.skillName}
                  isLoading={masterSkillData?.length === 0}
                  styles={{
                    placeholder: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "55px",
                      background: "#008080",
                      color: "white !important",
                    }),
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          {allocationSearchData?.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {allocationSearchData.map((option) => (
                    <TableRow key={option.employeeId}>
                      <TableCell>
                        <AddCircleIcon
                          cursor={"pointer"}
                          onClick={() => handleRadioSelect(option.employeeId)}
                          sx={{ color: "#008080" }}
                        />
                      </TableCell>
                      <TableCell>{option.employeeName}</TableCell>
                      <TableCell>{option.employeeDesignation}</TableCell>
                      <TableCell>
                        {option.skills?.length > 0 && (
                          <Grid
                            container
                            sx={{
                              border: "1px solid ##F3F3F3",
                              borderRadius: "5px",
                              backgroundColor: "#F3F3F3",
                              overflow: "auto",
                            }}
                          >
                            <Grid
                              item
                              sx={{
                                border: "1px solid #AEAEAE",
                                borderRadius: "8px",
                                padding: "4px",
                                margin: "5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                color: "#000000",
                              }}
                            >
                              {option.skills.map((skill, index) => (
                                <React.Fragment key={index}>
                                  {index > 0 && ", "}
                                  {skill}
                                </React.Fragment>
                              ))}
                            </Grid>
                          </Grid>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* Modal component */}
                <ProjectResourcesModal
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  {resourceDetailsPopupData.map((resource, index) => (
                    <div key={index} style={{ marginTop: "20px" }}>
                      {/* Display project details */}
                      <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10}>
                          <Typography variant="h5">
                            {resource.employeeName}
                          </Typography>
                          <Typography variant="paragraph">
                            <b> Current Projects :</b>
                          </Typography>
                          <Typography variant="h6">
                            {resource.projectName}
                          </Typography>
                          <Typography variant="h6">
                            <b>Start Date:</b> {resource.startDate}
                            <b> End Date: </b> {resource.endDate}
                          </Typography>
                          <Typography variant="h6">
                            <b> Occupancy Hrs:</b>
                            {resource.occupancyHours}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  {/* Content of your modal */}
                  <div
                    display="inline-flex"
                    direction="row"
                    style={{ marginTop: "20px" }}
                  >
                    {/* Add time input field */}
                    <TextField
                      placeholder="Enter Occupancy Hours"
                      value={formData?.occupancyHours}
                      onChange={handleTimeInputChange}
                      fullWidth
                      margin="normal"
                      name="occupancyHours"
                    />
                    <Dropdown
                      options={[...adminTimeOptions()]}
                      placeholder="Enter Occupancy Minutes"
                      value={formData?.occupancyMinutes}
                      onChange={handleTimeInputChange}
                      fullWidth
                      margin="normal"
                      name="occupancyMinutes"
                    />

                    {/* Add Confirm and Cancel buttons */}
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      mt={2}
                      gap={2}
                    >
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
        <Grid item xs={12} sm={8} md={10} lg={10}>
          {showAllResourcesTable && (
            <AllResourcesTable handleEdit={handleEdit} />
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
            disabled
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
              Start Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="startDate"
                format="DD/MM/YYYY"
                value={formData.startDate || null} // Set value to null to not display the current date
                onChange={(value) => handleDateChange("startDate", value)}
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
                name="startDate"
                format="DD/MM/YYYY"
                value={formData.endDate || null} // Set value to null to not display the current date
                onChange={(value) => handleDateChange("endDate", value)}
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
                name="startDate"
                format="DD/MM/YYYY"
                value={formData.actualEndDate || null} // Set value to null to not display the current date
                onChange={(value) => handleDateChange("actualEndDate", value)}
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
              onClick={(e) => handleSaveData(e, "save")}
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
