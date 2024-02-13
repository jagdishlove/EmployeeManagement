import { useTheme } from "@emotion/react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimesheetStyle } from "../../../../pages/timesheet/timesheetStyle";

const CostAllocationFormDetails = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectRevenue: "",
    projectImplimentationCost: "",
    percentageOfRevenue: "",
  });

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
  return (
    <div>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={8} md={10} lg={10}>
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
