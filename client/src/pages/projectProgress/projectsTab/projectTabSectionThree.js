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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CustomizedYAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="end" fill="#666">
        {`${payload.value}`} {/* Displaying values in percentage */}
      </text>
    </g>
  );
};
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

  const projectProgressGraphData = useSelector(
    (state) => state?.persistData?.workSpace?.projectProgressGraphData
  );

  const daysCount = projectProgressGraphData[0]?.daysCount;

  let initialSelectedOption;
  if (daysCount <= 7) {
    initialSelectedOption = options.find(
      (option) => option.value === "SEVEN_DAYS"
    );
  } else if (daysCount > 7 && daysCount <= 31) {
    initialSelectedOption = options.find(
      (option) => option.value === "ONE_MONTH"
    );
  } else if (daysCount > 31 && daysCount <= 6 * 30 + 1) {
    initialSelectedOption = options.find(
      (option) => option.value === "SIX_MONTHS"
    );
  } else if (daysCount > 6 * 30 + 1 && daysCount <= 365) {
    initialSelectedOption = options.find(
      (option) => option.value === "ONE_YEAR"
    );
  } else {
    initialSelectedOption = options.find((option) => option.value === "ALL");
  }

  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

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
    (state) => state?.persistData?.workSpace?.projectList
  );

  useEffect(() => {
    if (projectList.length > 0 && project) {
      dispatch(getProjectProgressGraphAction(project?.id, params));
    }
  }, [project?.id, selectedOption]);

  const { dashboardProjectdetails } = useSelector(
    (state) => state?.persistData?.dashboardProjectdetails
  );

  const budgetValue = dashboardProjectdetails.projectBudget || 0;

  const data = [
    {
      name: "Actual Implementation Cost",
      value: Math.min(dashboardProjectdetails.actualImplementationCost, 100),
      originalValue:
        dashboardProjectdetails?.actualImplementationCost?.toFixed(2), // Store original value
      fill: "#81C84B",
    },
    {
      name: "Projected Implementation Cost",
      value:
        dashboardProjectdetails.projectedImplementationCost > 0
          ? 100 || Math.min(dashboardProjectdetails.projectedImplementationCost)
          : 0,
      originalValue: (
        dashboardProjectdetails.projectedImplementationCost || 0
      ).toFixed(2), // Store original value
      fill: "#20D7FE",
    },
    {
      name: "Budget",
      value:
        dashboardProjectdetails.projectBudget > 0
          ? 100 || Math.min(dashboardProjectdetails.projectBudget)
          : 0,
      originalValue: dashboardProjectdetails.projectBudget, // Store original value
      fill: "#33A1EC",
    },
    {
      name: "Time",
      value: parseInt(dashboardProjectdetails.time || 0) !== 0 ? 100 : 0,
      originalValue: dashboardProjectdetails.time || 0, // Store original value
      fill: "#FFA07A",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const originalValue = data.value === 0 ? 0 : data.originalValue; // Handling the case where value is 0
      return (
        <div style={{ backgroundColor: "#fff", padding: "5px" }}>
          <p>{`${data.name}: ${originalValue}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Grid
        container
        style={{
          paddingTop: "10px",
          justifyContent: "space-between",
          gap: 1, // Adjust the gap between Grid containers here
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={6} marginTop={"110px"}></Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <OpenInFullOutlinedIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={handleClickOpenBar}
                />
              </Box>

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
          <Grid container>
            <Grid item xs={12}>
              {budgetValue === 0 ? (
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ textAlign: "center", paddingTop: "150px" }}
                >
                  No data available
                </Typography>
              ) : (
                <ProjectBarChart />
              )}
              <Dialog
                open={openBar}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: "50%",
                    maxWidth: "none",
                    padding: "20px",
                  },
                }}
              >
                <DialogTitle>
                  <Box display="flex" alignItems="right">
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
                </DialogTitle>
                <DialogContentText>
                  <ResponsiveContainer
                    style={{ marginLeft: 50 }}
                    width="75%"
                    height={380}
                  >
                    <BarChart data={data}>
                      <XAxis
                        dataKey="none"
                        label={{
                          value: dashboardProjectdetails?.projectName,
                          angle: 360,
                          position: "insideBottomMiddle",
                          style: { fontWeight: "bold", color: "black" },
                        }}
                      />
                      <YAxis
                        tick={<CustomizedYAxisTick />}
                        label={{
                          value: "Progress in %",
                          angle: -90,
                          position: "insideRight",
                          offset: 55,
                          style: { fontWeight: "bold", color: "black" },
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />

                      <Bar dataKey="value" />
                    </BarChart>
                  </ResponsiveContainer>
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
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
            backgroundColor: "#ffffff",
            borderRadius: "5px",
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
            {options.map((option) => {
              // Determine active options based on daysCount
              let activeOptions = [];
              if (daysCount > 365) {
                activeOptions = [
                  "SEVEN_DAYS",
                  "ONE_MONTH",
                  "SIX_MONTHS",
                  "ONE_YEAR",
                  "ALL",
                ];
              } else if (daysCount > 6 * 30) {
                activeOptions = [
                  "SEVEN_DAYS",
                  "ONE_MONTH",
                  "SIX_MONTHS",
                  "ONE_YEAR",
                ];
              } else if (daysCount > 31) {
                activeOptions = ["SEVEN_DAYS", "ONE_MONTH", "SIX_MONTHS"];
              } else if (daysCount > 7) {
                activeOptions = ["SEVEN_DAYS", "ONE_MONTH"];
              } else if (daysCount <= 7) {
                activeOptions = ["SEVEN_DAYS"];
              }

              const isActive = activeOptions.includes(option.value);
              const isSelected = option.value === selectedOption;

              return (
                <Grid item key={option.value}>
                  <button
                    style={{
                      fontWeight: "bold",
                      border: "none",
                      background: "transparent",
                      cursor: isActive ? "pointer" : "default",
                      textDecoration: isActive ? "underline" : "none",

                      color: isSelected
                        ? "green"
                        : isActive
                        ? "blue"
                        : "inherit",
                      pointerEvents: isActive ? "auto" : "none", // Disable pointer events if not active
                    }}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </button>
                </Grid>
              );
            })}
          </Grid>

          <ProjectProgressLineChart
            daysCount={daysCount}
            handleClickOpen={handleClickOpen}
            selectedOption={selectedOption}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "50%",
                maxWidth: "none",

                // padding: "40px",
              },
            }}
          >
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
                  marginRight: "90px",
                }}
              >
                {options.map((option) => {
                  // Determine active options based on daysCount
                  let activeOptions = [];
                  if (daysCount > 365) {
                    activeOptions = [
                      "SEVEN_DAYS",
                      "ONE_MONTH",
                      "SIX_MONTHS",
                      "ONE_YEAR",
                      "ALL",
                    ];
                  } else if (daysCount > 6 * 30) {
                    activeOptions = [
                      "SEVEN_DAYS",
                      "ONE_MONTH",
                      "SIX_MONTHS",
                      "ONE_YEAR",
                    ];
                  } else if (daysCount > 31) {
                    activeOptions = ["SEVEN_DAYS", "ONE_MONTH", "SIX_MONTHS"];
                  } else if (daysCount > 7) {
                    activeOptions = ["SEVEN_DAYS", "ONE_MONTH"];
                  } else if (daysCount <= 7) {
                    activeOptions = ["SEVEN_DAYS"];
                  }

                  const isActive = activeOptions.includes(option.value);
                  const isInitialSelected =
                    option.value === initialSelectedOption;

                  return (
                    <Grid item key={option.value}>
                      <button
                        style={{
                          fontWeight: "bold",
                          border: "none",
                          background: "transparent",
                          cursor: isActive ? "pointer" : "default",
                          textDecoration: isInitialSelected
                            ? "underline"
                            : "none",
                          color: isInitialSelected
                            ? "#3689EA"
                            : isActive
                            ? "black"
                            : "inherit",
                          pointerEvents: isActive ? "auto" : "none", // Disable pointer events if not active
                        }}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.label}
                      </button>
                    </Grid>
                  );
                })}
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
