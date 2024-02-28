import { useTheme } from "@emotion/react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCostIncurredAction,
  getAllCostIncurredAction,
  getProjectDetailsAction,
  saveCreateCostIncurredAction,
  saveCreateProjectAction,
} from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
const CostAllocationFormDetails = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const intialValues = {
    itemName: "",
    costIncurred: "",
    projectRevenue: "",
    projectBudget: "",
  };
  const [selectedCostIncurredId, setSelectedCostIncurredId] = useState(null);
  const [costIncurred, setCostIncurred] = useState(3);
  const [saveButton, setSaveButton] = useState(false);
  const projectId = useSelector(
    (state) => state.nonPersist.projectDetails?.projectId
  );

  // const costIncurredId = useSelector(
  //   (state) =>
  //     state.nonPersist.projectDetails?.costIncurredDetails?.costIncurredId
  // );
  const [formData, setFormData] = useState(intialValues);

  const [errors, setErrors] = useState({
    itemName: "",
    costIncurred: "",
  });

  const handleReset = () => {
    setFormData(intialValues);
    setErrors({
      itemName: "",
      costIncurred: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Save or ADD Cost inoccured
  const handleAdd = async () => {
    // Check for validation errors
    const newErrors = {};

    if (!formData.itemName) {
      newErrors.itemName = "Item Name is required.";
    }

    if (!formData.costIncurred) {
      newErrors.costIncurred = "Cost Incurred is required.";
    } else if (!/^\d+$/.test(formData.costIncurred)) {
      newErrors.costIncurred = "Cost Incurred must contain only digits.";
    }

    // Update the error state
    setErrors(newErrors);

    // If there are validation errors, do not dispatch the action
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const payload = {
      projectId: projectId,
      itemName: formData.itemName,
      costIncurred: formData.costIncurred,
    };

    if (selectedCostIncurredId !== null) {
      // Perform Update
      payload.costIncurredId = selectedCostIncurredId;
    }

    await dispatch(saveCreateCostIncurredAction(payload));
    await dispatch(getAllCostIncurredAction(projectId));
    // Reset the form after dispatching the action
    handleReset();
    setSelectedCostIncurredId(null);
  };

  const allCostIncurredData = useSelector(
    (state) => state.nonPersist.projectDetails?.allCostIncurredData
  );

  const handleEdit = (costIncurredId) => {
    const selectedCostIncurred = allCostIncurredData.find(
      (item) => item.costIncurredId === costIncurredId
    );

    setFormData({
      itemName: selectedCostIncurred.itemName,
      costIncurred: selectedCostIncurred.costIncurred,
    });

    setSelectedCostIncurredId(costIncurredId);
  };

  useEffect(() => {
    if (projectId && saveButton) Navigate(`/projectDetailPage/${projectId}`);
  }, [projectId]);
  //Save
  const handleSaveData = async (e, type) => {
    if (type === "save") {
      setSaveButton(true);
    } else if (type === "next") {
      setSaveButton(true);
    }
    e.preventDefault();

    const getResourcespayload = {
      stage: costIncurred,
    };
    const payload = {
      id: projectId,
      projectBudget: formData.projectBudget,
      projectRevenue: formData.projectRevenue,
    };

    await dispatch(saveCreateProjectAction(payload, getResourcespayload));
  };

  //for not clear the form we are calling Projectdetails
  // const projectDetailsData = useSelector(
  //   (state) => state.nonPersist.projectDetails?.projectDetailsData
  // );
  // console.log("projectDetailsData", projectDetailsData);

  // useEffect(() => {
  //   if (projectId) {
  //     dispatch(getProjectDetailsAction(projectId));
  //   }
  // }, [projectId]);

  // useEffect(() => {
  //   if (projectDetailsData) {
  //     setFormData({
  //       projectBudget: projectDetailsData?.projectBudget || "",
  //       projectRevenue: projectDetailsData?.projectRevenue || "",
  //     });
  //   }
  // }, [projectDetailsData]);
  return (
    <div style={{ marginBottom: "50px" }}>
      {/* Client Details */}
      <div
        className="Heading"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6">
          <b>Cost Incurred Details </b>
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid silver",
        }}
      />
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        display={"flex"}
        direction={"row"}
      >
        <Grid item xs={12} sm={4} md={5} lg={5}>
          <Typography
            variant="body1"
            fontWeight="bold"
            style={{ marginTop: "15px" }}
          >
            Item Name
          </Typography>
          <TextField
            placeholder="Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />
          <Typography variant="body2" color="error">
            {errors.itemName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={5} lg={5}>
          <Typography
            variant="body1"
            fontWeight="bold"
            style={{ marginTop: "15px" }}
          >
            Cost Incurred
          </Typography>
          <TextField
            placeholder=" Cost Incurred"
            name="costIncurred"
            value={formData.costIncurred}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />
          <Typography variant="body2" color="error">
            {errors.costIncurred}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          <Box sx={{ display: "flex", gap: "10px", justifyContent: "start" }}>
            <Button
              onClick={handleAdd}
              variant="contained"
              color="primary"
              type="submit"
            >
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  style={{ backgroundColor: "#008080", color: "#ffffff" }}
                >
                  <TableCell style={{ color: "#ffffff" }}>SL No.</TableCell>
                  <TableCell style={{ color: "#ffffff" }}>Item Name</TableCell>
                  <TableCell style={{ color: "#ffffff" }}>
                    Cost Incurred
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCostIncurredData.map((costIncurred, index) => (
                  <TableRow key={costIncurred.costIncurredId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{costIncurred.itemName}</TableCell>
                    <TableCell>{costIncurred.costIncurred}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(costIncurred.costIncurredId)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton color="primary">
                        <DeleteIcon
                          onClick={() =>
                            dispatch(
                              deleteCostIncurredAction(
                                costIncurred.costIncurredId,
                                projectId
                              )
                            )
                          }
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <div
        className="Heading"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Typography variant="h6">
          <b>Project Cost Allocation </b>
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid silver",
        }}
      />
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          <Typography
            variant="body1"
            fontWeight="bold"
            style={{ marginTop: "15px" }}
          >
            Project Budget
          </Typography>
          <TextField
            placeholder="Project Implementation Cost"
            name="projectBudget"
            value={formData.projectBudget}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />
          <Typography
            variant="body1"
            fontWeight="bold"
            style={{ marginTop: "15px" }}
          >
            Other Costs Incurred
          </Typography>
          <TextField
            placeholder=" Other Costs Incurred"
            name="otherCostsIncurred"
            value={formData.projectImplimentationCost}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            disabled
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />
          <Typography
            variant="body1"
            fontWeight="bold"
            style={{ marginTop: "15px" }}
          >
            Project Implementation Cost
          </Typography>
          <TextField
            placeholder="Project Implementation Cost"
            name="projectImplimentationCost"
            value={formData.projectImplimentationCost}
            onChange={handleInputChange}
            disabled
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />
          <Typography
            variant="body1"
            fontWeight="bold"
            style={{ marginTop: "15px" }}
          >
            Project Revenue
          </Typography>
          <TextField
            placeholder="Project Revenue"
            name="projectRevenue"
            value={formData.projectRevenue}
            onChange={handleInputChange}
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />

          <Typography
            variant="body1"
            fontWeight="bold"
            style={{ marginTop: "15px" }}
          >
            Percentage of revenue
          </Typography>
          <TextField
            placeholder=" Percentage of revenue"
            name="percentageOfRevenue"
            value={formData.percentageOfRevenue}
            onChange={handleInputChange}
            disabled
            style={{
              ...style.TimesheetTextField,
              borderRadius: "15px",
              marginTop: "5px",
            }}
            fullWidth
            InputProps={{ classes: { focused: "green-border" } }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
            <Button
              onClick={(e) => handleSaveData(e, "save")}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default CostAllocationFormDetails;
