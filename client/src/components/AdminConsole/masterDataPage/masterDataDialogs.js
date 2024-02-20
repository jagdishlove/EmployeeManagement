import React from 'react'
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import icon from '../../../assets/Featured icon.svg'
import dayjs from 'dayjs';
import Dropdown from '../../forms/dropdown/dropdown';
import { TimesheetStyle } from '../../../pages/timesheet/timesheetStyle';
import { useTheme } from "@mui/material/styles";

export default function MasterDataDialogs({
    openDialog,
    dialog,
    open,
    enable,
    isOpenCalender,
    bandDialog,
    holidayDialog,
    desginationEdit,
    desginationDisable,
    clientDialog,
    clientLocationDialog,
    dialogTitle,
    changeData,
    chnageDataType,
    errors,
    country,
    state,
    handleDisable,
    handleAddDesignationCancle,
    handleOfficeChange,
    handleClinetDetails,
    handleOnsiteLocation,
    hnadleBandChnage,
    handleHolidayChnage,
    handleSubmit,
    handleUpdate,
    chnageDataId,
    handleCloseDialog,
    clientLocationData,
    edit,
    officeData,
    clinetDetails,
    setSelectedDate,
    selectedDate,
    value,
    setValue,
    handleEditDesignation,
    handlechange,
    bandFormData,
    setIsOpenCalender,
    holidayFormData,
    city,
    holidayType
}) {
    const theme = useTheme();
    const style = TimesheetStyle(theme);

  return (
    <>
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
        <Typography>Office Name</Typography>
        <TextField
            placeholder="Enter Office Name"
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
        <Typography>Address Line 1</Typography>
        <TextField
            placeholder="Enter Office Address"
            value={officeData.addressLine1}
            onChange={(e) => handleOfficeChange('addressLine1', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        <Typography>Address Line 2</Typography>
        <TextField
            placeholder="Enter Office Address"
            value={officeData.addressLine2}
            onChange={(e) => handleOfficeChange('addressLine2', e.target.value)}
            sx={{ marginBottom: 1}}
        />
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
            options={country}
            getOptionLabel={(option) => option.dataValue}
            onChange={(e, value) => handleOfficeChange('country', e, value)}
            value={country.find((c) => c.id === officeData?.countryId) || null}
            renderInput={(params) => <TextField {...params} placeholder="Country" />}
          />
          {errors.country && (
            <Box>
              <Typography color="error">
                {" "}
                {errors.country}
              </Typography>
            </Box>
          )}
            <Typography>State</Typography>
            <Autocomplete
            freeSolo
            options={state}
            getOptionLabel={(option) => option.dataValue}
            onChange={(e, value) => handleOfficeChange('state', e, value)}
            value={state.find((c) => c.id === officeData?.stateId) || null}
            renderInput={(params) => <TextField {...params}  value={officeData.state} placeholder="State" />}
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
            options={city}
            getOptionLabel={(option) => option.dataValue}
            onChange={(e, value) => handleOfficeChange('city', e, value)}
            value={city.find((c) => c.id === officeData?.cityId) || null}
            renderInput={(params) => <TextField {...params}  value={officeData.state}  placeholder="City" />}
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
                    name='Minimum'
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
                    name='Maximum'
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
                    type='calander'
                    placeholder='Choose Date'
                    onClick={() => setIsOpenCalender(true)}
                    value={selectedDate ? dayjs(selectedDate).format("DD-MM-YYYY") : ''}
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
                <Dropdown
                options={holidayType} // Pass any additional options if needed
                value={holidayFormData.holidayType}
                onChange={(e) => handleHolidayChnage('holidayType',  e.target.value)}
                title=""
                dropdownName="holiday Type" // Pass the dropdown name
                style={{
                    ...style.TimesheetTextField,
                    border: "1px solid #8897ad87",
                    borderRadius: "10px",
                  }}
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
            value={selectedDate ? dayjs(selectedDate).format("DD-MM-YYYY") : ''}
            onChange={(date) => setSelectedDate(date)}
            onAccept={() => setIsOpenCalender(false)} 
            onCancel={() => setIsOpenCalender(false)}
          />
        </LocalizationProvider>
      </Dialog>
      <Dialog open={clientDialog} onClose={handleCloseDialog}>
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
        <img src={icon}/> Client Details</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography>Clinet Name</Typography>
        <TextField
            placeholder="Office Address"
            name = 'clinetName'
            value={clinetDetails.clinetName}
            onChange={(e) => handleClinetDetails('clinetName', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.clinetName && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.clinetName}
                </Typography>
            </Box>
        )}
        <Typography>Address Line 1</Typography>
        <TextField
            placeholder="Office Address"
            name = 'addressLine1'
            value={clinetDetails.addressLine1}
            onChange={(e) => handleClinetDetails('addressLine1', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.addressLine1 && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.addressLine1}
                </Typography>
            </Box>
        )}
        <Typography>Address Line 1</Typography>
        <TextField
            placeholder="Office Address"
            name = 'addressLine2'
            value={clinetDetails.addressLine2}
            onChange={(e) => handleClinetDetails('addressLine2', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.addressLine2 && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.addressLine2}
                </Typography>
            </Box>
        )}
        <Typography>Phone Number</Typography>
        <TextField
            placeholder="phoneNumber"
            name='phone'
            value={clinetDetails.phone}
            onChange={(e) => handleClinetDetails('phone', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.phone && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.phone}
                </Typography>
            </Box>
        )}
        <Typography>Country</Typography>
        <Autocomplete
            freeSolo
            id="country"
            options={country}
            getOptionLabel={(option) => option.dataValue}
            onChange={(e, value) => handleClinetDetails('country', e, value)}
            value={country.find((c) => c.id === clinetDetails?.countryId) || null}
            renderInput={(params) => <TextField {...params} placeholder="Country" />}
          />
        {errors.countryId && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.countryId}
                </Typography>
            </Box>
        )}
            <Typography>State</Typography>
            <Autocomplete
            freeSolo
            options={state}
            getOptionLabel={(option) => option.dataValue}
            onChange={(e, value) => handleClinetDetails('state', e, value)}
            value={state.find((c) => c.id === clinetDetails?.stateId) || null}
            renderInput={(params) => <TextField {...params}  value={officeData.state} placeholder="State" />}
            />
        {errors.stateId && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.stateId}
                </Typography>
            </Box>
        )}
            <Typography>City</Typography>
            <Autocomplete
            freeSolo
            options={city}
            getOptionLabel={(option) => option.dataValue}
            onChange={(e, value) => handleClinetDetails('city', e, value)}
            value={city.find((c) => c.id === clinetDetails?.stateId) || null}
            renderInput={(params) => <TextField {...params}  value={officeData.state}  placeholder="City" />}
            />
        {errors.cityId && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.cityId}
                </Typography>
            </Box>
        )}
        <Typography>Zip / Postal Code</Typography>
        <TextField
            placeholder="Zip / Postal Code"
            value={clinetDetails.postalCode}
            onChange={(e) => handleClinetDetails('postalCode', e.target.value)}
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
    <Dialog open={clientLocationDialog} onClose={handleCloseDialog}>
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
        <img src={icon}/> Client Onsite Office Location</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography>Clinet Name</Typography>
        <TextField
            placeholder="Office Address"
            name = 'addressName'
            value={clientLocationData.addressName}
            onChange={(e) => handleOnsiteLocation('addressName', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.clinetName && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.clinetName}
                </Typography>
            </Box>
        )}
        <Typography>Address Line 1</Typography>
        <TextField
            placeholder="Office Address"
            name = 'addressLine1'
            value={clientLocationData.addressLine1}
            onChange={(e) => handleOnsiteLocation('addressLine1', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.addressLine1 && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.addressLine1}
                </Typography>
            </Box>
        )}
        <Typography>Address Line 1</Typography>
        <TextField
            placeholder="Office Address"
            name = 'addressLine2'
            value={clientLocationData.addressLine2}
            onChange={(e) => handleOnsiteLocation('addressLine2', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.addressLine2 && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.addressLine2}
                </Typography>
            </Box>
        )}
        <Typography>Phone Number</Typography>
        <TextField
            placeholder="phoneNumber"
            name='phone'
            value={clientLocationData.phone}
            onChange={(e) => handleOnsiteLocation('phoneNumber', e.target.value)}
            sx={{ marginBottom: 1}}
        />
        {errors.phone && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.phone}
                </Typography>
            </Box>
        )}
        <Typography>Country</Typography>
        <Autocomplete
          freeSolo
          id="country"
          options={country}
          getOptionLabel={(option) => option.dataValue}
          onChange={(e, value) => handleOnsiteLocation('countryId', e, value)}
          value={country.find((c) => c.id === clientLocationData?.countryId) || null}
          renderInput={(params) => <TextField {...params} placeholder="Country" />}
        />
        {errors.countryId && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.countryId}
                </Typography>
            </Box>
        )}
            <Typography>State</Typography>
            <Autocomplete
            freeSolo
            options={state}
            getOptionLabel={(option) => option.dataValue}
            onChange={(e, value) => handleOnsiteLocation('state', e, value)}
            value={state.find((c) => c.id === clientLocationData?.stateId) || null}
            renderInput={(params) => <TextField {...params}  value={officeData.state} placeholder="State" />}
            />
        {errors.stateId && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.stateId}
                </Typography>
            </Box>
        )}
            <Typography>City</Typography>
            <Autocomplete
            freeSolo
            options={city}
            getOptionLabel={(option) => option.dataValue}
            onChange={(e, value) => handleOnsiteLocation('city', e, value)}
            value={city.find((c) => c.id === clientLocationData?.cityId) || null}
            renderInput={(params) => <TextField {...params}  value={officeData.state}  placeholder="City" />}
            />
        {errors.cityId && (
            <Box>
                <Typography
                    color="error"
                >
                    {" "}
                    {errors.cityId}
                </Typography>
            </Box>
        )}
        <Typography>Zip / Postal Code</Typography>
        <TextField
            placeholder="Zip / Postal Code"
            value={clientLocationData.postalCode}
            onChange={(e) => handleOnsiteLocation('postalCode', e.target.value)}
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
                    onClick={() => (edit=== false ? handleSubmit('clientOfficeLocation', chnageDataId) : handleUpdate(chnageDataType, chnageDataId))} 
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
    </>
  )
}
