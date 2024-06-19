import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";
import { projectListAction } from "../../../redux/actions/approvals/projectListAction";
// import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function ReporteesHeader({
 
  setSelectedOption,
}) {

 
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(searchUserAction(value));
  };

  const userData = useSelector(
    (state) => state?.persistData?.adminTimeSheet?.searchUserData?.result
  );

  useEffect(() => {
    dispatch(projectListAction());
  }, []);


  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const userName = useSelector(
    (state) => state?.persistData?.loginDetails?.data.userName
  );


  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={8}>
      <div role="presentation" onClick={handleClick} style={{marginTop:"15px"}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
        {userName}
        </Link>
        {/* <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Amit
        </Link>
        <Typography color="text.primary">Swarna</Typography> */}
      </Breadcrumbs>
    </div>
       
      </Grid>
    
      <Grid item xs={4}>
      <Autocomplete
          isMulti={true}
          isSearchable={true}
          options={userData || []}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={(e, data) => setSelectedOption(data)}
          name="UserName"
          isLoading={userData?.length === 0}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search by User Name"
              onChange={handleChange}
              InputProps={{
                ...params.InputProps,
                style: { borderRadius: "50px" },
                startAdornment: (
                  <>
                    <SearchIcon />
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: null,
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
