import { Autocomplete, Box, Button, Checkbox, FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Dropdown from '../../forms/dropdown/dropdown';
import { useTheme } from '@emotion/react';
import { adminHeaderStyle } from '../../admin/approvalTimesheets/adminHeaderStyle';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function UserHerders({userData}) {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const Navigate = useNavigate();



  const handleChange = () => {
    console.log('Handle Change');
  };
  const skills = useSelector(
    (state) => state.persistData.masterData?.skill
  );
  const handleAddUser = () => {
    Navigate('/userForm')
  }
  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={12} md={4} lg={5}>
        <TextField
          fullWidth
          label="Search by user name, Project Name"
          placeholder="Search by user name, Project Name"
          variant="outlined"
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
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
        <Grid item xs={12} sm={12} md={4} lg={6.5} display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<PersonAddIcon />} 
            style={{borderRadius:'10px'}}
            onClick={handleAddUser}
          >
            Add New Users
          </Button>
        </Grid>
      </Grid>
        <Box style={{ ...style.adminSubHeader }}>
        <Grid container gap={{ sm: 0, md: 0, lg: 2, xs: 2 }}>
          <Grid item xs={12} sm={4} md={2} lg={3}>
            <Dropdown
              options={[{ id: "All", value: "All" }]} 
         
              dropdownName="Designation" // Pass the dropdown name
              title="Designation"
              style={style.DateTimesheetDateTextField} // Pass any additional style
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Typography sx={{ color: "#ffffff", fontSize: '14px', marginTop: "-20px" }}>Skills</Typography>
            <FormControl fullWidth style={{ borderRadius: "5px" }}>
              <Autocomplete
                multiple
                options={skills}
                sx={{
                  backgroundColor:'#fff',
                  borderRadius: "5px"
                }}
                disableCloseOnSelect
                freeSolo
                getOptionLabel={(option) => option.skillName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      checked={selected}
                    />
                    {option.skillName}
                  </li>
                )}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      onChange={handleChange}
                      placeholder='SKILLS'
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          overflow:'auto',
                          backgroundColor:'#fff',
                          marginTop:-1
                        },
                      }}
                    />
                  </>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={5}>
          </Grid>
          <Grid item  margin={"auto"} alignItems='flex-end'>
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
                {userData?.numberOfElements
                  ? userData.numberOfElements
                  : "0"}
                /
                {userData?.totalElements ? userData.totalElements : "0"}
              </b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}