import {  Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import icon from '../../../assets/Featured icon.svg'
import { CreateBandlData, CreateDesignationData, CreateOfficeLocationnData, CreateSkillData, GetAllBandData, GetAllDesignationData, GetAllOfficeLocationData, GetAllSkillData, GetOfficeLocation, masterDataAction } from '../../../redux/actions/masterData/masterDataAction';
import { Country, State, City } from 'country-state-city';
import { postcodeValidator } from 'postcode-validator';
import dayjs from 'dayjs';
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


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
  const [render, setRender] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countryCode, setCountryCode] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [errors, setErrors]  = useState({})
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
    minimum:'',
    maximum:''

  })

  const [holidayFormData, setHolidayFormData] = useState({
    holidayType:'',
    holidayName :'',
  })

  console.log(setBandFormData)
  const masterData = useSelector(
    (state) => state.persistData.masterData
  );
  const skillData = useSelector(
    (state) => state?.nonPersist?.userDetails?.skillData
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
  const handleBack = () => {
    navigate(-1)
  }

  const cancleHandler = () => {
    setIsOpenCalender(false);
  };

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
    }
  }, [officeLocation,dispatch]);

  const handlechange = (e) => {
    setValue(e.target.value)
  }
  const handleDesignation = (type , data , id , status) => {

    if (status === "INACTIVE" || status === null){
        setEnable(true)
    }
    setOpenDialog(true);
    setDesugnationEdit(false)
    setDesignationDisable(false)
    setChnageDataId(id)
    setChnageData(data)
    setChangeDataType(type)
    setValue(data)    
  }
  const handleEditDesignation = (type) => {

    if(type === "officeLocation"){
        setOpen(true)
        dispatch(GetOfficeLocation(chnageDataId))
    } else if(type === "band") {
        setBandDialog(true)

    }else if (type ==="holiday") {
        setHolidayDialog(true)
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
      setSelectedDate(dayjs())
      setErrors({})
  }
  const handleDisable = () => {
    setDesignationDisable(true)
    dispatch(GetOfficeLocation(chnageDataId))
    
  };
  const handleAddDesignationCancle = () => {
    setDesugnationEdit(false)
    setDesignationDisable(false)
  }

  useEffect(() => {
    dispatch(masterDataAction());
    dispatch(GetAllSkillData())
    dispatch(GetAllDesignationData());
    dispatch(GetAllBandData())
    dispatch(GetAllOfficeLocationData());
  },[render])


  const handleAdd = (type) => {
    setDialogTitle(`${type}`);
    if(type === 'officeLocation') {
        setOpen(true)
    } else if (type === 'band') {
        setBandDialog(true)
    }else if (type === 'holiday') {
    setHolidayDialog(true)
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
          status:status ? status : ''
        };
        await dispatch(CreateSkillData(payload));
        setValue('');
        setRender(true);
      } else if (type === 'band') {
        const payload = {
          bandId: id ? id : "",
          bandName: bandFormData.bandName,
          minimum: bandFormData.minimum,
          maximum: bandFormData.maximum,
          status:status ? status : ''
        };
        await dispatch(CreateBandlData(payload));
        setValue('');
        setRender(true);
      } else if (type === 'designation') {
        const payload = {
          designationId: id ? id : "",
          designationName: value,
          status:status ? status : ''
        };
        await dispatch(CreateDesignationData(payload));
        setValue('');
        setRender(true);
      } else if (type === 'officeLocation') {
        const payload = {
          locationId: id ? id : "",
          officeAddress: officeData.officeAddress,
          phoneNumber: officeData.phoneNumber,
          country: officeData.country,
          state: officeData.state,
          city: officeData.city,
          postalCode: officeData.postalCode,
          status:status ? status : ''
        };
        await dispatch(CreateOfficeLocationnData(payload));
      } else if(type === "holiday") {
        const payload ={
            date : selectedDate,
            holidayType:holidayFormData.holidayType,
            holidayName:holidayFormData.holidayName
        }
        console.log(payload)
      }
    }finally {
      setDialog(false);
      setOpenDialog(false);
      setRender(true);
      setOpen(false);
      setValue('');
      setOfficeData({
        officeAddress: '',
        phoneNumber: '',
        country: '',
        state:'',
        city: '',
        postalCode: '',
      });
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
    }  else if (type === 'skill' || type === 'designation' || type === 'band') {
        if(!value){
            errors.value= `${type} are required`
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
    <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Designation
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
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

            <Grid container sx={{ border: "1px solid #AEAEAE",height: designationData ?'156px' : '0px',overflow:'auto',padding:'10px' }} mt={2}>
                {designationData?.map((designation, index) => (
                    <Grid item key={index} sx={{ border:designation.status === "ACTIVE" ?  "1.5px solid #008080" : "1.5px solid #AEAEAE", borderRadius: '15px', padding: '6px', margin: '5px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography
                        onClick={() => handleDesignation('designation',designation.designationName,designation.designationId,designation.status)}
                        sx={{
                        cursor: 'pointer'
                        }}
                    >
                        {designation.designationName}
                    </Typography>
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Skills
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
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
                <Grid container sx={{ border: "1px solid #AEAEAE", height: skillData ? '156px' : 'auto', overflow: 'auto', padding: '10px' }} mt={2}>
                    {skillData?.map((skill, index) => (
                        <Grid item key={index} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px', height: '40px' }}>
                            <Typography
                                onClick={() => handleDesignation('skill', skill.skillName, skill.skillId)}
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                                {skill.skillName}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Office Location
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                    variant="contained" 
                    onClick={() => handleAdd('officeLocation')}
                    color="primary"
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
            </Grid>
        </Grid>
    </Grid>
    <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Band
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                    variant="contained" 
                    onClick={() => handleAdd('band')}
                    color="primary"
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
            {bandData?.map((band, index) => (
                <Grid item key={index} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' }}>
                        <Typography
                            onClick={() => handleDesignation('band', band.bandName, band.bandId)} 
                            sx={{
                            cursor: 'pointer'
                            }}
                        >
                            {band.bandName}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Client Onsite Office Locations
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleAdd('clientOfficeLocation')}
                    sx={{
                        width:'100px',
                        height:'46px',
                        fontSize:'20px'
                    }}
                >
                    ADD
                </Button>
                </Grid>
            <Grid container spacing={2} alignItems="center" mt={1}>
                <Grid item md={4}>
                </Grid>
            </Grid>
            <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                {designations?.map((designation) => (
                    <Grid item key={designation.id} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
            </Grid>
        </Grid>
    </Grid>
    <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Activities
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleAdd('activities')}
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
            {masterData?.activityForView.map((activity, index) => (
                <Grid item key={index} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' }}>
                        <Typography
                            onClick={() => handleDesignation('activitys', activity.activityType)} 
                            sx={{
                            cursor: 'pointer'
                            }}
                        >
                            {activity.activityType}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Job Type
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                    variant="contained" 
                    onClick={() => handleAdd('jobType')}
                    color="primary"
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
            {masterData?.jobtype.map((job, index) => (
                <Grid item key={index} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' }}>
                        <Typography
                            onClick={() => handleDesignation('jobType', job.jobType)} 
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
    </Grid>
        <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Manage Holidays
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                    variant="contained" 
                    onClick={() => handleAdd('holiday')}
                    color="primary"
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
            {masterData?.jobtype.map((job, index) => (
                <Grid item key={index} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' }}>
                        <Typography
                            onClick={() => handleDesignation('holiday', job.jobType)} 
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
    </Grid>
        <Grid container spacing={2} sx={{border:"2px solid #008080",padding:'10px'}} mt={2}>
        <Grid item sm={12}>
            <Grid container>
            <Grid item xs={12} md={10}>
                <Typography sx={{fontSize:'28px'}}>
                    Gender
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                    variant="contained" 
                    onClick={() => handleAdd('gender')}
                    color="primary"
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
            {masterData?.gender.map((gender, index) => (
                <Grid item key={index} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' }}>
                        <Typography
                            onClick={() => handleDesignation('jobType', gender.genderName)} 
                            sx={{
                            cursor: 'pointer'
                            }}
                        >
                            {gender.gender}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            </Grid>
        </Grid>
    </Grid>
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
                    label="desigantion"
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
                        onClick={() => handleSubmit(chnageDataType,chnageDataId)} 
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
                        onClick={() => handleSubmit(chnageDataType,chnageDataId,'INACTIVE')} 
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
                        onClick={handleDisable} 
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
                <Typography>Enter CTC</Typography>
                <Typography>Minimum</Typography>
                <TextField 
                    label='Minimum'
                    value={bandFormData.minimum}
                    onChange={(e) => hnadleBandChnage('minimum', e.target.value)}
                />
                <Typography>Maximum</Typography>
                <TextField 
                    label='Maximum'
                    value={bandFormData.maximum}
                    onChange={(e) => hnadleBandChnage('maximum', e.target.value)}
                />

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
                <Typography>Enter Holiday Type</Typography>
                <TextField 
                    placeholder='holiday Type'
                    value={holidayFormData.holidayType}
                    onChange={(e) => handleHolidayChnage('holidatType', e.target.value)}
                />
                <Typography>Enter Holiday Name</Typography>
                <TextField 
                    placeholder='holiday Name'
                    value={holidayFormData.holidayName}
                    onChange={(e) => handleHolidayChnage('HolidatName', e.target.value)}
                />

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
                Enable
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
