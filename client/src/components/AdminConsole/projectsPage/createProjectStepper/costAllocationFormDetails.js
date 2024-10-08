import { useTheme } from "@emotion/react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";

const CostAllocationFormDetails = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const intialValues = {
    itemName: "",
    costIncurred: "",
    projectRevenue: "",
    projectBudget: "",
  };
  const [selectedCostIncurredId, setSelectedCostIncurredId] = useState(null);
  const [saveButton, setSaveButton] = useState(false);

  const projectId = useSelector(
    (state) => state.persistData.projectDetails?.projectId
  );

  const [buttonText, setButtonText] = useState("Add");
  const [formData, setFormData] = useState(intialValues);

  const [errors, setErrors] = useState({
    itemName: "",
    costIncurred: "",
  });

  const handleReset = () => {
    setFormData({
      itemName: "",
      costIncurred: "",
    });
    setErrors({
      itemName: "",
      costIncurred: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Ensure project budget and project revenue do not contain alphabets
    if (
      (name === "projectBudget" || name === "projectRevenue") &&
      /[a-zA-Z]/.test(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name === "projectBudget" ? "Project Budget" : "Project Revenue"
        } containing only positive digits.`,
      }));
    } else if (
      (name === "projectBudget" || name === "projectRevenue") &&
      /[^a-zA-Z0-9]/.test(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name === "projectBudget" ? "Project Budget" : "Project Revenue"
        } does not contain special characters.`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Save or ADD Cost inoccured
  const handleAdd = async () => {
    // Reset button text to "Add" after adding or updating data
    setButtonText("Add");
    // Check for validation errors
    const newErrors = {};

    if (!formData.itemName) {
      newErrors.itemName = "Item Name is required.";
    }

    // Add validation for Cost Incurred
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

  //for displaying the table after confirm
  useEffect(() => {
    if (projectId) {
      dispatch(getAllCostIncurredAction(projectId));
    } else if (id) {
      dispatch(getAllCostIncurredAction(id));
    }
  }, [projectId, id]);

  const allCostIncurredData = useSelector(
    (state) => state.persistData.projectDetails?.allCostIncurredData
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
    setButtonText("Update");
  };

  useEffect(() => {
    if (projectId && saveButton) Navigate(`/projectDetailPage/${projectId}`);
  }, [projectId, saveButton]);
  //Save
  const handleSaveData = async (e, type) => {
    // Check for validation errors
    const newErrors = {};

    if (formData.projectBudget) {
      if (!/^\d+$/.test(formData.projectBudget)) {
        newErrors.projectBudget =
          "Project Budget does not contain special characters .";
      }
      if (/[a-zA-Z]/.test(formData.projectBudget)) {
        newErrors.projectBudget =
          "Project Budget containing only positive digits.";
      }
    }
    if (formData.projectRevenue) {
      if (!/^\d+$/.test(formData.projectRevenue)) {
        newErrors.projectRevenue =
          "Project Revenue does not contain special characters.";
      }
      if (/[a-zA-Z]/.test(formData.projectRevenue)) {
        newErrors.projectRevenue =
          "Project Revenue containing only positive digits.";
      }
    }

    // Update the error state
    setErrors(newErrors);

    // If there are validation errors, do not proceed further
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (type === "save") {
      setSaveButton(true);
    } else if (type === "next") {
      setSaveButton(true);
    }
    e.preventDefault();

    const getResourcespayload = {
      stage: 3,
    };
    const payload = {
      id: id ? id : projectId,
      projectBudget: formData.projectBudget,
      projectRevenue: formData.projectRevenue,
    };

    await dispatch(saveCreateProjectAction(payload, getResourcespayload));

    // Display toast message only if it's stage 3
    if (id) {
      toast.success("Project Updated Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast.success("Project Created Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  // for not clear the form we are calling Projectdetails
  const projectDetailsData = useSelector(
    (state) => state.persistData.projectDetails?.projectDetailsData
  );

  const [profit, setProfit] = useState();
  const [otherCost, setOtherCost] = useState();

  useEffect(() => {
    // Calculate total cost incurred
    const totalCostIncurred = allCostIncurredData.reduce((total, item) => {
      return total + parseFloat(item.costIncurred);
    }, 0);
    setOtherCost(totalCostIncurred);
    // Parse project revenue and projected implementation cost to integers
    const projectRevenue = parseInt(formData.projectRevenue, 10) || 0;
    const projectedImplementationCost =
      parseFloat(projectDetailsData?.projectedImplementationCost) || 0;

    // Calculate net revenue
    const netRevenue =
      projectRevenue - (totalCostIncurred + projectedImplementationCost);

    // Log the net revenue

    setProfit(netRevenue);
  }, [handleInputChange, handleAdd]);

  useEffect(() => {
    // Calculate total cost incurred
    const totalCostIncurred = allCostIncurredData.reduce((total, item) => {
      return total + parseFloat(item.costIncurred);
    }, 0);

    setOtherCost(totalCostIncurred);
    // Parse project revenue and projected implementation cost to integers
    const projectRevenue = parseInt(formData.projectRevenue, 10) || 0;
    const projectedImplementationCost =
      parseFloat(projectDetailsData?.projectedImplementationCost) || 0;

    // Calculate net revenue
    const netRevenue =
      projectRevenue - (totalCostIncurred + projectedImplementationCost);

    // Log the net revenu

    setProfit(netRevenue);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetailsAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        projectBudget: projectDetailsData?.projectBudget || "",
        projectRevenue: projectDetailsData?.projectRevenue || "",
      }));
    } else {
      setFormData({
        projectBudget: "",
        projectRevenue: "",
      });
    }
  }, [id, projectDetailsData]);

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
              {buttonText}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={10} lg={10}>
          {allCostIncurredData?.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: "#008080", color: "#ffffff" }}
                  >
                    <TableCell style={{ color: "#ffffff" }}>SL No.</TableCell>
                    <TableCell style={{ color: "#ffffff" }}>
                      Item Name
                    </TableCell>
                    <TableCell style={{ color: "#ffffff" }}>
                      Cost Incurred
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCostIncurredData?.map((costIncurred, index) => (
                    <TableRow key={costIncurred?.costIncurredId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{costIncurred?.itemName}</TableCell>
                      <TableCell>{costIncurred?.costIncurred}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleEdit(costIncurred?.costIncurredId)
                          }
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
          )}
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
            placeholder="Project budget"
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
          <Typography variant="body2" color="error" fontSize={"1rem"}>
            {errors.projectBudget}
          </Typography>
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
            value={otherCost}
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
            value={projectDetailsData?.projectedImplementationCost?.toFixed(2)}
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
          <Typography variant="body2" color="error" fontSize={"1rem"}>
            {errors.projectRevenue}
          </Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            style={{ marginTop: "15px" }}
          >
            Project Profit
          </Typography>
          <TextField
            placeholder=" Project Profit"
            name="projectProfit"
            value={profit?.toFixed(2)}
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
              style={{ padding: "10px 50px", fontWeight: "bold" }}
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
