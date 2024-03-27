import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
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
import { useNavigate, useParams } from "react-router-dom";
import Select, { components } from "react-select";
import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";
import ProjectResourcesModal from "./projectResourcesModal";
import useDebounce from "../../../../utils/useDebounce";
import {
  getAllResourcesAction,
  getAllocationSearch,
  getProjectDetailsAction,
  // getProjectDetailsAction,
  getResourceDetailsPopupAction,
  saveCreateProjectAction,
  saveCreateResourcesAction,
} from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AllResourcesTable from "./allResourcesTable";
import Dropdown from "../../../forms/dropdown/dropdown";
import { adminTimeOptions } from "../../../../utils/dateOptions";
import dayjs from "dayjs";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import icon from "../../../../assets/Featured icon.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
  const [setSelectedOptions] = useState([]);
  const [searchData, setSearchData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillsCheckedData, setSkillsCheckedData] = useState([]);
  const [descCheckedData, setDescCheckedData] = useState([]);
  const debouncedValue = useDebounce(searchData);
  const [saveButton, setSaveButton] = useState(false);
  const [occupenyhoursValue, setOccupencyHoursValue] = useState("");
  const [render, setRender] = useState(true);

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
  const { getProjectData } = useSelector(
    (state) => state?.nonPersist?.projectDetails
  );

  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const [showAllResourcesTable, setShowAllResourcesTable] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectedimplementationhours: "",
    occupancyHours: "",
    occupancyMinutes: "",
    startDate: null,
    endDate: null,
    actualEndDate: null,
  });

  // Define state variables for errors
  const [errors, setErrors] = useState({
    occupancyHours: "",
    occupancyMinutes: "",
  });

  const [selectedOccupancyHours, setSelectedOccupancyHours] = useState(null);
  const { id } = useParams();
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

    setFormData((data) => ({
      ...data,

      [name]: value,
    }));
  };

  const projectId = useSelector(
    (state) => state.nonPersist.projectDetails?.projectId
  );

  const [employeeId, setEmployeeId] = useState();

  const handleConfirm = async (e) => {
    e.preventDefault();

    // Check for validation errors
    const newErrors = {};

    if (!formData.occupancyHours) {
      newErrors.occupancyHours = "Please enter Occupancy Hours.";
    } else if (!/^\d+$/.test(formData.occupancyHours)) {
      newErrors.occupancyHours = "Occupancy Hours must contain only digits.";
    }

    // Update the error state
    setErrors(newErrors);

    // If there are validation errors, do not dispatch the action
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setRender(true);

    const payload = {
      employeeId: employeeId,
      projectId: projectId,
      occupancyHours: formData.occupancyHours * 60 + formData.occupancyMinutes,
    };

    if (selectedOccupancyHours !== null) {
      // Perform Update
      payload.resourceId = selectedOccupancyHours;
    }

    await dispatch(saveCreateResourcesAction(payload));
    await dispatch(getAllResourcesAction(projectId));

    setFormData({
      occupancyHours: "",
      occupancyMinutes: "",
    });
    setSelectedOccupancyHours(null);
    setIsModalOpen(false); // Close the modal after confirmation
    setRender(true);
  };

  //for displaying the table after confirm
  useEffect(() => {
    dispatch(getAllResourcesAction(projectId));
    setShowAllResourcesTable(true);
  }, [projectId]);

  const handleCancel = () => {
    // Reset the values when the user clicks on "Cancel"
    setFormData({
      ...formData,
      occupancyHours: "",
      occupancyMinutes: "", // Add this line to reset occupancyMinutes
    });

    setSelectedOccupancyHours(null);
    setIsModalOpen(false); // Close the modal after canceling
    setRender(true);
  };

  //Edit
  const allResourcesData = useSelector(
    (state) => state.nonPersist.projectDetails?.allResourcesData
  );

  useEffect(() => {
    const totalOccupancyMinutes = allResourcesData.reduce((total, resource) => {
      const [hours, minutes] = resource.occupancyHours
        .split(" ")[0]
        .split("Hrs")
        .map((value) => parseInt(value));

      return total + (hours * 60 + (minutes || 0));
    }, 0);
    const totalHours = Math.floor(totalOccupancyMinutes / 60);
    const totalMinutes = totalOccupancyMinutes % 60;
    const totalOccupancyTimeString = `${totalHours} hr ${totalMinutes
      .toString()
      .padStart(2, "0")} min`;

    setOccupencyHoursValue(totalOccupancyTimeString);
  }, [render, handleConfirm]);

  const handleEdit = (employeeId, resourceId) => {
    // setIsEditing(true);
    setEmployeeId(employeeId);
    dispatch(getResourceDetailsPopupAction(employeeId));
    setIsModalOpen(true);
    setRender(true);

    const selectedOccupancyHours = allResourcesData.find(
      (item) => item.resourceId === resourceId
    );

    const durationString = `${selectedOccupancyHours?.occupancyHours}`;

    // Function to parse the duration and return hours and minutes
    const parseDuration = (durationString) => {
      const regex = /(\d+)Hrs (\d+)mins/;
      const match = durationString.match(regex);

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

    setFormData((data) => ({
      ...data,
      occupancyHours: hours,
      occupancyMinutes: minutes,
    }));
    setSelectedOccupancyHours(resourceId);
  };

  const handleDateChange = (name, date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setFormData({
      ...formData,
      [name]: formattedDate,
    });
  };

  useEffect(() => {
    if (projectId && saveButton) navigate(`/projectDetailPage/${projectId}`);
  }, [projectId, saveButton]);

  //Save
  const handleSaveData = async (e, type) => {
    e.preventDefault();

    // Check for validation errors
    const newErrors = {};

    if ((formData.endDate || formData.actualEndDate) && !formData.startDate) {
      newErrors.startDate = "Please enter the start date.";
    } else if (formData.startDate && formData.endDate) {
      const startDate = dayjs(formData.startDate);
      const endDate = dayjs(formData.endDate);

      if (startDate.isAfter(endDate)) {
        newErrors.startDate = "Start date must be before the end date.";
      }
    }

    if (formData.startDate && formData.actualEndDate) {
      const startDate = dayjs(formData.startDate);
      const actualEndDate = dayjs(formData.actualEndDate);

      if (actualEndDate.isBefore(startDate)) {
        newErrors.actualEndDate =
          "Actual End date must be after the start date.";
      }
    }

    // Update the error state
    setErrors(newErrors);

    // If there are validation errors, do not proceed further
    if (Object.keys(newErrors).length > 0) {
      return;
    }
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
    await dispatch(saveCreateProjectAction(payload, getResourcespayload));
  };

  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    // Check for validation errors
    const newErrors = {};

    if ((formData.endDate || formData.actualEndDate) && !formData.startDate) {
      newErrors.startDate = "Please enter the start date.";
    } else if (formData.startDate && formData.endDate) {
      const startDate = dayjs(formData.startDate);
      const endDate = dayjs(formData.endDate);

      if (startDate.isAfter(endDate)) {
        newErrors.startDate = "Start date must be before the end date.";
      }
    }

    if (formData.startDate && formData.actualEndDate) {
      const startDate = dayjs(formData.startDate);
      const actualEndDate = dayjs(formData.actualEndDate);

      if (actualEndDate.isBefore(startDate)) {
        newErrors.actualEndDate =
          "Actual End date must be after the start date.";
      }
    }

    // Update the error state
    setErrors(newErrors);

    // If there are validation errors, do not proceed further
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    // Save data first
    await handleSaveData(e, "next");
    if (id) {
      navigate(`/EditCostForm/${id}`);
    } else {
      // navigate to resource allocation
      navigate("/costallocation");
    }
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

      // Close the dropdown when the "Apply" button is clicked
      props.selectProps.onMenuClose();
    };

    const onResetSkillFilterHandler = () => {
      setSkillsCheckedData([]);
      // Call API here
      const params = {
        query: searchData || "",
        skillIds: "", // Assuming you want to clear all selected skill IDs
      };

      dispatch(getAllocationSearch(params));
      // Close the dropdown when the "Apply" button is clicked
      props.selectProps.onMenuClose();
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
            }}
          >
            Apply
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

      // Close the dropdown when the "Apply" button is clicked
      props.selectProps.onMenuClose();
    };

    const onResetSkillFilterHandler = () => {
      setDescCheckedData([]);
      // Call API here
      const params = {
        query: searchData || "",
        designationIds: "", // Assuming you want to clear all selected skill IDs
      };

      dispatch(getAllocationSearch(params));

      // Close the dropdown when the "Apply" button is clicked
      props.selectProps.onMenuClose();
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
            clear All
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={applySkillFilterHandler}
            style={{
              borderRadius: "20px",
            }}
          >
            Apply
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
  const projectDetailsData = useSelector(
    (state) => state.nonPersist.projectDetails?.projectDetailsData
  );

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetailsAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        projectedImplementationHours:
          projectDetailsData?.projectedImplementationHours || "",
        startDate: projectDetailsData?.startDate
          ? new Date(projectDetailsData.startDate)
          : null,
        endDate: projectDetailsData?.endDate
          ? new Date(projectDetailsData.endDate)
          : null,
        actualEndDate: projectDetailsData?.actualEndDate
          ? new Date(projectDetailsData.actualEndDate)
          : null,
      }));
    }
  }, [id]);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
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
            <Grid item xs={12} sm={8} md={6} lg={6}>
              <TextField
                value={searchData}
                className="custom-search-field"
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
          {
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
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Avatar
                              sx={{
                                color: "#fff",
                              }}
                            >
                              {option?.employeeName.charAt(0)}
                            </Avatar>
                          </Grid>
                          <Grid item xs={8} mt={1}>
                            {option.employeeName}
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>{option.employeeDesignation}</TableCell>
                      <TableCell>
                        {option.employeeSkills?.length > 0 && (
                          <Grid
                            container
                            sx={{
                              border: "1px solid ##F3F3F3",
                              borderRadius: "5px",
                              backgroundColor: "#F3F3F3",
                              overflow: "auto",
                            }}
                          >
                            {option.employeeSkills
                              .slice(
                                0,
                                !expanded && option.employeeSkills.length > 5
                                  ? 5
                                  : option.employeeSkills.length
                              )
                              .map((employeeSkill, index) => (
                                <Grid
                                  item
                                  key={index}
                                  sx={{
                                    border: "1px solid #AEAEAE",
                                    borderRadius: "8px",
                                    padding: "4px",
                                    margin: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    color: "#000000",
                                    backgroundColor: "#ffffff",
                                  }}
                                >
                                  <React.Fragment key={index}>
                                    {index > 0 && " "}
                                    <span style={{ color: "black" }}>
                                      {employeeSkill.skillName}
                                    </span>{" "}
                                    {employeeSkill.rating && (
                                      <>
                                        <StarOutlinedIcon
                                          style={{
                                            backgroundColor:
                                              employeeSkill.rating < 5
                                                ? "#90DC90"
                                                : employeeSkill.rating >= 5 &&
                                                  employeeSkill.rating <= 7
                                                ? "#E6E62C"
                                                : "#E38F75",
                                            color: "#ffff",
                                            borderRadius: "50%",
                                            width: 15,
                                            height: 15,
                                            marginTop: 0,
                                            marginLeft: 2,
                                            marginRight: 2,
                                          }}
                                        />
                                        {employeeSkill.rating}
                                      </>
                                    )}
                                  </React.Fragment>
                                </Grid>
                              ))}
                            {option.employeeSkills.length > 5 && (
                              <Grid
                                item
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                  marginLeft: "auto", // Pushes the button to the right
                                }}
                              >
                                <Button onClick={toggleExpand}>
                                  {expanded ? (
                                    <>
                                      View Less
                                      <KeyboardArrowUpIcon />
                                    </>
                                  ) : (
                                    <>
                                      View More
                                      <KeyboardArrowDownIcon />
                                    </>
                                  )}
                                </Button>
                              </Grid>
                            )}
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
                  {resourceDetailsPopupData?.map((resource, index) => {
                    return (
                      <div key={index}>
                        <Grid container justifyContent={"center"}>
                          <Grid container item xs={10}>
                            <Grid item xs={12}>
                              {/* Grid for employee name and icon */}
                              {index === 0 && (
                                <>
                                  <div
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={icon}
                                      alt="Icon"
                                      style={{
                                        marginRight: "5px",
                                        marginLeft: "-10px",
                                      }}
                                    />
                                    <Typography variant="h5">
                                      {resource.employeeName}
                                    </Typography>
                                  </div>
                                </>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              {/* Grid for "Current Projects" */}
                              {index === 0 && (
                                <Typography
                                  variant="paragraph"
                                  textAlign="left"
                                  sx={{ paddingBottom: "50px" }}
                                >
                                  <b>Current Projects:</b>
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            item
                            xs={10}
                            sx={{ marginTop: "20px" }}
                          >
                            <Grid item xs={12}>
                              {/* Grid for project details */}
                              <Typography variant="h6">
                                {index + 1}.{" "}
                                <strong>{resource.projectName}</strong>
                              </Typography>
                              <Typography variant="h6">
                                <b>Start Date:</b> {resource.startDate}
                                <b> End Date: </b> {resource.endDate}
                              </Typography>
                              <Typography variant="h6">
                                <b>Occupancy Hrs:</b>
                                {resource.occupancyHours}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })}
                  <Grid container justifyContent={"center"}>
                    <Grid container item xs={10}>
                      <TextField
                        label="Enter Occupancy Hours"
                        value={formData?.occupancyHours}
                        onChange={handleTimeInputChange}
                        fullWidth
                        margin="normal"
                        name="occupancyHours"
                      />
                      {errors.occupancyHours && (
                        <Typography variant="body2" color="error">
                          {errors.occupancyHours}
                        </Typography>
                      )}
                      <Dropdown
                        options={[...adminTimeOptions()]}
                        title="Select Occupancy Minutes"
                        value={formData?.occupancyMinutes || "0"}
                        onChange={handleTimeInputChange}
                        fullWidth
                        margin="normal"
                        name="occupancyMinutes"
                        style={{
                          ...style.TimesheetTextField,
                          border: "1px solid silver",
                          borderRadius: "5px",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                      />
                      {errors.occupancyMinutes && (
                        <Typography variant="body2" color="error">
                          {errors.occupancyMinutes}
                        </Typography>
                      )}
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        mt={2}
                        gap={2}
                        width="100%"
                      >
                        <Button
                          variant="outlined"
                          onClick={() => handleCancel()}
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
                    </Grid>
                  </Grid>
                </ProjectResourcesModal>
              </Table>
            </TableContainer>
          }
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
            value={occupenyhoursValue}
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
                value={
                  getProjectData.startDate
                    ? dayjs(getProjectData.startDate)
                    : null
                } // Set value to null to not display the current date
                onChange={(value) => handleDateChange("startDate", value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {errors.startDate && (
              <Typography variant="caption" color="error" fontSize={"1rem"}>
                {errors.startDate}
              </Typography>
            )}
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
                format="DD/MM/YYYY"
                value={
                  getProjectData.endDate ? dayjs(getProjectData.endDate) : null
                } // Set value to null to not display the current date
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
                name="actualEndDate"
                format="DD/MM/YYYY"
                value={
                  getProjectData.actualEndDate
                    ? dayjs(getProjectData.actualEndDate)
                    : null
                } // Set value to null to not display the current date
                onChange={(value) => handleDateChange("actualEndDate", value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {errors.actualEndDate && (
              <Typography variant="caption" color="error" fontSize={"1rem"}>
                {errors.actualEndDate}
              </Typography>
            )}
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
