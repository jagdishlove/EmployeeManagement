import { useTheme } from "@emotion/react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { adminHeaderStyle } from "../../admin/approvalTimesheets/adminHeaderStyle";
import Dropdown from "../../forms/dropdown/dropdown";
import {  useSelector } from "react-redux";

export default function ProjectHeader({ projectsData,projects, setProjects}) {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);
  
  const Navigate = useNavigate();
 
  

  const projectStatus = useSelector((state) => state.persistData.masterData?.projectStatus);

  
   // Handle change for  dropdown
   const handleDropdownChange = (event) => {
    const { value } = event.target;
   
    setProjects(value)
   
  };

  const handleChange = () => {
    console.log("Handle Change");
  };

  const handleAddUser = () => {
    Navigate("/projectForm");
  };
  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={12} md={4} lg={5}>
          <TextField
            fullWidth
            label="Search by Client name, Project Name"
            placeholder="Search by Client name, Project Name"
            variant="outlined"
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={6.5}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            style={{ borderRadius: "10px" }}
            onClick={handleAddUser}
          >
            Add New Project
          </Button>
        </Grid>
      </Grid>
      <Box style={{ ...style.adminSubHeader }}>
        <Grid container gap={{ sm: 0, md: 0, lg: 2, xs: 2 }}>
          <Grid item xs={12} sm={4} md={2} lg={3}>
             <Dropdown
            value={projects}
            onChange={handleDropdownChange}
            dropdownName="projectStatus"
            options={projectStatus}
            style={{
              ...style.DateTimesheetDateTextField,
              border: "1px solid silver",
              borderRadius: "5px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
            valueKey="statusName"
            labelKey="statusValue"
            name="projectStatus"
          />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            md={2}
            lg={3}
            margin={"auto"}
            alignItems="flex-end"
          >
            <Typography
              variant="h7"
              color={"secondary"}
              textAlign={"right"}
              sx={{ textWrap: "nowrap" }}
              marginTop={4}
            >
              <b>
                {" "}
                Total Entries{" "}
                {projectsData?.numberOfElements
                  ? projectsData.numberOfElements
                  : "0"}
                /
                {projectsData?.totalElements ? projectsData.totalElements : "0"}
              </b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
