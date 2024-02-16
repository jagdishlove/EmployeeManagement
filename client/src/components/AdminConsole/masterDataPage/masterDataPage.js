import {  Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import icon from '../../../assets/Featured icon.svg'
import { CreateBandlData, CreateDesignationData, CreateDomine, CreateManageHoliday, CreateOfficeLocationnData, CreateSkillData, GetAllBandData, GetAllDesignationData, GetAllDomines, GetAllHolidays, GetAllOfficeLocationData, GetAllSkillData, GetBand, GetHoliday, GetOfficeLocation, UpdateBandlData, UpdateDesignationData, UpdateDomine, UpdateManageHoliday, UpdateOfficeLocationnData, UpdateSkillData,GetAllJobTypeData, CreateJobTypeData, UpdateJobType } from '../../../redux/actions/masterData/masterDataAction';
import { Country, State, City } from 'country-state-city';
import { postcodeValidator } from 'postcode-validator';
import dayjs from 'dayjs';
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function MasterDataPage() {
    const designations = [
        { id: 1, name: 'Manager' },
        { id: 2, name: 'Developer' },
        { id: 3, name: 'Designer' },
        { id: 4, name: 'Analyst' },
      ];
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false);
  const [dialog, setDialog] = useState(false)
  const [open ,setOpen]  = useState(false)
  const [enable, setEnable] = useState(false)
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [bandDialog, setBandDialog] = useState(false);
  const [holidayDialog, setHolidayDialog] = useState(false);
  const [desginationEdit, setDesugnationEdit] = useState(false)
  const [desginationDisable, setDesignationDisable] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('');
  const [changeData,setChnageData] = useState('')
  const [chnageDataType, setChangeDataType] = useState('')
  const [chnageDataId, setChnageDataId] = useState('')
  const [value, setValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countryCode, setCountryCode] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [designationExpand, setDesignatonExpand] = useState(true)
  const [skillExpand, setSkillExpand] = useState(false)
  const [officeLocationExpand, setOfiiceLocationExpand] = useState(false)
  const [bandExpand, setBandExpand] = useState(false)
  const [clientOfficeLocationExpand, setClientOfficeLocationExpand] = useState(false);
  const [jobTypeExpand, setJobTypeExpand] = useState(false);
  const [manageHolidayExpand, setManageHolidayExpand] = useState(false);
  const [clientDetailsExpand, setClientDetailsExpand] = useState(false);
  const [domineExpand, setDomineExpand] = useState(false);
  const [errors, setErrors]  = useState({})
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch();
  const [officeData, setOfficeData] = useState({
    officeAddress: '',
    phoneNumber: '',
    country: '',
    state:'',
    city: '',
    postalCode: '',
  });

  const [bandFormData, setBandFormData] = useState({
    bandName:'',
    minimumCtc:'',
    maximumCtc:''

  })

  const [holidayFormData, setHolidayFormData] = useState({
    holidayType:'',
    holidayName :'',
  })



  const masterData = useSelector(
    (state) => state.persistData.masterData
  );
  const skillData = useSelector(
    (state) => state?.nonPersist?.userDetails?.skillData
  );
  const jobTypeData = useSelector(
    (state) => state?.nonPersist?.userDetails?.jobTypeData
  );


  const designationData = useSelector(
    (state) => state?.nonPersist?.userDetails?.designationData
  )
  const bandData = useSelector(
    (state) => state?.nonPersist?.userDetails?.bandData
  )

  const officeLocationData = useSelector(
    (state) => state?.nonPersist?.userDetails?.officeLocationData
  )

  const officeLocation = useSelector(
    (state) => state?.nonPersist?.userDetails?.officeLocation
  )

  const bandByID = useSelector(
    (state) => state?.nonPersist?.userDetails.bandValue
  )

  const holidayData = useSelector(
    (state) =>  state?.nonPersist?.userDetails?.holidayData
  )

  const holiday = useSelector(
    (state) => state?.nonPersist?.userDetails?.holiday
  )

  const domineData = useSelector(
    (state) =>  state?.nonPersist?.userDetails?.domineData
  )


  const handleBack = () => {
    navigate(-1)
  }

  const cancleHandler = () => {
    setIsOpenCalender(false);
  };

  const handleExpand = (type) => {
    if(type === 'designation'){
        setDesignatonExpand(!designationExpand)
    }  if (type === 'skill'){
        setSkillExpand(!skillExpand)

    }  if (type === 'officeLocation'){
        setOfiiceLocationExpand(!officeLocationExpand)
    }  if (type === 'band'){
        setBandExpand(!bandExpand)
    }  if (type ==='clientOfficeLocation'){
        setClientOfficeLocationExpand(!clientOfficeLocationExpand)
    }  if ( type === 'manageHoliday'){
        setManageHolidayExpand(!manageHolidayExpand)
    } if (type === 'clientDetails'){
        setClientDetailsExpand(!clientDetailsExpand)
    } 
    
    if (type === 'domine'){
        setDomineExpand(!domineExpand)
    }
    if(type === 'jobType')
    setJobTypeExpand(!jobTypeExpand)
    
  }

  const ActionList = () => {
    return (
      <Box>
        <Button onClick={cancleHandler}>Okay</Button>
        <Button onClick={cancleHandler}>Cancel</Button>
      </Box>
    );
  };
  useEffect(() => {
    if (officeLocation) {
      setOfficeData({
        officeAddress: officeLocation.officeAddress || '',
        phoneNumber: officeLocation.phoneNumber || '',
        country: officeLocation.country || '',
        state: officeLocation.state || '',
        city: officeLocation.city || '',
        postalCode: officeLocation.postalCode || '',
      });
    } if(bandByID){
        setBandFormData({
            bandName:bandByID.bandName || '',
            maximumCtc:bandByID.maximumCtc || '',
            minimumCtc:bandByID.minimumCtc || '',
        })
    }
    if(holiday) {
        setHolidayFormData({
            holidayName:holiday.name || '',
            holidayType:holiday.holidayType || '',
        })
        setSelectedDate(dayjs(holiday.date))
    }
  }, [officeLocation,dispatch,bandByID,holiday]);

  const handlechange = (e) => {
    setValue(e.target.value)
  }
  const handleDesignation = (type , data , id , status) => {
    if (status === "INACTIVE"){
        if(type === 'band'){
            dispatch(GetBand(id))
        }
        if(type === 'holiday'){
            dispatch(GetHoliday(id))
        }
        if(type === 'officeLocation'){
            dispatch(GetOfficeLocation(id))
        }
        setEnable(true)
        setChnageDataId(id)
        setChangeDataType(type)
        setValue(data)  
    } else{
    setOpenDialog(true);
    setDesugnationEdit(false)
    setDesignationDisable(false)
    setChnageDataId(id)
    setChnageData(data)
    setChangeDataType(type)
    setValue(data)  
    }  
}

  const handleEditDesignation = (type) => {

    if(type === "officeLocation"){
        setOpen(true)
        dispatch(GetOfficeLocation(chnageDataId))
        setChangeDataType(type)
        setEdit(true)
    } else if(type === "band") {
        setBandDialog(true)
        setChangeDataType(type)
        setEdit(true)
        dispatch(GetBand(chnageDataId))
    }else if (type ==="holiday") {
        setHolidayDialog(true)
        dispatch(GetHoliday(chnageDataId))
        setEdit(true)
    }else{
        setDesugnationEdit(true)
    }
    
    
  };
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setOpen(false)
    setDialog(false)
    setValue('')
    setEnable(false)
    setBandDialog(false)
    setHolidayDialog(false)
    setOfficeData({
        officeAddress: '',
        phoneNumber: '',
        country: '',
        state:'',
        city: '',
        postalCode: '',
      });
      setBandFormData({
        bandName:'',
        minimum:'',
        maximum:''
      })
      setHolidayFormData({
        holidayName:'',
        holidayType:'',
      })
      setSelectedDate(dayjs())
      setErrors({})
  }


  const handleDisable = (type) => {
    setDesignationDisable(true)
    if(type === 'officeLocation'){
        dispatch(GetOfficeLocation(chnageDataId))
    }
    if(type === 'band'){
        dispatch(GetBand(chnageDataId))
    }
    if (type === 'holiday'){
        dispatch(GetHoliday(chnageDataId))
    }
  };

  const handleAddDesignationCancle = () => {
    setDesugnationEdit(false)
    setDesignationDisable(false)
  }

  useEffect(() => {
    if(skillExpand){
        dispatch(GetAllSkillData());
    }
    if(jobTypeExpand){
        dispatch(GetAllJobTypeData());
    }
    if (designationExpand) {
      dispatch(GetAllDesignationData());
    }  
    if (bandExpand){
        dispatch(GetAllBandData());
    } 
    if (officeLocationExpand) {
        dispatch(GetAllOfficeLocationData());
    }
    if(manageHolidayExpand){
        dispatch(GetAllHolidays());
    }
    if(domineExpand){
        dispatch(GetAllDomines())
    }

    
  }, [designationExpand, officeLocationExpand,bandExpand,skillExpand,manageHolidayExpand,domineExpand,jobTypeExpand]);
  


  const handleAdd = (type) => {
    setDialogTitle(`${type}`);
    if(type === 'officeLocation') {
        setOpen(true)
    } else if (type === 'band') {
        setBandDialog(true)
        setChangeDataType(type)
    }else if (type === 'holiday') {
        setHolidayDialog(true)
        setEdit(false)
        setChangeDataType(type)
    }else{
        setDialog(true);
    }
  };
  const handleOfficeChange = (field, data, value) => {
    setOfficeData((prevFormData) => ({
      ...prevFormData,
      [field]: data,
    }));

    if (field === "phoneNumber") {
        setOfficeData((prevFormData) => ({
            ...prevFormData,
            phoneNumber: data,
          }));
    }
    if(field === 'country') {
        setSelectedCountry(value)
        setOfficeData((prevFormData) => ({
            ...prevFormData,
            country: value?.name,
          }));
        setCountryCode(value?.isoCode)
    } else if (field === "state") {
        setSelectedState(value)
        setOfficeData((prevFormData) => ({
            ...prevFormData,
            state: value?.name,
          }));
    } else if ( field === "city") {
        setOfficeData((prevFormData) => ({
            ...prevFormData,
            city: value?.name,
          }));
    }
  };

  const hnadleBandChnage = (field, data) => {
    setBandFormData((prevFormData) => ({
        ...prevFormData,
        [field]: data,
      }));

      if (field === "holidayType") {
        setBandFormData((prevFormData) => ({
            ...prevFormData,
            holidayType: data,
        }));
    }
        if (field === "holidayName") {
            setBandFormData((prevFormData) => ({
                ...prevFormData,
                holidayName: data,
        }));
    }
  }

  const handleHolidayChnage = (field, data) => {
    setHolidayFormData((prevFormData) => ({
        ...prevFormData,
        [field]: data,
      }));
    } 


