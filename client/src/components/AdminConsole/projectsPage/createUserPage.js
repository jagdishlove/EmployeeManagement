import React, { useState } from "react";
import {
  IconButton,
  Button,
  Typography,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Dropdown from "../../forms/dropdown/dropdown";
import { useTheme } from "@mui/material/styles";
import { TimesheetStyle } from "../../../pages/timesheet/timesheetStyle";
import { useSelector } from "react-redux";

export default function CreateUser() {
  const theme = useTheme();
  const style = TimesheetStyle(theme);

  const masterdata = useSelector(
    (state) => state.persistData.masterData?.skill
  );
  const masterdata1 = useSelector(
    (state) => state.persistData.masterData?.gender
  );
  const masterdata2 = useSelector(
    (state) => state.persistData.masterData?.band
  );
  const masterdata3 = useSelector(
    (state) => state.persistData.masterData?.employmentType
  );
  const masterdata4 = useSelector(
    (state) => state.persistData.masterData?.manager
  );

  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    number: "",
    gender: "",
    lastName: "",
    DOB: "",
    DOJ: "",
    CTC: "",
    Status: "",
    employeeType: "",
    employeeID: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (selectedOption) => {
    setFormData({
      ...formData,
      skill: selectedOption.target.value,
    });
  };
  const handleGenderChange = (selectedOption) => {
    setFormData({ ...formData, gender: selectedOption.target.value });
  };

  const handleManagerChange = (selectedOption) => {
    setFormData({ ...formData, ManagerName: selectedOption.target.value });
  };

  const handleBandChange = (selectedOption) => {
    setFormData({ ...formData, band: selectedOption.target.value });
  };
  const handleEmptypeChange = (selectedOption) => {
    setFormData({
      ...formData,
      employeeType: selectedOption.target.value,
    });
  };

  const handleSave = () => {
    const {
      firstName,
      email,
      number,
      gender,
      lastName,
      DOB,
      DOJ,
      CTC,
      employeeID,
      employeeType,
      Status,
      band,
      Location,
      Role,
      Designation,
      skill,
      ManagerName,
    } = formData;
    let errors = {};

    if (!firstName?.trim()) {
      errors.firstName = "*First Name is required";
    } else if (!/^[a-zA-Z]{3,}$/.test(firstName)) {
      errors.firstName =
        "Please enter a valid First Name without special characters, at least 3 characters long";
    }

    if (!email?.trim()) {
      errors.email = "*Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!number?.trim()) {
      errors.number = "*Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(number)) {
      errors.number = "Please enter a valid Indian mobile number";
    }

    if (!gender?.trim()) {
      errors.gender = "*Gender is required";
    }
    if (!band?.trim()) {
      errors.band = "*Band is required";
    }
    if (!Location?.trim()) {
      errors.Location = "*Location is required";
    }
    if (!Role?.trim()) {
      errors.Role = "*Role is required";
    }
    if (!Designation?.trim()) {
      errors.Designation = "*Designation is required";
    }
    if (!skill?.trim()) {
      errors.Skill = "*Skills is required";
    }
    if (!DOB?.trim()) {
      errors.DOB = "*Date of Birth is required";
    }
    if (!DOJ?.trim()) {
      errors.DOJ = "*Date of joining is required";
    }
    if (!lastName?.trim()) {
      errors.lastName = "*Last Name is required";
    }
    if (!ManagerName?.trim()) {
      errors.ManagerName = "*Manager Name is required";
    }

    if (!CTC || !CTC?.trim()) {
      errors.CTC = "*Employee CTC is required";
    } else if (!/^\d+$/.test(CTC)) {
      errors.CTC = "Please enter a valid numeric value for Employee CTC";
    } else {
      const ctcNumber = parseFloat(CTC);
      if (isNaN(ctcNumber) || ctcNumber < 0) {
        errors.CTC =
          "Please enter a valid non-negative numeric value for Employee CTC";
      } else {
        const ctcString = CTC.toString();
        const decimalIndex = ctcString.indexOf(".");
        if (decimalIndex !== -1 && ctcString.length - decimalIndex > 3) {
          errors.CTC = "Employee CTC can have up to two decimal places";
        }
      }
    }
    if (!Status || !Status?.trim()) {
      errors.Status = "*Status is required";
    }

    if (!employeeType || !employeeType?.trim()) {
      errors.employeeType = "*Employee Type is required";
    }

    if (!employeeID || !employeeID?.trim()) {
      errors.employeeID = "*Employee ID is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(employeeID)) {
      errors.employeeID =
        "Please enter a valid Employee ID without special characters";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with saving data
    }
  };
  return (
    <div>
      {/* Heading */}
      <div
        className="Heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        <IconButton
          style={{ color: "silver" }}
          onClick={() => handleBackClick()}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">
          <b> Enter Users Details</b>
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />
      <div style={{ textAlign: "right" }}>
        <Button style={{ border: "1px solid #008080" }}>
          <BorderColorOutlinedIcon /> Edit
        </Button>
      </div>

      {/* User Details */}
      <div style={{ margin: "20px" }}>
        <Typography variant="h6">
          <b> Basics details</b>
        </Typography>
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "18px",
            border: "1px solid silver",
          }}
        />
        <div
          className="UserDetails"
          style={{ display: "flex", marginTop: "20px" }}
        >
          <Grid container spacing={2} style={{ margin: "" }}>
            {/* Left Side */}
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {validationErrors.firstName && (
                <Box>
                  <Typography color="error">
                    {validationErrors.firstName}
                  </Typography>
                </Box>
              )}
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {validationErrors.email && (
                <Box>
                  <Typography color="error">
                    {validationErrors.email}
                  </Typography>
                </Box>
              )}
              <TextField
                label="Mobile Number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {validationErrors.number && (
                <Box>
                  <Typography color="error">
                    {validationErrors.number}
                  </Typography>
                </Box>
              )}
              <Dropdown
                value={formData.handleGenderChange}
                onChange={handleGenderChange}
                title="gender"
                dropdownName="gender"
                options={masterdata1}
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid silver",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              />
              {validationErrors.gender && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {validationErrors.gender}
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* Right Side */}
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {validationErrors.lastName && (
                <Box>
                  <Typography color="error">
                    {validationErrors.lastName}
                  </Typography>
                </Box>
              )}
              <Grid>
                <TextField
                  label="DOB(DD/MM/YYYY)"
                  type="date"
                  id="DOB"
                  name="DOB"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                  style={{
                    ...style.TimesheetTextField,

                    borderRadius: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ classes: { focused: "green-border" } }}
                />
                {validationErrors.DOB && (
                  <Box>
                    <Typography color="error">
                      {validationErrors.DOB}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid>
                <TextField
                  label="Date of Joining"
                  type="date"
                  id="DOJ"
                  name="DOJ"
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                  style={{
                    ...style.TimesheetTextField,

                    borderRadius: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ classes: { focused: "green-border" } }}
                />
                {validationErrors.DOJ && (
                  <Box>
                    <Typography color="error">
                      {validationErrors.DOJ}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Typography variant="h6" onClick={() => handleBackClick()}>
          <b> Pay Roll</b>
        </Typography>
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "18px",
            border: "1px solid silver",
          }}
        />
        <Grid item xs={6}>
          <Grid style={{ marginTop: "20px", marginBottom: "20px" }}>
            <TextField
              label="Employee CTC"
              placeholder="Employee CTC"
              id="CTC"
              name="CTC"
              onChange={handleInputChange}
              style={{
                ...style.TimesheetTextField,

                borderRadius: "10px",
                width: "50%",
              }}
              fullWidth
              margin="normal"
              InputProps={{
                classes: { focused: "green-border" },
              }}
            />
            {validationErrors.CTC && (
              <Box>
                <Typography color="error">{validationErrors.CTC}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* <div style={{margin:'20px'}}> */}
        <Typography variant="h6" onClick={() => handleBackClick()}>
          <b> Master Data </b>
        </Typography>
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "18px",
            border: "1px solid silver",
          }}
        />
        <div
          className="UserDetails"
          style={{ display: "flex", marginTop: "20px" }}
        >
          <Grid container spacing={2}>
            {/* Left Side */}
            <Grid item xs={12} lg={6} md={2}>
              <Grid
                style={{ marginTop: "8px", marginBottom: "20px" }}
                sx={{ width: 300 }}
              >
                <Autocomplete
                  freeSolo
                  label="Manager Name"
                  name="Manager Name"
                  value={formData.ManagerName}
                  onChange={handleManagerChange}
                  options={masterdata4}
                  style={{
                    ...style.TimesheetTextField,
                    borderRadius: "10px",
                  }}
                  fullWidth
                  margin="normal"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Manager Name"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
                {/* <Autocomplete
                                    freeSolo
                                    id="Manager Name"
                                    disableClearable
                                    options={masterdata4}
                                    value={formData.ManagerName}
                                    onChange={handleManagerChange}
                                    style={{
                                        ...style.TimesheetTextField,
                                        borderRadius: "10px",
                                        width:"568",
                                        height:"39"
                                    }}
                                    renderInput={(params) => 
                                    <TextField
                                    {...params}
                                     label="Manager Name"
                                     InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                      }} />}
                                /> */}
                {validationErrors.ManagerName && (
                  <Box>
                    <Typography color="error" style={{}}>
                      {" "}
                      {validationErrors.ManagerName}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Dropdown
                  value=""
                  onChange=""
                  title="Role"
                  dropdownName="Role"
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid silver",
                    borderRadius: "5px",
                  }}
                  options={[{ value: "", label: "" }]}
                />
                {validationErrors.Role && (
                  <Box>
                    <Typography color="error" style={{}}>
                      {" "}
                      {validationErrors.Role}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Dropdown
                  value={formData.employeeType}
                  onChange={handleEmptypeChange}
                  title="Employee Type"
                  dropdownName="Employee Type"
                  options={masterdata3 || []}
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid silver",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                {validationErrors.employeeType && (
                  <Box>
                    <Typography color="error" style={{}}>
                      {" "}
                      {validationErrors.employeeType}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Dropdown
                  value={formData.band}
                  onChange={handleBandChange}
                  title="Band"
                  dropdownName="Band"
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid silver",
                    borderRadius: "5px",
                  }}
                  options={masterdata2}
                />
                {validationErrors.band && (
                  <Box>
                    <Typography color="error" style={{}}>
                      {" "}
                      {validationErrors.band}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Dropdown
                  value={formData.Status}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, Status: selectedOption.value })
                  }
                  title="Status"
                  dropdownName="Status"
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid silver",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                {validationErrors.Status && (
                  <Box>
                    <Typography color="error" style={{}}>
                      {" "}
                      {validationErrors.Status}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            {/* Right Side */}
            <Grid item xs={6}>
              <Grid style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Dropdown
                  value=""
                  onChange=""
                  title="Designation"
                  dropdownName="Designation"
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid silver",
                    borderRadius: "5px",
                  }}
                  options={[{ value: "", label: "" }]}
                />
                {validationErrors.Designation && (
                  <Box>
                    <Typography color="error" style={{}}>
                      {" "}
                      {validationErrors.Designation}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Dropdown
                  value={formData.handleSkillChange}
                  onChange={handleSkillChange}
                  title="Skill"
                  dropdownName="Skill"
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid silver",
                    borderRadius: "5px",
                  }}
                  options={masterdata}
                />
                {validationErrors.skill && (
                  <Box>
                    <Typography color="error" style={{}}>
                      {" "}
                      {validationErrors.skill}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Dropdown
                  value=""
                  onChange=""
                  title="Locaton"
                  dropdownName="Location"
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid silver",
                    borderRadius: "5px",
                  }}
                  options={[{ value: "", label: "" }]}
                />
                {validationErrors.Location && (
                  <Box>
                    <Typography color="error" style={{}}>
                      {" "}
                      {validationErrors.Location}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid style={{ marginTop: "18px", marginBottom: "20px" }}>
                <TextField
                  label="Employe ID"
                  placeholder="Employe ID"
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  style={{
                    borderRadius: "5px",
                  }}
                />
                {validationErrors.employeeID && (
                  <Box>
                    <Typography color="error">
                      {validationErrors.employeeID}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px", width: "200px" }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "200px" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
