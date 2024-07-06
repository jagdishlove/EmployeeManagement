import React, { useEffect, useRef, useState } from "react";
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
  CircularProgress,
  useMediaQuery,
  useTheme
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  saveSkills,
} from "../../../redux/actions/AdminConsoleAction/users/usersAction";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import {
  GetOfficeLocation,
  getLoocations,
  masterDataAction
} from "../../../redux/actions/masterData/masterDataAction";
import { styled } from "@mui/material/styles";

import InfoIcon from "@mui/icons-material/Info";
import {
  getClientDetailsAction,
  getProjectDetailsAction,
} from "../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import { ClearIcon } from "@mui/x-date-pickers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select, { components } from "react-select";

export default function UserDetailsPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);
  const [payRollExpanded, setPayRollExpanded] = useState(false);
  const [bankExpand, setBankExpand] = useState(false);
  const [leaveExpanded, setLeaveExpanded] = useState(false);
  const [skillExpanded, setSkillExpanded] = useState(false);
  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data.role
  );
  const isSuperAdmin = role?.includes("SUPERADMIN");

  const empId = useSelector(
    (state) => state?.persistData?.loginDetails?.data?.empId
  );

  const handleAddSkillClick = () => {
    setShowAddSkills(!showAddSkills);
  };
  const skills = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.skill
  );
 
  const isMobile = useMediaQuery("(max-width: 1050px)");

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
          <Checkbox
            color="primary"
            checked={isSelected}
            onClick={handleCheckboxClick}
          />
        </Box>
      </components.Option>
    );
  };

  const CustomMenu = (props) => {
    const { innerProps, children, selectProps } = props;

    const applySkillFilterHandler = () => {
      setSelectedSkills(selectedSkills);
      setShowAddSkills(false);
      // Close the dropdown when the "Apply" button is clicked
      selectProps.onMenuClose();
    };

    const onResetSkillFilterHandler = () => {
      setSelectedSkills([]);
      // Close the dropdown when the "Apply" button is clicked
      selectProps.onMenuClose();
    };

    return (
      <components.Menu {...props}>
        {children}
        <Box
          style={{
            position: "absolute",
            bottom: "-50px",
            left: 0,
            right: 0,
            padding: "10px",
            background: "white",
            border: "1px solid lightgray",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: window.innerWidth < 600 ? "column" : "row", // Stack buttons vertically on small screens
          }}
          {...innerProps}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={onResetSkillFilterHandler}
            style={{
              border: "1px solid #008080",
              borderRadius: "20px",
              color: "#008080",
              marginBottom: window.innerWidth < 600 ? "10px" : "0", // Add margin on small screens
              width: window.innerWidth < 600 ? "100%" : "auto", // Full width on small screens
              "&:hover": {
                backgroundColor: "#008080",
                color: "white",
              },
            }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={applySkillFilterHandler}
            style={{
              borderRadius: "20px",
              marginLeft: window.innerWidth < 600 ? "0" : "10px", // Remove left margin on small screens
              width: window.innerWidth < 600 ? "100%" : "auto", // Full width on small screens
            }}
          >
            Apply
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
    (state) => state.persistData?.projectDetails
  );

  const handleExpand = () => {
    setPayRollExpanded(!payRollExpanded);
  };
  const handleExpand2 = () => {
    setLeaveExpanded(!leaveExpanded);
  };

  const handleSkillExpand = () => {
    setSkillExpanded(!skillExpanded);
    setShowAddSkills(false);
    setIsEditing(false);
  };

  const handleBankExpand = () => {
    setBankExpand(!bankExpand);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
      dispatch(getLoocations());
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const LocationData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.LocationData
  );

  const officeLocation = useSelector(
    (state) => state?.persistData?.masterDataDetails?.officeLocation
  );

  const DataValue = {};
  LocationData.forEach((location) => {
    DataValue[location.id] = location.dataValue;
  });

  const userData = useSelector(
    (state) => state?.persistData?.userDetails?.userByIdData
  );
  const { userByIDLoading } = useSelector(
    (state) => state?.persistData?.userDetails
  );
  const [selectedSkills, setSelectedSkills] = useState();

  useEffect(() => {
    if (userData?.employeeSkill) {
      setSelectedSkills(userData.employeeSkill);
    }
    setAddSkills(userData?.employeeSkill);
  }, [userData?.employeeSkill]);

  useEffect(() => {
    if (userData?.officeLocationId) {
      dispatch(GetOfficeLocation(userData?.officeLocationId));
    }
    if (userData?.clientLocationId) {
      dispatch(getClientDetailsAction(userData?.clientLocationId));
    }
  }, [userData]);

  useEffect(() => {
    dispatch(masterDataAction());
  }, [dispatch]);
  
  const leaveTypeMasterData = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.leaveTypesForView
  );
  console.log("leaveTypeMasterData", leaveTypeMasterData);
  
  const leaveBalance = useSelector(
    (state) => state?.persistData?.userDetails?.userByIdData?.leaveBalance
  );
  console.log("leaveBalance", leaveBalance);
  
  const result = leaveBalance && leaveTypeMasterData ? leaveBalance.map((item) => {
    const leaveMasterId = parseInt(Object.keys(item)[0]);
    const matchingMasterData = leaveTypeMasterData.find(
      (data) => data.leaveMasterId === leaveMasterId
    );
  
    return {
      leaveMasterId,
      leaveType: matchingMasterData ? matchingMasterData.leaveType : undefined,
      numberDays: item[leaveMasterId],
    };
  }) : [];
  
  const managerData = useSelector(
    (state) => state.persistData?.loginDetails?.masterData
  );
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
    (state) => state.persistData.projectDetails
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
    // padding: "5px",
    display: "inline-flex",
    marginBottom: "20px",
    marginRight: "8px",
    width: isMobile ? "200px" : "400px",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [showAddSkills, setShowAddSkills] = useState(false);
  const [addSkills, setAddSkills] = useState();
 
  const [skillValues, setSkillValues] = useState({});
  
  const previousSelectedSkills = useRef();

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
    setShowAddSkills(false);
    previousSelectedSkills.current = [...selectedSkills];
  };

  const handleSliderChange = (skillId, newValue) => {
    // Update skill values
    setSkillValues((prevValues) => ({
      ...prevValues,
      [skillId]: newValue,
    }));

    // Update selected skills
    const updatedSkills = selectedSkills.map((skill) =>
      skill.skillId === skillId ? { ...skill, rating: newValue } : skill
    );
    setSelectedSkills(updatedSkills);

    // Update add skills
    const updatedAddSkills = updatedSkills.map(({ skillId, rating }) => ({
      skillId,
      rating: rating !== undefined ? rating : 8,
    }));
    setAddSkills(updatedAddSkills);
  };

  const handleRemoveSkill = (skillIndex) => {
    const updatedSelectedSkills = selectedSkills.filter(
      (_, index) => index !== skillIndex
    );
    setSelectedSkills(updatedSelectedSkills);

    const updatedAddSkills = updatedSelectedSkills.map(
      ({ skillId, rating }) => ({
        skillId,
        rating: rating !== undefined ? rating : 0,
      })
    );
    setAddSkills(updatedAddSkills);
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
    setSelectedSkills(previousSelectedSkills.current);
    setAddSkills([]);
  };
  const handleSave = () => {
    setIsEditing(false);
    dispatch(saveSkills(addSkills));
  };
  const renderSkills = () => {
    return selectedSkills?.map((skill, skillId) => (
      <div key={id} style={isEditing ? editedSkillItemStyle : skillItemStyle}>
        {!isEditing && (
          <Typography variant="body1" sx={{ width: "100%" }}>
            {skill.skillName}
          </Typography>
        )}
        {isEditing && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // Center the items vertically
              width: "100%",
            }}
          >
            <Typography variant="body1" sx={{ width: "30%" }}>
              {skill.skillName}
            </Typography>
            <LightTooltip
              title={`${skillValues[skill.skillId] || skill.rating || 1}`}
            >
              <Slider
                value={skillValues[skill.skillId] || skill.rating}
                onChange={(event, newValue) =>
                  handleSliderChange(skill.skillId, newValue)
                }
                min={0}
                max={10}
                step={1}
                sx={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  width: isMobile ? "250px" : "500px",
                  color:
                    (skillValues[skill.skillId] ||
                      skill.rating ||
                      skill.rating === undefined) < 4
                      ? "#90DC90"
                      : ((skillValues[skill.skillId] > 4 &&
                        skillValues[skill.skillId]) ||
                        skill.rating) < 7
                        ? "#E6E62C"
                        : "#E38F75",
                }}
                components={{
                  ValueLabel: ValueLabelComponent,
                }}
              />
            </LightTooltip>
            <IconButton onClick={() => handleRemoveSkill(skillId)}>
              <ClearIcon />
            </IconButton>
          </Box>
        )}

        {!isEditing && (
          <>
            <StarOutlinedIcon
              style={{
                backgroundColor:
                  skill.rating < 4 || skill.rating === undefined
                    ? "#90DC90"
                    : skill.rating >= 4 && skill.rating < 7
                      ? "#E6E62C"
                      : "#E38F75",
                color: "#ffff",
                borderRadius: "50%",
                width: 15,
                height: 15,
                marginTop: 4.4,
                marginLeft: 5,
                marginRight: 4,
              }}
            />
            {skill?.rating || 0}
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
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "6px 6px 0",
        borderColor: `${theme.palette.common.white} transparent transparent transparent`,
        bottom: "-6px",
        left: "50%",
        transform: "translateX(-50%)",
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

  const Navigate = useNavigate();

  const handleBack = () => {
    const formSaved = localStorage.getItem('formSaved');
  
    if (formSaved === 'true') {
      // Clear the flag
      localStorage.removeItem('formSaved');
      localStorage.removeItem('currentPage'); // Clear the stored page number
      Navigate("/users");
    } else {
      Navigate(-1);
    }
  };
  
  const handleEdit = (id) => {
    navigate(`/editUser/${id}`);
  };

  const updateBottomSkills = () => {
    const updatedSkills = [...addSkills];
    selectedSkills.forEach((topSkill) => {
      const exists = updatedSkills.find(
        (skill) => skill.skillId === topSkill.skillId
      );
      if (!exists) {
        updatedSkills.push({
          esmId: topSkill.esmId,
          skillName: topSkill.skillName,
          skillId: topSkill.skillId,
          rating: topSkill.rating,
        });
      }
    });

    setAddSkills(updatedSkills);
  };

  const selectedSkillFunc = (skill) => {
 skill.forEach(obj => {
    if (!('rating' in obj)) {
        obj.rating = 1;
    }
});

    updateBottomSkills();
    setSelectedSkills(skill);
    setAddSkills(skill);
  };

  return (
    <>
      {userByIDLoading ? (
        <div style={{ textAlign: "center" }}>
          {" "}
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container alignItems="center">
            <KeyboardBackspaceIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={handleBack}
            />
            <Typography variant="h2" component="div" sx={{ marginLeft: 1 }}>
              User Details
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
                    textTransform: "capitalize",
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

          <Grid container spacing={2} mt={1} sx={{ display: "flex" }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={3.5}
              lg={3.5}
              justifyContent={"center"}
              marginLeft={"0px"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid
                sx={{
                  border: "2px solid #A4A4A4",
                  boxShadow: "#000000",
                  flexGrow: 1,
                  padding: 2,
                  borderRadius: "25px",
                }}
              >
                <Grid container spacing={2} marginLeft={"-10px"}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        height: "178px",
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
                              color: "#ffff",
                              backgroundColor: "#008080",
                            }}
                          >
                            {userData.firstName[0].toUpperCase()}
                          </Typography>
                        )}
                      </Avatar>
                    </Box>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    sx={{ textAlign: "center", marginLeft: "0px" }}
                  >
                    <Grid item xs={12} mt={1}>
                      <Typography variant="h4">{userData.firstName}</Typography>
                    </Grid>
                    <Grid item xs={12} mt={-2}>
                      <Typography variant="h3" sx={{
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all',
                }}>
                        {designationIdToName[userData.designationId]}
                      </Typography>
                    </Grid>
                    <Grid container spacing={2} mt={2} marginLeft={"0px"}>
                      <Grid xs={0} md={3}></Grid>
                      <Grid
                        xs={12}
                        md={9}
                        sx={{
                          marginLeft: "0px",
                          alignItem: {
                            xs: "center",
                            md: "start",
                          },
                          textAlign: {
                            xs: "center",
                            md: "start",
                          },
                        }}
                      >
                        <Grid>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{ color: "#898989" }}
                          >
                            Status
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              marginBottom: "5px",
                            }}
                          >
                            {userData.status &&
                              userData.status.charAt(0).toUpperCase() +
                              userData.status.slice(1).toLowerCase()}
                          </Typography>
                          <Typography sx={{ color: "#898989" }}>
                            Date Of Birth
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#53939C", marginBottom: "7px" }}
                          >
                            {userData.dob}
                          </Typography>
                          <Typography sx={{ color: "#898989" }}>
                            Email
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#53939C", marginBottom: "7px" }}
                          >
                            {userData.email}
                          </Typography>
                          <Typography sx={{ color: "#898989" }}>
                            Mobile Number
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#53939C", marginBottom: "7px" }}
                          >
                            {userData.phoneNumber}
                          </Typography>
                          <Typography sx={{ color: "#898989" }}>
                            Office
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#53939C",
                              marginBottom: "7px",
                              fontSize: "14px",
                              
                                overflowWrap: 'break-word',
                                wordBreak: 'break-all',
                              
                            }}

                          >
                            {`${officeLocation?.address?.addressLine1}, 
                  ${officeLocation?.address?.addressLine2}, 
                  ${DataValue[officeLocation?.address?.stateId]}, 
                  ${officeLocation?.address?.postalCode}`
                              .split(",")
                              .map((item, index) => (
                                <React.Fragment key={index}>
                                  {item.trim()}
                                  {index !== 3 && ","}{" "}
                                  {/* Add a comma if it's not the last item */}
                                  {index !== 3 && " "}{" "}
                                  {/* Add a space if it's not the last item */}
                                </React.Fragment>
                              ))}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8.5}
              lg={8.5}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Box
      sx={{
        border: '2px solid #A4A4A4',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        flexGrow: 1,
        padding: { xs: '35px', md: '70px' },
        borderRadius: '25px',
        width: { xs: '100%', md: '97%' },
      }}
    >
      <Typography variant="h5" gutterBottom>
        <b>Basic Details :</b>
      </Typography>
      <Grid container spacing={2} mt={1.3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Typography variant="body1"
                >
                <strong>Employee ID:</strong>
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8} md={8} lg={8}>
              <Typography variant="body1" sx={{
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all',
                }}>{userData.empId}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Typography variant="body1">
                <strong>Date Of Joining:</strong>
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8} md={8} lg={8}>
              <Typography variant="body1">{userData.joiningDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Typography variant="body1">
                <strong>Gender:</strong>
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8} md={8} lg={8}>
              <Typography variant="body1">{genderIdToName[userData.genderId]}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Typography variant="body1">
                <strong>Employment Type:</strong>
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8} md={8} lg={8}>
              <Typography variant="body1">{empTypeIdToName[userData.empTypeId]}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {userData.clientLocationId? (
          <>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={7} sm={4} md={4} lg={4}>
                  <Typography variant="body1">
                    <strong>Client Location :</strong>
                  </Typography>
                </Grid>
                <Grid item xs={5} sm={8} md={8} lg={8}>
                  <Typography
                    variant="body1"
                    sx={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-all',
                    }}
                  >
                    {`${clientDetailsData?.clientName}, ${clientDetailsData?.address?.addressLine1
                      }, ${clientDetailsData?.address?.addressLine2}, 
                    ${DataValue[clientDetailsData?.address?.cityId]} - ${clientDetailsData?.address?.postalCode
                      }, 
                    ${DataValue[clientDetailsData?.address?.stateId]}, ${DataValue[clientDetailsData?.address?.countryId]
                      }.`}
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
            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Typography variant="body1">
                <strong>Work Mode:</strong>
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8} md={8} lg={8}>
              <Typography variant="body1">{userData.workMode}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Typography variant="body1">
                <strong>Reporting Manager:</strong>
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8} md={8} lg={8}>
              <Typography variant="body1">
                {userData.managerFirstName} {userData.managerLastName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Typography variant="body1">
                <strong>Currect Address:</strong>
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8} md={8} lg={8}>
              <Typography
                variant="body1"
                sx={{
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all',
                }}
              >
                {userData?.presentAddress?.name}
                {userData?.presentAddress?.addressLine1}
                {", "}
                {userData?.presentAddress?.addressLine2}
                {", "}
                {DataValue[userData?.presentAddress?.stateId]}
                {", "}
                {userData?.presentAddress?.postalCode}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={7} sm={4} md={4} lg={4}>
              <Typography variant="body1">
                <strong>Permanent Address:</strong>
              </Typography>
            </Grid>
            <Grid item xs={5} sm={8} md={8} lg={8}>
              <Typography
                variant="body1"
                sx={{
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all',
                }}
              >
                {userData?.permanentAddress?.name}
                {userData?.permanentAddress?.addressLine1}
                {", "}
                {userData?.permanentAddress?.addressLine2}
                {", "}
                {DataValue[userData?.permanentAddress?.stateId]}
                {", "}
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
              sx={{
                boxShadow: "#000000",
                padding: 0,
                borderRadius: "25px",
                width: "100%",
              }}
            >
              <Grid container spacing={1} sx={{ padding: "10px" }}>
                <Accordion
                  sx={{
                    border: "1px solid #898989",
                    backgroundColor: "#F0F0F0",
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
                      color: "#fff",
                    }}
                  >
                    <Typography variant="h6" ml={3}>
                      Skill
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute", // Absolute positioning for the icons
                        right: 10,
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                      }}
                    >
                      {skillExpanded ? <RemoveIcon /> : <AddIcon />}
                    </Box>
                  </AccordionSummary>

                  {!skillExpanded ? (
                    <></>
                  ) : (
                    <>
                      <AccordionDetails
                        sx={{
                          padding: isMobile ? "20px" : "20px 20px 20px 50px",
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
                          <Grid
                            display="flex"
                            justifyContent="space-between"
                            alignItems="end"
                            mb={1}
                          >
                            <Grid
                              item
                              justifyContent="space-between"
                              alignItems="end"
                              sx={{
                                textAlign: "end",
                              }}
                            >
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
                              sx={{
                                textAlign: "start",
                              }}
                            >
                              {!isEditing ? (
                                <>
                                  {empId == id ? (
                                    <>
                                      <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleEditButtonClick}
                                        style={{
                                          backgroundColor: "white",
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        <BorderColorOutlinedIcon />
                                        {"Edit"}
                                      </Button>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleAddSkillClick}
                                    style={{
                                      backgroundColor: "white",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Add Skills
                                    <KeyboardArrowDownIcon
                                      sx={{
                                        marginLeft: 2,
                                      }}
                                    />
                                  </Button>
                                  {showAddSkills && (
                                    <>
                                      <Select
                                        isSearchable={false}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        hideSelectedOptions={false}
                                        onChange={(selectedOptions) => {
                                          selectedSkillFunc(selectedOptions);
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
                                        getOptionValue={(option) =>
                                          option.skillId
                                        }
                                        getOptionLabel={(option) =>
                                          option.skillName
                                        }
                                        isLoading={skills?.length === 0}
                                        styles={{
                                          menuPortal: (base) => ({
                                            ...base,
                                            zIndex: 9999,
                                          }),
                                          control: (baseStyles) => ({
                                            ...baseStyles,
                                            overflow: "auto",
                                            height: "55px",
                                            width: isSmallScreen ? '100%' : '300px', // Responsive width
                                          }),
                                        }}
                                      />
                                    </>
                                  )}
                                </>
                              )}
                            </Grid>
                          </Grid>
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
                            <div style={skillsContainerStyle}>
                              {renderSkills()}
                            </div>
                            {isEditing && (
                              <Grid
                                container
                                sx={{
                                  bottom: 0,
                                  left: 0,
                                  width: "100%",
                                  padding: "10px",
                                  backgroundColor: "#fff",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  sx={{
                                    color: "#000",
                                    bgcolor: "white",
                                    marginRight: "10px",
                                    textTransform: "capitalize",
                                  }}
                                  onClick={handleCancel}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  sx={{
                                    color: "white",
                                    bgcolor: "#008080",
                                    textTransform: "capitalize",
                                  }}
                                  onClick={handleSave}
                                >
                                  Save
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </>
                  )}
                </Accordion>
              </Grid>
            </Grid>
          </Grid>

          <Grid container mt={2} mb={4}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>
                Current Project Details
              </Typography>
              <Grid
                mt={-1}
                sx={{
                  boxShadow: "#000000",
                  padding: 0,
                  borderRadius: "25px",
                  width: "100%",
                }}
              >
                <Grid
                  container
                  spacing={1}
                  sx={{ padding: "10px 10px 10px 0px" }}
                >
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
                              color: "#fff",
                            }}
                          >
                            <Typography variant="h6" ml={3}>
                              {project.projectName}
                            </Typography>
                            <Box
                              sx={{
                                position: "absolute", // Absolute positioning for the icons
                                right: 10,
                                display: "flex",
                                alignItems: "center",
                                color: "#fff",
                              }}
                            >
                              {expanded === project.id ? (
                                <RemoveIcon />
                              ) : (
                                <AddIcon />
                              )}
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              padding: isMobile
                                ? "20px"
                                : "20px 20px 20px 50px",
                            }}
                          >
                            <Grid
                              sx={{
                                padding: "10px",
                                border: "1px solid black",
                                borderRadius: "10px",
                                backgroundColor: "#F0F0F0",
                              }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={2}>
                                  <Typography variant="body1">
                                    <strong>Project Manager:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="body1">
                                    {projectDetailsData?.projectManager?.name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography variant="body1">
                                    <strong>Project Lead:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="body1">
                                    {projectDetailsData?.projectTechLead?.name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography variant="body1">
                                    <strong>Project Status:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="body1">
                                    {projectDetailsData?.status}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography variant="body1">
                                    <strong>Starting Date:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="body1">
                                    {projectDetailsData?.startDate}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography variant="body1">
                                    <strong>Ending Date:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="body1">
                                    {projectDetailsData?.endDate}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography variant="body1">
                                    <strong>Actual End Date:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="body1">
                                    {projectDetailsData?.actualEndDate}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography variant="body1">
                                    <strong>Team Members:</strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="body1">
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
                              </Grid>
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


            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>
                Leave Balance
              </Typography>
              <Grid
                mt={-1}
                sx={{
                  boxShadow: "#000000",
                  padding: 0,
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
                    onChange={handleExpand2}
                  >
                    <AccordionSummary
                      sx={{
                        flexDirection: "row",
                        "&.Mui-focusVisible": {
                          background: "none",
                        },
                        width: "100%",
                        color: "#fff",
                        backgroundColor: "#008080",
                      }}
                    >
                      <Typography variant="h6" ml={3}>
                        Leave Details
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          right: 10,
                          display: "flex",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        {leaveExpanded ? <RemoveIcon /> : <AddIcon />}
                      </Box>
                    </AccordionSummary>

                    {!leaveExpanded ? (
                      <></>
                    ) : (
                      <AccordionDetails
                        sx={{
                          padding: isMobile ? "20px" : "20px 20px 20px 50px",
                        }}
                      >
                        <Grid
                          sx={{
                            padding: "10px",
                            border: "1px solid black",
                            borderRadius: "10px",
                            backgroundColor: "#F0F0F0",
                          }}
                        >
                          {result.length > 0 ? (
                            result.map((data, index) => (
                              <Grid container spacing={2} key={index}>
                                <Grid item xs={2}>
                                  <Typography variant="body1">
                                   <b> {data.leaveType} :</b>
                                   
                                  </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="body1">
                                    {data.numberDays}
                                  </Typography>
                                </Grid>
                              </Grid>
                            ))
                          ) : (
                            <Typography variant="h3">No Leave Data Found</Typography>
                          )}
                        </Grid>
                      </AccordionDetails>
                    )}
                  </Accordion>
                </Grid>
              </Grid>
            </Grid>

            <Grid container mt={2}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h3" gutterBottom>
                  Pay Roll
                </Typography>
              </Grid>
              <Grid
                mt={-1}
                sx={{
                  boxShadow: "#000000",
                  padding: 0,
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
                        color: "#fff",

                        backgroundColor: "#008080",
                      }}
                    >
                      <Typography variant="h6" ml={3}>
                        Bank Details
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute", // Absolute positioning for the icons
                          right: 10,
                          display: "flex",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        {payRollExpanded ? <RemoveIcon /> : <AddIcon />}
                      </Box>
                    </AccordionSummary>

                    {!payRollExpanded ? (
                      <></>
                    ) : (
                      <>
                        <AccordionDetails
                          sx={{
                            padding: isMobile ? "20px" : "20px 20px 20px 50px",
                          }}
                        >
                          <Grid
                            sx={{
                              padding: "10px",
                              border: "1px solid black",
                              borderRadius: "10px",
                              backgroundColor: "#F0F0F0",
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={2}>
                                <Typography variant="body1">
                                  <b>Name as on the Bank :</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={10}>
                                <Typography variant="body1">
                                  {userData.nameAsOnBank}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography variant="body1">
                                  <b>Bank Name:</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={10}>
                                <Typography variant="body1">
                                  {userData.bankName}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography variant="body1">
                                  <b>Account Number:</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={10}>
                                <Typography
                                  variant="body1"
                                  style={{
                                    wordWrap: "break-word",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  {userData.acNo}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography variant="body1">
                                  <b>IFSC code:</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={10}>
                                <Typography
                                  variant="body1"
                                  style={{
                                    wordWrap: "break-word",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  {userData.ifscCode}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </>
                    )}
                  </Accordion>
                </Grid>
                <Grid>
                  <Accordion
                    sx={{
                      border: "1px solid #898989",
                      width: "99.3%",
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
                        color: "#fff",
                      }}
                    >
                      <Typography variant="h6" ml={3}>
                        Current Compensation
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute", // Absolute positioning for the icons
                          right: 10,
                          display: "flex",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        {bankExpand ? <RemoveIcon /> : <AddIcon />}
                      </Box>
                    </AccordionSummary>

                    {!bankExpand ? (
                      <></>
                    ) : (
                      <>
                        <AccordionDetails
                          sx={{
                            padding: isMobile ? "20px" : "20px 20px 20px 50px",
                          }}
                        >
                          <Grid
                            container
                            sx={{
                              padding: "10px",
                              border: "1px solid black",
                              borderRadius: "10px",
                              backgroundColor: "#F0F0F0",
                            }}
                          >
                            <Grid item xs={2}>
                              <Typography variant="body1">
                                <b>Cost to Company :</b>
                              </Typography>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography variant="body1">
                                <CurrencyRupeeIcon sx={{ padding: "4px" }} />
                                {userData.ctc}
                              </Typography>
                            </Grid>
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
      )}
    </>
  );
}
