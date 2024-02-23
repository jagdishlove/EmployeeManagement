import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../redux/actions/AdminConsoleAction/users/usersAction";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import {
  GetOfficeLocation,
  getLoocations,
} from "../../../redux/actions/masterData/masterDataAction";
import InfoIcon from "@mui/icons-material/Info";

export default function UserDetailsPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();

  console.log("id", id);

  const [expanded, setExpanded] = useState(false);

  const [payRollExpanded, setPayRollExpanded] = useState(false);
  const [bankExpand, setBankExpand] = useState(false);
  const [skillExpanded, setSkillExpanded] = useState(false);

  const handleAccordionToggle = (projectId) => {
    setExpanded(expanded === projectId ? null : projectId);
  };

  const handleExpand = () => {
    setPayRollExpanded(!payRollExpanded);
  };

  const handleSkillExpand = () => {
    setSkillExpanded(!skillExpanded);
  };

  const handleBankExpand = () => {
    setBankExpand(!bankExpand);
  };

  useEffect(() => {
    dispatch(getUserById("2883"));
    dispatch(getLoocations());
  }, [id]);

  const LocationData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.LocationData
  );

  const officeLocation = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.officeLocation
  );

  const DataValue = {};
  LocationData.forEach((location) => {
    DataValue[location.id] = location.dataValue;
  });

  const userData = useSelector(
    (state) => state?.nonPersist?.userDetails?.userByIdData
  );

  useEffect(() => {
    if (userData?.officeLocationId) {
      dispatch(GetOfficeLocation(userData?.officeLocationId));
    }
  }, [userData]);

  const managerData = useSelector((state) => state.persistData.masterData);

  const skillIdToName = {};
  managerData.skill.forEach((skill) => {
    skillIdToName[skill.skillId] = skill.skillName;
  });

  const bandIdToName = {};
  managerData.band.forEach((band) => {
    bandIdToName[band.bandId] = band.bandName;
  });

  const empTypeIdToName = {};
  managerData.employmentType.forEach((empType) => {
    empTypeIdToName[empType.empTypeId] = empType.employmentType;
  });

  const genderIdToName = {};
  managerData.gender.forEach((gender) => {
    genderIdToName[gender.genderId] = gender.gender;
  });

  const designationIdToName = {};
  managerData.designation.forEach((designation) => {
    designationIdToName[designation.designationId] =
      designation.designationName;
  });

  const skillItemStyle = {
    backgroundColor: "#ffff",
    borderRadius: "50px",
    padding: "8px",
    display: "flex",
    marginBottom: "8px",
    marginRight: "8px",
    border: "1px solid #1D192B",
  };

  const skillsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const handleBack = () => {
    navigate(-1);
  };

  const projects = [
    {
      id: 1,
      name: "kairos",
      description: "HRMS",
      manager: "MAANI",
      designation: "Software Engineer",
      projectStatus: "On Time",
      startDate: "25 Jan 2024",
      endDate: "2 Mar 2024",
      teamMembers: ["Rajesh", "Kiran Kumar", "Koushik"],
    },
    {
      id: 2,
      name: "cosmocart",
      description: "Food APP",
      manager: "Swaroop",
      designation: "Web Developer",
      projectStatus: "Delayed",
      startDate: "15 Feb 2024",
      endDate: "10 Apr 2024",
      teamMembers: ["koushik", "mani"],
    },
  ];

  return (
    <>
      <Grid container alignItems="center">
        <KeyboardBackspaceIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          onClick={handleBack}
        />
        <Typography variant="h2" component="div" sx={{ marginLeft: 1 }}>
          User Details Page
        </Typography>
      </Grid>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
          marginTop: "10px",
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Grid
            sx={{
              border: "2px solid #A4A4A4",
              boxShadow: "#000000",
              padding: 2,
              borderRadius: "25px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Profile Picture"
                    src={`data:image/png;base64,${userData?.fileStorage?.data}`}
                    sx={{
                      width: "180px",
                      height: "180px",
                      border: "2px solid #A4A4A4",
                    }}
                  >
                    {!userData?.fileStorage?.data && userData.firstName && (
                      <Typography
                        variant="h1"
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#A4A4A4",
                        }}
                      >
                        {userData.firstName[0].toUpperCase()}
                      </Typography>
                    )}
                  </Avatar>
                </Box>
              </Grid>
              <Grid container spacing={2} sx={{ textAlign: "center" }}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {designationIdToName[userData.designationId]}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">
                    {userData.firstName} {userData.lastName}
                  </Typography>
                </Grid>
                <Grid container spacing={2} mt={2}>
                  <Grid md={3}></Grid>
                  <Grid md={3} sx={{ alignItems: "start", textAlign: "start" }}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ color: "#898989" }}
                      >
                        Status
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#53939C" }}>
                        {userData.status}
                      </Typography>
                      <Typography sx={{ color: "#898989" }}>Email</Typography>
                      <Typography variant="body1" sx={{ color: "#53939C" }}>
                        {userData.email}
                      </Typography>
                      <Typography sx={{ color: "#898989" }}>
                        Mobile number
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#53939C" }}>
                        {userData.phoneNumber}
                      </Typography>
                      <Typography sx={{ color: "#898989" }}>Office</Typography>
                      <Typography variant="body1" sx={{ color: "#53939C" }}>
                        {officeLocation?.address?.addressLine1}
                        {officeLocation?.address?.addressLine2}
                        {DataValue[officeLocation?.address?.stateId]}
                        {officeLocation?.address?.postalCode}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              border: "2px solid #A4A4A4",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: 8.4,
              borderRadius: "25px",
              width: "100%",
            }}
          >
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
                    <Typography variant="body1">{userData.empId}</Typography>
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
                      {genderIdToName[userData.genderId]}
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
                      {bandIdToName[userData.bandId]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      <strong>Employment Type:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {empTypeIdToName[userData.empTypeId]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      <strong>Work Mode:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">Remote</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      <strong>Currect Address:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {userData?.presentAddress?.name}
                      {userData?.presentAddress?.addressLine1}
                      {userData?.presentAddress?.addressLine2}{" "}
                      {DataValue[userData?.presentAddress?.stateId]}{" "}
                      {userData?.presentAddress?.postalCode}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      <strong>Permanent Address:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {userData?.permanentAddress?.name}
                      {userData?.permanentAddress?.addressLine1}
                      {userData?.permanentAddress?.addressLine2}{" "}
                      {DataValue[userData?.permanentAddress?.stateId]}{" "}
                      {userData?.permanentAddress?.postalCode}
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
                      {userData.managerFirstName} {userData.managerLastName}
                    </Typography>
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
            Skill
          </Typography>
        </Grid>
        <Grid
          mt={2}
          sx={{
            border: "2px solid #A4A4A4",
            boxShadow: "#000000",
            padding: 2,
            borderRadius: "25px",
            width: "100%",
          }}
        >
          <Grid container spacing={1} sx={{ padding: "10px" }}>
            <Accordion
              sx={{
                border: "1px solid #898989",
                width: "100%",
              }}
              onChange={handleSkillExpand}
            >
              <AccordionSummary
                sx={{
                  flexDirection: "row",
                  "&.Mui-focusVisible": {
                    background: "none",
                  },
                  width: "100%",
                  backgroundColor: "#008080",
                }}
              >
                {skillExpanded ? <RemoveIcon /> : <AddIcon />}
                <Typography variant="h6" ml={3}>
                  Skill
                </Typography>
              </AccordionSummary>

              {!skillExpanded ? (
                <></>
              ) : (
                <>
                  <AccordionDetails
                    sx={{
                      padding: "20px 20px 20px 50px",
                    }}
                  >
                    <Grid
                      sx={{
                        backgroundColor: "#fff",
                        padding: "30px",
                        border: "1px solid #707071",
                        borderRadius: "20px",
                      }}
                    >
                      <Grid item container>
                        {/* First Inner Grid */}
                        <Grid item xs={11}>
                          <div style={skillsContainerStyle}>
                            {userData.skillId && userData.skillId.length > 0
                              ? userData.skillId.map((skill, id) => (
                                  <div key={id} style={skillItemStyle}>
                                    {id > 0 && " | "}
                                    <Typography mr={1} variant="body1">
                                      {skillIdToName[skill]}
                                    </Typography>
                                    <StarOutlinedIcon
                                      style={{
                                        backgroundColor: "#FF5722",
                                        color: "#ffff",
                                        borderRadius: "50%",
                                        width: 15,
                                        height: 15,
                                        marginTop: 4.4,
                                      }}
                                    />
                                  </div>
                                ))
                              : skillIdToName[userData.skillId]}
                          </div>
                        </Grid>

                        {/* Second Inner Grid */}
                        <Grid item xs={1}>
                          <Grid container>
                            <Grid item xs={6}>
                              <IconButton onClick={"handleIconClick"}>
                                <InfoIcon
                                  sx={{
                                    fontSize: "25px",
                                    marginTop: "-3px",
                                    color: "#008080",
                                  }}
                                />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={"handleEditButtonClick"}
                                sx={{}}
                              >
                                Edit
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </>
              )}
            </Accordion>
          </Grid>
        </Grid>
      </Grid>

      <Grid container mt={2}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Current Project Details
          </Typography>
          <Grid
            mt={2}
            sx={{
              border: "2px solid #A4A4A4",
              boxShadow: "#000000",
              padding: 2,
              borderRadius: "25px",
              width: "100%",
            }}
          >
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
                        backgroundColor: "#008080",
                      }}
                    >
                      {expanded ? <RemoveIcon /> : <AddIcon />}
                      <Typography variant="h6" ml={3}>
                        {project.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        padding: "20px 20px 20px 50px",
                      }}
                    >
                      <Grid>
                        <Typography>
                          Project Description: {project.description}
                          <br />
                        </Typography>
                        <Typography mt={1}>
                          Project Manager: {project.manager}
                          <br />
                        </Typography>
                        <Typography mt={1}>
                          Designation: {project.designation}
                          <br />
                        </Typography>
                        <Typography mt={1}>
                          Project Status: {project.projectStatus}
                          <br />
                        </Typography>
                        <Typography mt={1}>
                          Starting Date: {project.startDate}
                          <br />
                        </Typography>
                        <Typography mt={1}>
                          Ending Date: {project.endDate}
                          <br />
                        </Typography>
                        <Typography mt={1}>
                          Team Members: {project.teamMembers.join(", ")}
                          <br />
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
          <Grid
            mt={2}
            sx={{
              border: "2px solid #A4A4A4",
              boxShadow: "#000000",
              padding: 2,
              borderRadius: "25px",
              width: "100%",
            }}
          >
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
                    backgroundColor: "#008080",
                  }}
                >
                  {payRollExpanded ? <RemoveIcon /> : <AddIcon />}
                  <Typography variant="h6" ml={3}>
                    Bank Details
                  </Typography>
                </AccordionSummary>

                {!payRollExpanded ? (
                  <></>
                ) : (
                  <>
                    <AccordionDetails
                      sx={{
                        padding: "20px 20px 20px 50px",
                      }}
                    >
                      <Grid>
                        <Typography>
                          <b>Name as on the Bank :</b> {userData.nameAsOnBank}
                          <br />
                        </Typography>
                        <Typography mt={1}>
                          <b>Bank Name : </b> {userData.bankName} <br />
                        </Typography>
                        <Typography mt={1}>
                          <b>Account Number :</b> {userData.acNo} <br />
                        </Typography>
                        <Typography mt={1}>
                          <b>IFSC code : </b> {userData.ifscCode}
                          <br />
                        </Typography>
                      </Grid>
                    </AccordionDetails>
                  </>
                )}
              </Accordion>
              <Accordion
                sx={{
                  border: "1px solid #898989",
                  width: "100%",
                  marginTop: 1,
                }}
                onChange={handleBankExpand}
              >
                <AccordionSummary
                  sx={{
                    flexDirection: "row",
                    "&.Mui-focusVisible": {
                      background: "none",
                    },
                    width: "100%",
                    backgroundColor: "#008080",
                  }}
                >
                  {bankExpand ? <RemoveIcon /> : <AddIcon />}
                  <Typography variant="h6" ml={3}>
                    Current Compensation
                  </Typography>
                </AccordionSummary>

                {!bankExpand ? (
                  <></>
                ) : (
                  <>
                    <AccordionDetails
                      sx={{
                        padding: "20px 20px 20px 50px",
                      }}
                    >
                      <Grid>
                        <Typography>
                          <b>Cost to Company : </b> {userData.ctc} <br />
                        </Typography>
                      </Grid>
                    </AccordionDetails>
                  </>
                )}
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