const handleSubmit = async (type, id, status) => {

  const validationErrors = validateForm(type);
  if (Object.keys(validationErrors).length == 0) {
    setErrors({});
    try {
      if (type === 'skill') {
        const payload = {
          skillId: id ? id : "",
          skillName: value,
        };
        if (status) {
            payload.status = status;
        }
        await dispatch(CreateSkillData(payload));
        await dispatch(GetAllSkillData());
        setValue('');
      } else if (type === 'jobType') {
        const payload = {
            jobId: id ? id : "",
            jobType: value,
        };
        if (status) {
            payload.status = status; 
        }
        await dispatch(CreateJobTypeData(payload));
        await dispatch(GetAllJobTypeData());
        setValue('');
      }else if (type === 'band') {
        const payload = {
            bandId: id ? id : "",
            bandName: bandFormData.bandName,
            minimumCtc: bandFormData.minimumCtc,
            maximumCtc: bandFormData.maximumCtc,
          };
          if (status) {
            payload.status = status;
          }
        await dispatch(CreateBandlData(payload));
        await dispatch(GetAllBandData());
      } else if (type === 'designation') {
        const payload = {
          designationId: id ? id : "",
          designationName: value,
        };
        if (status) {
            payload.status = status;
          }
        await dispatch(CreateDesignationData(payload));
        await dispatch(GetAllDesignationData());
      } else if (type === 'officeLocation') {
        const payload = {
          locationId: id ? id : "",
          officeAddress: officeData.officeAddress,
          phoneNumber: officeData.phoneNumber,
          country: officeData.country,
          state: officeData.state,
          city: officeData.city,
          postalCode: officeData.postalCode,
        };
        if (status) {
            payload.status = status;
          }
        await dispatch(CreateOfficeLocationnData(payload));
        await dispatch(GetAllOfficeLocationData());
      } else if(type === "holiday") {
        const payload ={
            id: id ? id : "",
            date : selectedDate,
            holidayType:holidayFormData.holidayType,
            name:holidayFormData.holidayName
        }
        if (status) {
            payload.status = status;
          }
        await dispatch(CreateManageHoliday(payload));
        await dispatch(GetAllHolidays())
      } else if (type === 'domine') {
        const payload = {
            domainId: id ? id : "",
            domainName: value,
          };
          if (status) {
              payload.status = status;
          }
          await dispatch(CreateDomine(payload))
          await dispatch(GetAllDomines())
      }
    }finally {
      setDialog(false); 
      setOpenDialog(false);
      setOpen(false);
      setBandDialog(false)
      setHolidayDialog(false)
      setValue('');
      setChangeDataType('');
      setChnageDataId('');
      setOfficeData({
        officeAddress: '',
        phoneNumber: '',
        country: '',
        state:'',
        city: '',
        postalCode: '',
      });
      setBandFormData({
        bandName:'',
        minimum:'',
        maximum:'',
      })
      setHolidayFormData({
        holidayName:'',
        holidayType:'',
      })
      setSelectedDate(dayjs())
      setEnable(false)
    }

  } else {
    setErrors(validationErrors);
  }
};

