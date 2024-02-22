import { Box, Button, FormControl, Grid, IconButton, InputAdornment, TextField, Typography, Checkbox } from '@mui/material';
import Dropdown from '../../forms/dropdown/dropdown';
import { useTheme } from '@emotion/react';
import { adminHeaderStyle } from '../../admin/approvalTimesheets/adminHeaderStyle';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select, {components} from "react-select";
import { useState } from 'react';


const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  skillsCheckedData,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
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
        <Checkbox checked={skillsCheckedData?.includes(rest.data)} />
      </Box>
    </components.Option>
  );
};


export default function UserHerders({userData , skillsCheckedData , setSkillsCheckedData, designationId}) {
  const theme = useTheme();
  const style = adminHeaderStyle(theme);

  const Navigate = useNavigate();


  const handleChange = () => {
  };
  const skills = useSelector(
    (state) => state.persistData.masterData?.skill
  );

  const designation = useSelector(
    (state) => state.persistData.masterData?.designation
  );


  const onResetSkillFilterHandler = () => {
    setSkillsCheckedData([]);
  };

  const applySkillFilterHandler = () => {
    
  };


  const CustomMenu = (props) => {
    return (
      <components.Menu {...props}>
      {props.children}
      <Box
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px",
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",
        }}
      >
        <Button 
          onClick={applySkillFilterHandler}
          style={{
            width:'100%',
            backgroundColor:'#008080',
            borderRadius:'10px',
            color:'#fff'
          }}
        >Apply
      </Button>
        <Button 
          onClick={onResetSkillFilterHandler}
          style={{
            width:'100%',
            borderRadius:'10px',
            border:'1px solid #008080',
            color:'#008080',
            marginTop:'5px'
          }}
        >
          Clear All</Button>
      </Box>
    </components.Menu>
    );
  };



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
              options={[{ id: "All", value: "All" }, ...(Array.isArray(designation) ? designation : [])]}
              value={designationId} 
              dropdownName="Designation"
              title="Designation"
              style={style.DateTimesheetDateTextField}
              valueKey="designationId"
              labelKey="designationName"

            />
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Typography sx={{ color: "#ffffff", fontSize: '14px', marginTop: "-20px" }}>Skills</Typography>
            <FormControl fullWidth style={{ borderRadius: "5px" }}>
                <Select
                  isSearchable={false}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(options) => {
                    setSkillsCheckedData(options.map((opt) => opt));
                  }}
                  options={skills}
                  components={{
                    Option: (props) => (
                      <InputOption
                        {...props}
                        skillsCheckedData={skillsCheckedData}
                      />
                    ),
                    Menu: CustomMenu,
                  }}
                  isClearable={false}
                  controlShouldRenderValue={false}
                  getOptionValue={(option) => option.skillId}
                  getOptionLabel={(option) => option.skillName}
                  isLoading={skills?.length === 0}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: "55px",
                    }),
                  }}
                />

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
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
