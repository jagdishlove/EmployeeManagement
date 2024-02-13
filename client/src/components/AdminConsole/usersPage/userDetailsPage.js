import React, { useEffect, useState } from 'react';
import { Grid, Box, Avatar, Typography, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../redux/actions/AdminConsoleAction/users/usersAction';

export default function UserDetailsPage() {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { id } = useParams() 

  const [expanded, setExpanded] = useState(false);

  const [payRollExpanded, setPayRollExpanded] = useState(false);

  const handleAccordionToggle = (projectId) => {
    setExpanded(expanded === projectId ? null : projectId);
  };

  const handleExpand = () => {
    setPayRollExpanded(!payRollExpanded)
  }

useEffect(() => {
  dispatch(getUserById(id))
},[id])

const userData = useSelector(
  (state) => state?.nonPersist?.userDetails?.userByIdData
  )
  const skillsArray = [
    'Html & CSS',
    'Java Script',
    'Java',
    'Node Js',
    'Python',
    'PHP',
  ];
    const skillItemStyle = {
      backgroundColor: '#E8DEF8',
      borderRadius: '50px',
      padding: '8px',
      display: 'flex',
      marginBottom: '8px',
      marginRight: '8px',
    };
  
    const checkIconStyle = {
      marginRight: '8px',
      backgroundColor:'#1D192B',
      color:'#ffff',
      borderRadius:'50%'
    };

    const skillsContainerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
    };

    const handleBack = () => {
      navigate(-1)
    }

    const projects = [
      {
        id:1,
        name: 'kairos',
        description: 'HRMS',
        manager: 'MAANI',
        designation: 'Software Engineer',
        projectStatus: 'On Time',
        startDate: '25 Jan 2024',
        endDate: '2 Mar 2024',
        teamMembers: ['Rajesh', 'Kiran Kumar', 'Koushik'],
      },
      {
        id:2,
        name: 'cosmocart',
        description: 'Food APP',
        manager: 'Swaroop',
        designation: 'Web Developer',
        projectStatus: 'Delayed',
        startDate: '15 Feb 2024',
        endDate: '10 Apr 2024',
        teamMembers: ['koushik', 'mani'],
      },
    ];

  return (
    <>
    <Grid container alignItems="center">
      <KeyboardBackspaceIcon 
        style={{ fontSize: 30, cursor: 'pointer' }}     
        onClick={handleBack}  
      /> 
      <Typography variant='h2' component="div" sx={{ marginLeft: 1 }}>
        User Details Page
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
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Grid sx={{ border: '2px solid #A4A4A4', boxShadow: '#000000', padding: 2, borderRadius: '25px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                alt="Profile Picture"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                sx={{ width: '180px', height: 'auto', border: '2px solid #A4A4A4' }}
              />
            </Box>
          </Grid>
          <Grid container spacing={2} sx={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <Typography variant="h6">TEAM LEAD</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{userData.firstName} {userData.lastName}</Typography>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid md={3}>
              </Grid>
              <Grid md={3} sx={{alignItems:'start',textAlign:'start'}}>
                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#898989' }}>
                    Status
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#53939C' }}>
                    {userData.status}
                  </Typography>
                  <Typography sx={{ color: '#898989' }}>Email</Typography>
                  <Typography variant="body1" sx={{ color: '#53939C' }}>
                    {userData.email}
                  </Typography>
                  <Typography sx={{ color: '#898989' }}>Mobile number</Typography>
                  <Typography variant="body1" sx={{ color: '#53939C' }}>
                    {userData.phoneNumber}
                  </Typography>
                  <Typography sx={{ color: '#898989' }}>Office</Typography>
                  <Typography variant="body1" sx={{ color: '#53939C' }}>
                    Bangalore
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
      <Box sx={{ border: '2px solid #A4A4A4', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: 8, borderRadius: '25px', width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Basic Details
        </Typography>
        <Grid container spacing={2} mt={1.3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Employee ID:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {userData.empId}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Date Of Joining:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {userData.joiningDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Gender:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  Male
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Band:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  bandName
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Employment:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  Permanent
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Reporting Manager:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  Swaroop Kumar
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  <strong>Address:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  97, Elipse Apartment. Bazar Street, Mumbai - 56
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Skills:</strong>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <div style={skillsContainerStyle}>
                {skillsArray.map((skill, index) => (
                  <div key={index} style={skillItemStyle}>
                    <CheckIcon style={checkIconStyle} />
                    <Typography variant="body1">
                      {skill}
                    </Typography>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
    </Grid>
    <Grid container mt={2}> 
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          Current Project Details
        </Typography>
        <Grid mt={2} sx={{ border: '2px solid #A4A4A4', boxShadow: '#000000', padding: 2, borderRadius: '25px',width:'100%' }}>
          <Grid container spacing={1} sx={{ padding: "10px" }}>
            {projects.map((project) => (
              <Grid item key={project.id} xs={12}>
                <Accordion

                  sx={{
                    border: "1px solid #898989",
                    width: "100%",
                  }}
                  expanded={expanded === project.id}
                  onChange={() => handleAccordionToggle(project.id)}
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
                 {expanded  ? <RemoveIcon /> : <AddIcon />}
                 <Typography variant='h6' ml={3}>{project.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 50px',                    
                    }}
                  >
                    <Grid>
                      <Typography>
                        Project Description: {project.description}<br />
                      </Typography>
                      <Typography mt={1}>
                        Project Manager: {project.manager}<br />
                      </Typography>
                      <Typography mt={1}>
                        Designation: {project.designation}<br />
                      </Typography>
                      <Typography mt={1}>
                        Project Status: {project.projectStatus}<br />
                      </Typography>
                      <Typography mt={1}>
                        Starting Date: {project.startDate}<br />
                      </Typography>
                      <Typography mt={1}>
                        Ending Date: {project.endDate}<br />
                      </Typography>
                      <Typography mt={1}>
                        Team Members: {project.teamMembers.join(', ')}<br />
                      </Typography>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Pay Roll
          </Typography>
        </Grid>
        <Grid mt={2} sx={{ border: '2px solid #A4A4A4', boxShadow: '#000000', padding: 2, borderRadius: '25px',width:'100%' }}>
          <Grid container spacing={1} sx={{ padding: "10px" }}>
          <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
            }}

            onChange={handleExpand}
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
              {payRollExpanded  ? <RemoveIcon /> : <AddIcon />}
              <Typography variant='h6' ml={3}>Bank Details</Typography>
            </AccordionSummary>

              {!payRollExpanded ? (
                <>
                </>
              ) : (
                <>
                <AccordionDetails
                    sx={{
                      padding: '20px 20px 20px 50px',                    
                    }}
                  >
                    <Grid>
                      <Typography>
                          <b>Name as on the Bank : </b><br />
                        </Typography>
                        <Typography mt={1}>
                          <b>Bank Name : </b><br />
                        </Typography>
                        <Typography mt={1}>
                          <b>Account Number :</b> <br />
                        </Typography>
                        <Typography mt={1}>
                          <b>IFSC code :  </b><br />
                        </Typography>
                    </Grid>
                </AccordionDetails>
                </>
              )
              }
              </Accordion>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}
