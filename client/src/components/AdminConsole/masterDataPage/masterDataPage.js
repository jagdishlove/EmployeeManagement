import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import icon from '../../../assets/Featured icon.svg'
import { CreateBandlData, CreateSkillData, masterDataAction } from '../../../redux/actions/masterData/masterDataAction';



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
  const [desginationEdit, setDesugnationEdit] = useState(false)
  const [desginationDisable, setDesignationDisable] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('');
  const [changeData,setChnageData] = useState('')
  const [value, setValue] = useState('')
  const [render, setRender] = useState(false)
  const dispatch = useDispatch();
  

  const masterData = useSelector(
    (state) => state.persistData.masterData
  );
  const handleBack = () => {
    navigate(-1)
  }

  const handlechange = (e) => {
    setValue(e.target.value)
  }
  const handleDesignation = (data) => {
    setOpenDialog(true);
    setDesugnationEdit(false)
    setDesignationDisable(false)
    setChnageData(data)
  }
  const handleEditDesignation = () => {
    setDesugnationEdit(true)
  };
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setDialog(false)
  }
  const handleDisable = () => {
    setDesignationDisable(true)
  };
  const handleAddDesignationCancle = () => {
    setDesugnationEdit(false)
    setDesignationDisable(false)
  }

  useEffect(() => {
    dispatch(masterDataAction())
  },[render])


  const handleAdd = (type) => {
    setDialogTitle(`${type}`);
    setDialog(true);
  };

  const handleSubmit = (type) => {
    const submitData = async () => {
      try {
        if (type === 'skill') {
          const payload = {
            skillName: value,
          };
          await dispatch(CreateSkillData(payload));
          setValue('');
        } else if (type === 'band') {
          const payload = {
            bandName: value,
          };
          await dispatch(CreateBandlData(payload));
          setValue('');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      } finally {
        setDialog(false);
        setRender(true);
      }
    };
  
    submitData();
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

            <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                {designations.map((designation) => (
                    <Grid item key={designation.id} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography
                        onClick={() => handleDesignation('Designation',designation.name)}
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
            <Grid container sx={{ border: "1px solid #AEAEAE",height:'156px',overflow:'auto',padding:'10px' }} mt={2}>
                {masterData.skill.map((skill, index) => (
                    <Grid item key={index} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' }}>
                        <Typography
                            onClick={() => handleDesignation('skill', skill.skillName)}
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
                {designations.map((designation) => (
                    <Grid item key={designation.id} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography
                        onClick={() => handleDesignation('officeLocation', designation.name)} 
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
            {masterData.band.map((band, index) => (
                <Grid item key={index} sx={{ border: "1.5px solid #008080", borderRadius: '15px', padding: '6px', margin: '5px',height:'40px' }}>
                        <Typography
                            onClick={() => handleDesignation('band', band.bandName)} 
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
                {designations.map((designation) => (
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
            {masterData.activityForView.map((activity, index) => (
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
            {masterData.jobtype.map((job, index) => (
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
                    value={changeData}
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
                        designation &apos;{changeData}&apos; from the Master Data ?
                    </DialogContentText>
                </DialogContent>
                </>
            ) : (
                <>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to edit/disablr the designation
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
                        onClick={handleEditDesignation} 
                        sx={{
                            color:'#fff',
                            borderRadius:'8px',
                            backgroundColor:"#008080",
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
                ) : (
                    <>
                    <Button 
                        onClick={handleEditDesignation} 
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
        </DialogContent>
        <DialogActions>
        <Button 
            onClick={() => handleSubmit(dialogTitle)}
            sx={{
                backgroundColor:'#008080',
                color:'#ffff',
                marginRight:'30px',
                width:'100px',
                marginTop:'-10px'
            }}
        >
            Save
        </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    </>
  )
}
