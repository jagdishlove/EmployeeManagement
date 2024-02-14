import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";
import {
  getAllDomainAction,
  getEmployeeSearchAction,
} from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import Dropdown from "../../../forms/dropdown/dropdown";
import Select from "react-select";

const CreateProjectFormDetails = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    projectName: "",
    description: "",
  });
  const [searchFormData, setSearchFormData] = useState([]);

  const { employeeSearchData } = useSelector(
    (state) => state.nonPersist?.projectDetails
  );

  useEffect(() => {
    dispatch(getEmployeeSearchAction());
  }, []);

  const handleInputChangeSearch = (data) => {
    setSearchFormData(data);
    // setSelectedSearchOption(data);
    // dispatch(getAllLeaveRequestsOfEmployeesAction(15, filterData, null, data));
    // setSelectedOptions(data);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveAndNext = () => {
    Navigate("/resourceallocation");
  };

  const masterdatacomplexityList = useSelector(
    (state) => state.persistData.masterData?.complexityList
  );

  const handleComplexityChange = (selectedOption) => {
    setFormData({
      ...formData,
      complexity: selectedOption.target.value,
    });
  };

  const masterdataProjectTypesList = useSelector(
    (state) => state.persistData.masterData?.projectTypes
  );

  const handleProjectTypesChange = (selectedOption) => {
    setFormData({
      ...formData,
      projectTypes: selectedOption.target.value,
    });
  };

  const allDomaindata = useSelector(
    (state) => state?.nonPersist?.projectDetails
  );
  console.log("allDomaindata", allDomaindata);

  const handleAllDomainChange = (selectedOption) => {
    setFormData({
      ...formData,
      projectTypes: selectedOption.target.value,
    });
  };

  useEffect(() => {
    dispatch(getAllDomainAction());
  }, []);

  return (
    <div style={{ marginBottom: "50px" }}>
      {/* Client Details */}
      <div
        className="Heading"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6">
          <b>Client details </b>
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
            Client
          </Typography>
          <TextField
            placeholder="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />

          <Typography
            variant="body1"
            style={{ marginTop: "15px", color: " #ADADAD" }}
          >
            Client Address
          </Typography>
          <TextField
            placeholder="Client Address"
            name="clientAddress"
            value={formData.clientAddress}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            multiline
            rows={4}
            fullWidth
            disabled
          />
          <Typography
            variant="body1"
            style={{ marginTop: "15px", color: " #ADADAD" }}
          >
            Phone
          </Typography>
          <TextField
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* Add your phone icon here */}
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="body1"
            style={{ marginTop: "15px", color: " #ADADAD" }}
          >
            Country
          </Typography>
          <TextField
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            fullWidth
            disabled
          />
          <Typography
            variant="body1"
            style={{ marginTop: "15px", color: " #ADADAD" }}
          >
            State
          </Typography>
          <TextField
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            fullWidth
            disabled
          />
          <Typography
            variant="body1"
            style={{ marginTop: "15px", color: " #ADADAD" }}
          >
            City
          </Typography>
          <TextField
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            fullWidth
            disabled
          />
          <Typography
            variant="body1"
            style={{ marginTop: "15px", color: " #ADADAD" }}
          >
            Zip / Postal Code
          </Typography>
          <TextField
            placeholder="Zip/Postal Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>

      {/* Basic Details */}
      <div
        className="Heading"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6">
          <b>Basic details </b>
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
            Project Name
          </Typography>
          <TextField
            placeholder=" Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />

          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Description
          </Typography>
          <TextField
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            multiline
            rows={4}
            fullWidth
          />
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Project Type
          </Typography>
          <Dropdown
            value={formData.handleProjectTypesChange}
            onChange={handleProjectTypesChange}
            dropdownName="projectTypes"
            options={masterdataProjectTypesList}
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              borderRadius: "5px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Project Manager
          </Typography>
          {/* <Dropdown
            value={formData.projectManager}
            onChange={handleProjectTypesChange}
            dropdownName="Project Manager"
            // options={masterdata1}
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              borderRadius: "5px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          /> */}
          <Box>
            <Select
              isMulti={false}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                control: (baseStyles) => ({
                  ...baseStyles,

                  height: "55px",
                }),
              }}
              isSearchable={true}
              menuPortalTarget={document.body}
              value={searchFormData}
              // components={{ Control: CustomSelectControl }}
              onChange={handleInputChangeSearch}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              options={employeeSearchData?.result}
              isLoading={employeeSearchData?.length === 0}
              placeholder="Search by Manager Name"
            />
          </Box>
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Project Lead
          </Typography>
          <Dropdown
            value={formData.projectLead}
            onChange={handleProjectTypesChange}
            dropdownName="Project Lead"
            // options={masterdata1}
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              borderRadius: "5px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Domain
          </Typography>
          <Dropdown
            value={formData.handleAllDomainChange}
            onChange={handleAllDomainChange}
            dropdownName="Domain"
            options={allDomaindata?.allDomainData}
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              borderRadius: "5px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
            valueKey="domainId"
            labelKey="domainName"
          />
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Complexity
          </Typography>

          <Dropdown
            value={formData.handleComplexityChange}
            onChange={handleComplexityChange}
            dropdownName="complexity"
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              borderRadius: "5px",
            }}
            options={masterdatacomplexityList}
          />
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

export default CreateProjectFormDetails;
