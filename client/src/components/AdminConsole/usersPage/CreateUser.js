import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { masterDataAction } from "../../../redux/actions/masterData/masterDataAction";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Dropdown from "../../forms/dropdown/dropdown";
import { useTheme } from "@mui/material/styles";
import { TimesheetStyle } from "../../../pages/timesheet/timesheetStyle";
import { postcodeValidator } from "postcode-validator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateUserForm,
  SearchEmployeeAction,
  fetchCountriesAction,
  fetchStatesAction,
  fetchCitiesAction,
  fetchLocationData,
  getUserById,
} from "../../../redux/actions/AdminConsoleAction/users/usersAction";

export default function CreateUser() {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

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
    skill: "",
    UANNo: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    Zip: "",
    currentAddress1: "",
    currentAddress2: "",
    currentcountry: "",
    currentcity: "",
    currentstate: "",
    currentZIP: "",
    AadhaarNo: "",
    workMode: "",
    ManagerName: { id: 0, name: "", type: "employee" },
    designation: "",
    ACNo: "",
    Bank: "",
    IFSCCode: "",
    employeeType: "",
    employeeID: "",
    file: "",
    employeeCoordinates: "",
    employedBy: "",
    Client_loc: "",
    productType: "",
    Bank_Name: "",
  });

  const handleClearAll = () => {
    setFormData({
      firstName: "",
      email: "",
      number: "",
      gender: "",
      lastName: "",
      DOB: "",
      DOJ: "",
      CTC: "",
      Status: "",
      skill: "",
      UANNo: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      Zip: "",
      currentAddress1: "",
      currentAddress2: "",
      currentcountry: "",
      currentcity: "",
      currentstate: "",
      currentZIP: "",
      AadhaarNo: "",
      workMode: "",
      ManagerName: "",
      designation: "",
      ACNo: "",
      Bank: "",
      IFSCCode: "",
      employeeType: "",
      employeeID: "",
      file: "",
      employeeCoordinates: "",
      employedBy: "",
      Client_loc: "",
      productType: "",
      Bank_Name: "",
    });

    setValidationErrors({});
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = async () => {
    // Toggle the checkbox state
    const newIsChecked = !isChecked;

    // Copy data from Permanent Address to Current Address if checkbox is checked
    const updatedFormData = newIsChecked
      ? {
          ...formData,
          currentAddress1: formData.address1,
          currentAddress2: formData.address2,
          currentZIP: formData.Zip,
          currentcountry: formData.country,
          currentstate: formData.state,
          currentcity: formData.city,
        }
      : {
          ...formData,
          currentAddress1: "",
          currentAddress2: "",
          currentZIP: "",
          currentcountry: "",
          currentstate: "",
          currentcity: "",
        };

    // Update the form data
    setFormData(updatedFormData);

    // Update the checkbox state
    setIsChecked(newIsChecked);

    // Fetch states and cities based on permanent address if country and state are selected
    if (newIsChecked && formData.country) {
      await fetchStatesAction(formData?.country, setStates);
    }

    if (newIsChecked && formData.state) {
      await fetchCitiesAction(formData.state, setCities);
    }
  };

  useEffect(() => {
    dispatch(fetchLocationData());
  }, [dispatch]);

  const LocationData = useSelector(
    (state) => state?.nonPersist?.userDetails?.locationData
  );

  const countryCode = {};

  if (LocationData && Array.isArray(LocationData)) {
    LocationData.forEach((location) => {
      countryCode[location.id] = location.code;
    });
  } else {
    console.error("LocationData is undefined or not an array");
  }

  const handlezipChange = (event) => {
    const { name, value } = event.target;

    // Check if the checkbox is checked
    if (isChecked) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        country: name === "country" ? value : prevData.country,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  useEffect(() => {
    dispatch(masterDataAction());
  }, [dispatch]);

  const masterdata1 = useSelector(
    (state) => state.persistData.masterData?.gender
  );

  const employeeStatus = useSelector(
    (state) => state.persistData.masterData?.employeeStatus
  );

  const masterdata3 = useSelector(
    (state) => state.persistData.masterData?.employmentType
  );
  const masterdata4 = useSelector(
    (state) => state.persistData.masterData?.designation
  );

  const employeeBy = useSelector(
    (state) => state.persistData.masterData?.employedBy
  );
  const Client_location = useSelector(
    (state) => state.persistData.masterData?.clientLocation
  );

  const work_mode = useSelector(
    (state) => state.persistData.masterData?.workMode
  );

  const managerName = useSelector(
    (state) => state?.nonPersist?.userDetails?.employees.result
  );

  const employeeDetails = useSelector(
    (state) => state?.nonPersist?.userDetails?.userByIdData
  );

  useEffect(() => {
    if (employeeDetails) {
      setFormData((prevData) => ({
        ...prevData,
        file: employeeDetails?.file || "",
        firstName: employeeDetails.firstName || "",
        email: employeeDetails.email || "",
        number: employeeDetails.phoneNumber || "",
        gender: employeeDetails?.genderId || "",
        lastName: employeeDetails.lastName || "",
        DOB: employeeDetails?.dob || "",
        DOJ: employeeDetails?.joiningDate || "",
        CTC: employeeDetails.ctc || "",
        Status: employeeDetails.status || "",
        skill: employeeDetails?.employeeSkill?.map((s) => s.skillId) || [],
        UANNo: employeeDetails?.uanNo || "",
        address1: employeeDetails.permanentAddress?.addressLine1 || "",
        address2: employeeDetails.permanentAddress?.addressLine2 || "",
        country: employeeDetails.permanentAddress?.countryId || "",
        state: employeeDetails.permanentAddress?.stateId || "",
        city: employeeDetails.permanentAddress?.cityId || "",
        Zip: employeeDetails.permanentAddress?.postalCode || "",
        currentAddress1: employeeDetails.presentAddress?.addressLine1 || "",
        currentAddress2: employeeDetails.presentAddress?.addressLine2 || "",
        currentcountry: employeeDetails.presentAddress?.countryId || "",
        currentcity: employeeDetails.presentAddress?.cityId || "",
        currentstate: employeeDetails.presentAddress?.stateId || "",
        currentZIP: employeeDetails.presentAddress?.postalCode || "",
        AadhaarNo: employeeDetails.aadhaarNo || "",
        workMode: employeeDetails.workMode || "",
        ManagerName: employeeDetails?.manager || "",
        designation: employeeDetails?.designationId || "",
        ACNo: employeeDetails.acNo || "",
        Bank: employeeDetails.nameAsOnBank || "",
        IFSCCode: employeeDetails.ifscCode || "",
        employeeType: employeeDetails?.empTypeId || "",
        employeeID: employeeDetails?.empId || "",
        employedBy: employeeDetails?.officeLocationId || "",
        Client_loc: employeeDetails?.clientLocationId || "",
        productType: employeeDetails.employeeCoordinates || "",
        Bank_Name: employeeDetails.bankName || "",
      }));
      setSelectedImage(
        `data:image/png;base64,${employeeDetails?.fileStorage?.data}`
      );
      if (
        (employeeDetails.permanentAddress?.addressLine1 || "",
        employeeDetails.permanentAddress?.addressLine2 || "",
        employeeDetails.permanentAddress?.postalCode || "",
        employeeDetails.permanentAddress?.countryId || "",
        employeeDetails.permanentAddress?.stateId || "",
        employeeDetails.permanentAddress?.cityId || "")
      ) {
        setIsChecked(true);
      }
    }
  }, [employeeDetails]);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }

    setFormData((state) => ({
      ...state,
      file: file,
    }));
  };
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const inputElement = document.getElementById("uploadInput");
    inputElement.value = "";
    inputElement.type = "text";
    inputElement.type = "file";

    setSelectedImage(null);
  };

  const handleButtonClick = () => {
    // Trigger click on the hidden input element
    document.getElementById("uploadInput").click();
  };

  const handleProductTypeChange = (event, type) => {
    let updatedFormData = {
      ...formData,
      productType: event.target.value,
    };
    if (type === "CLIENT_LOCATION") {
      updatedFormData = {
        ...updatedFormData,
      };
    }
    if (type === "PRAKAT_LOCATION") {
      updatedFormData = {
        ...updatedFormData,
      };
    }
    // setProductType(event.target.value);
    setFormData(updatedFormData);
    // setWorkMode("");
  };
  const handleWorkModeChange = (event) => {
    const newWorkMode = event.target.value;
    // setWorkMode(newWorkMode);
    setFormData((prevFormData) => ({
      ...prevFormData,
      workMode: newWorkMode,
    }));
  };

  const handleGenderChange = (selectedOption) => {
    setFormData({ ...formData, gender: selectedOption.target.value });
  };
  const handleClientLocationChange = (selectedOption) => {
    setFormData({ ...formData, Client_loc: selectedOption.target.value });
  };
  const handleDesignationChange = (selectedOption) => {
    setFormData({ ...formData, designation: selectedOption.target.value });
  };
  const handleStatusChange = (selectedOption) => {
    setFormData({ ...formData, Status: selectedOption.target.value });
  };
  const handleEmpByChange = (selectedOption) => {
    setFormData({ ...formData, employedBy: selectedOption.target.value });
  };
  const handleEmptypeChange = (selectedOption) => {
    setFormData({
      ...formData,
      employeeType: selectedOption.target.value,
    });
  };

  const skill = useSelector((state) => state.persistData.masterData?.skill);

  const handleChange = (selectedOptions) => {
    setFormData({
      ...formData,
      skill: selectedOptions.target.value,
    });
  };

  const handleChange2 = (value) => {
    const skillIds = value.map((skillObj) => skillObj.skillId);
    setFormData({ ...formData, skill: skillIds });
  };

  useEffect(() => {
    dispatch(SearchEmployeeAction(formData.ManagerName));
  }, [dispatch]);

  const handleManagerNameChange = (value) => {
    setFormData({ ...formData, ManagerName: value });
  };
  const handleManagerNameChange2 = (event) => {
    dispatch(SearchEmployeeAction(event.target.value));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Check if the checkbox is checked
    if (isChecked) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        currentAddress1: prevData.address1,
        currentAddress2: prevData.address2,
        currentZIP: prevData.permanentZip,
        currentcountry: name === "country" ? value : prevData.currentcountry,
        currentstate: name === "state" ? value : prevData.currentstate,
        currentcity: name === "city" ? value : prevData.currentcity,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  //country state city
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCountriesAction(setCountries);
  }, []);

  useEffect(() => {
    // Fetch states based on country ID
    if (formData.country) {
      fetchStatesAction(formData.country, setStates);
    }
  }, [formData.country]);

  useEffect(() => {
    // Fetch cities based on state ID
    if (formData.state) {
      fetchCitiesAction(formData.state, setCities);
    }
  }, [formData.state]);

  const handleCountryChange = (type, event, value) => {
    if (type === "country") {
      setFormData((prevData) => ({
        ...prevData,
        country: value?.id || "",
      }));
    }
    if (type === "currentcountry") {
      setFormData((prevData) => ({
        ...prevData,
        currentcountry: value?.id || "",
      }));
    }

    fetchStatesAction(value?.id, setStates);
  };

  const handleStateChange = (type, event, value) => {
    if (type === "state") {
      setFormData((prevData) => ({
        ...prevData,
        state: value?.id || "",
      }));
    }
    if (type === "currentstate") {
      setFormData((prevData) => ({
        ...prevData,
        currentstate: value?.id || "",
      }));
    }
    if (type === "city") {
      setFormData((prevData) => ({
        ...prevData,
        city: value?.id || "",
      }));
    }
    if (type === "currentcity") {
      setFormData((prevData) => ({
        ...prevData,
        currentcity: value?.id || "",
      }));
    }
    fetchCitiesAction(value?.id, setCities);
  };

  const handleSave = async () => {
    const {
      firstName,
      email,
      number,
      gender,
      lastName,
      DOB,
      DOJ,
      CTC,
      Status,
      skill,
      address1,
      country,
      state,
      city,
      Zip,
      currentAddress1,
      currentcountry,
      currentcity,
      currentstate,
      AadhaarNo,
      workMode,
      ManagerName,
      Client_loc,
      designation,
      ACNo,
      Bank,
      IFSCCode,
      employeeType,
      employeeID,
    } = formData;
    let errors = {};

    if (!firstName?.trim()) {
      errors.firstName = "*First Name is required";
    } else if (!/^[a-zA-Z]{3,}$/.test(firstName)) {
      errors.firstName =
        "Please enter a valid First Name without special characters, at least 3 characters long";
    }

    if (!address1?.trim()) {
      errors.address1 = "*address is required";
    }
    if (!country) {
      errors.Country = "*Country is required";
    }
    if (!state) {
      errors.State = "*State is required";
    }
    if (!city) {
      errors.City = "*City is required";
    }
    if (!Zip?.trim()) {
      errors.Zip = "*zip is required";
    }
    if (!currentAddress1) {
      errors.currentAddress = "*Current Address is required";
    }
    if (!currentcountry) {
      errors.currentcountry = "*Country is required";
    }
    if (!currentstate) {
      errors.currentstate = "*Current State is required";
    }
    if (!currentcity) {
      errors.currentcity = "*Current city is required";
    }

    if (!formData.currentZIP) {
      errors.postalCode1 = "Postal code is required";
    } else {
      try {
        const isValid = postcodeValidator(
          formData.currentZIP,
          "" || countryCode[formData.currentcountry]
        );
        if (!isValid) {
          errors.postalCode1 = "Invalid postal code";
        }
      } catch {
        errors.postalCode1 = "Error validating postal code";
      }
    }

    if (!formData.Zip) {
      errors.postalCode = "Postal code is required";
    } else {
      try {
        const isValid = postcodeValidator(
          formData.Zip,
          "" || countryCode[formData.currentcountry]
        );
        if (!isValid) {
          errors.postalCode = "Invalid postal code";
        }
      } catch {
        errors.postalCode = "Error validating postal code";
      }
    }

    if (!gender) {
      errors.gender = "*Gender is required";
    }
    if (!Client_loc) {
      errors.Client_loc = "*Office Location is required";
    }
    if (!designation) {
      errors.designation = "*Designation is required";
    }
    if (!skill) {
      errors.skill = "*Skills is required";
    }
    if (!employeeID || !/^\d+$/.test(employeeID)) {
      errors.employeeID =
        "*Employee ID is required and should only contain numbers";
    }

    if (!ManagerName) {
      errors.ManagerName = "*Manager Name is required";
    }
    if (!Status || !Status.trim()) {
      errors.Status = "*Status is required";
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
    if (!DOB?.trim()) {
      errors.DOB = "*Date of Birth is required";
    }
    if (!DOJ?.trim()) {
      errors.DOJ = "*Date of joining is required";
    }
    if (!lastName?.trim()) {
      errors.lastName = "*Last Name is required";
    }

    if (!AadhaarNo?.trim()) {
      errors.AadhaarNo = "*Aadhaar Number is required";
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
    if (!ACNo?.trim()) {
      errors.ACNo = "*Your A/C number is required";
    }
    if (!Bank?.trim()) {
      errors.Bank = "*Your Name as Per Bank is required";
    }
    if (!IFSCCode?.trim()) {
      errors.IFSCCode = "*Your Bank IFSC COde is required";
    }

    if (!workMode?.trim()) {
      errors.workMode = "*Select your Work Mode..it is required";
    }
    if (!employeeType) {
      errors.employeeType = "*Employee Type is required";
    } else {
      const payload = {
        id: id ? id : "",
        file: formData.file,
        firstName: formData.firstName,
        lastName: formData.lastName,
        genderId: formData.gender,
        dob: formData.DOB,
        phoneNumber: formData.number,
        email: formData.email,
        employeeSkills: formData.skill,
        empTypeId: formData.employeeType,
        managerId: formData.ManagerName.id,
        ctc: formData.CTC,
        joiningDate: formData.DOJ,
        acNo: formData.ACNo,
        bankName: formData.Bank_Name,
        nameAsOnBank: formData.Bank,
        ifscCode: formData.IFSCCode,
        aadhaarNo: formData.AadhaarNo,
        uanNo: formData.UANNo,
        workMode: formData.workMode,
        employeeCoordinates: formData.productType,
        empId: formData.employeeID,
        clientLocationId: formData.Client_loc,
        officeLocationId: formData.employedBy,
        designationId: formData.designation,
        status: formData.Status,
        "presentAddress.addressLine1": formData.currentAddress1,
        " presentAddress.addressLine2": formData.currentAddress2,
        "presentAddress.countryId": formData.currentcountry,
        "presentAddress.stateId": formData.currentstate,
        "presentAddress.cityId": formData.currentcity,
        "presentAddress.postalCode": formData.currentZIP,
        "permanentAddress.addressLine1": formData.address1,
        "permanentAddress.addressLine2": formData.address2,
        "permanentAddress.countryId": formData.country,
        "permanentAddress.stateId": formData.state,
        "permanentAddress.cityId": formData.city,
        "permanentAddress.postalCode": formData.Zip,
      };

      await dispatch(CreateUserForm(payload));
    }
    setValidationErrors(errors);
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
      <div style={{ textAlign: "left", marginLeft: "8px" }}>
        <Button
          style={{
            width: "100px",
            height: "99px",
            border: "1px solid white",
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={handleButtonClick}
        >
          {selectedImage ? (
            <>
              <Avatar
                src={selectedImage}
                alt="Selected"
                style={{ border: "4px solid white" }}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  left: 64,
                  top: 49,
                  color: "#545454",
                  backgroundColor: "white",
                  background: "rgba(0, 0, 0, 0)",
                }}
                onClick={handleDeleteClick}
              >
                <HighlightOffIcon style={{ width: "20px", height: "20px" }} />
              </IconButton>
            </>
          ) : (
            <AccountCircleTwoToneIcon
              style={{ width: "70px", height: "70px", color: "#545454" }}
            />
          )}
        </Button>
        <input
          type="file"
          id="uploadInput"
          name="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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
          style={{ display: "flex", marginTop: "20px", marginLeft: "12px" }}
        >
          <Grid container spacing={2} style={{ margin: "" }}>
            {/* Left Side */}
            <Grid item xs={6}>
              <TextField
                label={
                  <Typography>
                    <span style={{ color: "red" }}>*</span>
                    Enter User First Name
                  </Typography>
                }
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
                label={
                  <Typography>
                    <span style={{ color: "red" }}>*</span>
                    Enter Email Address
                  </Typography>
                }
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
                label={
                  <Typography>
                    <span style={{ color: "red" }}>*</span>
                    Enter Mobile Number
                  </Typography>
                }
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
                value={formData.gender}
                onChange={handleGenderChange}
                title={
                  <Typography>
                    <span style={{ color: "red", width: "100%" }}>*</span>
                    Gender
                  </Typography>
                }
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

              <TextField
                label="Enter UAN No."
                name="UANNo"
                value={formData.UANNo}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
            </Grid>
            {/* Right Side */}
            <Grid item xs={6}>
              <TextField
                label={
                  <Typography>
                    <span style={{ color: "red" }}>*</span>
                    Enter User Last Name
                  </Typography>
                }
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
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>
                      DOB(DD/MM/YYYY)
                    </Typography>
                  }
                  type="date"
                  id="DOB"
                  value={formData.DOB}
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
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>
                      Date Of Joining
                    </Typography>
                  }
                  type="date"
                  id="DOJ"
                  name="DOJ"
                  fullWidth
                  margin="normal"
                  value={formData.DOJ}
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
              <Grid style={{ marginTop: "-6px" }}>
                <TextField
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>
                      Enter Aadhaar Number
                    </Typography>
                  }
                  name="AadhaarNo"
                  value={formData.AadhaarNo}
                  onChange={handleInputChange}
                  style={{
                    ...style.TimesheetTextField,
                    borderRadius: "10px",
                  }}
                  fullWidth
                  margin="normal"
                  InputProps={{ classes: { focused: "green-border" } }}
                />
                {validationErrors.AadhaarNo && (
                  <Box>
                    <Typography color="error">
                      {validationErrors.AadhaarNo}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>{" "}
      {/* <div> */}
      <br />
      <div className="permanent_Address">
        <Typography
          variant="h6"
          onClick={() => handleBackClick()}
          style={{ fontSize: "16px" }}
        >
          <b>Permanent Address</b>
        </Typography>
        <div
          style={{
            width: "100%",
            margin: "auto",
            border: "1px solid silver",
          }}
        />
        <Grid
          container
          spacing={2}
          style={{
            marginLeft: "12px",
            display: "flex",
            flexWrap: "wrap",
            marginTop: "3%",
          }}
        >
          <div style={{ width: "48%", marginRight: "1%" }}>
            <TextField
              label={
                <Typography>
                  <span style={{ color: "red" }}>*</span>
                  Address Line 1
                </Typography>
              }
              name="address1"
              value={formData.address1}
              style={{
                fontSize: "16px",
                marginBottom: "20px",
                width: "100%",
              }}
              onChange={(e) => handleInputChange(e)}
            />
            {validationErrors.address && (
              <Box>
                <Typography color="error">
                  {validationErrors.address}
                </Typography>
              </Box>
            )}
          </div>

          <div style={{ width: "48%", marginRight: "1%" }}>
            <TextField
              label={
                <Typography>
                  <span style={{ color: "red" }}>*</span>
                  Address Line 2
                </Typography>
              }
              name="address2"
              value={formData.address2}
              style={{
                fontSize: "16px",
                marginBottom: "20px",
                width: "100%",
              }}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div style={{ width: "48%", marginRight: "1%" }}>
            <Autocomplete
              freeSolo
              id="country"
              value={
                countries.find((country) => country.id === formData.country) ||
                null
              }
              options={countries || []}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              style={{ fontSize: "16px", borderRadius: "10px" }}
              onChange={(e, value) => handleCountryChange("country", e, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>Country
                    </Typography>
                  }
                />
              )}
            />
            {validationErrors.country && (
              <Box>
                <Typography color="error">
                  {validationErrors.country}
                </Typography>
              </Box>
            )}
          </div>
          <div style={{ width: "48%", marginRight: "1%" }}>
            <Autocomplete
              freeSolo
              id="state"
              options={states || []}
              value={
                states.find((state) => state.id === formData.state) || null
              }
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              style={{ fontSize: "16px", borderRadius: "10px" }}
              onChange={(e, value) => handleStateChange("state", e, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>State
                    </Typography>
                  }
                />
              )}
            />
            {validationErrors.state && (
              <Box>
                <Typography color="error">{validationErrors.state}</Typography>
              </Box>
            )}
          </div>
          <div style={{ width: "48%", marginTop: "20px", marginRight: "1%" }}>
            <Autocomplete
              freeSolo
              id="city"
              value={cities.find((city) => city.id === formData.city) || null}
              options={cities || []}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              style={{ fontSize: "16px", borderRadius: "10px" }}
              onChange={(e, value) => handleStateChange("city", e, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>City
                    </Typography>
                  }
                />
              )}
            />
            {validationErrors.city && (
              <Box>
                <Typography color="error">{validationErrors.city}</Typography>
              </Box>
            )}
          </div>
          <div style={{ width: "48%", marginRight: "1%" }}>
            <TextField
              id="Zip"
              name="Zip"
              label={
                <Typography>
                  <span style={{ color: "red" }}>*</span>
                  ZIP/Pincode
                </Typography>
              }
              value={formData.Zip}
              style={{
                fontSize: "16px",
                borderRadius: "10px",
                marginTop: "20px",
                width: "100%",
              }}
              onChange={handlezipChange}
            />
            {validationErrors.postalCode && (
              <Box>
                <Typography color="error">
                  {validationErrors.postalCode}
                </Typography>
              </Box>
            )}
          </div>
        </Grid>
      </div>
      <div style={{ display: "flex", marginLeft: "80%", marginBottom: "-3px" }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Typography variant="body2" style={{ marginLeft: "2%" }}>
          <b>Same as Permanent Address</b>
        </Typography>
      </div>
      <div className="Current_Address">
        <Typography
          variant="h6"
          onClick={() => handleBackClick()}
          style={{ fontSize: "16px" }}
        >
          <b>Current Address</b>
        </Typography>
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "18px",
            border: "1px solid silver",
          }}
        />
        <Grid
          container
          spacing={2}
          style={{
            marginLeft: "12px",
            display: "flex",
            flexWrap: "wrap",
            marginTop: "3%",
          }}
        >
          <div style={{ width: "48%", marginRight: "1%" }}>
            <TextField
              label={
                <Typography>
                  <span style={{ color: "red" }}>*</span>
                  Address Line 1
                </Typography>
              }
              name="currentAddress1"
              value={formData.currentAddress1}
              style={{
                fontSize: "16px",
                marginBottom: "20px",
                width: "100%",
              }}
              onChange={(e) => handleInputChange(e, "currentAddress1")}
            />
            {validationErrors.address && (
              <Box>
                <Typography color="error">
                  {validationErrors.address}
                </Typography>
              </Box>
            )}
          </div>
          <div style={{ width: "48%", marginRight: "1%" }}>
            <TextField
              label={
                <Typography>
                  <span style={{ color: "red" }}>*</span>
                  Address line 2
                </Typography>
              }
              name="currentAddress2"
              value={formData.currentAddress2}
              style={{
                fontSize: "16px",
                borderRadius: "10px",
                width: "100%",
                marginBottom: "20px",
              }}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div style={{ width: "48%", marginRight: "1%" }}>
            <Autocomplete
              freeSolo
              id="currentcountry"
              options={countries || []}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              style={{
                fontSize: "16px",
                borderRadius: "10px",
                width: "100%",
              }}
              value={
                countries.find(
                  (country) => country.id === formData.currentcountry
                ) || null
              }
              onChange={(e, value) =>
                handleCountryChange("currentcountry", e, value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>Country
                    </Typography>
                  }
                />
              )}
            />

            {validationErrors.currentcountry && (
              <Box>
                <Typography color="error">
                  {validationErrors.currentcountry}
                </Typography>
              </Box>
            )}
          </div>
          <div style={{ width: "48%", marginRight: "1%" }}>
            <Autocomplete
              freeSolo
              id="currentstate"
              options={states || []}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              style={{
                fontSize: "16px",
                borderRadius: "10px",
                width: "100%",
              }}
              value={
                states.find((state) => state.id === formData.currentstate) ||
                null
              }
              onChange={(e, value) =>
                handleStateChange("currentstate", e, value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>State
                    </Typography>
                  }
                />
              )}
            />
            {validationErrors.currentstate && (
              <Box>
                <Typography color="error">
                  {validationErrors.currentstate}
                </Typography>
              </Box>
            )}
          </div>
          <div style={{ width: "48%", marginRight: "1%", marginTop: "20px" }}>
            <Autocomplete
              freeSolo
              id="currentcity"
              options={cities || []}
              style={{
                fontSize: "16px",
                borderRadius: "10px",
                width: "100%",
              }}
              getOptionLabel={(option) => option.label}
              onChange={(e, value) =>
                handleStateChange("currentcity", e, value)
              }
              value={
                cities.find((city) => city.id === formData.currentcity) || null
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Typography>
                      <span style={{ color: "red" }}>*</span>City
                    </Typography>
                  }
                />
              )}
            />
            {validationErrors.currentcity && (
              <Box>
                <Typography color="error">
                  {validationErrors.currentcity}
                </Typography>
              </Box>
            )}
          </div>
          <div style={{ width: "48%", marginRight: "1%" }}>
            <TextField
              id="currentZip"
              name="currentZIP"
              label={
                <Typography>
                  <span style={{ color: "red" }}>*</span>
                  ZIP/Pincode
                </Typography>
              }
              value={formData.currentZIP}
              style={{
                fontSize: "16px",
                borderRadius: "10px",
                marginTop: "20px",
                width: "100%",
              }}
              onChange={handlezipChange}
            />
            {validationErrors.postalCode1 && (
              <Box>
                <Typography color="error">
                  {validationErrors.postalCode1}
                </Typography>
              </Box>
            )}
          </div>
        </Grid>
      </div>
      <div style={{ width: "100%" }}>
        <Typography variant="h6">
          <b>Employee Coordinates</b>
        </Typography>
        <div
          style={{
            width: "100%",
            marginBottom: "8px",
            border: "1px solid silver",
          }}
        />
        <Grid container spacing={2} style={{ marginLeft: "5px" }}>
          <Grid item xs={12} md={6}>
            <FormControl>
              <RadioGroup
                name="productType"
                value={formData.productType}
                onChange={(e) => handleProductTypeChange(e, "PRAKAT_LOCATION")}
              >
                <FormControlLabel
                  value="PRAKAT_LOCATION"
                  control={<Radio />}
                  label="Prakat Location"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl style={{ textAlign: "right", marginLeft: "25px" }}>
              <RadioGroup
                name="productType"
                value={formData.productType}
                onChange={(e) => handleProductTypeChange(e, "CLIENT_LOCATION")}
              >
                <FormControlLabel
                  value="CLIENT_LOCATION"
                  control={<Radio />}
                  label="Client Location"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Dropdown
              value={formData.workMode}
              options={work_mode}
              onChange={handleWorkModeChange}
              title={
                <Typography>
                  <span style={{ color: "red" }}>*</span>Work Mode
                </Typography>
              }
              dropdownName="WorkMode"
              name="workMode"
              style={{
                ...style.TimesheetTextField,
                border: "1px solid #008080",
                borderRadius: "5px",
                width: "600px",
                marginBottom: "2px",
                marginTop: "3px",
              }}
            />
            {validationErrors.WorkMode && (
              <Box>
                <Typography color="error">
                  {validationErrors.WorkMode}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </div>
      <div style={{ width: "100%", margin: "20px" }}>
        <Typography variant="h6">
          <b>
            Professional Data<span style={{ color: "red" }}>*</span>
          </b>
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
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            {/* Left Side */}
            <Grid
              item
              xs={12}
              lg={6}
              md={6}
              sm={12}
              sx={{
                marginTop: "8px",
                marginBottom: "20px",
                width: { xs: "100%", lg: "50%" },
              }}
            >
              <Grid
                style={{ marginTop: "8px", marginBottom: "20px" }}
                sx={{ width: "100%" }}
              >
                <Autocomplete
                  freeSolo
                  id="Manager_Name"
                  options={managerName || []}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={(event, value) => handleManagerNameChange(value)}
                  value={formData.ManagerName}
                  style={{
                    ...style.TimesheetTextField,
                    borderRadius: "10px",
                    width: "100%",
                  }}
                  // onKeyDown={handleEnterKey}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <Typography>
                          <span style={{ color: "red" }}>*</span>Manager Name
                        </Typography>
                      }
                      onChange={handleManagerNameChange2}
                    />
                  )}
                />
                {validationErrors.ManagerName && (
                  <Box>
                    <Typography color="error">
                      {validationErrors.ManagerName}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Dropdown
                value={formData.employeeType}
                onChange={handleEmptypeChange}
                title={
                  <Typography>
                    <span style={{ color: "red", width: "100%" }}>*</span>
                    employee Type
                  </Typography>
                }
                dropdownName="Employee Type"
                name="EMPType"
                options={masterdata3 || []}
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid silver",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  marginTop: "7px",
                  width: "100%",
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

              <Dropdown
                value={formData.employedBy}
                onChange={handleEmpByChange}
                title={
                  <Typography>
                    <span style={{ color: "red", width: "100%" }}>*</span>
                    Employeed By
                  </Typography>
                }
                dropdownName="Employee by"
                name="EMPby"
                options={employeeBy || []}
                labelKey="name"
                valueKey="locationId"
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid silver",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  width: "100%",
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

              <Dropdown
                value={formData.Status}
                onChange={handleStatusChange}
                title={
                  <Typography>
                    <span style={{ color: "red", width: "100%" }}>*</span>Status
                  </Typography>
                }
                dropdownName="Status"
                options={employeeStatus}
                name="Status"
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid silver",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  marginTop: "15px",
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
            {/* Right Side */}
            <Grid
              item
              xs={12}
              lg={6}
              md={6}
              sm={12}
              sx={{ marginTop: "17px", marginBottom: "28px" }}
            >
              <Dropdown
                value={formData.designation}
                onChange={handleDesignationChange}
                title={
                  <Typography>
                    <span style={{ color: "red", width: "100%" }}>*</span>
                    Designation
                  </Typography>
                }
                dropdownName="designation"
                name="designation"
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid silver",
                  borderRadius: "5px",
                }}
                options={masterdata4}
              />
              {validationErrors.designation && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {validationErrors.designation}
                  </Typography>
                </Box>
              )}
              <Autocomplete
                multiple
                id="skill"
                options={skill || []}
                style={{ marginTop: "25px" }}
                disableCloseOnSelect
                filterSelectedOptions
                onChange={(_, value) => handleChange2(value)}
                getOptionLabel={(option) => option.skillName}
                getOptionValue={(option) => option.skillId}
                value={skill.filter((s) =>
                  formData.skill?.includes(s?.skillId)
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.skillId}>
                    {option.skillName}
                  </li>
                )}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      label={
                        <Typography>
                          <span style={{ color: "red", width: "100%" }}>*</span>
                          Skills
                        </Typography>
                      }
                      InputProps={{
                        ...params.InputProps,
                      }}
                      style={{
                        borderRadius: "5px",
                        marginBottom: "20px",
                      }}
                      onChange={handleChange}
                    />
                  </>
                )}
              />

              {validationErrors.skill && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {validationErrors.skill}
                  </Typography>
                </Box>
              )}
              <Dropdown
                value={formData.Client_loc}
                onChange={handleClientLocationChange}
                title={
                  <Typography>
                    <span style={{ color: "red", width: "100%" }}>*</span>Client
                    Location
                  </Typography>
                }
                dropdownName="Client Location"
                name="Client_loc"
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid silver",
                  borderRadius: "5px",
                }}
                options={Client_location || []}
                labelKey="name"
                valueKey="locationId"
              />
              {validationErrors.Client_loc && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {validationErrors.Client_loc}
                  </Typography>
                </Box>
              )}
              <TextField
                label={
                  <Typography>
                    <span style={{ color: "red", width: "100%" }}>*</span>
                    Employee ID
                  </Typography>
                }
                placeholder="EmployeID"
                name="employeeID"
                onChange={handleInputChange}
                value={formData.employeeID}
                fullWidth
                margin="normal"
                style={{
                  borderRadius: "5px",
                  marginTop: "25px",
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
        </div>
      </div>
      <Grid
        container
        spacing={2}
        style={{ marginLeft: "5px", marginTop: "3px" }}
      >
        <Typography variant="h6" onClick={() => handleBackClick()}>
          <b>Pay Roll</b>
        </Typography>
        <div
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "12px",
            border: "1px solid silver",
          }}
        />
        <Grid item xs={12} sm={6}>
          {/* Left side */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Employee CTC"
                value={formData.CTC}
                placeholder="Employee CTC"
                id="CTC"
                name="CTC"
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "100%",
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
            <Grid item xs={12}>
              <TextField
                label="A/C No."
                value={formData.ACNo}
                placeholder="A/C No."
                id="ACNo"
                name="ACNo"
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "100%",
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  classes: { focused: "green-border" },
                }}
              />
              {validationErrors.ACNo && (
                <Box>
                  <Typography color="error">{validationErrors.ACNo}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formData.Bank_Name}
                label="Bank Name"
                placeholder="Bank Name"
                id="Bank_Name"
                name="Bank_Name"
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "100%",
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  classes: { focused: "green-border" },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Right Side */}
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name as per Bank"
                placeholder="Name as per Bank"
                value={formData.Bank}
                id="Bank"
                name="Bank"
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "100%",
                }}
                fullWidth
                margin="normal"
              />
              {validationErrors.Bank && (
                <Box>
                  <Typography color="error">{validationErrors.Bank}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="IFSC Code"
                placeholder="IFSC Code"
                id="IFSCCode"
                name="IFSCCode"
                onChange={handleInputChange}
                value={formData.IFSCCode}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "100%",
                }}
                fullWidth
                margin="normal"
              />
              {validationErrors.IFSCCode && (
                <Box>
                  <Typography color="error">
                    {validationErrors.IFSCCode}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div
        className="responsive-container"
        style={{ textAlign: "right", marginTop: "30px" }}
      >
        <Button
          variant="contained"
          color="primary"
          className="responsive-button"
          style={{ marginRight: "10px", width: "200px" }}
          onClick={handleClearAll}
        >
          Clear All
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="responsive-button"
          style={{ width: "200px" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