const handleUpdate = async (type, id, status) => {


  const validationErrors = validateForm(type);
  if (Object.keys(validationErrors).length == 0) {
    setErrors({});
    try {
      if (type === 'skill') {
        const payload = {
          skillId: id ? id : "",
          skillName: value,
        };
        if (status) {
            payload.status = status;
        }
        await dispatch(UpdateSkillData(payload));
        await dispatch(GetAllSkillData());
        setValue('');
      } else if (type === 'band') {
        const payload = {
            bandId: id ? id : "",
            bandName: bandFormData.bandName,
            minimumCtc: bandFormData.minimumCtc,
            maximumCtc: bandFormData.maximumCtc,
          };
          if (status) {
            payload.status = status;
          }
        await dispatch(UpdateBandlData(payload));
        await dispatch(GetAllBandData());
      } else if (type === 'designation') {
        const payload = {
          designationId: id ? id : "",
          designationName: value,
        };
        if (status) {
            payload.status = status;
          }
        await dispatch(UpdateDesignationData(payload));
        await dispatch(GetAllDesignationData());
      } else if (type === 'officeLocation') {
        const payload = {
          locationId: id ? id : "",
          officeAddress: officeData.officeAddress,
          phoneNumber: officeData.phoneNumber,
          country: officeData.country,
          state: officeData.state,
          city: officeData.city,
          postalCode: officeData.postalCode,
        };
        if (status) {
            payload.status = status;
          }
        await dispatch(UpdateOfficeLocationnData(payload));
        await dispatch(GetAllOfficeLocationData());
      } else if(type === "holiday") {
        const payload ={
            id: id ? id : "",
            date : selectedDate,
            holidayType:holidayFormData.holidayType,
            name:holidayFormData.holidayName
        }
        if (status) {
            payload.status = status;
          }
        await dispatch(UpdateManageHoliday(payload));
        await dispatch(GetAllHolidays())
      } else if (type === 'domine') {
        const payload = {
            domainId: id ? id : "",
            domainName: value,
          };
          if (status) {
              payload.status = status;
          }
          await dispatch(UpdateDomine(payload))
          await dispatch(GetAllDomines())
      } else if (type === 'jobType') {
        const payload = {
            jobId: id ? id : "",
            jobType: value,
        };
        if (status) {
            payload.status = status; 
        }
        await dispatch(UpdateJobType(payload));
        await dispatch(GetAllJobTypeData());
        setValue('');
      }
    }finally {
      setDialog(false); 
      setOpenDialog(false);
      setOpen(false);
      setBandDialog(false)
      setHolidayDialog(false)
      setValue('');
      setChangeDataType('');
      setChnageDataId('');
      setOfficeData({
        officeAddress: '',
        phoneNumber: '',
        country: '',
        state:'',
        city: '',
        postalCode: '',
      });
      setBandFormData({
        bandName:'',
        minimum:'',
        maximum:'',
      })
      setHolidayFormData({
        holidayName:'',
        holidayType:'',
      })
      setSelectedDate(dayjs())
      setEnable(false)
    }

  } else {
    setErrors(validationErrors);
  }
};

  const getStates = (countryCode) => {
    const states = State.getStatesOfCountry(countryCode);
    return states;
  };
  
  const getCities = (countryCode, stateCode) => {
    const cities = City.getCitiesOfState(countryCode, stateCode);
    return cities;
  };

  const validateForm = (type) => {
    const errors = {};
  
    if (type === 'officeLocation') {
      if (!officeData.officeAddress) {
        errors.officeAddress = "Address is required";
      }
      if (!officeData.phoneNumber) {
        errors.phoneNumber = "Phone number required";
      }
  
      if (!officeData.country) {
        errors.country = "Please select Country";
      }
  
      if (!officeData.state) {
        errors.state = "Please select State";
      }
  
      if (!officeData.city) {
        errors.city = "Please select City";
      }
  
      if (!officeData.postalCode) {
        errors.postalCode = "Postal code is required";
      } else {
        try {
          const isValid = postcodeValidator(officeData.postalCode, countryCode);
          if (!isValid) {
            errors.postalCode = "Invalid postal code";
          }
        } catch {
          errors.postalCode = "Error validating postal code";
        }
      }
    }  else if (type === 'skill' || type === 'designation') {
        if(!value){
            errors.value= `${type} are required`
        }
    }
    if (type === 'band'){
        if(!bandFormData.bandName) {
            errors.bandName = "please enter BandName"
        }
        if(!bandFormData.minimumCtc) {
            errors.minimum = "please enter mainimum Ctc"
        }
        if (!bandFormData.maximumCtc) {
            errors.maximum = "Please enter maximum Ctc";
          } else if (bandFormData.maximum <= bandFormData.minimum) {
            errors.maximum = "Maximum Ctc should be greater than minimum Ctc";
        }
    }
    if (type === 'holiday'){
        if(!holidayFormData.holidayName){
            errors.holidayName = "please enter holidayName"
        }
        if(!holidayFormData.holidayType){
            errors.holidayType = "please enter holidayType"
        }
        if(!selectedDate){
            errors.holidayDate = "Please Select date"
        }
    }
  
    return errors;
  };
  
  return (
    <>
    <Grid container alignItems="center">
      <KeyboardBackspaceIcon 
        style={{ fontSize: 30, cursor: 'pointer' }}     
        onClick={handleBack}  
      /> 
      <Typography variant='h2' component="div" sx={{ marginLeft: 1 }}>
        Master Data
      </Typography>
    </Grid>
    <div
        style={{
          width: '100%',
          margin: 'auto',
          marginBottom: '18px',
          border: '1px solid #008080',
          marginTop:'10px'
        }}
      />
    <Grid sx={{paddingLeft:'15px'}} >
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}
            onChange={() => handleExpand('designation')}
            expanded={designationExpand}
            >
            <AccordionSummary
                sx={{
                flexDirection: "row",
                "&.Mui-focusVisible": {
                    background: "none",
                },
                width: "100%",
                backgroundColor: '#008080',
                justifyContent: 'space-between',
                }}
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>Designation</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {designationExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!designationExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('designation')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        {designationData && designationData.length > 0 && (
                            <Grid container sx={{ border: "1px solid #AEAEAE", height: '156px', overflow: 'auto', padding: '10px' }} mt={2}>
                                {designationData.map((designation, index) => (
                                <Grid item key={index} sx={{ border: designation.status === "ACTIVE" ? "1.5px solid #008080" : "1.5px solid #AEAEAE", borderRadius: '15px', padding: '6px', margin: '5px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: designation.status === "ACTIVE" ? "black" : "#AEAEAE" }}>
                                    <Typography
                                    onClick={() => handleDesignation('designation', designation.designationName, designation.designationId, designation.status)}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    >
                                    {designation.designationName}
                                    </Typography>
                                </Grid>
                                ))}
                            </Grid>
                            )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}

            onChange={() => handleExpand('skill')}
            >
            <AccordionSummary
                    sx={{
                      flexDirection: "row",
                        "&.Mui-focusVisible": {
                      background: "none",
                      },
                      width: "100%",
                      backgroundColor:'#008080'
                    }} 
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>Skill</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {skillExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!skillExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('skill')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        {skillData && skillData.length > 0 && (
                        <Grid container sx={{ border: "1px solid #AEAEAE", height: skillData ? '156px' : 'auto', overflow: 'auto', padding: '10px' }} mt={2}>
                            {skillData?.map((skill, index) => (
                                <Grid item key={index} sx={{ border:skill.status === "ACTIVE" ?  "1.5px solid #008080" : "1.5px solid #AEAEAE", borderRadius: '15px', padding: '6px', margin: '5px', height: '40px',color : skill.status === "ACTIVE" ? "black" : "#AEAEAE" }}>
                                    <Typography
                                        onClick={() => handleDesignation('skill', skill.skillName, skill.skillId,skill.status)}
                                        sx={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {skill.skillName}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                        )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}

            onChange={() => handleExpand('officeLocation')}
            >
            <AccordionSummary
                    sx={{
                      flexDirection: "row",
                        "&.Mui-focusVisible": {
                      background: "none",
                      },
                      width: "100%",
                      backgroundColor:'#008080'
                    }} 
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>Office Location</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {officeLocationExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!officeLocationExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('officeLocation')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        {officeLocationData && officeLocationData.length > 0 && (
                        <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                            {officeLocationData?.map((officeLocation , index) => (
                                <Grid item key={index} sx={{ border: officeLocation.status === "ACTIVE" ?"1.5px solid #008080": "1.5px solid #AEAEAE", borderRadius: '15px', padding: '30px', margin: '5px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',cursor: 'pointer',color : officeLocation.status === "ACTIVE" ? "black" : "#AEAEAE" }}>
                                <Typography
                                    onClick={() => handleDesignation('officeLocation', officeLocation.officeAddress,officeLocation.locationId,officeLocation.status)} 
                                    sx={{
                                    textAlign:'center',
                                    }}
                                >
                                    {`${officeLocation.officeAddress} ${officeLocation.city} -${officeLocation.postalCode}, ${officeLocation.country}.`}
                                    <br/>
                                    {`Phone: ${officeLocation.phoneNumber}`}
                                </Typography>
                                </Grid>
                            ))}
                            </Grid>
                        )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}

            onChange={() => handleExpand('band')}
            >
            <AccordionSummary
                    sx={{
                      flexDirection: "row",
                        "&.Mui-focusVisible": {
                      background: "none",
                      },
                      width: "100%",
                      backgroundColor:'#008080'
                    }} 
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>Band</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {bandExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!bandExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('band')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        {bandData && bandData.length > 0 && (
                        <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                            {bandData?.map((band, index) => (
                                <Grid item key={index} sx={{ border:band.status === "ACTIVE" ?  "1.5px solid #008080" : "1.5px solid #AEAEAE", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px',color : band.status === "ACTIVE" ? "black" : "#AEAEAE" }}>
                                        <Typography
                                            onClick={() => handleDesignation('band', band.bandName, band.bandId, band.status)} 
                                            sx={{
                                            cursor: 'pointer'
                                            }}
                                        >
                                            {`${band.bandName}, CTC - ₹${band.minimumCtc} to${band.maximumCtc}`}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}

            onChange={() => handleExpand('clientOfficeLocation')}
            >
            <AccordionSummary
                    sx={{
                      flexDirection: "row",
                        "&.Mui-focusVisible": {
                      background: "none",
                      },
                      width: "100%",
                      backgroundColor:'#008080'
                    }} 
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>Client Onsite Office Location</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {clientOfficeLocationExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!clientOfficeLocationExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('band')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        {designations && designations.length > 0 && (
                        <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                            {designations?.map((designation) => (
                                <Grid item key={designation.id} sx={{ border:designation.status === "ACTIVE" ?  "1.5px solid #008080" : "1.5px solid #AEAEAE", borderRadius: '15px', padding: '6px', margin: '5px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' ,color : designation.status === "ACTIVE" ? "black" : "#AEAEAE"}}>
                                <Typography
                                    onClick={() => handleDesignation('clientOffice', designation.name)} 
                                    sx={{
                                    cursor: 'pointer'
                                    }}
                                >
                                    {designation.name}
                                </Typography>
                                </Grid>
                            ))}
                        </Grid>
                        )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}

            onChange={() => handleExpand('jobType')}
            >
            <AccordionSummary
                    sx={{
                      flexDirection: "row",
                        "&.Mui-focusVisible": {
                      background: "none",
                      },
                      width: "100%",
                      backgroundColor:'#008080'
                    }} 
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>JobType</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {jobTypeExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!jobTypeExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('jobType')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        
                        <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                            {jobTypeData?.map((job, index) => (
                                <Grid item key={index} sx={{ border:job.status === "ACTIVE" ?  "1.5px solid #008080" : "1.5px solid #AEAEAE", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px',color : job.status === "ACTIVE" ? "black" : "#AEAEAE" }}>
                                        <Typography
                                            onClick={() => handleDesignation('jobType', job.jobType, job.jobId, job.status)} 
                                            sx={{
                                            cursor: 'pointer'
                                            }}
                                        >
                                            {job.jobType}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>        
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}

            onChange={() => handleExpand('manageHoliday')}
            >
            <AccordionSummary
                    sx={{
                      flexDirection: "row",
                        "&.Mui-focusVisible": {
                      background: "none",
                      },
                      width: "100%",
                      backgroundColor:'#008080'
                    }} 
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>Manage Holiday</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {manageHolidayExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!manageHolidayExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('holiday')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        {holidayData && holidayData.length > 0 && (
                        <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                            {holidayData?.map((holiday, index) => (
                                <Grid item key={index} sx={{ border: holiday.status === "ACTIVE" ?"1.5px solid #008080": "1.5px solid #AEAEAE", borderRadius: '15px', padding: '30px', margin: '5px', height: '40px', display: 'flex', alignItems: 'center',cursor: 'pointer',color : holiday.status === "ACTIVE" ? "black" : "#AEAEAE" }}>
                                    <Typography
                                            onClick={() => handleDesignation('holiday', holiday.holidayType, holiday.id,holiday.status)} 
                                            sx={{
                                            cursor: 'pointer',
                                            textAlign:'center'
                                            }}
                                        >
                                        {`${holiday.holidayType} - ${dayjs(holiday.date).format('DD-MMM-YYYY')}`}
                                        <br/>
                                        {`${holiday.name}`}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}

            onChange={() => handleExpand('clinetDetails')}
            >
            <AccordionSummary
                    sx={{
                      flexDirection: "row",
                        "&.Mui-focusVisible": {
                      background: "none",
                      },
                      width: "100%",
                      backgroundColor:'#008080'
                    }} 
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>Client Details</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {clientDetailsExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!clientDetailsExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('clinetDetails')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        {masterData && masterData.length > 0 && (
                        <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                            {masterData?.jobtype.map((job, index) => (
                                <Grid item key={index} sx={{ border:job.status === "ACTIVE" ?  "1.5px solid #008080" : "1.5px solid #AEAEAE", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' ,color : job.status === "ACTIVE" ? "black" : "#AEAEAE"}}>
                                        <Typography
                                            onClick={() => handleDesignation('clinetDetails', job.jobType)} 
                                            sx={{
                                            cursor: 'pointer'
                                            }}
                                        >
                                            {job.jobType}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
              marginBottom:'2px'
            }}

            onChange={() => handleExpand('domine')}
            >
            <AccordionSummary
                    sx={{
                      flexDirection: "row",
                        "&.Mui-focusVisible": {
                      background: "none",
                      },
                      width: "100%",
                      backgroundColor:'#008080'
                    }} 
            >
            <Grid container alignItems="center">
            <Grid item xs={11.5}>
                <Typography variant='h6' ml={3}>Domine</Typography>
            </Grid>
            <Grid item xs={0.5}>
                {domineExpand ? <RemoveIcon /> : <AddIcon />}
            </Grid>
            </Grid>
            </AccordionSummary>

              {!domineExpand ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 20px',                    
                    }}
                >
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid>
                                <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => handleAdd('domine')}
                                sx={{
                                    width:'100px',
                                    height:'46px',
                                    fontSize:'20px'
                                }}
                            >
                                ADD
                            </Button>
                        </Grid>
                        {domineData && domineData.length > 0 && (
                        <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                            {domineData?.map((domine, index) => (
                                <Grid item key={index} sx={{ border:domine.status === "ACTIVE" ?  "1.5px solid #008080" : "1.5px solid #AEAEAE", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' ,color : domine.status === "ACTIVE" ? "black" : "#AEAEAE"}}>
                                        <Typography
                                            onClick={() => handleDesignation('domine', domine.domainName,domine.domainId,domine?.status)} 
                                            sx={{
                                            cursor: 'pointer'
                                            }}
                                        >
                                            {domine.domainName}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                </>
              )}
        </Accordion>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogTitle sx={{width:'500px'}}>
        <img src={icon}/> {changeData}
        </DialogTitle>
        {desginationEdit ? (
            <Grid sx={{padding:'10px'}}>
                <TextField 
                    label={chnageDataType}
                    value={value}
                    onChange={(e)=>{setValue(e.target.value)}}
                    sx={{
                        width:'100%'
                    }}
                />
            </Grid>
        ) : (
            <>
            {desginationDisable ? (
                <>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed with removing the
                    </DialogContentText>
                    <DialogContentText>
                        {chnageDataType} &apos;{changeData}&apos; from the Master Data ?
                    </DialogContentText>
                </DialogContent>
                </>
            ) : (
                <>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to edit/disablr the {chnageDataType}
                    </DialogContentText>
                    <DialogContentText>
                        &apos;{changeData}&apos; from the Master Data ?
                    </DialogContentText>
                </DialogContent>
                </>
            )}

            </>
        )}
        <DialogActions>
            {desginationEdit ? (
                <>
                    <Button 
                        onClick={() => handleUpdate(chnageDataType,chnageDataId)} 
                        sx={{
                            color: '#fff',
                            borderRadius: '8px',
                            backgroundColor: "#008080",
                            '&:hover': {
                                backgroundColor: '#008080',
                            },
                        }}
                    >
                        Save
                    </Button>
                    <Button 
                        onClick={handleAddDesignationCancle}
                        sx={{
                            color:'#000',
                            borderRadius:'8px',
                            border:'1px solid #D0D5DD'
                        }}  
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                {desginationDisable ? (
                    <>
                    <Button 
                        onClick={handleAddDesignationCancle} 
                        sx={{
                            color:'#344054',
                            border:'1px solid #D0D5DD',
                            borderRadius:'8px'
                        }}
                    >
                        Cancle
                    </Button>
                    <Button 
                            onClick={() => handleSubmit(chnageDataType, chnageDataId,'INACTIVE')}
                            sx={{
                            color:'#fff',
                            backgroundColor:"#B7251B",
                            borderRadius:'8px',
                            '&:hover': {
                                backgroundColor: '#B7251B',
                            },
                        }}  
                    >
                        Disable
                    </Button>
                    </>
                ) : (
                    <>
                    <Button 
                        onClick={() => handleEditDesignation(chnageDataType,chnageDataId)} 
                        sx={{
                            color:'#344054',
                            border:'1px solid #D0D5DD',
                            borderRadius:'8px'
                        }}
                    >
                        Edit
                    </Button>
                    <Button 
                        onClick={() => handleDisable(chnageDataType,chnageDataId)} 
                        sx={{
                            color:'#fff',
                            backgroundColor:"#B7251B",
                            borderRadius:'8px',
                            '&:hover': {
                                backgroundColor: '#B7251B',
                            },
                        }}  
                    >
                        Disable
                    </Button>
                    </>
                )}

                </>
            )}
        </DialogActions>
        </Dialog>
        <Dialog open={dialog} onClose={handleCloseDialog} sx={{
            borderRadius:'20px'
        }}>
        <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogTitle sx={{width:'500px'}}>
        <img src={icon}/> {dialogTitle}
        </DialogTitle>
        <DialogContent>
          
          <TextField 
            label={dialogTitle} 
            placeholder={`Enter ${dialogTitle}`}
            onChange={(e) => handlechange(e, dialogTitle)}
            value={value}
            sx={{width:'100%',height:'56px',marginTop:'10px'}}
          />
        {errors.value && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.value}
                </Typography>
            </Box>
        )}
        </DialogContent>
        <DialogActions>
        <Button 
            onClick={() => handleSubmit(dialogTitle)}
            sx={{
                backgroundColor:'#008080',
                color:'#ffff',
                marginRight:'30px',
                width:'100px',
                marginTop:'-10px',
                '&:hover': {
                    backgroundColor: '#008080',
                },
            }}
        >
            Save
        </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleCloseDialog}>
      <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogTitle sx={{width:'500px'}}>
        <img src={icon}/> Office Address</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography>Office Address</Typography>
        <TextField
            placeholder="Office Address"
            value={officeData.officeAddress}
            onChange={(e) => handleOfficeChange('officeAddress', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.officeAddress && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.officeAddress}
                </Typography>
            </Box>
        )}
        <Typography>Phone Number</Typography>
        <TextField
            placeholder="phoneNumber"
            value={officeData.phoneNumber}
            onChange={(e) => handleOfficeChange('phoneNumber', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.phoneNumber && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.phoneNumber}
                </Typography>
            </Box>
        )}
        <Typography>Country</Typography>
        <Autocomplete
            freeSolo
            id="country"
            options={Country.getAllCountries()}
            getOptionLabel={(option) => option.name}
            onChange={(e,value) => handleOfficeChange('country', e , value)}
            renderInput={(params) => <TextField {...params} placeholder="Country" />}
        />
        {errors.country && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.country}
                </Typography>
            </Box>
        )}
            <Typography>State</Typography>
            <Autocomplete
            freeSolo
            options={getStates(selectedCountry?.isoCode)}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => handleOfficeChange('state', e, value)}
            renderInput={(params) => <TextField {...params} placeholder="State" />}
            />
        {errors.state && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.state}
                </Typography>
            </Box>
        )}
            <Typography>City</Typography>
            <Autocomplete
            freeSolo
            options={getCities(selectedCountry?.isoCode, selectedState?.isoCode)}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => handleOfficeChange('city', e, value)}
            renderInput={(params) => <TextField {...params} placeholder="City" />}
            />
        {errors.city && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.city}
                </Typography>
            </Box>
        )}
        <Typography>Zip / Postal Code</Typography>
        <TextField
            placeholder="Zip / Postal Code"
            value={officeData.postalCode}
            onChange={(e) => handleOfficeChange('postalCode', e.target.value)}
            sx={{ marginBottom: 1 }}
        />
                {errors.postalCode && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.postalCode}
                </Typography>
            </Box>
        )}
        </DialogContent>
      <DialogActions>
      <Button 
            onClick={() => handleSubmit(chnageDataType,chnageDataId,'ACTIVE')}
            sx={{
                backgroundColor:'#008080',
                color:'#ffff',
                marginRight:'30px',
                width:'100px',
                marginTop:'-10px',
                '&:hover': {
                    backgroundColor: '#008080',
                },
            }}
        >
            Save
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={enable} onClose={handleCloseDialog}>
      <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogTitle sx={{width:'500px'}}>
        <img src={icon}/> Office Address</DialogTitle>
            <DialogContent>
                    <DialogContentText>
                        Are you sure you want to enable the {chnageDataType}
                    </DialogContentText>
                    <DialogContentText>
                         &apos;{changeData}&apos; from the Master Data ?
                    </DialogContentText>
                </DialogContent>
        <DialogActions>
            <Button 
                onClick={handleCloseDialog}
                sx={{
                    color:'#000',
                    width:'100px',
                    marginTop:'-10px',
                    border:'1px solid #AEAEAE'
                }}
            >
                cancle
            </Button>
            <Button 
                onClick={() => handleSubmit(chnageDataType,chnageDataId,'ACTIVE')} 
                sx={{
                    backgroundColor:'#008080',
                    color:'#ffff',
                    marginRight:'30px',
                    width:'100px',
                    marginTop:'-10px',
                    '&:hover': {
                        backgroundColor: '#008080',
                    },
                }}
            >
                Enable
            </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={bandDialog} onClose={handleCloseDialog}>
      <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogTitle sx={{width:'500px'}}>
        <img src={icon}/> Band Details</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
                <TextField 
                    label='Band Name'
                    value={bandFormData.bandName}
                    onChange={(e) => hnadleBandChnage('bandName', e.target.value)}
                    sx={{
                        marginTop:2
                    }}
                />
                {errors.bandName && (
                    <Box>
                        <Typography
                            color="error"
                        >
                            {" "}
                            {errors.bandName}
                        </Typography>
                    </Box>
                )}
                <Typography>Enter CTC</Typography>
                <Typography>Minimum</Typography>
                <TextField 
                    label='Minimum'
                    value={bandFormData.minimumCtc}
                    onChange={(e) => hnadleBandChnage('minimumCtc', e.target.value)}
                />
                {errors.minimum && (
                    <Box>
                        <Typography
                            color="error"
                        >
                            {" "}
                            {errors.minimum}
                        </Typography>
                    </Box>
                )}
                <Typography>Maximum</Typography>
                <TextField 
                    label='Maximum'
                    value={bandFormData.maximumCtc}
                    onChange={(e) => hnadleBandChnage('maximumCtc', e.target.value)}
                />
                {errors.maximum && (
                    <Box>
                        <Typography
                            color="error"
                        >
                            {" "}
                            {errors.maximum}
                        </Typography>
                    </Box>
                )}

            </DialogContent>
        <DialogActions>
            <Button 
                onClick={handleCloseDialog}
                sx={{
                    color:'#000',
                    width:'100px',
                    marginTop:'-10px',
                    border:'1px solid #AEAEAE'
                }}
            >
                cancle
            </Button>
            <Button 
                onClick={() => handleSubmit(chnageDataType,chnageDataId)} 
                sx={{
                    backgroundColor:'#008080',
                    color:'#ffff',
                    marginRight:'30px',
                    width:'100px',
                    marginTop:'-10px',
                    '&:hover': {
                        backgroundColor: '#008080',
                    },
                }}
            >
                Save
            </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={holidayDialog} onClose={handleCloseDialog}>
      <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogTitle sx={{width:'500px'}}>
        <img src={icon}/> Holiday Details</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
            <TextField
                    id="outlined-basic"
                    placeholder='Choose Date'
                    onClick={() => setIsOpenCalender(true)}
                    value={selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ''}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <CalendarMonthIcon />
                            </IconButton>
                        ),
                    }}
                />
                {errors.selectedDate && (
                <Box>
                    <Typography
                        color="error"
                    >
                        {" "}
                        {errors.selectedDate}
                    </Typography>
                </Box>
                )}
                <Typography>Enter Holiday Type</Typography>
                <TextField
                    placeholder='holiday Type'
                    value={holidayFormData.holidayType}
                    onChange={(e) => handleHolidayChnage('holidayType', e.target.value)}
                />
                {errors.holidayType && (
                <Box>
                    <Typography
                        color="error"
                    >
                        {" "}
                        {errors.holidayType}
                    </Typography>
                </Box>
                )}
                <Typography>Enter Holiday Name</Typography>
                <TextField 
                    placeholder='holiday Name'
                    value={holidayFormData.holidayName}
                    onChange={(e) => handleHolidayChnage('holidayName', e.target.value)}
                />
                {errors.holidayName && (
                <Box>
                    <Typography
                        color="error"
                    >
                        {" "}
                        {errors.holidayName}
                    </Typography>
                </Box>
                )}

            </DialogContent>
        <DialogActions>
            <Button 
                onClick={handleCloseDialog}
                sx={{
                    color:'#000',
                    width:'100px',
                    marginTop:'-10px',
                    border:'1px solid #AEAEAE'
                }}
            >
                cancle
            </Button>
            <Button 
                    onClick={() => (edit=== false ? handleSubmit(chnageDataType, chnageDataId) : handleUpdate(chnageDataType, chnageDataId))} 
                    sx={{
                    backgroundColor:'#008080',
                    color:'#ffff',
                    marginRight:'30px',
                    width:'100px',
                    marginTop:'-10px',
                    '&:hover': {
                        backgroundColor: '#008080',
                    },
                }}
            >
                Save
            </Button>
      </DialogActions>
    </Dialog>
    <Dialog
        open={isOpenCalender}
        onClose={() => setIsOpenCalender(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            sx={{
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
            }}
            defaultValue={dayjs()}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            slots={{
              actionBar: ActionList,
            }}
          />
        </LocalizationProvider>
      </Dialog>
    </Grid>
    </>
  )
}
