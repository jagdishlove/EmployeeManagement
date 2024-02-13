import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, Button, Grid, IconButton, TextField, Typography, RadioGroup, FormControl, FormControlLabel, Radio, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dropdown from '../../forms/dropdown/dropdown';
import { useTheme } from "@mui/material/styles";
import { TimesheetStyle } from "../../../pages/timesheet/timesheetStyle";
import { postcodeValidator } from 'postcode-validator';
import { useSelector } from 'react-redux';
import { Country, State, City } from 'country-state-city';
export default function CreateUser() {
    const theme = useTheme();
    const style = TimesheetStyle(theme);


    const [countryvalue, setCountryValue] = useState('')
    const [isSameAsPermanent, setIsSameAsPermanent] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        // Trigger click on the hidden input element
        document.getElementById('uploadInput').click();
    };

    const [permanentAddress, setPermanentAddress] = useState({
        address: '',
        country: '',
        state: '',
        city: '',
        zip: '',
    });

    const [currentAddress, setCurrentAddress] = useState({
        address: '',
        country: '',
        state: '',
        city: '',
        zip: '',
    });


    const handleCheckboxChange = () => {
        setIsSameAsPermanent((prev) => !prev);
        if (!isSameAsPermanent) {
            // Copy values from Permanent Address to Current Address
            setCurrentAddress({
                address: permanentAddress.address,
                country: permanentAddress.country,
                state: permanentAddress.state,
                city: permanentAddress.city,
                zip: permanentAddress.zip
            });
            setZip(zip);
            setStates(states);
            setCities();
            setCountries();

        } else {
            // Reset Current Address fields if the checkbox is unchecked
            setCurrentAddress({
                address: '',
                country: '',
                state: '',
                city: '',
                zip: '',
            });
        }
    };

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [zip, setZip] = useState([]);
    
    const [selectedCountry, setSelectedCountry] = useState(null);
    // 

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);


    const handleCountryChange = (_, value) => {
        setCountryValue(value?.id)
        if (value) {
            const countryStates = State.getStatesOfCountry(value.id || '');
            setStates(countryStates);
            setSelectedCountry(value);
            setCities([]);
        }
    };

    console.log('state', states)


    const [productType, setProductType] = useState('');
    const [workMode, setWorkMode] = useState('');

    const handleProductTypeChange = (event) => {
        setProductType(event.target.value);
        // Reset workMode when product type changes
        setWorkMode('');
    };

    const handleWorkModeChange = (event) => {
        setWorkMode(event.target.value);
    };


    const handleStateChange = (event, value) => {
        console.log('value', value)
        if (value) {
            const stateCities = City.getCitiesOfState(countryvalue, value.id || '');
            setCities(stateCities);

            setZip([]);
        }
    };

    const isZipCodeValid = () => {
        if (selectedCountry && zip) {

            return postcodeValidator(zip, selectedCountry?.id);
        }
        return false;
    };

    const handleZipChange = (e) => {
        const newZip = e.target.value;
        setZip(newZip);
    };
    console.log("zip:");

    const isValid = postcodeValidator('12345', 'US'); // Example usage
    console.log("pincode:", isValid);//Example




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
    const masterdata5 = useSelector(
        (state) => state.persistData.masterData?.workLocation
    );
    console.log("Master Data 3", masterdata4);


    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        number: '',
        gender: '',
        lastName: '',
        DOB: "",
        DOJ: "",
        CTC: "",
        Status: "",
        skills: "",
        AadhaarNo: "",
        employeeType: "",
        employeeID: "",

    });

    const handleClearAll = () => {
        setFormData({
            firstName: '',
            email: '',
            number: '',
            gender: '',
            lastName: '',
            DOB: "",
            DOJ: "",
            CTC: "",
            skills: "",
            Status: "",
            AadhaarNo: "",
            employeeType: "",
            employeeID: "",
        });

        setValidationErrors({});
    };


    const handleCurrentAddressChange = (field, value) => {
        setCurrentAddress((prevAddress) => ({
            ...prevAddress,
            [field]: value,
        }));
    };


    const handleBackClick = () => {
        console.log('Handle back clicked!');
    };

    const handleChange = () => {
        console.log('Handle Change');
    };
    const skills = useSelector(
        (state) => state.persistData.masterData?.skill
    );
    console.log("Skills", formData.skill);
    const handleGenderChange = (selectedOption) => {
        setFormData({ ...formData, gender: selectedOption.target.value });
    };
    console.log("Gender", formData.gender);

    const handleWorkLocationChange = (selectedOption) => {
        setFormData({ ...formData, Work_loc: selectedOption.target.value });
    };
    console.log("Work_Location", formData.Work_loc);

    const handleManagerChange = (selectedOption) => {
        setFormData({ ...formData, ManagerName: selectedOption.target.value });
    };
    console.log("formData", formData);


    const handleBandChange = (selectedOption) => {
        setFormData({ ...formData, band: selectedOption.target.value });
    };
    console.log("band", formData.band);
    const handleEmptypeChange = (selectedOption) => {
        setFormData({
            ...formData,
            employeeType: selectedOption.target.value
        });
    };
    console.log("employeeType", formData.employeeType);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setValidationErrors({
            ...validationErrors,
            [name]: ''
        });

    };
    const handleSave = () => {
        const { firstName, email, number, gender, lastName, DOB, DOJ, CTC, employeeID,
            employeeType, Status, band, Location, OfficeLocation, Designation, skill,
            ManagerName, ACNo, Bank, IFSCCode, AadhaarNo, WorkMode } = formData;
        let errors = {};

        if (!firstName?.trim()) {
            errors.firstName = '*First Name is required';
        } else if (!/^[a-zA-Z]{3,}$/.test(firstName)) {
            errors.firstName = 'Please enter a valid First Name without special characters, at least 3 characters long';
        }

        if (!email?.trim()) {
            errors.email = '*Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!number?.trim()) {
            errors.number = '*Mobile number is required';
        } else if (!/^[6-9]\d{9}$/.test(number)) {
            errors.number = 'Please enter a valid Indian mobile number';
        }

        if (!gender?.trim()) {
            errors.gender = '*Gender is required';
        }
        if (!band?.trim()) {
            errors.band = '*Band is required';
        }
        if (!Location?.trim()) {
            errors.Location = '*Location is required';
        }
        if (!OfficeLocation?.trim()) {
            errors.OfficeLocation = '*Office Location  is required';
        }
        if (!Designation?.trim()) {
            errors.Designation = '*Designation is required';
        }
        if (!skill?.trim()) {
            errors.Skill = '*Skills is required';
        }
        if (!DOB?.trim()) {
            errors.DOB = '*Date of Birth is required';
        }
        if (!DOJ?.trim()) {
            errors.DOJ = '*Date of joining is required';
        }
        if (!lastName?.trim()) {
            errors.lastName = '*Last Name is required';
        }
        if (!ManagerName?.trim()) {
            errors.ManagerName = '*Manager Name is required';
        }
        if (!AadhaarNo?.trim()) {
            errors.AadhaarNo = '*Aadhaar Number is required';
        }
        if (!CTC || !CTC?.trim()) {
            errors.CTC = '*Employee CTC is required';
        } else if (!/^\d+$/.test(CTC)) {
            errors.CTC = 'Please enter a valid numeric value for Employee CTC';
        } else {
            const ctcNumber = parseFloat(CTC);
            if (isNaN(ctcNumber) || ctcNumber < 0) {
                errors.CTC = 'Please enter a valid non-negative numeric value for Employee CTC';
            } else {
                const ctcString = CTC.toString();
                const decimalIndex = ctcString.indexOf('.');
                if (decimalIndex !== -1 && ctcString.length - decimalIndex > 3) {
                    errors.CTC = 'Employee CTC can have up to two decimal places';
                }
            }
        }
        if (!ACNo?.trim()) {
            errors.ACNo = '*Your A/C number is required';
        }
        if (!Bank?.trim()) {
            errors.Bank = '*Your Name as Per Bank is required';
        }
        if (!IFSCCode?.trim()) {
            errors.IFSCCode = '*Your Bank IFSC COde is required';
        }

        if (!WorkMode?.trim()) {
            errors.WorkMode = '*Select your Work Mode..it is required';
        }
        if (!Status || !Status?.trim()) {
            errors.Status = '*Status is required';
        }

        if (!employeeType || !employeeType?.trim()) {
            errors.employeeType = '*Employee Type is required';
        }
        if (!employeeID || !employeeID?.trim()) {
            errors.employeeID = '*Employee ID is required';
        } else if (!/^[a-zA-Z0-9]+$/.test(employeeID)) {
            errors.employeeID = 'Please enter a valid Employee ID without special characters';
        }
        setValidationErrors(errors);
    };
    return (
        <div>
            {/* Heading */}
            <div className="Heading" style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton style={{ color: 'silver' }} onClick={() => handleBackClick()}>
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
            <div style={{ textAlign: "Left", marginLeft: "8px" }}>
                <Button style={{
                    width: '100px',
                    height: '99px',
                    border: '2px solid white',
                    borderRadius: '50%',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                    onClick={handleButtonClick}
                >
                    {selectedImage ? (
                        <Avatar
                            src={selectedImage}
                            alt="Selected"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <AccountCircleTwoToneIcon style={{ width: '70px', height: '70px', color: '#545454' }} >
                            <AddCircleOutlineIcon style={{ width: '20px', height: '20px', color: '#545454' }} /> </AccountCircleTwoToneIcon>

                    )}
                </Button>
                <input
                    type="file"
                    id="uploadInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {/* <Stack/>    */}
            </div>

            {/* User Details */}
            < div style={{ margin: '20px' }
            }>
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
                <div className="UserDetails" style={{ display: 'flex', marginTop: '20px', marginLeft: "12px" }}>
                    <Grid container spacing={2} style={{ margin: "" }}>
                        {/* Left Side */}
                        <Grid item xs={6}>
                            <TextField
                                label={<Typography>
                                    <span style={{ color: 'red' }}>*</span>
                                    Enter User First Name
                                </Typography>}
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{ classes: { focused: 'green-border' } }}
                            />
                            {validationErrors.firstName && (
                                <Box>
                                    <Typography
                                        color="error">{validationErrors.firstName}</Typography>
                                </Box>
                            )}
                            <TextField
                                label={<Typography>
                                    <span style={{ color: 'red' }}>*</span>
                                    Enter Email Address
                                </Typography>}
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{ classes: { focused: 'green-border' } }}
                            />
                            {validationErrors.email && (
                                <Box>
                                    <Typography
                                        color="error">{validationErrors.email}</Typography>
                                </Box>
                            )}
                            <TextField
                                label={<Typography>
                                    <span style={{ color: 'red' }}>*</span>
                                    Enter Mobile Number
                                </Typography>}
                                name="number"
                                value={formData.number}
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{ classes: { focused: 'green-border' } }}
                            />
                            {validationErrors.number && (
                                <Box>
                                    <Typography
                                        color="error">{validationErrors.number}</Typography>
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
                                    marginTop: "10px"
                                }}
                            />
                            {validationErrors.gender && (
                                <Box>
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.gender}
                                    </Typography>
                                </Box>
                            )}

                            <TextField
                                label="Enter UAN No."
                                name="UAN_No."
                                value={formData.UANNo}
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{ classes: { focused: 'green-border' } }}
                            />
                        </Grid>
                        {/* Right Side */}
                        <Grid item xs={6}>
                            <TextField
                                label={<Typography>
                                    <span style={{ color: 'red' }}>*</span>
                                    Enter User Last Name
                                </Typography>}
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{ classes: { focused: 'green-border' } }}

                            />
                            {validationErrors.lastName && (
                                <Box>
                                    <Typography
                                        color="error">{validationErrors.lastName}</Typography>
                                </Box>
                            )}
                            <Grid>
                                <TextField
                                    label={<Typography>
                                        <span style={{ color: 'red' }}>*</span>
                                        DOB(DD/MM/YYYY)
                                    </Typography>}
                                    type="date"
                                    id='DOB'
                                    name='DOB'
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
                                    InputProps={{ classes: { focused: 'green-border' } }}
                                />
                                {validationErrors.DOB && (
                                    <Box>
                                        <Typography
                                            color="error">{validationErrors.DOB}</Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid>
                                <TextField
                                    label={<Typography>
                                        <span style={{ color: 'red' }}>*</span>
                                        Date Of Joining
                                    </Typography>}
                                    type="date"
                                    id='DOJ'
                                    name='DOJ'
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
                                    InputProps={{ classes: { focused: 'green-border' } }}
                                />
                                {validationErrors.DOJ && (
                                    <Box>
                                        <Typography
                                            color="error">{validationErrors.DOJ}</Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid style={{ marginTop: "-6px" }}>
                                <TextField
                                    label={<Typography>
                                        <span style={{ color: 'red' }}>*</span>
                                        Enter Aadhaar Number
                                    </Typography>}
                                    name="AadhaarNo"
                                    value={formData.AadhaarNo}
                                    onChange={handleInputChange}
                                    style={{
                                        ...style.TimesheetTextField,
                                        borderRadius: "10px",
                                    }}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ classes: { focused: 'green-border' } }}
                                />
                                {validationErrors.AadhaarNo && (
                                    <Box>
                                        <Typography
                                            color="error">{validationErrors.AadhaarNo}</Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div > {/* <div> */}
            < br />
            <div className='permanent_Address'>
                <Typography variant="h6" onClick={() => handleBackClick()} style={{ fontSize: '16px' }}>
                    <b>Permanent Address</b>
                </Typography>
                <div
                    style={{
                        width: "100%",
                        margin: "auto",
                        border: "1px solid silver",
                    }}
                />
                <Grid container spacing={2} style={{ marginLeft: "12px", display: 'flex', flexWrap: 'wrap', marginTop: "3%" }}>
                    <div style={{ width: '48%', marginRight: "1%" }}>
                        <TextField
                            label="Address"
                            name='Address'
                            value={permanentAddress.address}
                            style={{
                                fontSize: '16px',
                                marginBottom: "20px",
                                width: "100%"
                            }}
                            onChange={(e) => setPermanentAddress({ ...permanentAddress, address: e.target.value })}
                        />
                    </div>
                    <div style={{ width: '48%' }}>
                        <Autocomplete
                            freeSolo
                            id="country"
                            options={countries.map(country => ({ label: country.name, id: country.isoCode }))}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.id}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                            }}
                            onChange={handleCountryChange}
                            renderInput={(params) => <TextField {...params} label="Country" />}
                        />
                    </div>
                    <div style={{ width: '48%', marginRight: '1%' }}>
                        <Autocomplete
                            freeSolo
                            id="state"
                            options={states.map(states => ({ label: states.name, id: states.isoCode }))}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.id}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                            }}
                            onChange={handleStateChange}
                            renderInput={(params) => <TextField {...params} label="State" />}
                        />
                    </div>
                    <div style={{ width: '48%' }}>
                        <Autocomplete
                            freeSolo
                            id="city"
                            options={cities}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="City" />}
                        />
                    </div>
                    <div style={{ width: '48%', marginRight: '1%' }}>
                        <TextField
                            label="ZIP"
                            value={zip}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                                marginTop: "20px",
                                width: '100%'
                            }}
                            onChange={handleZipChange}
                            error={!isZipCodeValid()}
                            helperText={!isZipCodeValid() && 'Invalid ZIP code for the selected country'}
                        />
                    </div>
                </Grid>
            </div>


            <div style={{ display: 'flex', marginLeft: '80%', marginBottom: "-3px" }}>
                <input
                    type="checkbox"
                    checked={isSameAsPermanent}
                    onChange={handleCheckboxChange}
                />
                <Typography variant="body2" style={{ marginLeft: '2%' }}>
                    <b>Same as Permanent Address</b>
                </Typography>
            </div >
            <div className='Current_Address'>
                <Typography variant="h6" onClick={() => handleBackClick()} style={{ fontSize: '16px' }}>
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
                <Grid container spacing={2} style={{ marginLeft: "12px", display: 'flex', flexWrap: 'wrap', marginTop: "3%" }}>
                    <div style={{ width: '48%', marginRight: '1%' }}>
                        <TextField
                            label="Address"
                            name='Address'
                            value={currentAddress.address}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                                width: "100%",
                                marginBottom: "20px"
                            }}
                            onChange={(e) => handleCurrentAddressChange('address', e.target.value)}
                        />
                    </div>
                    <div style={{ width: '48%' }}>
                        <Autocomplete
                            freeSolo
                            id="country1"
                            options={countries.map(country => ({ label: country.name, id: country.isoCode }))}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.id}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                                width: "100%"
                            }}
                            onChange={handleCountryChange}
                            renderInput={(params) => <TextField {...params} label="Country" />}
                        />
                    </div>
                    <div style={{ width: '48%', marginRight: '1%' }}>
                        <Autocomplete
                            freeSolo
                            id="state1"
                            options={states.map(states => ({ label: states.name, id: states.isoCode }))}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.id}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                                width: "100%"
                            }}
                            onChange={handleStateChange}
                            renderInput={(params) => <TextField {...params} label="State" />}
                        />
                    </div>
                    <div style={{ width: '48%' }}>
                        <Autocomplete
                            freeSolo
                            id="city"
                            options={cities}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                                width: "100%"
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="City" />}
                        />
                    </div>
                    <div style={{ width: '48%', marginRight: '1%' }}>
                        <TextField
                            label="ZIP"
                            value={zip}
                            style={{
                                fontSize: '16px',
                                borderRadius: "10px",
                                marginTop: "20px",
                                width: '100%'
                            }}
                            onChange={handleZipChange}
                        />
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
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl>
                            <RadioGroup
                                name="productType"
                                value={productType}
                                onChange={handleProductTypeChange}
                            >
                                <FormControlLabel value="Prakat Product" control={<Radio />} label="Prakat Product" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl style={{ textAlign: 'right', marginLeft: "25px" }}>
                            <RadioGroup
                                name="productType"
                                value={productType}
                                onChange={handleProductTypeChange}
                            >
                                <FormControlLabel value="client Product" control={<Radio />} label="Client Product" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: '20px' }}>
                        <Dropdown
                            value={workMode}
                            onChange={handleWorkModeChange}
                            title={<Typography><span style={{ color: "red" }}>*</span>Work Mode</Typography>}
                            dropdownName="WorkMode"
                            name='workMode'
                            options={[
                                { label: 'On-site', value: 'On-site' },
                                { label: 'Remote', value: 'Remote' },
                                { label: 'Hybrid', value: 'Hybrid' },
                            ]}
                            style={{
                                border: "1px solid #008080",
                                borderRadius: "5px",
                                width: "600px", // Set the width to 100%
                                marginBottom: "2px",
                                marginTop: "3px"
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
                    <b>Professional Data</b>
                </Typography>
                <div style={{ width: "100%", margin: "auto", marginBottom: "18px", border: "1px solid silver" }} />

                <div className="UserDetails" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid container spacing={2}>
                        {/* Left Side */}
                        <Grid item xs={12} lg={6} md={6} sm={12} sx={{ marginTop: '8px', marginBottom: '20px', width: { xs: '100%', lg: '50%' } }}>
                            <Grid style={{ marginTop: '8px', marginBottom: '20px' }} sx={{ width: "100%" }}>
                                <Autocomplete
                                    freeSolo
                                    id="Manager_Name"
                                    options={masterdata4}

                                    getOptionLabel={(option) => option.name.common}
                                    style={{
                                        ...style.TimesheetTextField,

                                        borderRadius: "10px",
                                        width: "100%",
                                    }}
                                    onChange={handleManagerChange}
                                    renderInput={(params) => <TextField {...params} label={
                                        <Typography>
                                            <span style={{ color: "red" }}>*</span>Manager Name
                                        </Typography>
                                    } />}
                                />
                                {validationErrors.ManagerName && (
                                    <Box>
                                        <Typography
                                            color="error">{validationErrors.ManagerName}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>

                            <Dropdown
                                value={formData.employeeType}
                                onChange={handleEmptypeChange}
                                title={<Typography>
                                    <span style={{ color: "red", width: "100%" }}>*</span>employee Type
                                </Typography>
                                }
                                dropdownName="Employee Type"
                                name='EMPType'
                                options={masterdata3 || []}
                                style={{
                                    ...style.TimesheetTextField,
                                    border: "1px solid silver",
                                    borderRadius: "5px",
                                    marginBottom: "10px",
                                    marginTop: "10px",
                                    width: "100%"
                                }}
                            />
                            {validationErrors.employeeType && (
                                <Box>
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.employeeType}
                                    </Typography>
                                </Box>
                            )}

                            <Dropdown
                                value={""}
                                onChange={""}
                                title={<Typography>
                                    <span style={{ color: "red", width: "100%" }}>*</span>Employeed By
                                </Typography>
                                }
                                dropdownName="Employee by"
                                name='EMPType'
                                options={masterdata3 || []}
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
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.employeeType}
                                    </Typography>
                                </Box>
                            )}

                            <Dropdown
                                value=""
                                onChange=""
                                title={<Typography>
                                    <span style={{ color: "red", width: "100%" }}>*</span>Office Location
                                </Typography>
                                }
                                dropdownName="Office Location"
                                name='Office_Loc'
                                style={{
                                    ...style.TimesheetTextField,
                                    border: "1px solid silver",
                                    borderRadius: "5px",
                                    marginBottom:"20px"
                                }}
                                options={[
                                    { value: '', label: '' }
                                ]}
                            />
                            {validationErrors.OfficeLocation && (
                                <Box>
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.OfficeLocation}
                                    </Typography>
                                </Box>
                            )}
                            <Dropdown
                                value={formData.band}
                                onChange={handleBandChange}
                                title={<Typography>
                                    <span style={{ color: "red", width: "100%" }}>*</span>Band
                                </Typography>
                                }
                                dropdownName="Band"
                                name='Band'
                                style={{
                                    ...style.TimesheetTextField,
                                    border: "1px solid silver",
                                    borderRadius: "5px",
                                }}
                                options={masterdata2}
                            />
                            {validationErrors.band && (
                                <Box>
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.band}
                                    </Typography>
                                </Box>
                            )}
                            <Dropdown
                                value={formData.Status}
                                onChange={(selectedOption) => setFormData({ ...formData, Status: selectedOption.value })}
                                title={<Typography>
                                    <span style={{ color: "red", width: "100%" }}>*</span>Status
                                </Typography>
                                }
                                dropdownName="Status"
                                name='Status'
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
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.Status}
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                        {/* Right Side */}
                        <Grid item xs={12} lg={6} md={6} sm={12} sx={{ marginTop: '17px', marginBottom: '28px' }}>
                            <Dropdown
                                value=""
                                onChange=""
                                title={<Typography>
                                    <span style={{ color: "red", width: "100%" }}>*</span>Designation
                                </Typography>
                                }
                                dropdownName="Designation"
                                name='Designation'
                                style={{
                                    ...style.TimesheetTextField,
                                    border: "1px solid silver",
                                    borderRadius: "5px",
                                }}
                                options={[
                                    { value: '', label: '' }
                                ]}
                            />
                            {validationErrors.Designation && (
                                <Box>
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.Designation}
                                    </Typography>
                                </Box>
                            )}
                            <Autocomplete
                                multiple
                                id='skill'
                                options={skills}
                                style={{ marginTop: "25px" }}
                                // sx={{
                                //     ...style.TimesheetTextField,
                                //     backgroundColor: '#fff',
                                //     borderRadius: "5px"
                                // }}
                                disableCloseOnSelect
                                filterSelectedOptions
                                getOptionLabel={(option) => option.skillName}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        {selected}
                                        {option.skillName}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <>
                                        <TextField
                                            {...params}
                                            onChange={handleChange}
                                            label={<Typography><span style={{ color: "red", width: "100%" }}>*</span>Skills</Typography>}
                                            InputProps={{
                                                ...params.InputProps
                                            }}
                                            style={{
                                                ...style.TimesheetTextField,
                                                border: "1px solid silver",
                                                borderRadius: "5px",
                                                marginBottom:'20px',
                                            }}
                                        />
                                    </>
                                )}
                            />
                            {validationErrors.skill && (
                                <Box>
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.skill}
                                    </Typography>
                                </Box>
                            )}
                            <Dropdown
                                value={formData.Work_loc}
                                onChange={handleWorkLocationChange}
                                title={<Typography>
                                    <span style={{ color: "red", width: "100%" }}>*</span>Work Location
                                </Typography>
                                }
                                dropdownName="Work Location"
                                name='Work_loc'
                                style={{
                                    ...style.TimesheetTextField,
                                    border: "1px solid silver",
                                    borderRadius: "5px",
                                }}
                                options={masterdata5}
                            />
                            {validationErrors.Location && (
                                <Box>
                                    <Typography
                                        color="error"
                                        style={{}}
                                    >
                                        {" "}
                                        {validationErrors.Location}
                                    </Typography>
                                </Box>
                            )}
                            <TextField
                                label={<Typography>
                                    <span style={{ color: "red", width: "100%" }}>*</span>Employee ID
                                </Typography>
                                }
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
                                    <Typography
                                        color="error">{validationErrors.employeeID}</Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>

            <Grid container spacing={2} style={{ marginLeft: "5px", marginTop: "3px" }}>
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
                                placeholder="Employee CTC"
                                id='CTC'
                                name='CTC'
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                    width: "100%",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    classes: { focused: 'green-border' },
                                }}
                            />
                            {validationErrors.CTC && (
                                <Box>
                                    <Typography
                                        color="error">{validationErrors.CTC}</Typography>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="A/C No."
                                placeholder="A/C No."
                                id='ACNo'
                                name='ACNo'
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                    width: "100%",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    classes: { focused: 'green-border' },
                                }}
                            />
                            {validationErrors.ACNo && (
                                <Box>
                                    <Typography
                                        color="error">{validationErrors.ACNo}</Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                {/* Right Side */}
                <Grid item xs={12} sm={6} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name as per Bank"
                                placeholder="Name as per Bank"
                                id='Bank'
                                name='Bank'
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                    width: "100%",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    classes: { focused: 'green-border' },
                                }}
                            />
                            {validationErrors.Bank && (
                                <Box>
                                    <Typography
                                        color="error">{validationErrors.Bank}</Typography>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="IFSC Code"
                                placeholder="IFSC Code"
                                id='IFSCCode'
                                name='IFSCCode'
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,
                                    borderRadius: "10px",
                                    width: "100%",
                                }}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    classes: { focused: 'green-border' },
                                }}
                            />
                            {validationErrors.IFSCCode && (
                                <Box>
                                    <Typography
                                        color="error">{validationErrors.IFSCCode}</Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ textAlign: "right", marginTop: "30px" }}>
                <Button variant="contained"
                    color="primary"
                    style={{ marginRight: "10px", width: '200px' }}
                    onClick={handleClearAll}>
                    Clear All
                </Button>
                <Button variant="contained"
                    color="primary"
                    style={{ width: '200px' }}
                    onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div >


    )
}