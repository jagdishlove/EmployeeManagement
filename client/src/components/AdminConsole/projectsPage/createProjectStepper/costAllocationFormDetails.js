import { useTheme } from "@emotion/react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { saveCreateCostIncurredAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";
const CostAllocationFormDetails = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const intialValues = {
    itemName:"",
    costIncurred:"",
    projectRevenue: "",
    projectImplimentationCost: "",
    percentageOfRevenue: "",
  };
  const [formData, setFormData] = useState(intialValues);
console.log("formDataCost", formData)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    Navigate("/projects");
  };

 //Save or ADD Cost inoccured
 const handleAdd = async () => {
  const payload = {
    projectId:  formData.projectId,
   itemName:  formData.itemName,
   costIncurred:formData.costIncurred,
  };

  await dispatch(saveCreateCostIncurredAction(payload));
};

  const rows = [
    { slNo: 1, itemName: 'Item 1', costIncurred: 100 },
    { slNo: 2, itemName: 'Item 2', costIncurred: 150 },
    // Add more rows as needed
  ];
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
            <Grid container spacing={2} justifyContent={"center"} display={"flex"} direction={"row"}>
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
            <TableRow style={{backgroundColor:"#008080", color:"#ffffff"}}>
              <TableCell  style={{color:"#ffffff",}}>SL No.</TableCell>
              <TableCell style={{color:"#ffffff"}}>Item Name</TableCell>
              <TableCell style={{color:"#ffffff"}}>Cost Incurred</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.slNo} >
                <TableCell>{row.slNo}</TableCell>
                <TableCell>{row.itemName}</TableCell>
                <TableCell>{row.costIncurred}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <DeleteIcon />
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
            name="projectImplimentationCost"
            value={formData.projectImplimentationCost}
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
            placeholder="Project Implementation Cost"
            name="projectImplimentationCost"
            value={formData.projectImplimentationCost}
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
            Project Implementation Cost
          </Typography>
          <TextField
            placeholder="Project Implementation Cost"
            name="projectImplimentationCost"
            value={formData.projectImplimentationCost}
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
              onClick={handleSave}
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
