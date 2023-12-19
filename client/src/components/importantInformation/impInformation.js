import CircleIcon from "@mui/icons-material/Circle";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ImpInformationStyle } from "./impInformationStyle";

const ImpInformation = () => {
  const theme = useTheme();
  const style = ImpInformationStyle(theme);
  return (
    <>
      <Grid item sx={style.gridLeft} xs={12} sm={12} md={6} square>
        <Box color={theme.palette.secondary.main}>
          <Typography sx={style.h3Bold} variant="h3">
            Important Information{" "}
          </Typography>
          <Typography sx={style.h3Normal} variant="h6">
            Please <span style={{ fontWeight: "bold" }}>read</span> the
            information below and then kindly{" "}
            <span style={{ fontWeight: "bold" }}>share</span> the requested
            information.
          </Typography>
          <Typography sx={style.h3Space} variant="h6">
            <CircleIcon sx={style.dotIcon} /> Do not reveal your password to
            anybody
          </Typography>
          <Typography sx={style.h3Normal} variant="h6">
            <CircleIcon sx={style.dotIcon} /> Do not reuse passwords
          </Typography>
          <Typography sx={style.h3Normal} variant="h6">
            <CircleIcon sx={style.dotIcon} /> Use an Alphanumeric passwords
            <br />
            (Minimum 8 Characters)
          </Typography>
          <Typography sx={style.h3Normal} variant="h6">
            <CircleIcon sx={style.dotIcon} /> Your Login ID. is required
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default ImpInformation;
