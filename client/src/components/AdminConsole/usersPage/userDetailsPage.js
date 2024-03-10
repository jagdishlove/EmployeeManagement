import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Avatar,
  Checkbox,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  Slider,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, saveSkills } from "../../../redux/actions/AdminConsoleAction/users/usersAction";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import {
  GetOfficeLocation,
  getLoocations,
} from "../../../redux/actions/masterData/masterDataAction";
import { styled } from "@mui/material/styles";

import InfoIcon from "@mui/icons-material/Info";
import {
  getClientDetailsAction,
  getProjectDetailsAction,
} from "../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import { ClearIcon } from "@mui/x-date-pickers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Select, { components } from "react-select";

export default function UserDetailsPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();

  const [expanded, setExpanded] = useState(false);
  const [payRollExpanded, setPayRollExpanded] = useState(false);
  const [bankExpand, setBankExpand] = useState(false);
  const [skillExpanded, setSkillExpanded] = useState(false);
  const role = useSelector((state) => state?.persistData.data.role);
  const isUser = role?.includes("USER");
  const isSuperAdmin = role?.includes("SUPERADMIN");


  const handleAddSkillClick = () => {

    setShowAddSkills(!showAddSkills);
  }
  const skills = useSelector((state) => state.persistData.masterData?.skill);
  const onResetSkillFilterHandler = () => {

    setSelectedSkills([]);

  };

  const InputOption = ({
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
  }) => {
    const [isActive, setIsActive] = useState(false);

    const handleCheckboxClick = () => {
      rest.selectProps.onChange(rest.data); // Calls the provided onChange function
    };

    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    let bg = "transparent";
    if (isFocused) bg = "#eee";
    if (isActive) bg = "#B2D4FF";

    const style = {
      alignItems: "center",
      backgroundColor: bg,
      color: "inherit",
      display: "flex ",
    };

    const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style,
    };

    return (
      <components.Option
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box>{children}</Box>
          <Checkbox color="primary" checked={isSelected} onClick={handleCheckboxClick} />
        </Box>
      </components.Option>
    );
  };


  const applySkillFilterHandler = () => {

  };
  const CustomMenu = (props) => {
    return (
      <components.Menu {...props}>
        {props.children}
        <Box
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            onClick={applySkillFilterHandler}
            style={{
              width: "100%",
              backgroundColor: "#008080",
              borderRadius: "10px",
              color: "#fff",
            }}
          >
            Apply
          </Button>
          <Button
            onClick={onResetSkillFilterHandler}
            style={{
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #008080",
              color: "#008080",
              marginTop: "5px",
            }}
          >
            Clear All
          </Button>
        </Box>
      </components.Menu>
    );
  };

  const handleAccordionToggle = (projectId) => {
    setExpanded(expanded === projectId ? null : projectId);
    dispatch(getProjectDetailsAction(projectId));
  };

  const { projectDetailsData } = useSelector(
    (state) => state.nonPersist?.projectDetails
  );

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
    dispatch(getUserById(id));
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

    const [selectedSkills, setSelectedSkills] = useState(userData?.employeeSkill);


  useEffect(() => {
    if (userData?.officeLocationId) {
      dispatch(GetOfficeLocation(userData?.officeLocationId));
    }
    if (userData?.clientLocationId) {
      dispatch(getClientDetailsAction(userData?.clientLocationId));
    }
  }, [userData]);

  const managerData = useSelector((state) => state.persistData.masterData);

  const skillIdToName = {};
  managerData.skill?.forEach((skill) => {
    skillIdToName[skill.skillId] = skill?.skillName;
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

  const { clientDetailsData } = useSelector(
    (state) => state.nonPersist.projectDetails
  );



  const skillItemStyle = {
    backgroundColor: "#ffff",
    borderRadius: "10px",
    padding: "8px",
    display: "flex",
    marginBottom: "8px",
    marginRight: "8px",
    border: "1px solid silver",
  };

  const editedSkillItemStyle = {
    backgroundColor: "#ffff",
    padding: "8px",
    display: "inline-flex",
    marginBottom: "8px",
    marginRight: "8px",
    width: "400px",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [showAddSkills, setShowAddSkills] = useState(false);
  const[addSkills,setAddSkills]= useState()
  // const [value, setValue] = useState(0); 
  const [skillValues, setSkillValues] = useState({});


  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
    setShowAddSkills(false);
  };

  const handleSliderChange = (skillId, newValue) => {
    setSkillValues((prevValues) => ({
      ...prevValues,
      [skillId]: newValue,
    }));
  
    // setValue(newValue);
    const updatedSkills = selectedSkills.map((skill) =>
      skill.skillId === skillId ? { ...skill, rating: newValue } : skill
    );
    setSelectedSkills(updatedSkills);
    const updatedAddSkills = updatedSkills.map(({ skillId, rating }) => ({
      skillId,
      rating,
    }));
    setAddSkills(updatedAddSkills)
  };

  const handleRemoveSkill = (skillIndex) => {
    // Remove the selected skill when the "X" button is clicked
    const updatedSkills = [...selectedSkills];
    updatedSkills.splice(skillIndex, 1);
    setSelectedSkills(updatedSkills);
  };
 
  const ValueLabelComponent = (props) => {
    const { children, open, value } = props;

    return (
      <Tooltip
        open={open}
        enterTouchDelay={0}
        placement="top"
        title={`Value: ${value}`}
      >
        {children}
      </Tooltip>
    );
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsEditing(false);
    dispatch(saveSkills(addSkills));

  };
  const renderSkills = () => {
    return selectedSkills?.map((skill, id) => (
      <div key={id} style={isEditing ? editedSkillItemStyle : skillItemStyle}>
        {!isEditing && (
          <Typography variant="body1" sx={{ width: "100%" }}>
        {skill.skillName}
          </Typography>
        )}
        {isEditing && (
          <>
                    <Typography variant="body1" sx={{ width: "100%" }}>
        {skill.skillName}
          </Typography>
          <LightTooltip title={`${skillValues[skill.skillId]}`} >
            <Slider
              value={skillValues[skill.skillId] || 0}
              onChange={(event, newValue) => handleSliderChange(skill.skillId, newValue)}
              min={0}
              max={10}
              step={1} // Optional: Set the step to 1 if you want to allow only integer values
              sx={{
                width: "500px",
                color:
                skillValues[skill.skillId] < 5
                  ? "#90DC90"
                  : skillValues[skill.skillId] >= 5 &&
                    skillValues[skill.skillId] <= 7
                  ? "#E6E62C"
                  : "#E38F75",
              
              }}
              components={{
                ValueLabel: ValueLabelComponent,
              }}
            />
            </LightTooltip>
            <IconButton onClick={() => handleRemoveSkill(id)}>
              <ClearIcon
                sx={{
                  marginTop: -0.3,
                }}
              />
            </IconButton>
          </>
        )}
        {!isEditing && (
          <>
          <StarOutlinedIcon
            style={{
              backgroundColor:
              skillValues[skill.skillId] < 5
                  ? "#90DC90"
                  : skillValues[skill.skillId]>= 5 && skillValues[skill.skillId] <= 7
                    ? "#E6E62C"
                    : "#E38F75",
              color: "#ffff",
              borderRadius: "50%",
              width: 15,
              height: 15,
              marginTop: 4.4,
              marginLeft: 5,
            }}
          />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
          {skillValues[skill.skillId]}
        </Typography>
          </>
        )}
       
      </div>
    ));
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '6px 6px 0',
      borderColor: `${theme.palette.common.white} transparent transparent transparent`,
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    },
  }));

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const skillsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const handleBack = () => {
    navigate(-1);
  };


  const handleEdit = (id) => {
    navigate(`/editUser/${id}`);
  };

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
      {isSuperAdmin ? (
        <>
          <Grid sx={{ textAlign: "end" }}>
            <Button
              sx={{
                border: "1px solid #008080",
                color: "#008080",
              }}
              onClick={() => handleEdit(userData?.id)}
            >
              <BorderColorOutlinedIcon fontSize="small" />
              Edit
            </Button>
          </Grid>
        </>
      ) : (
        <></>
      )}

      <Grid container spacing={2} mt={1}>
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
              paddingBottom: userData.clientLocationId ? "6.4%" : "9.5%",
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
              {userData.clientLocationId ? (
                <>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="body1">
                          <strong>Client Location :</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {`${clientDetailsData?.clientName}, ${clientDetailsData?.address?.addressLine1
                            }, ${clientDetailsData?.address?.addressLine2}, 
                            ${DataValue[clientDetailsData?.address?.cityId]
                            } - ${clientDetailsData?.address?.postalCode}, 
                            ${DataValue[clientDetailsData?.address?.stateId]
                            }, ${DataValue[clientDetailsData?.address?.countryId]
                            }.`}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid>
                    {""}
                    {""} {""}
                  </Grid>
                </>
              )}

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
                    <Typography variant="body1">{userData.workMode}</Typography>
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
                      item
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        textAlign: "end",
                      }}
                    >
                      {(isUser || isSuperAdmin) ? (
                        <>
                          <Grid container>
                            <Grid item xs={10}>
                              <HtmlTooltip
                                sx={{
                                  "& .MuiTooltip-tooltip": {
                                    backgroundColor: "#fff !important",
                                    // Add additional styles if needed
                                  },
                                }}
                                title={
                                  <Grid
                                    sx={{
                                      backgroundColor: "#fff",
                                      width: "100%",
                                      zIndex: 9999,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        color: "#000",
                                        padding: "2px",
                                        borderRadius: "2px",
                                      }}
                                    >
                                      <Typography variant="body2">
                                        <StarOutlinedIcon
                                          style={{
                                            backgroundColor: "#90DC90",
                                            color: "#ffff",
                                            borderRadius: "50%",
                                            width: 15,
                                            height: 15,
                                            marginRight: 5,
                                          }}
                                        />
                                        1 to 3 – Beginner
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        color: "#000",
                                        padding: "2px",
                                        borderRadius: "2px",
                                      }}
                                    >
                                      <Typography variant="body2">
                                        <StarOutlinedIcon
                                          style={{
                                            backgroundColor: "#C6C620",
                                            color: "#ffff",
                                            borderRadius: "50%",
                                            width: 15,
                                            height: 15,
                                            marginRight: 5,
                                          }}
                                        />
                                        4 to 6 – Intermediate
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        color: "#000",
                                        padding: "2px",
                                        borderRadius: "2px",
                                      }}
                                    >
                                      <Typography variant="body2">
                                        <StarOutlinedIcon
                                          style={{
                                            backgroundColor: "#FF5722",
                                            color: "#ffff",
                                            borderRadius: "50%",
                                            width: 15,
                                            height: 15,
                                            marginRight: 5,
                                          }}
                                        />
                                        7 to 10 – Advanced
                                      </Typography>
                                    </Box>
                                  </Grid>
                                }
                              >
                                <IconButton>
                                  <InfoIcon
                                    sx={{
                                      fontSize: "25px",
                                      marginTop: "-3px",
                                      color: "#008080",
                                    }}
                                  />
                                </IconButton>
                              </HtmlTooltip>
                            </Grid>

                            <Grid
                              item
                              xs={2}
                              sx={{
                                textAlign: "start",
                              }}
                            >
                              {!isEditing ? (
                                <>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleEditButtonClick}
                                  >
                                    {"Edit"}
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleAddSkillClick}
                                  >
                                    Add Skills
                                    <KeyboardArrowDownIcon
                                      sx={{
                                        marginLeft: 2,
                                      }}
                                    />
                                  </Button>
                                  {showAddSkills && (
                                    <Select
                                      isSearchable={false}
                                      isMulti
                                      closeMenuOnSelect={false}
                                      hideSelectedOptions={false}
                                      onChange={(selectedOptions) => {
                                        setSelectedSkills(selectedOptions);
                                      }}
                                      options={skills}
                                      value={selectedSkills}
                                      components={{
                                        Option: (props) => (
                                          <InputOption
                                            {...props}
                                            skillsCheckedData={selectedSkills}
                                          />
                                        ),
                                        Menu: CustomMenu,
                                      }}
                                      isClearable={false}
                                      controlShouldRenderValue={true}
                                      getOptionValue={(option) => option.skillId}
                                      getOptionLabel={(option) => option.skillName}
                                      isLoading={skills?.length === 0}
                                      styles={{
                                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                        control: (baseStyles) => ({
                                          ...baseStyles,
                                          height: "auto",
                                        }),
                                      }}
                                    />
                                  )}
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        <></>
                      )}
                    </Grid>
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
                        <Grid item>
                          <div style={skillsContainerStyle}>
                            {renderSkills()}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                          {isEditing && (
                            <Grid item>
                            <Button
                              variant="outlined"
                              sx={{ color: 'black', bgcolor: 'white', marginRight: '10px' }}
                              onClick={handleCancel}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ color: 'white', bgcolor: '#008080' }}
                              onClick={handleSave}
                            >
                              Save
                            </Button>
                            </Grid>
                          )}
                          </div>
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
              boxShadow: "#000000",
              padding: 2,
              borderRadius: "25px",
              width: "100%",
            }}
          >
            <Grid container spacing={1} sx={{ padding: "10px" }}>
              {userData?.projectDetails?.length > 0 ? (
                userData?.projectDetails?.map((project) => (
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
                        {expanded === project.id ? <RemoveIcon /> : <AddIcon />}
                        <Typography variant="h6" ml={3}>
                          {project.projectName}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          padding: "20px 20px 20px 50px",
                        }}
                      >
                        <Grid
                          sx={{
                            backgroundColor: "#F0F0F0",
                            padding: "30px",
                            borderRadius: "10px",
                          }}
                        >
                          <Typography mt={1}>
                            <strong> Project Manager:</strong>{" "}
                            {projectDetailsData?.projectManager}
                            <br />
                          </Typography>
                          <Typography mt={1}>
                            <strong> Project Lead:</strong>{" "}
                            {projectDetailsData?.projectLead}
                            <br />
                          </Typography>
                          <Typography mt={1}>
                            Project Status: On going <br />
                          </Typography>
                          <Typography mt={1}>
                            Starting Date: {projectDetailsData?.startDate}
                            <br />
                          </Typography>
                          <Typography mt={1}>
                            Ending Date: {projectDetailsData?.endDate} <br />
                          </Typography>
                          <Typography mt={1}>
                            Actual End Date: {projectDetailsData?.actualEndDate}{" "}
                            <br />
                          </Typography>
                          <Typography mt={1}>
                            Team Members:{" "}
                            {projectDetailsData?.projectResources?.map(
                              (resource, index, array) => (
                                <span key={resource.resourceId}>
                                  {resource.employeeName}
                                  {index < array.length - 1 && ", "}
                                </span>
                              )
                            )}
                          </Typography>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h3">
                    No projects allocated yet.
                  </Typography>
                </Grid>
              )}
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
