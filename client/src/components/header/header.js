import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import prakat_logo_black from "../../assets/prakat_logo_black.png";
import { persistor } from "../../redux/store/store";
import { HeaderStyle } from "./headerStyle";
import { useNavigate } from "react-router-dom";

const Header = ({ anchorEl, open, handleMenuOpen, handleMenuClose }) => {
  const theme = useTheme();
  const style = HeaderStyle(theme);

  const navigate = useNavigate();

  const empId = useSelector((state) => state?.persistData.data?.empId);

  const handleUSerDetails = () => {
    navigate(`/userDetailPage/${empId}`);
    handleMenuClose();
  };

  const userName = useSelector((state) => state?.persistData?.data.userName);

  const isLG = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={3} lg={6} style={{ textAlign: "end" }}>
          <img
            src={prakat_logo_black}
            alt="Logo"
            style={{
              width: { xs: "30%", sm: "50%", md: "20%", lg: "20%" },
              maxWidth: "100%",
              height: "auto",
              maxHeight: "45px",
              float: isLG ? "right" : "right",
              clear: isLG ? "both" : "none",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={9} lg={6} style={{ textAlign: "right" }}>
          <Typography
            color="primary"
            onClick={handleMenuOpen}
            sx={{
              display: {
                cursor: "pointer",
                lineHeight: " 2.5",
                color: "black",
                width: "fit-content",
                marginLeft: "auto",
              },
            }}
          >
            <b>{userName}&apos;s Workspace</b>
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              style: {
                border: "1px solid #008080",
                borderRadius: "15px 0 0 15px", // Rectangle shape with different radii
                width: "185px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              },
            }}
            style={style.menuHover}
          >
            <div
              style={{ display: "flex", justifyContent: "flex-end" }}
              onClick={handleUSerDetails}
            >
              <MenuItem style={style.menuColour}>
                Profile{" "}
                <ListItemIcon>
                  <AccountCircleIcon style={style.menuColour} />
                </ListItemIcon>
              </MenuItem>
            </div>
            <MenuItem
              onClick={() => {
                localStorage.removeItem("selectedItem");
                persistor.purge(["login"]);
                window.location.href = "/";
                handleMenuClose;
              }}
              style={style.menuColour}
            >
              Sign Out{" "}
              <ListItemIcon>
                <ExitToAppIcon style={style.menuColour} />
              </ListItemIcon>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
