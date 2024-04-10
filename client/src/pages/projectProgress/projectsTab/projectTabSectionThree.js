import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import ProjectBarChart from "./barChart";
import ProjectProgressLineChart from "./projectProgressLineChart";
import { useDispatch, useSelector } from "react-redux";
import { getProjectProgressGraphAction } from "../../../redux/actions/workSpace/workSpaceAction";

const options = [
  { value: "SEVEN_DAYS", label: "7D" },
  { value: "ONE_MONTH", label: "1M" },
  { value: "SIX_MONTHS", label: "6M" },
  { value: "ONE_YEAR", label: "1Y" },
  { value: "ALL", label: "ALL" },
];

const ProjectTebSectionThree = ({ project }) => {
  const [open, setOpen] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenBar = () => {
    setOpenBar(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenBar(false);
  };

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const params = { timeInterval: selectedOption.value };
  const projectList = useSelector(
    (state) => state?.nonPersist?.workSpace?.projectList
  );

  useEffect(() => {
    if (projectList.length > 0) {
      dispatch(getProjectProgressGraphAction(project, params));
    }
  }, [project, selectedOption]);

  return (
    <div>
      <Grid
        container
        style={{
          paddingTop: "20px",
          justifyContent: "space-between",
          gap: 1, // Adjust the gap between Grid containers here
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={5.9}
          lg={5.9}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor:"#ffffff"
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={6} marginTop={"110px"}>
              <ProjectBarChart />
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <OpenInFullOutlinedIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={handleClickOpenBar}
                />
              </Box>
              <Dialog open={openBar} onClose={handleClose}>
                <DialogTitle> </DialogTitle>
                <DialogContent>
                  <ProjectBarChart />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#81C84B",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  style={{
                    fontSize: "14px",
                    lineHeight: "15px",
                    marginBottom: "5px",
                  }}
                >
                  Actual Implementation Cost
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#20D7FE",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  style={{
                    fontSize: "14px",
                    lineHeight: "15px",
                    marginBottom: "5px",
                  }}
                >
                  Projected Implementation Cost
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#33A1EC",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  style={{
                    fontSize: "14px",
                    lineHeight: "15px",
                    marginBottom: "5px",
                  }}
                >
                  Budget
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#FFA07A",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  style={{
                    fontSize: "14px",
                    lineHeight: "15px",
                    marginBottom: "5px",
                  }}
                >
                  Time
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Projected Implementation graph */}
        <Grid
          item
          xs={12}
          sm={12}
          md={5.9}
          lg={5.9}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor:"#ffffff"
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={11}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#60C0A3",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  Projected Implementation
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#C06060",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  Actual Implementation
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <OpenInFullOutlinedIcon
                sx={{
                  cursor: "pointer",
                }}
                onClick={handleClickOpen}
              />
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "90px",
            }}
          >
            {options.map((option) => (
              <Grid item key={option.value}>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textDecoration:
                      selectedOption === option ? "underline" : "none",
                    color: selectedOption === option ? "#3689EA" : "inherit",
                  }}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </button>
              </Grid>
            ))}
          </Grid>
          <ProjectProgressLineChart
            handleClickOpen={handleClickOpen}
            selectedOption={selectedOption}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Grid container spacing={2} width="500px">
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#60C0A3",
                        marginRight: "5px",
                      }}
                    />
                    <Typography variant="body1" fontWeight="bold">
                      Projected Implementation
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#C06060",
                        marginRight: "5px",
                      }}
                    />
                    <Typography variant="body1" fontWeight="bold">
                      Actual Implementation
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {options.map((option) => (
                  <Grid item key={option.value}>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        textDecoration:
                          selectedOption === option ? "underline" : "none",
                        color:
                          selectedOption === option ? "#3689EA" : "inherit",
                      }}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </button>
                  </Grid>
                ))}
              </Grid>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <ProjectProgressLineChart
                  handleClickOpen={handleClickOpen}
                  selectedOption={selectedOption}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectTebSectionThree;
