import React, { useEffect, useState} from "react";
import {
  Grid,
  Avatar,
  Typography,
  Autocomplete,
  TextField,
  Stack,
  IconButton,
  Button,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Dropdown from "../../components/forms/dropdown/dropdown";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";
import { projectListAction } from "../../redux/actions/approvals/projectListAction";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

import { useTheme } from "@mui/material/styles";
// import ResponsiveDateRangePickers from "./ResponsiveDateRangePickers";

const Reports = ({
  project,
  setProject,
  setSelectedOption,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

 
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  // const recordsPerPage = 1; // Number of records to display per page
  // const startIndex = currentPage * recordsPerPage;







  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(searchUserAction(value));
  };

  const userData = useSelector(
    (state) => state?.persistData?.adminTimeSheet?.searchUserData?.result
  );

  useEffect(() => {
    dispatch(masterDataAction());
  }, [dispatch]);

  const masterdata3 = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.employmentType
  );

  useEffect(() => {
    dispatch(projectListAction());
  }, []);

  const projectList = useSelector(
    (state) => state?.persistData?.projectListData?.data || []
  );

  const handleProjectListChange = (e) => {
    const { value } = e.target;
    setProject(value);
  };

  useEffect(() => {
    document.body.classList.add("project-progress-body");
    return () => {
      document.body.classList.remove("project-progress-body");
    };
  }, []);

  return (
    <Grid style={{
      paddingBottom: isSmallScreen ? "50px" : "0px"
    }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Reports
        </Typography>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            multiple
            options={userData || []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search by User Name"
                onChange={handleChange}
                InputProps={{
                  ...params.InputProps,
                  style: { borderRadius: "50px", backgroundColor: "white" },
                  startAdornment: (
                    <>
                      <SearchIcon />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
            onChange={(event, newValue) => setSelectedOption(newValue)}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3} mt={-3}>
          <Typography>Employment Type / All:</Typography>
          <Dropdown
            value={""}
            onChange={""}
            dropdownName="Employee Type"
            name="EMPType"
            options={masterdata3 || []}
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              border: "1px solid silver",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3} mt={-3}>
          <Typography>Projects:</Typography>
          <Dropdown
            dropdownName="Projects"
            options={[{ id: "All", value: "All" }, ...projectList] || []}
            value={project}
            onChange={handleProjectListChange}
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              border: "1px solid silver",
            }}
            valueKey="id"
            labelKey="projectNames"
          />
        </Grid>
      </Grid>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid silver",
          marginTop: "10px"
        }}
      />
      <Grid
        container
       
        mt={3}
        sx={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "5px",
          backgroundColor: "white"
        }}

      >
        <Grid item xs={12} sm={12} md={8} lg={8}>
        
        {/* <ResponsiveDateRangePickers/> */}
            </Grid>
           
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ padding: "10px" }}
          >
            <Typography variant="body1" sx={{ color: "#5E5E5E" }}>
              {currentPage + 1} of {totalPages} Pages
            </Typography>
            <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
              <KeyboardArrowLeftOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRightOutlinedIcon />
            </IconButton>
          </Stack>

        </Grid>

        <TableContainer
          component={Paper}
          sx={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Table
            sx={{
              borderTop: "1px solid #DADADA",
            }}
          >
            <TableHead >
              <TableRow >
                <TableCell
                  style={{ fontSize: "12px" }}
                >
                  <strong>S.No</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px" }} >
                  <strong>Full Name</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px"}}>
                  <strong>Employee Id</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px"}}>
                  <strong>Employment Type</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  <strong>Projects </strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  <strong>No.of Working Days</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px"}}>
                  <strong>Total Working Days</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px"}}>
                  <strong>Logged In Hours</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  <strong>Ratings</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px"}}>
                  <strong>Variable Pay</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  <strong>LOP</strong>
                </TableCell>
                <TableCell style={{ fontSize: "12px" }}>
                  <strong>Download</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                textAlign: "center",
              }}
            >
              <React.Fragment>
                <TableRow>
                  <TableCell style={{ fontSize: "13px" }}>
                    {/* {startIndex + 1} */}
                    1
                    </TableCell>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>

                      {/* {row?.fileStorage ? ( */}
                      {/* <Avatar
                                  alt="Profile Picture"
                                  src={`data:image/png;base64,${row?.fileStorage?.data}`}
                                  sx={{
                                    border: "2px solid #A4A4A4",
                                  }}
                                />
                              ) : ( */}
                      <Avatar
                        sx={{
                          color: "#fff",
                          backgroundColor: " #4813B8",
                        }}
                      >
                        s
                        {/* {row?.firstName?.charAt(0)} */}
                      </Avatar>
                      {/* )} */}

                      <Typography style={{ fontSize: "13px" }}>Swarna</Typography>
                    </Grid>
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>63</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>Full-time</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>Kiros</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>45</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>70</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>256 </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>4.56</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>$50000</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>2</TableCell>
                  <TableCell style={{ fontSize: "16px" }}><Button><SimCardDownloadOutlinedIcon /></Button></TableCell>

                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: "13px" }}>
                    {/* {startIndex + 1} */}
                    2
                    </TableCell>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>

                      {/* {row?.fileStorage ? ( */}
                      {/* <Avatar
                                  alt="Profile Picture"
                                  src={`data:image/png;base64,${row?.fileStorage?.data}`}
                                  sx={{
                                    border: "2px solid #A4A4A4",
                                  }}
                                />
                              ) : ( */}
                      <Avatar
                        sx={{
                          color: "#fff",
                          backgroundColor: " #4813B8",
                        }}
                      >
                        k
                        {/* {row?.firstName?.charAt(0)} */}
                      </Avatar>
                      {/* )} */}

                      <Typography style={{ fontSize: "13px" }}>Koushik</Typography>
                    </Grid>
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>52</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>Full-time</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>Kiros</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>45</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>70</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>256 </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>4.56</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>$50000</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>2</TableCell>
                  <TableCell style={{ fontSize: "16px" }}><Button><SimCardDownloadOutlinedIcon /></Button></TableCell>

                </TableRow>
              </React.Fragment>
            </TableBody>
          </Table>
          <Grid container justifyContent="flex-end" mt={3}>
            <Button style={{ backgroundColor: "#008080", color: "white" }}>
              <SimCardDownloadOutlinedIcon />Download All
            </Button>
          </Grid>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Reports;
