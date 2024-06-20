import { Autocomplete, Grid, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function ReporteesHeader({
  setSelectedOption,
  breadcrumbs,
  handleBreadcrumbClick,
  userName,
  userEmpId
}) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(searchUserAction(value));
  };

  const userData = useSelector(
    (state) => state?.persistData?.adminTimeSheet?.searchUserData?.result
  );



  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={8}>
        <div style={{ marginTop: "15px" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link 
              underline="hover" 
              color="inherit" 
              href="#" 
              onClick={() => handleBreadcrumbClick(userEmpId, -1)}
            >
              {userName}
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                href="#"
                onClick={() => handleBreadcrumbClick(crumb.id, index)}
              >
                {crumb.name}
              </Link>
            ))}
          </Breadcrumbs>
        </div>
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          options={userData || []}
          getOptionLabel={(option) => option.name}
          onChange={(e, data) => setSelectedOption(data)}
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
