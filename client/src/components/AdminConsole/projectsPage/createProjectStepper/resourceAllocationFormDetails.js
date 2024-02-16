import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
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
import { getResourcesNameDesignationSearchAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import ProjectResourcesModal from "./projectResourcesModal";

const ResourceAllocationFormDetails = () => {
  const [setSelectedOptions] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeInput, setTimeInput] = useState("");

  const theme = useTheme();
  const style = TimesheetStyle(theme);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

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

  const CustomSelectControl = (props) => {
    return (
      <components.Control {...props}>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <SearchIcon sx={{ marginLeft: "10px" }} />
          {props.children}
        </div>
      </components.Control>
    );
  };

  //   For Table

  //   const handleTableInputChange = (data) => {
  //     setSelectedOptionsTable(data);
  //   };

  const [selectedOptionsTable] = useState([
    {
      id: 1,
      name: "Kiran Kumar",
      designation: "Developer",
      skills: "React, JavaScript",
    },
    {
      id: 2,
      name: "Amit Kumar",
      designation: "Designer",
      skills: "UI/UX, Adobe Creative Suite",
    },
    {
      id: 3,
      name: "Vidit Gupta",
      designation: "Project Manager",
      skills: "Agile, Scrum",
    },
    {
      id: 4,
      name: "Koushik K",
      designation: "QA Engineer",
      skills: "Testing, Automation",
    },
    {
      id: 5,
      name: "Swarna",
      designation: "Business Analyst",
      skills: "Requirements gathering",
    },
  ]);

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
  const [nameDesignationSearchFormData, setNameDesignationSearchFormData] =
    useState();
  const nameDesignationSearchData = useSelector(
    (state) =>
      state.nonPersist?.projectDetails?.resourcesNameDesignationSearchData
  );
  console.log("nameDesignationSearchData", nameDesignationSearchData);

  useEffect(() => {
    dispatch(getResourcesNameDesignationSearchAction());
  }, []);

  const handleNameDesignationChangeSearch = (data) => {
    setNameDesignationSearchFormData(data);
  };

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const abc = [
    {
      id: 623,
      name: "Santosh",
      type: "employee",
      skills: ["Python dev"],
    },
    {
      id: 624,
      name: "tester",
      type: "designation",
    },
    {
      id: 623,
      name: "Santosh",
      type: "employee",
      skills: ["Python dev"],
    },
    {
      id: 624,
      name: "tester",
      type: "designation",
    },
    {
      id: 623,
      name: "Santosh",
      type: "employee",
      skills: ["Python dev"],
    },
    {
      id: 624,
      name: "tester",
      type: "designation",
    },
  ];

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
              <Select
                isMulti
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (baseStyles) => ({
                    ...baseStyles,
                    height: "55px",
                  }),
                }}
                isSearchable={true}
                menuPortalTarget={document.body}
                value={nameDesignationSearchFormData}
                components={{ Control: CustomSelectControl }}
                onChange={handleNameDesignationChangeSearch}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.name}
                options={abc}
                isLoading={nameDesignationSearchData?.length === 0}
                placeholder="Search by Name or Designation"
              />
            </Grid>
            <Grid item xs={12} sm={8} md={3} lg={3}>
              <FormControl style={{ marginLeft: "15px", width: "90%" }}>
                <Select
                  labelId="dropdown-label"
                  placeholder="Skill Sets"
                  id="dropdown"
                  value={selectedValue}
                  onChange={handleChange}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "55px",
                    }),
                  }}
                >
                  <MenuItem value="html-css">HTML & CSS</MenuItem>
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="react-native">React Native</MenuItem>
                  <MenuItem value="reactjs">ReactJS</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="php">PHP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          // sx={{ display: false ? "block" : "none" }}
          item
          xs={12}
          sm={8}
          md={10}
          lg={10}
        >
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
                {selectedOptionsTable.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell>{option.name}</TableCell>
                    <TableCell>{option.designation}</TableCell>
                    <TableCell>{option.skills}</TableCell>
                    <TableCell>
                      <Radio
                        checked={selectedRadio === option.id}
                        onChange={() => handleRadioSelect(option.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <ProjectResourcesModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              >
                <div style={{ marginTop: "20px" }}>
                  <TextField
                    placeholder="Enter Occupancy Hrs ( HH : MM )"
                    value={timeInput}
                    onChange={handleTimeInputChange}
                    fullWidth
                    margin="normal"
                  />

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
