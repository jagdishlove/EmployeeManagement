import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";
import {
  GetAllCountryCityStateAction,
  getAllDomainAction,
  getClientDetailsAction,
  getClientNameAction,
  getEmployeeSearchAction,
  saveCreateProjectAction,
} from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import Dropdown from "../../../forms/dropdown/dropdown";

const CreateProjectFormDetails = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    clientName: "",
    projectName: "",
    description: "",
    projectCategory: "",
    applicableActivity: "",
    projectManager: "",
    projectLead: "",
    domain: "",
    complexity: "",
    clientAddress: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const [validationErrors, setValidationErrors] = useState({
    clientName: "",
    projectName: "",
    projectCategory: "",
    projectManager: "",
  });

  // client Search
  const clientSearchData = useSelector(
    (state) => state.nonPersist?.projectDetails?.clientNameData
  );

  useEffect(() => {
    dispatch(getClientNameAction());
  }, []);

  const handleChange = (e, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: e,
    }));
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  //client Details like address etc
  const { clientDetailsData } = useSelector(
    (state) => state.nonPersist.projectDetails
  );
  console.log("clientDetailsData", clientDetailsData);

  //For autopopulate data added condition
  useEffect(() => {
    if (formData.clientName) {
      const selectedId = formData.clientName.id;
      dispatch(getClientDetailsAction(selectedId));
    }
  }, [formData.clientName]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear validation error when user starts typing
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  // Handle change for  dropdown
  const handleDropdownChange = (event, dropdownName) => {
    const { value } = event.target;
    setFormData((prevSelectedValues) => ({
      ...prevSelectedValues,
      [dropdownName]: value,
    }));
    setValidationErrors({
      ...validationErrors,
      [dropdownName]: "",
    });
  };

  //project category
  const masterdataProjectJobTypesList = useSelector(
    (state) => state.persistData.masterData?.jobtype
  );

  //project Activity
  const masterdataProjectActivityList = useSelector(
    (state) => state.persistData.masterData?.activity
  );

  // Manager  and Lead Search
  const employeeSearchData = useSelector(
    (state) => state.nonPersist?.projectDetails?.employeeSearchData
  );
  console.log("employeeSearchData", employeeSearchData);
  useEffect(() => {
    dispatch(getEmployeeSearchAction());
  }, []);

  //doomain
  const allDomainData = useSelector(
    (state) => state?.nonPersist?.projectDetails?.allDomainData
  );
  useEffect(() => {
    dispatch(getAllDomainAction());
  }, []);

  //complexity
  const masterdatacomplexityList = useSelector(
    (state) => state.persistData.masterData?.complexityList
  );

  //getAll country city state
  const masterDatagetAll = useSelector(
    (state) => state?.nonPersist?.projectDetails?.getAllCountryCityStateData
  );

  useEffect(() => {
    dispatch(GetAllCountryCityStateAction());
  }, []);

  //get country city state details by id
  const DataValue = {};
  masterDatagetAll.forEach((location) => {
    DataValue[location.id] = location.dataValue;
  });

  console.log("formData", formData);

  //Save
  const handleSaveData = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return; // Do not proceed with saving if there are validation errors
    }

    const payload = {
      projectName: formData.projectName,
      description: formData.description,
      projectTypeId: formData.projectCategory,
      projectManagerId: formData.projectManager?.id,
      projectTechLeadId: formData.projectLead?.id,
      domainId: formData.domain,
      complexity: formData.complexity,
      clientId: formData.clientName?.id,
    };

    await dispatch(saveCreateProjectAction(payload));

    // Navigate to resource allocation
    Navigate("/projectViewDeatils");

    // // Reset form data
    // setFormData(initialValues);

    // Clear validation errors
    setValidationErrors({});
  };

  const handleSaveAndNext = async () => {
    //  e.preventDefault();
    // // Validate form fields
    // const errors = validateForm();
    // if (Object.keys(errors).length > 0) {
    //   setValidationErrors(errors);
    //   return; // Do not proceed with saving if there are validation errors
    // }

    // // Save data first
    // await handleSaveData(e);

    // Navigate to resource allocation
    Navigate("/resourceallocation");
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.clientName) {
      errors.clientName = "Client Name is required";
    }
    if (!formData.projectName) {
      errors.projectName = "Project Name is required";
    }
    if (!formData.projectCategory) {
      errors.projectCategory = "Project Category is required";
    }
    if (!formData.projectManager) {
      errors.projectManager = "Project Manager is required";
    }

    return errors;
  };

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
              value={formData.clientName}
              onChange={(data) => handleChange(data, "clientName")}
              name="clientName"
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              options={clientSearchData?.result}
              isLoading={clientSearchData?.length === 0}
              placeholder="Client Name"
            />
          </Box>
          {validationErrors.clientName && (
            <Typography variant="caption" color="error">
              {validationErrors.clientName}
            </Typography>
          )}
          <Typography
            variant="body1"
            style={{ marginTop: "15px", color: " #000000" }}
          >
            Client Address
          </Typography>
          <TextField
            placeholder="Client Address"
            name="clientAddress"
            value={`${clientDetailsData?.address?.addressLine1 || ""} ${
              clientDetailsData?.address?.addressLine2 || ""
            }`}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            sx={{
              "& :hover": {
                cursor: "not-allowed",
              },
            }}
            multiline
            rows={4}
            fullWidth
            disabled
          />
          <Typography
            variant="body1"
            style={{ marginTop: "15px", color: " #000000" }}
          >
            Phone
          </Typography>
          <TextField
            placeholder="Phone"
            name="phone"
            value={clientDetailsData?.phone}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "10px",
              marginTop: "5px",
            }}
            sx={{
              "& :hover": {
                cursor: "not-allowed",
              },
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
            style={{ marginTop: "15px", color: "  #000000" }}
          >
            Country
          </Typography>
          <TextField
            placeholder="Country"
            name="country"
            value={DataValue[clientDetailsData?.address?.countryId] || ""}
            sx={{
              "& :hover": {
                cursor: "not-allowed",
              },
            }}
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
            style={{ marginTop: "15px", color: "  #000000" }}
          >
            State
          </Typography>
          <TextField
            placeholder="State"
            name="state"
            value={DataValue[clientDetailsData?.address?.stateId] || ""}
            sx={{
              "& :hover": {
                cursor: "not-allowed",
              },
            }}
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
            style={{ marginTop: "15px", color: "  #000000" }}
          >
            City
          </Typography>
          <TextField
            placeholder="City"
            name="city"
            sx={{
              "& :hover": {
                cursor: "not-allowed",
              },
            }}
            value={DataValue[`${clientDetailsData?.address?.cityId}`] || ""}
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
            style={{ marginTop: "15px", color: "  #000000" }}
          >
            Zip / Postal Code
          </Typography>
          <TextField
            placeholder="Zip/Postal Code"
            name="zipCode"
            sx={{
              "& :hover": {
                cursor: "not-allowed",
              },
            }}
            value={clientDetailsData?.address?.postalCode}
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
            onChange={handleFormChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />
          {validationErrors.projectName && (
            <Typography variant="caption" color="error">
              {validationErrors.projectName}
            </Typography>
          )}
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Description
          </Typography>
          <TextField
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
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
            Project Category
          </Typography>
          <Dropdown
            value={formData.projectCategory}
            onChange={handleDropdownChange}
            dropdownName="projectCategory"
            options={masterdataProjectJobTypesList}
            valueKey="jobId"
            labelKey="jobType"
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              borderRadius: "5px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          {validationErrors.projectCategory && (
            <Typography variant="caption" color="error">
              {validationErrors.projectCategory}
            </Typography>
          )}
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Applicable Activities
          </Typography>
          <Autocomplete
            multiple
            id="applicable-activities"
            options={masterdataProjectActivityList}
            getOptionLabel={(option) => option.activityType}
            onChange={(event, value) =>
              handleChange(value, "applicableActivity")
            }
            disableCloseOnSelect
            freeSolo
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} />
                {option.activityType}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Applicable Activities"
              />
            )}
            name="applicableActivity"
          />

          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Project Manager
          </Typography>

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
              value={formData.projectManager}
              name="projectManager"
              onChange={(data) => handleChange(data, "projectManager")}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              options={employeeSearchData?.result || []}
              isLoading={employeeSearchData?.length === 0}
              placeholder="Project Manager"
            />
          </Box>
          {validationErrors.projectManager && (
            <Typography variant="caption" color="error">
              {validationErrors.projectManager}
            </Typography>
          )}
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Project Lead
          </Typography>
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
              value={formData.projectLead}
              name="projectLead"
              onChange={(data) => handleChange(data, "projectLead")}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              options={employeeSearchData?.result}
              isLoading={employeeSearchData?.length === 0}
              placeholder="Project Lead"
            />
          </Box>
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Domain
          </Typography>
          <Dropdown
            value={formData.domain}
            onChange={handleDropdownChange}
            dropdownName="domain"
            options={allDomainData}
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              borderRadius: "5px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
            valueKey="domainId"
            labelKey="domainName"
            name="domain"
          />

          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Complexity
          </Typography>

          <Dropdown
            value={formData.complexity}
            onChange={handleDropdownChange}
            dropdownName="complexity"
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              borderRadius: "5px",
            }}
            options={masterdatacomplexityList}
            name="complexity"
          />
        </Grid>

        <Grid item xs={12} sm={8} md={10} lg={10}>
          <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSaveData}
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
