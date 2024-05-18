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
import {
  getAllCountry,
  getAllState,
  masterDataAction,
} from "../../../redux/actions/masterData/masterDataAction";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Dropdown from "../../forms/dropdown/dropdown";
import { useTheme } from "@mui/material/styles";
import { TimesheetStyle } from "../../../pages/timesheet/timesheetStyle";
import { postcodeValidator } from "postcode-validator";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  CreateUserForm,
  SearchEmployeeAction,
  fetchLocationData,
  getUserById,
  getAllCitysAction,
  getAllCountryAction,
  getAllStateAction,
  getAllPermentCitysAction,
} from "../../../redux/actions/AdminConsoleAction/users/usersAction";
import dayjs from "dayjs";

export default function CreateUser() {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [errors, setErrors] = useState({});
 
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id]);

  const { usersDataLoading, userDataError } = useSelector(
    (state) => state?.persistData?.userDetails
  );

  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    id: "",
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
      id: "",
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

    setErrors({});
    setIsChecked(false);

    setValidationErrors({});
    setSelectedImage(""); // Corrected line to clear selected image
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = async () => {
    // Toggle the checkbox state
    const newIsChecked = !isChecked;

    // Update the checkbox state
    setIsChecked(newIsChecked);

    // Copy data from Permanent Address to Current Address if checkbox is checked
    const updatedFormData = newIsChecked
      ? {
          ...formData,
          address1: formData.currentAddress1,
          address2: formData.currentAddress2,
          Zip: formData.currentZIP,
          country: formData.currentcountry,
          state: formData.currentstate,
          city: formData.currentcity,
        }
      : {
          ...formData,
          address1: "",
          address2: "",
          Zip: "",
          country: "",
          state: "",
          city: "",
        };

    // Update the form data
    setFormData(updatedFormData);

    // Fetch states and cities based on permanent address if country and state are selected
    if (newIsChecked && formData.currentcountry) {
      await dispatch(
        getAllStateAction({
          parentId: formData.currentcountry || "",
          dataType: "state",
        })
      );
    }

    if (newIsChecked && formData.currentstate) {
      await dispatch(
        getAllCitysAction({
          parentId: formData.currentstate || "",
          dataType: "city",
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchLocationData());
  }, [dispatch]);

  const LocationData = useSelector(
    (state) => state?.persistData?.userDetails?.locationData
  );

  const countryCode = {};

  if (LocationData && Array.isArray(LocationData)) {
    LocationData.forEach((location) => {
      countryCode[location.id] = location.code;
    });
  } else {
    console.error("LocationData is undefined or not an array");
  }

  const handlezipChange = (event, type) => {
    const { name, value } = event.target;

    // Check if the checkbox is checked
    if (type == "Zip") {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
        country: name === "country" ? value : formData.country,
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
      }));
    }
    if (type == "currentZIP") {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
        currentcountry:
          name === "currentcountry" ? value : formData.currentcountry,
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
      }));
    }
    if (isChecked) {
      setFormData((formData) => ({
        ...formData,
        Zip: formData.currentZIP,
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
    (state) => state.persistData?.loginDetails?.masterData?.gender
  );

  const employeeStatus = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.employeeStatus
  );

  const masterdata3 = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.employmentType
  );
  const masterdata4 = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.designation
  );

  const employeeBy = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.employedBy
  );
 
  const Client_location = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.clientLocation
  );

  const work_mode = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.workMode
  );

  const managerName = useSelector(
    (state) => state?.persistData?.userDetails?.employees.result
  );

  const employeeDetails = useSelector(
    (state) => state?.persistData?.userDetails?.userByIdData
  );

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        id: employeeDetails?.id,
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
        employeeDetails?.fileStorage?.data
          ? `data:image/png;base64,${employeeDetails?.fileStorage?.data}`
          : ""
      );
      if (employeeDetails.permanentAddress?.countryId) {
        dispatch(
          getAllState({
            parentId: employeeDetails.permanentAddress?.countryId || "",
            dataType: "state",
          })
        );
      }
  
      if (employeeDetails.permanentAddress?.stateId) {
        dispatch(
          getAllPermentCitysAction({
            parentId: employeeDetails.permanentAddress?.stateId || "",
            dataType: "city",
          })
        );
      }
  
      // Fetch state and city data for current address
      if (employeeDetails.presentAddress?.countryId) {
        dispatch(
          getAllStateAction({
            parentId: employeeDetails.presentAddress?.countryId || "",
            dataType: "state",
          })
        );
      }
  
      if (employeeDetails.presentAddress?.stateId) {
        dispatch(
          getAllCitysAction({ parentId: employeeDetails.presentAddress?.stateId || "",
          dataType: "city",
        })
      );
    }
      if (
        employeeDetails.permanentAddress?.addressLine1 ===
          employeeDetails.presentAddress?.addressLine1 &&
        employeeDetails.permanentAddress?.addressLine2 ===
          employeeDetails.presentAddress?.addressLine2 &&
        employeeDetails.permanentAddress?.postalCode ===
          employeeDetails.presentAddress?.postalCode &&
        employeeDetails.permanentAddress?.countryId ===
          employeeDetails.presentAddress?.countryId &&
        employeeDetails.permanentAddress?.stateId ===
          employeeDetails.presentAddress?.stateId &&
        employeeDetails.permanentAddress?.cityId ===
          employeeDetails.presentAddress?.cityId
      ) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    } else {
      setFormData({
        firstName: "",
        id: "",
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
      setSelectedImage("");
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
    if (type === "CLIENT_LOCATION") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        productType: event.target.value,
      }));
    }
    if (type === "PRAKAT_LOCATION") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        productType: event.target.value,
        Client_loc: "",
      }));
    }
  };
  const handleWorkModeChange = (event) => {
    const newWorkMode = event.target.value;

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

  const skill = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.skill
  );

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

  const handleManagerNameChange = (value) => {
    setFormData({ ...formData, ManagerName: value });
  };
  const handleManagerNameChange2 = (event) => {
    dispatch(SearchEmployeeAction(event.target.value));
  };

  const shouldDisableDate = (date) => {
    return dayjs(date).isAfter(dayjs(), "day"); // Disable future dates
  };
  const handleDateChnage = (name, date) => {
    const formattedDate = date.format("YYYY-MM-DD");

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedDate,
    }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // If checkbox is checked, update current address fields only
    if (isChecked) {
      setFormData((formData) => ({
        ...formData,
        address1: formData.currentAddress1,
        address2: formData.currentAddress2,
        city: formData.currentcity,
        state: formData.currentstate,
        country: formData.currentcountry,
        Zip: formData.currentZIP,
        [name]: value,
      }));
    } else {
      // If checkbox is not checked, update all fields independently
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

  useEffect(() => {
    dispatch(getAllCountryAction({ parentId: 0, dataType: "country" }));

    dispatch(getAllCountry({ parentId: 0, dataType: "country" }));
  }, []);

  const country = useSelector(
    (state) => state?.persistData?.userDetails?.countrydata
  );

  const countryData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.countrydata
  );

  const stateData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.statedata
  );

  const cityData = useSelector(
    (state) => state?.persistData?.userDetails?.cityData
  );

  const state = useSelector(
    (state) => state?.persistData?.userDetails?.statedata
  );

  const city = useSelector((state) => state?.persistData?.userDetails?.cities);

  const handleCountryChange = async (type, event, value) => {
    if (type === "country") {
      setFormData((formData) => ({
        ...formData,
        country: value?.id || "",
        state: "",
        city: "",
      }));

      await dispatch(
        getAllState({ parentId: value?.id || "", dataType: "state" })
      );
    }

    if (isChecked) {
      setFormData((formData) => ({
        ...formData,
        country: formData.currentcountry,
        state: "",
        city: "",
      }));
    }
  };

  const handleCountryChange2 = async (type, event, value) => {
    if (type === "currentcountry") {
      setFormData((formData) => ({
        ...formData,
        currentcountry: value?.id || "",
        currentstate: "",
        currentcity: "",
      }));
    }
    await dispatch(
      getAllStateAction({ parentId: value?.id || "", dataType: "state" })
    );
  };

  const handleCity = (type, event, value) => {
    if (type === "city") {
      setFormData((formData) => ({
        ...formData,
        city: value?.id || "",
      }));
    }

    if (isChecked) {
      setFormData((formData) => ({
        ...formData,
        city: formData.currentcity,
      }));
    }
  };

  const handleCity2 = (type, event, value) => {
    if (type === "currentcity") {
      setFormData((formData) => ({
        ...formData,
        currentcity: value?.id || "",
      }));
    }
  };

  const handleStateChange = async (type, event, value) => {
    if (type === "state") {
      setFormData((formData) => ({
        ...formData,
        state: value?.id || "",
        city: "",
      }));
      await dispatch(
        getAllPermentCitysAction({
          parentId: value?.id || "",
          dataType: "city",
        })
      );
    }
    if (isChecked) {
      setFormData((formData) => ({
        ...formData,
        state: formData.currentstate,
        city: "",
      }));
    }
  };

  const handleStateChange2 = async (type, event, value) => {
    if (type === "currentstate") {
      setFormData((formData) => ({
        ...formData,
        currentstate: value?.id || "",
      }));
      setFormData((formData) => ({
        ...formData,
        currentcity: "",
      }));
      await dispatch(
        getAllCitysAction({
          parentId: value?.id || "",
          dataType: "city",
        })
      );
    }
  };

  const handleSave = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      let payload;
      if (isChecked) {
        payload = {
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
          "permanentAddress.addressLine1": formData.currentAddress1,
          "permanentAddress.addressLine2": formData.currentAddress2,
          "permanentAddress.countryId": formData.currentcountry,
          "permanentAddress.stateId": formData.currentstate,
          "permanentAddress.cityId": formData.currentcity,
          "permanentAddress.postalCode": formData.currentZIP,
        };
      } else {
        payload = {
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
      }

      await dispatch(CreateUserForm(payload, navigate));
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };
  useEffect(() => {
    if (!usersDataLoading && !userDataError) {
      setFormData({
        firstName: "",
        id: "",
        email: "",
        number: "",
        gender: "",
        lastName: "",
        DOB: "",
        DOJ: "",
        CTC: "",
        Status: "",
        skill: "",
        ACNo: "",
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
      setIsChecked(false);
    }
  }, [usersDataLoading, userDataError]);

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First name is mandatory.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      errors.firstName = "First name should contain only alphabets.";
    }

    if (!formData.currentZIP) {
      errors.currentZIP = "Zip/Postal code is mandatory";
    } else if (!/^\d+$/.test(formData.currentZIP)) {
      errors.currentZIP =
        "Invalid postal code or contains non-numeric characters";
    } else {
      try {
        const isValid = postcodeValidator(
          formData.currentZIP,
          "" || countryCode[formData.currentcountry]
        );
        if (!isValid) {
          errors.currentZIP = "Invalid postal code";
        }
      } catch (error) {
        errors.currentZIP = "Error validating postal code";
      }
    }

    if (formData.UANNo && !/^\d{12}$/.test(formData.UANNo)) {
      errors.UANNo = "UAN number should contain exactly 12 digits";
    }

    if (!formData.gender) {
      errors.gender = "Gender is mandatory";
    }

    if (formData.productType !== "PRAKAT_LOCATION") {
      if (!formData.Client_loc) {
        errors.Client_loc = "Office Location is mandatory";
      }
    }

    if (formData.employedBy==0) {
      errors.employedBy = "Employee By Location is mandatory";
    }

    if (!formData.designation) {
      errors.designation = "Designation is mandatory";
    }

    if (formData.skill==0) {
      errors.skill = "Skills is mandatory";
    }

    if (!formData.employeeID) {
      errors.employeeID = "Employee ID  is mandatory";
    }

    if (!formData.ManagerName || !formData.ManagerName.name) {
      errors.ManagerName = "Manager name is mandatory";
    }

    if (!formData.Status) {
      errors.Status = "Status is mandatory";
    }

    if (!formData.email) {
      errors.email = "Email is mandatory";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.currentAddress1) {
      errors.currentAddress1 = "Current Address is mandatory";
    }

    if (!formData.currentcountry) {
      errors.currentcountry = "Country is mandatory";
    }

    if (!formData.currentstate) {
      errors.currentstate = "State is mandatory";
    }

    if (!formData.currentcity) {
      errors.currentcity = "City is mandatory";
    }

    if (!formData.number) {
      errors.number = "Mobile number is mandatory";
    } else if (!/^\d+$/.test(formData.number)) {
      errors.number = "Mobile number should contain only Number";
    }

    if (!formData.DOB) {
      errors.DOB = "Date of birth is mandatory";
    }

    if (!formData.DOJ) {
      errors.DOJ = "Date of joining is mandatory";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is mandatory";
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      errors.lastName = "Last name should contain only alphabets.";
    }

    if (!formData.AadhaarNo) {
      errors.AadhaarNo = "Aadhaar number is mandatory";
    } else if (!/^\d+$/.test(formData.AadhaarNo)) {
      errors.AadhaarNo = "Aadhaar number should contain only Number";
    } else if (!/^[0-9]{12}$/.test(formData.AadhaarNo)) {
      errors.AadhaarNo = "Aadhaar number should contains only 12 Number";
    }

    if (!formData.CTC) {
      errors.CTC = "Employee CTC is mandatory";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.CTC)) {
      errors.CTC =
        "Please enter a valid numeric value for CTC with up to two decimal places.";
    } else {
      const ctcNumber = parseFloat(formData.CTC);
      if (isNaN(ctcNumber) || ctcNumber < 0) {
        errors.CTC =
          "Please enter a valid non-negative numeric value for Employee CTC";
      }
    }

    if (!formData.workMode) {
      errors.workMode = "Work Mode is mandatory";
    }

    if (!formData.employeeType) {
      errors.employeeType = "Employee type is mandatory";
    }

    if (formData.ACNo && !/^\d+$/.test(formData.ACNo)) {
      errors.ACNo = "A/C No must be an digit";
    }

    if (formData.IFSCCode && !/^[A-Za-z0-9]+$/.test(formData.IFSCCode)) {
      errors.IFSCCode = "IFSC Code must not contain special characters";
    }

    if (formData.Bank_Name && !/^[A-Za-z\s]+$/.test(formData.Bank_Name)) {
      errors.BankName = "Bank Name must contain only alphabetic characters";
    }
    if (formData.Bank && !/^[A-Za-z\s]+$/.test(formData.Bank)) {
      errors.Bank = "Bank as per Name must contain only alphabetic ";
    }

    return errors;
  };

  return (
    <Grid>
      {/* Heading */}
      <div
        className="Heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        <IconButton
          style={{ color: "black" }}
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
            <>
              <AccountCircleTwoToneIcon
                style={{ width: "100px", height: "100px", color: "#545454" }}
              />
              <IconButton
                style={{
                  position: "absolute",
                  padding: "1px",
                  bottom: 10,
                  right: 8,
                  color: "#545454",
                  backgroundColor: "white",
                  background: "white",
                }}
              >
                <AddCircleOutlineIcon
                  style={{ width: "25px", height: "25px" }}
                />
              </IconButton>
            </>
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
      <Grid>
        <Typography variant="h6" sx={{ paddingLeft: "10px" }}>
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
        <Grid container spacing={2} sx={{ margin: "20px" }}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label={
                  <>
                    Enter User First Name
                    <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  width: "90%",
                  marginRight: "5%",
                  borderRadius: "10px",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {errors?.firstName && (
                <Box>
                  <Typography color="error">{errors?.firstName}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={
                  <>
                    Enter User Last Name
                    <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "90%",
                  marginRight: "5%",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {errors?.lastName && (
                <Box>
                  <Typography color="error">{errors?.lastName}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label={
                  <>
                    Enter Email Address
                    <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  width: "90%",
                  marginRight: "5%",
                  borderRadius: "10px",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {errors?.email && (
                <Box>
                  <Typography color="error">{errors?.email}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6} mt={1.8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "90%",
                  }}
                  label={
                    <>
                      DOB
                      <span style={{ color: "red" }}>*</span>
                    </>
                  }
                  name="DOB"
                  format="DD/MM/YYYY"
                  shouldDisableDate={shouldDisableDate}
                  value={formData.DOB ? dayjs(formData.DOB) : null} // Set value to null to not display the current date
                  onChange={(value) => handleDateChnage("DOB", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {errors?.DOB && (
                <Box>
                  <Typography color="error">{errors?.DOB}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label={
                  <>
                    Enter Mobile Number
                    <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  width: "90%",
                  marginRight: "5%",
                  borderRadius: "10px",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {errors?.number && (
                <Box>
                  <Typography color="error">{errors?.number}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6} mt={1.8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "90%",
                  }}
                  label={
                    <>
                      DOJ
                      <span style={{ color: "red" }}>*</span>
                    </>
                  }
                  name="DOB"
                  format="DD/MM/YYYY"
                  value={formData.DOJ ? dayjs(formData.DOJ) : null} // Set value to null to not display the current date
                  onChange={(value) => handleDateChnage("DOJ", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {errors?.DOJ && (
                <Box>
                  <Typography color="error">{errors?.DOJ}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} mt={2.2}>
              <Dropdown
                value={formData.gender}
                onChange={handleGenderChange}
                title={
                  <>
                    Gender
                    <span style={{ color: "red", width: "100%" }}>*</span>
                  </>
                }
                dropdownName="gender"
                options={masterdata1}
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid silver",
                  width: "90%",
                  marginRight: "5%",
                  borderRadius: "5px",
                }}
              />
              {errors?.gender && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {errors?.gender}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={
                  <>
                    {" "}
                    Enter Aadhaar Number
                    <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="AadhaarNo"
                value={formData.AadhaarNo}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "90%",
                  marginRight: "5%",
                }}
                fullWidth
                margin="normal"
                InputProps={{ classes: { focused: "green-border" } }}
              />
              {errors?.AadhaarNo && (
                <Box>
                  <Typography color="error">{errors?.AadhaarNo}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="Enter UAN No."
                name="UANNo"
                value={formData.UANNo}
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "90%",
                  marginRight: "5%",
                }}
                fullWidth
                margin="normal"
              />
              {errors?.UANNo && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {errors?.UANNo}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Grid>
      </Grid>{" "}
      <Grid>
        <Typography variant="h6" sx={{ paddingLeft: "20px" }}>
          <b>Present Address</b>
        </Typography>
        <div
          style={{
            // width: "100%",
            margin: "auto",
            marginLeft: "12px",
            marginBottom: "18px",
            border: "1px solid silver",
          }}
        />
        <Grid container sx={{ margin: "20px" }}>
          <Grid container>
            <Grid item xs={6} mt={0.3}>
              <TextField
                label={
                  <>
                    Address Line 1<span style={{ color: "red" }}>*</span>
                  </>
                }
                name="currentAddress1"
                value={formData.currentAddress1}
                style={{
                  width: "90%",
                  borderRadius: "10px",
                }}
                onChange={(e) => handleInputChange(e, "currentAddress1")}
              />
              {errors?.currentAddress1 && (
                <Box>
                  <Typography color="error">
                    {errors?.currentAddress1}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={<>Address line 2</>}
                name="currentAddress2"
                value={formData.currentAddress2}
                style={{
                  borderRadius: "10px",
                  width: "90%",
                }}
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={6} mt={0.2}>
              <Autocomplete
                disableFreeSolo
                disableClearable
                disableInput
                id="currentcountry"
                options={countryData || []}
                getOptionLabel={(option) => option.dataValue}
                getOptionValue={(option) => option.id}
                style={{
                  borderRadius: "10px",
                  width: "90%",
                }}
                value={
                  countryData?.find(
                    (country) => country.id === formData.currentcountry
                  ) || null
                }
                onChange={(e, value) =>
                  handleCountryChange2("currentcountry", e, value)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <>
                        Country <span style={{ color: "red" }}>*</span>
                      </>
                    }
                  />
                )}
              />
              {errors?.currentcountry && (
                <Box>
                  <Typography color="error">
                    {errors?.currentcountry}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disableFreeSolo
                disableClearable
                disableInput
                id="currentstate"
                options={formData.currentcountry ? state : []}
                getOptionLabel={(option) => option.dataValue}
                getOptionValue={(option) => option.id}
                style={{
                  borderRadius: "10px",
                  width: "90%",
                }}
                value={
                  state?.find((state) => state.id === formData.currentstate) ||
                  null
                }
                onChange={(e, value) => {
                  handleStateChange2("currentstate", e, value);
                  // Clear the city field when state changes
                  setFormData((prevData) => ({
                    ...prevData,
                    currentstate: value ? value.id : "",
                    currentcity: null, // This will clear the city field
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <>
                        State <span style={{ color: "red" }}>*</span>
                      </>
                    }
                  />
                )}
              />
              {errors?.currentstate && (
                <Box>
                  <Typography color="error">{errors?.currentstate}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={6} mt={0.3}>
              <Autocomplete
                disableFreeSolo
                disableInput
                id="currentcity"
                disableClearable={true} // Disable clear icon
                options={formData.currentstate ? city : []}
                style={{
                  borderRadius: "10px",
                  width: "90%",
                }}
                getOptionLabel={(option) => option.dataValue}
                onChange={(e, value) => {
                  handleCity2("currentcity", e, value);
                }}
                value={
                  city?.find((city) => city.id === formData.currentcity) || null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <>
                        City<span style={{ color: "red" }}>*</span>
                      </>
                    }
                  />
                )}
              />
              {errors?.currentcity && (
                <Box>
                  <Typography color="error">{errors?.currentcity}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="currentZip"
                name="currentZIP"
                label={
                  <>
                    Zip/Postal Code<span style={{ color: "red" }}>*</span>
                  </>
                }
                value={formData.currentZIP}
                style={{
                  borderRadius: "10px",
                  width: "90%",
                }}
                onChange={handlezipChange}
              />
              {errors?.currentZIP && (
                <Box>
                  <Typography color="error">{errors?.currentZIP}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ paddingLeft: "20px" }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              style={{
                display: "inline-block",
              }}
            >
              <b>Permanent Address</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} sx={{ textAlign: "end" }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </Grid>
              <Grid item xs={0.5}></Grid>
              <Grid item xs={5.5}>
                <Typography variant="body2">
                  <b>Same as Permanent Address</b>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
          sx={{ marginTop: "15px", marginLeft: "4px" }}
        >
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label={<>Address Line 1</>}
                name="address1"
                value={isChecked ? formData.currentAddress1 : formData.address1}
                style={{ width: "90%" }}
                onChange={(e) => handleInputChange(e)}
                disabled={isChecked} // Disable the field if checkbox is checked
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={<>Address Line 2</>}
                name="address2"
                value={isChecked ? formData.currentAddress2 : formData.address2}
                style={{ width: "90%" }}
                onChange={(e) => handleInputChange(e)}
                disabled={isChecked} // Disable the field if checkbox is checked
              />
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={6}>
              <Autocomplete
                disableFreeSolo
                id="country"
                value={
                  isChecked
                    ? countryData?.find(
                        (country) => country?.id === formData.currentcountry
                      ) || null
                    : country?.find(
                        (country) => country?.id === formData.country
                      ) || null
                }
                options={country || []}
                getOptionLabel={(option) => option.dataValue}
                getOptionValue={(option) => option.id}
                style={{ width: "90%" }}
                onChange={(e, value) =>
                  isChecked
                    ? handleCountryChange("currentcountry", e, value)
                    : handleCountryChange("country", e, value)
                }
                renderInput={(params) => (
                  <TextField {...params} label={<>Country</>} />
                )}
                disabled={isChecked} // Disable the field if checkbox is checked
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disableFreeSolo
                id="state"
                options={isChecked ? state : formData.country ? stateData : []}
                value={
                  isChecked
                    ? state?.find(
                        (state) => state?.id === formData.currentstate
                      ) || null
                    : stateData?.find((state) => state?.id === formData.state) ||
                      null
                }
                getOptionLabel={(option) => option.dataValue}
                getOptionValue={(option) => option.id}
                style={{ width: "90%" }}
                onChange={(e, value) =>
                  isChecked
                    ? handleStateChange2("currentstate", e, value)
                    : handleStateChange("state", e, value)
                }
                renderInput={(params) => (
                  <TextField {...params} label={<>State</>} />
                )}
                disabled={isChecked} // Disable the field if checkbox is checked
              />
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={6}>
              <Autocomplete
                disableFreeSolo
                id="city"
                options={isChecked ? city : formData.country ? cityData : []}
                value={
                  isChecked
                    ? city?.find((city) => city.id === formData.currentcity) ||
                      null
                    : cityData?.find((city) => city.id === formData.city) || null
                }
                getOptionLabel={(option) => option.dataValue}
                onChange={(e, value) =>
                  isChecked
                    ? handleCity2("currentcity", e, value)
                    : handleCity("city", e, value)
                }
                renderInput={(params) => (
                  <TextField {...params} label={<>City</>} />
                )}
                style={{ width: "90%" }}
                disabled={isChecked} // Disable the field if checkbox is checked
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="Zip"
                name="Zip"
                label={
                  <>
                    Zip/Postal Code
                  </>
                }
                value={isChecked ? formData.currentZIP : formData.Zip}
                style={{ width: "90%" }}
                onChange={(e) => handlezipChange(e, "Zip")}
                disabled={isChecked} // Disable the field if checkbox is checked
              />
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid mt={2} sx={{ paddingLeft: "20px" }}>
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
        <Grid container spacing={2}>
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
            <FormControl style={{ textAlign: "right" }}>
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
          <Grid item xs={6}>
            <Dropdown
              value={formData.workMode}
              options={work_mode}
              onChange={handleWorkModeChange}
              title={
                <>
                  Work Mode <span style={{ color: "red" }}>*</span>
                </>
              }
              dropdownName="WorkMode"
              name="workMode"
              style={{
                ...style.TimesheetTextField,
                border: "1px solid #008080",
                borderRadius: "5px",
                width: "90%",
              }}
            />
            {errors?.workMode && (
              <Box>
                <Typography color="error">{errors?.workMode}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid mt={2} sx={{ paddingLeft: "20px" }}>
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
        <Grid container spacing={2} sx={{ margin: "5px" }}>
          <Grid container>
            <Grid item xs={6}>
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
                  width: "90%",
                }}
        
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <>
                        Manager Name<span style={{ color: "red" }}>*</span>
                      </>
                    }
                    onChange={handleManagerNameChange2}
                  />
                )}
              />
              {errors?.ManagerName && (
                <Box>
                  <Typography color="error">{errors?.ManagerName}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <Dropdown
                value={formData.designation}
                onChange={handleDesignationChange}
                title={
                  <>
                    Designation
                    <span style={{ color: "red", width: "100%" }}>*</span>
                  </>
                }
                dropdownName="designation"
                name="designation"
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "5px",
                  width: "90%",
                  border: "1px solid silver",
                }}
                options={
                  masterdata4.filter(
                    (location) => location.status === "ACTIVE"
                  ) || []
                }
              />
              {errors?.designation && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {errors?.designation}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={6}>
              <Dropdown
                value={formData.employeeType}
                onChange={handleEmptypeChange}
                title={
                  <>
                    Employee Type
                    <span style={{ color: "red", width: "100%" }}>*</span>
                  </>
                }
                dropdownName="Employee Type"
                name="EMPType"
                options={masterdata3 || []}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "5px",
                  width: "90%",
                  border: "1px solid silver",
                }}
              />
              {errors?.employeeType && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {errors?.employeeType}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="skill"
                options={skill || []}
                disableCloseOnSelect
                filterSelectedOptions
                onChange={(_, value) => handleChange2(value)}
                getOptionLabel={(option) => option.skillName}
                getOptionValue={(option) => option.skillId}
                value={skill?.filter((s) =>
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
                        <>
                          Skills
                          <span style={{ color: "red", width: "100%" }}>*</span>
                        </>
                      }
                      InputProps={{
                        ...params.InputProps,
                      }}
                      style={{
                        borderRadius: "5px",
                        width: "90%",
                      }}
                      onChange={handleChange}
                    />
                  </>
                )}
              />

              {errors?.skill && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {errors?.skill}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={6}>
              <Dropdown
                value={formData.employedBy}
                onChange={handleEmpByChange}
                title={
                  <>
                    Employeed By
                    <span style={{ color: "red", width: "100%" }}>*</span>
                  </>
                }
                dropdownName="Employee by"
                name="EMPby"
                options={
                  employeeBy.filter(
                    (location) => location.status === "ACTIVE"
                  ) || []
                }
                labelKey="name"
                valueKey="locationId"
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "5px",
                  width: "90%",
                  border: "1px solid silver",
                }}
              />
              {errors?.employedBy && (
                <Box>
                  <Typography color="error" style={{}}>
                    {errors?.employedBy}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <Dropdown
                value={formData.Client_loc}
                onChange={handleClientLocationChange}
                title={
                  <>
                    Client Location
                    <span style={{ color: "red", width: "100%" }}>*</span>
                  </>
                }
                dropdownName="Client Location"
                name="Client_loc"
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "5px",
                  width: "90%",
                  border: "1px solid silver",
                }}
                options={
                  Client_location.filter(
                    (location) => location.status === "ACTIVE"
                  ) || []
                }
                labelKey="name"
                valueKey="locationId"
                disabled={formData.productType !== "CLIENT_LOCATION"}
              />
              {formData.productType !== "PRAKAT_LOCATION" && (
                <Box>
                  {errors?.Client_loc && (
                    <Typography color="error" style={{}}>
                      {errors?.Client_loc}
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item xs={6} mt={2}>
              <Dropdown
                value={formData.Status}
                onChange={handleStatusChange}
                title={
                  <>
                    Status<span style={{ color: "red", width: "100%" }}>*</span>
                  </>
                }
                dropdownName="Status"
                options={employeeStatus}
                name="Status"
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid silver",
                  borderRadius: "5px",
                  width: "90%",
                }}
              />
              {errors?.Status && (
                <Box>
                  <Typography color="error" style={{}}>
                    {" "}
                    {errors?.Status}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={
                  <>
                    {" "}
                    Employee ID
                    <span style={{ color: "red", width: "100%" }}>*</span>
                  </>
                }
                placeholder="EmployeID"
                name="employeeID"
                onChange={handleInputChange}
                value={formData.employeeID}
                fullWidth
                margin="normal"
                style={{
                  borderRadius: "5px",
                  width: "90%",
                }}
              />
              {errors?.employeeID && (
                <Box>
                  <Typography color="error">{errors?.employeeID}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2} sx={{ paddingLeft: "30px" }}>
        <Typography variant="h6">
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
        <Grid container spacing={2} mt={2} sx={{ marginLeft: "10px" }}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label={
                  <>
                    Enter CTC
                    <span style={{ color: "red" }}>*</span>
                  </>
                }
                value={formData.CTC}
                placeholder="Employee CTC"
                id="CTC"
                name="CTC"
                onChange={handleInputChange}
                style={{
                  ...style.TimesheetTextField,
                  borderRadius: "10px",
                  width: "92%",
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  classes: { focused: "green-border" },
                }}
              />
              {errors?.CTC && (
                <Box>
                  <Typography color="error">{errors?.CTC}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
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
                  width: "95%",
                }}
                fullWidth
                margin="normal"
              />
              {errors?.Bank && (
                <Box>
                  <Typography color="error">{errors?.Bank}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
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
                  width: "92%",
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  classes: { focused: "green-border" },
                }}
              />
              {errors?.BankName && (
                <Box>
                  <Typography color="error">{errors?.BankName}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
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
                  width: "95%",
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  classes: { focused: "green-border" },
                }}
              />
              {errors?.ACNo && (
                <Box>
                  <Typography color="error">{errors?.ACNo}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
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
                  width: "92%",
                }}
                fullWidth
                margin="normal"
              />
              {errors?.IFSCCode && (
                <Box>
                  <Typography color="error">{errors?.IFSCCode}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={6}></Grid>
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
          style={{
            marginRight: "10px",
            width: "160px",
            textTransform: "capitalize",
          }}
          onClick={handleClearAll}
        >
          Clear All
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="responsive-button"
          style={{ width: "160px", textTransform: "capitalize" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </Grid>
  );
}
