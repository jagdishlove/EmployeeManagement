import React, { useState, useEffect } from 'react';
import { IconButton, Button, Typography, Grid, Box, TextField, Autocomplete } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Dropdown from '../../forms/dropdown/dropdown';
import { useTheme } from "@mui/material/styles";
import { TimesheetStyle } from "../../../pages/timesheet/timesheetStyle";
import { useSelector } from 'react-redux';

export default function CreateUser() {
    const theme = useTheme();
    const style = TimesheetStyle(theme);


    // const MyForm = () => {
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        // Fetch list of countries
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => setCountries(data));

        // Fetch list of states based on the selected country
        if (country) {
            fetch(`https://api.example.com/states?country=${country}`)
                .then(response => response.json())
                .then(data => setStates(data));
        }
    }, [country]);

    useEffect(() => {
        // Fetch list of cities based on the selected state
        if (state) {
            fetch(`https://api.example.com/cities?state=${state}`)
                .then(response => response.json())
                .then(data => setCities(data));
        }
    }, [state]);

    // }
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
        firstName: '',
        email: '',
        number: '',
        gender: '',
        lastName: '',
        DOB: "",
        DOJ: "",
        CTC: "",
        Status: "",
        employeeType: "",
        employeeID: "",
    });

    const handleBackClick = () => {
        console.log('Handle back clicked!');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSkillChange = (selectedOption) => {
        setFormData({
            ...formData,
            skill: selectedOption.target.value
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
            employeeType: selectedOption.target.value
        });
    };


    const handleSave = () => {
        const { firstName, email, number, gender, lastName, DOB, DOJ, CTC, employeeID,
            employeeType, Status, band, Location, OfficeLocation, Designation, skill,
            ManagerName, ACNo, Bank, IFSCCode, AadhaarNo } = formData;
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

        if (Object.keys(errors).length === 0) {
            // Proceed with saving data
        }
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
            <div style={{ textAlign: "right" }}>
                <Button style={{ border: "1px solid #008080" }}>
                    <BorderColorOutlinedIcon /> Edit
                </Button>
            </div>

            {/* User Details */}
            <div style={{ margin: '20px' }}>
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
                <div className="UserDetails" style={{ display: 'flex', marginTop: '20px' }}>
                    <Grid container spacing={2} style={{ margin: "" }}>
                        {/* Left Side */}
                        <Grid item xs={6}>
                            <TextField
                                label="Enter User First Name"
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
                                label="Enter Email Address"
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
                                label="Enter Mobile Number"
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
                                name="Enter UAN No."
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
                                    label="DOB(DD/MM/YYYY)"
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
                                    label="Date of Joining"
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
                            <TextField
                                label="Enter Aadhaar No."
                                name="Enter Aadhaar No."
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
                </div>

                <Typography variant="h6" onClick={() => handleBackClick()}>
                    <b> Address</b>
                </Typography>
                <div
                    style={{
                        width: "100%",
                        margin: "auto",
                        marginBottom: "18px",
                        border: "1px solid silver",
                    }}
                />
                <div style={{ float: 'left', marginRight: '20px' }}>
                    <TextField
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <br />
                    <Autocomplete
                        id="country"
                        options={countries}
                        getOptionLabel={(option) => option.name.common}
                        style={{ width: 200 }}
                        onChange={(e, value) => setCountry(value?.name.common || '')}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                    />
                    <br />
                    <Autocomplete
                        id="state"
                        options={states}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 200 }}
                        onChange={(e, value) => setState(value?.name || '')}
                        renderInput={(params) => <TextField {...params} label="State" />}
                    />
                </div>

                <div style={{ float: 'left' }}>
                    <Autocomplete
                        id="city"
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 200 }}
                        onChange={(e, value) => setCity(value?.name || "")}
                        renderInput={(params) => <TextField {...params} label="City" />}
                    />

                    <br />
                    <TextField
                        label="ZIP"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    /><br />
                    <p>Selected City: {city}</p>
                </div>
                {/* </div> */}



                {/* <div style={{margin:'20px'}}> */}
                <Typography variant="h6" onClick={() => handleBackClick()}>
                    <b> Professional Data </b>
                </Typography>
                <div
                    style={{
                        width: "100%",
                        margin: "auto",
                        marginBottom: "18px",
                        border: "1px solid silver",
                    }}
                />
                <div className="UserDetails" style={{ display: 'flex', marginTop: '20px' }}>
                    <Grid container spacing={2}>
                        {/* Left Side */}
                        <Grid item xs={12} lg={6} md={2} >
                            <Grid style={{ marginTop: '8px', marginBottom: '20px' }} sx={{ width: 587 }}>
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
                                    renderInput={(params) => <TextField
                                        {...params}
                                        label="Manager Name"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }} />}

                                />
                                {validationErrors.ManagerName && (
                                    <Box>
                                        <Typography
                                            color="error"
                                            style={{}}
                                        >
                                            {" "}
                                            {validationErrors.ManagerName}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>

                            <Grid style={{ marginTop: '20px', marginBottom: '20px' }}>
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
                                        marginTop: "10px"
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

                            </Grid>
                            <Grid style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Dropdown
                                    value=""
                                    onChange=""
                                    title="Office Location"
                                    dropdownName="Office Location"
                                    style={{
                                        ...style.TimesheetTextField,
                                        border: "1px solid silver",
                                        borderRadius: "5px",
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
                            </Grid>
                            <Grid style={{ marginTop: '20px', marginBottom: '20px' }}>
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
                                        <Typography
                                            color="error"
                                            style={{}}
                                        >
                                            {" "}
                                            {validationErrors.band}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Dropdown
                                    value={formData.Status}
                                    onChange={(selectedOption) => setFormData({ ...formData, Status: selectedOption.value })}
                                    title="Status"
                                    dropdownName="Status"
                                    style={{
                                        ...style.TimesheetTextField,
                                        border: "1px solid silver",
                                        borderRadius: "5px",
                                        marginBottom: "10px",
                                        marginTop: "10px"
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
                        </Grid>
                        {/* Right Side */}
                        <Grid item xs={6}>
                            <Grid style={{ marginTop: '10px', marginBottom: '20px' }}>
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
                            </Grid>
                            <Grid style={{ marginTop: '20px', marginBottom: '20px' }}>
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
                                        <Typography
                                            color="error"
                                            style={{}}
                                        >
                                            {" "}
                                            {validationErrors.skill}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Dropdown
                                    value=""
                                    onChange=""
                                    title="Work Locaton"
                                    dropdownName="Work Location"
                                    style={{
                                        ...style.TimesheetTextField,
                                        border: "1px solid silver",
                                        borderRadius: "5px",
                                    }}
                                    options={[
                                        { value: '', label: '' }
                                    ]}
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
                            </Grid>
                            <Grid style={{ marginTop: '18px', marginBottom: '20px' }}>
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
                                        <Typography
                                            color="error">{validationErrors.employeeID}</Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <Grid container spacing={2}>
                    <Typography variant="h6"
                        onClick={() => handleBackClick()}>
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
                        {/* Left side */}
                        <Grid style={{ marginTop: '3px', marginBottom: '3px' }}>
                            <TextField
                                label="Employee CTC"
                                placeholder="Employee CTC"
                                id='CTC'
                                name='CTC'
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,

                                    borderRadius: "10px",

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
                        <Grid style={{ marginTop: '3px', marginBottom: '3px' }}>
                            <TextField
                                label="A/C No."
                                placeholder="A/C No."
                                id='CTC'
                                name='CTC'
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,

                                    borderRadius: "10px",

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
                    {/* //Right Side */}
                    <Grid style={{ width: "603", marginLeft: "20px", marginTop: "18px" }}>
                        <Grid style={{ marginRight: "200px" }}>
                            <TextField
                                label="Name as per Bank"
                                placeholder="Name as per Bank"
                                id='CTC'
                                name='CTC'
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,

                                    borderRadius: "10px",
                                    width: "270%"

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

                        <Grid style={{ marginTop: '3px', marginBottom: '3px' }}>
                            <TextField
                                label="IFSC Code"
                                placeholder="IFSC Code"
                                id='CTC'
                                name='CTC'
                                onChange={handleInputChange}
                                style={{
                                    ...style.TimesheetTextField,

                                    borderRadius: "10px",
                                    width: "140%"

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

                <div style={{ textAlign: "right", marginTop: "30px" }}>
                    <Button variant="contained" color="primary" style={{ marginRight: "10px", width: '200px' }}>
                        Clear All
                    </Button>
                    <Button variant="contained"
                        color="primary"
                        style={{ width: '200px' }}
                        onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div >
    )
}