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
import { useNavigate, useParams } from "react-router-dom";

import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";
import {
  GetAllCountryCityStateAction,
  getAllDomainAction,
  getClientDetailsAction,
  getClientNameAction,
  getEmployeeSearchAction,
  getProjectDetailsAction,
  saveCreateProjectAction,
} from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import Dropdown from "../../../forms/dropdown/dropdown";

const CreateProjectFormDetails = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectDetailsData = useSelector(
    (state) => state.nonPersist.projectDetails?.projectDetailsData
  );
  const initialValues = {
    clientName: { id: 0, name: "", type: "client" },
    projectName: "",
    description: "",
    projectCategory: "",
    applicableActivity: [],
    projectManager: { id: 0, name: "", type: "employee" },
    projectLead: { id: 0, name: "", type: "employee" },
    domain: "",
    complexity: "",
    clientAddress: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  };
  const { id } = useParams();
  const [formData, setFormData] = useState(initialValues);
  const [validationErrors, setValidationErrors] = useState({
    clientName: "",
    projectName: "",
    projectCategory: "",
    projectManager: "",
  });

  console.log("formDataformData", formData);

  const [saveButton, setSaveButton] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // client Search
  const clientSearchData = useSelector(
    (state) => state.nonPersist?.projectDetails?.clientNameData
  );

  const handleChange = (e, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: e,
    }));

    if (name === "applicableActivity") {
      const activitiesIds = e.map((skillObj) => skillObj.activityId);
      setFormData((prevData) => ({
        ...prevData,
        applicableActivity: activitiesIds,
      }));
    }

    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  //client Details like address etc
  const { clientDetailsData } = useSelector(
    (state) => state.nonPersist.projectDetails
  );

  //For autopopulate data added condition
  useEffect(() => {
    if (formData?.clientName) {
      const selectedId = formData.clientName.id;
      dispatch(getClientDetailsAction(selectedId));
    }
  }, [formData?.clientName]);

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

  const projectId = useSelector(
    (state) => state.nonPersist.projectDetails?.projectId
  );

  useEffect(() => {
    if (projectId && saveButton) navigate(`/projectDetailPage/${projectId}`);
  }, [projectId]);

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetailsAction(id));
    }
  }, [id]);
  //for not clear the form we are calling Projectdetails

  useEffect(() => {
    setIsEdit(true);
    if (id) {
      setFormData({
        clientName: projectDetailsData?.clientSearch || {
          id: 0,
          name: "",
          type: "client",
        },
        projectName: projectDetailsData?.projectName || "",
        description: projectDetailsData?.description || "",
        projectCategory: projectDetailsData?.jobType?.jobId || "",
        applicableActivity: projectDetailsData?.activities || "",
        projectManager: projectDetailsData?.projectManager || {
          id: 0,
          name: "",
          type: "employee",
        },
        projectLead: projectDetailsData?.projectTechLead || {
          id: 0,
          name: "",
          type: "employee",
        },
        domain: projectDetailsData?.domain?.domainId || "",
        complexity: projectDetailsData?.complexity || "",
        clientAddress:
          `${projectDetailsData?.client?.address?.addressLine1 || " "} ${
            projectDetailsData?.client?.address?.addressLine1?.addressLine2 ||
            " "
          }` || "",
        phone: projectDetailsData?.client?.phone || "",
        country: projectDetailsData?.client?.address?.country?.dataValue || "",
        state: projectDetailsData?.client?.address?.state?.dataValue || "",
        city: projectDetailsData?.client?.address?.city?.dataValue || "",
        zipCode: projectDetailsData?.client?.address?.postalCode || "",
      });
      dispatch(getClientNameAction(projectDetailsData?.client?.clientName));
      const activitiesIds = projectDetailsData?.activities?.map(
        (skillObj) => skillObj.activityId
      );
      setFormData((prevData) => ({
        ...prevData,
        applicableActivity: activitiesIds,
      }));
    } else {
      setFormData(initialValues);
    }
  }, [id]);

  //Save
  const handleSaveData = async (e, type) => {
    if (type === "save") {
      setSaveButton(true);
    } else if (type === "next") {
      setSaveButton(true);
    }
    e.preventDefault();
    // Validate form fields
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return; // Do not proceed with saving if there are validation errors
    }

    const saveProjectStagePayload = {
      stage: 1,
    };

    const payload = {
      id: projectId || id ? projectId || id : "",
      projectName: formData.projectName,
      description: formData.description,
      jobTypeId: formData.projectCategory,
      projectManagerId: formData.projectManager?.id,
      projectTechLeadId:
        formData.projectLead?.id === 0 ? "" : formData.projectLead?.id,
      domainId: formData.domain,
      clientId: formData.clientName.id,
      activitiesIds: formData.applicableActivity || [],
    };

    if (formData.complexity) {
      payload.complexity = formData.complexity;
    }

    await dispatch(saveCreateProjectAction(payload, saveProjectStagePayload));

    // Clear validation errors
    setValidationErrors({});
  };

  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    // Validate form fields
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return; // Do not proceed with saving if there are validation errors
    }
    // Save data first
    await handleSaveData(e, "next");
    if (id) {
      navigate(`/EditResourcesForm/${id}`);
    } else {
      // navigate to resource allocation
      navigate("/resourceallocation");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.clientName.name) {
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

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const p = { id: 0, name: inputValue, type: "employee" };
    setFormData((prevFormData) => ({
      ...prevFormData,
      projectManager: p,
    }));
    if (inputValue.length >= 3) {
      dispatch(getEmployeeSearchAction(inputValue));
    }
  };
  const handleInputChangeOne = (e) => {
    const inputValue = e.target.value;
    const pl = { id: 0, name: inputValue, type: "employee" };
    setFormData((prevFormData) => ({
      ...prevFormData,
      projectLead: pl,
    }));
    if (inputValue.length >= 3) {
      dispatch(getEmployeeSearchAction(inputValue));
    }
  };

  const handleInputChangeClientSearch = (e) => {
    const inputValue = e.target.value;
    const cs = { id: 0, name: inputValue, type: "client" };
    // If clientSearchData?.result is not available, set only the name
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientName: cs,
    }));

    if (inputValue.length >= 0) {
      dispatch(getClientNameAction(inputValue));
    }
  };

  // const selectedClientId = projectDetailsData?.client?.clientId;

  // // Find the corresponding client object based on clientID
  // const selectedClient = clientSearchData?.result?.find(
  //   (client) => client.id === selectedClientId
  // );

  // useEffect(() => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     clientName: selectedClient,
  //   }));
  // }, [selectedClient]);

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
            <Autocomplete
              options={clientSearchData?.result || []}
              sx={{
                borderRadius: "8px",
              }}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(event, data) => {
                handleChange(data, "clientName");
              }}
              isSearchable={true}
              getOptionValue={(option) => option.id}
              value={formData?.clientName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search by  Client Name"
                  onChange={handleInputChangeClientSearch}
                />
              )}
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
              clientDetailsData?.address?.addressLine2 ||
              formData?.clientAddress ||
              ""
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
            value={clientDetailsData?.phone || formData?.phone}
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
            value={
              DataValue[clientDetailsData?.address?.countryId] ||
              formData?.country ||
              ""
            }
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
            value={
              DataValue[clientDetailsData?.address?.stateId] ||
              formData?.state ||
              ""
            }
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
            value={
              DataValue[`${clientDetailsData?.address?.cityId}`] ||
              formData?.city ||
              ""
            }
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
            value={
              clientDetailsData?.address?.postalCode || formData?.zipCode || ""
            }
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
            value={formData?.projectName}
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
            value={formData?.description}
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
            value={formData?.projectCategory}
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
            value={
              masterdataProjectActivityList?.filter((s) =>
                formData?.applicableActivity?.includes(s.activityId)
              ) || []
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
            {isEdit ? (
              <>
                {" "}
                <Autocomplete
                  options={employeeSearchData?.result || []}
                  sx={{
                    borderRadius: "8px",
                  }}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(event, data) => {
                    handleChange(data, "projectManager");
                  }}
                  value={formData?.projectManager}
                  isSearchable={true}
                  getOptionValue={(option) => option.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Search by Manager"
                      onChange={handleInputChange}
                    />
                  )}
                />
              </>
            ) : (
              <>
                {" "}
                <Autocomplete
                  options={employeeSearchData?.result || []}
                  sx={{
                    borderRadius: "8px",
                  }}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(event, data) => {
                    handleChange(data, "projectManager");
                  }}
                  isSearchable={true}
                  value={formData?.projectManager}
                  getOptionValue={(option) => option.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Search by Manager"
                      onChange={handleInputChange}
                    />
                  )}
                />
              </>
            )}
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
            {isEdit ? (
              <Autocomplete
                options={employeeSearchData?.result || []}
                sx={{
                  borderRadius: "8px",
                }}
                value={formData?.projectLead}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                onChange={(event, data) => {
                  handleChange(data, "projectLead");
                }}
                isSearchable={true}
                getOptionValue={(option) => option.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Search by Project Lead"
                    onChange={handleInputChangeOne}
                  />
                )}
              />
            ) : (
              <>
                <Autocomplete
                  options={employeeSearchData?.result || []}
                  sx={{
                    borderRadius: "8px",
                  }}
                  value={formData?.projectLead}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(event, data) => {
                    handleChange(data, "projectLead");
                  }}
                  isSearchable={true}
                  getOptionValue={(option) => option.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Search by Project Lead"
                      onChange={handleInputChangeOne}
                    />
                  )}
                />
              </>
            )}
          </Box>
          {validationErrors.projectLead && (
            <Typography variant="caption" color="error">
              {validationErrors.projectLead}
            </Typography>
          )}
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Domain
          </Typography>
          <Dropdown
            value={formData?.domain}
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
            value={formData?.complexity}
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

export default CreateProjectFormDetails;
