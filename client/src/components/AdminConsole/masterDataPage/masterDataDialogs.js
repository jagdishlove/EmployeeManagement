import React from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import icon from "../../../assets/Featured icon.svg";
import Dropdown from "../../forms/dropdown/dropdown";
import { TimesheetStyle } from "../../../pages/timesheet/timesheetStyle";
import { useTheme } from "@mui/material/styles";
import { MuiTelInput as MuiPhoneNumber } from "mui-tel-input";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import dayjs from "dayjs";

export default function MasterDataDialogs({
  openDialog,
  dialog,
  open,
  enable,
  bandDialog,
  holidayDialog,
  desginationEdit,
  desginationDisable,
  clientDialog,
  clientLocationDialog,
  dialogTitle,
  changeData,
  chnageDataType,
  errors,
  country,
  state,
  handleDisable,
  handleAddDesignationCancle,
  handleOfficeChange,
  handleClinetDetails,
  handleOnsiteLocation,
  hnadleBandChnage,
  handleHolidayChnage,
  handleSubmit,
  handleUpdate,
  chnageDataId,
  handleCloseDialog,
  clientLocationData,
  edit,
  officeData,
  clinetDetails,
  // setSelectedDate,
  // selectedDate,
  value,
  setValue,
  handleEditDesignation,
  handlechange,
  bandFormData,
  holidayFormData,
  city,
  holidayType,
  selectedImage,
  handleFileChange,
  editHeading,
}) {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ width: "400px" }}>
          {desginationDisable ? (
            <>
              <img src={icon} /> Disable
            </>
          ) : (
            <>
              <img src={icon} /> {editHeading}
            </>
          )}
        </DialogTitle>
        {desginationEdit ? (
          <Grid sx={{ padding: "10px" }}>
            <TextField
              label={chnageDataType}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              sx={{
                width: "100%",
              }}
            />
            {errors.value && (
              <Box>
                <Typography color="error">{errors.value}</Typography>
              </Box>
            )}
          </Grid>
        ) : (
          <>
            {desginationDisable ? (
              <>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to proceed with{" "}
                    <b style={{ color: "black" }}>removing</b> the
                  </DialogContentText>
                  <DialogContentText>
                    {chnageDataType}{" "}
                    <b style={{ color: "black" }}>&apos;{changeData}&apos;</b>{" "}
                    from the Master Data?
                  </DialogContentText>
                </DialogContent>
              </>
            ) : (
              <>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to edit/disable the {chnageDataType}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>&apos;{changeData}&apos;</strong> from the Master
                    Data?
                  </DialogContentText>
                </DialogContent>
              </>
            )}
          </>
        )}
        <DialogActions>
          {desginationEdit ? (
            <>
              <Button
                onClick={() => handleUpdate(chnageDataType, chnageDataId)}
                sx={{
                  color: "#fff",
                  borderRadius: "8px",
                  backgroundColor: "#008080",
                  "&:hover": {
                    backgroundColor: "#008080",
                  },
                  textTransform: "capitalize",
                }}
              >
                Save
              </Button>
              <Button
                onClick={handleAddDesignationCancle}
                sx={{
                  color: "#000",
                  borderRadius: "8px",
                  border: "1px solid #D0D5DD",
                  textTransform: "capitalize",
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              {desginationDisable ? (
                <>
                  <Button
                    onClick={handleAddDesignationCancle}
                    sx={{
                      color: "#344054",
                      border: "1px solid #D0D5DD",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    Cancle
                  </Button>
                  <Button
                    onClick={() =>
                      handleSubmit(chnageDataType, chnageDataId, "INACTIVE")
                    }
                    sx={{
                      color: "#fff",
                      backgroundColor: "#B7251B",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#B7251B",
                      },
                      textTransform: "capitalize",
                    }}
                  >
                    Disable
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() =>
                      handleEditDesignation(chnageDataType, chnageDataId)
                    }
                    sx={{
                      color: "#344054",
                      border: "1px solid #D0D5DD",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDisable(chnageDataType, chnageDataId)}
                    sx={{
                      color: "#fff",
                      backgroundColor: "#B7251B",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#B7251B",
                      },
                      textTransform: "capitalize",
                    }}
                  >
                    Disable
                  </Button>
                </>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        sx={{
          borderRadius: "20px",
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ width: "400px" }}>
          <img src={icon} /> {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <TextField
            label={dialogTitle}
            placeholder={`Enter ${dialogTitle}`}
            onChange={(e) => handlechange(e, dialogTitle)}
            value={value}
            sx={{ width: "100%", height: "56px", marginTop: "10px" }}
          />
          {errors.value && (
            <Box>
              <Typography color="error">{errors.value}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleSubmit(dialogTitle)}
            sx={{
              backgroundColor: "#008080",
              color: "#ffff",
              marginRight: "30px",
              width: "100px",
              marginTop: "-10px",
              "&:hover": {
                backgroundColor: "#008080",
              },
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleCloseDialog}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ width: "400px" }}>
          <img src={icon} /> Office Location
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Typography>Office Name</Typography>
          <TextField
            placeholder="Enter Office Name"
            value={officeData.officeAddress}
            onChange={(e) => handleOfficeChange("officeAddress", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.officeAddress && (
            <Box>
              <Typography color="error"> {errors.officeAddress}</Typography>
            </Box>
          )}
          <Typography>Address Line 1</Typography>
          <TextField
            placeholder="Enter Office Address"
            value={officeData.addressLine1}
            onChange={(e) => handleOfficeChange("addressLine1", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.addressLine2 && (
            <Box>
              <Typography color="error"> {errors.addressLine2}</Typography>
            </Box>
          )}
          <Typography>Address Line 2</Typography>
          <TextField
            placeholder="Enter Office Address"
            value={officeData.addressLine2}
            onChange={(e) => handleOfficeChange("addressLine2", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.addressLine1 && (
            <Box>
              <Typography color="error"> {errors.addressLine1}</Typography>
            </Box>
          )}
          <Typography>Phone Number</Typography>
          <MuiPhoneNumber
            defaultCountry={"IN"}
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={officeData.phone}
            onChange={(value) => {
              handleOfficeChange("phoneNumber", value);
            }}
            sx={{ marginBottom: 1 }}
          />
          {errors.phoneNumber && (
            <Box>
              <Typography color="error"> {errors.phoneNumber}</Typography>
            </Box>
          )}
          <Typography>Country</Typography>
          <Autocomplete
            disableFreeSolo
            id="Country"
            options={country || []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={
              country.find((country) => country.id === officeData.countryId) ||
              null
            }
            onChange={(e, value) => handleOfficeChange("country", e, value)}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
          {errors.country && (
            <Box>
              <Typography color="error"> {errors.country}</Typography>
            </Box>
          )}
          <Typography>State</Typography>

          <Autocomplete
            disableFreeSolo
            id="State"
            options={officeData.countryId ? state : []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={
              state.find((state) => state.id === officeData.stateId) || null
            }
            onChange={(e, value) => handleOfficeChange("state", e, value)}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
          {errors.state && (
            <Box>
              <Typography color="error"> {errors.state}</Typography>
            </Box>
          )}
          <Typography>City</Typography>
          <Autocomplete
            disableFreeSolo
            id="city"
            options={officeData.stateId ? city : []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={city.find((city) => city.id === officeData.cityId) || null}
            onChange={(e, value) => handleOfficeChange("city", e, value)}
            renderInput={(params) => <TextField {...params} label="City" />}
          />
          {errors.city && (
            <Box>
              <Typography color="error"> {errors.city}</Typography>
            </Box>
          )}
          <Typography>Zip / Postal Code</Typography>
          <TextField
            placeholder="Zip / Postal Code"
            value={officeData.postalCode}
            onChange={(e) => handleOfficeChange("postalCode", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.postalCode && (
            <Box>
              <Typography color="error"> {errors.postalCode}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {edit ? (
            <Button
              onClick={handleAddDesignationCancle}
              sx={{
                color: "#000",
                width: "100px",
                marginTop: "-10px",
                border: "1px solid #AEAEAE",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            onClick={() =>
              edit === false
                ? handleSubmit(chnageDataType, chnageDataId)
                : handleUpdate(chnageDataType, chnageDataId)
            }
            sx={{
              backgroundColor: "#008080",
              color: "#ffff",
              marginRight: "30px",
              width: "100px",
              marginTop: "-10px",
              "&:hover": {
                backgroundColor: "#008080",
              },
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={enable} onClose={handleCloseDialog}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ width: "400px" }}>
          <img src={icon} /> {changeData}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to enable the {chnageDataType}
          </DialogContentText>
          <DialogContentText>
            <b style={{ color: "black" }}>&apos;{changeData}&apos;</b> from the
            Master Data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "#000",
              width: "100px",
              marginTop: "-10px",
              border: "1px solid #AEAEAE",
              textTransform: "capitalize",
            }}
          >
            cancle
          </Button>
          <Button
            onClick={() => handleSubmit(chnageDataType, chnageDataId, "ACTIVE")}
            sx={{
              backgroundColor: "#008080",
              color: "#ffff",
              marginRight: "30px",
              width: "100px",
              marginTop: "-10px",
              "&:hover": {
                backgroundColor: "#008080",
              },
              textTransform: "capitalize",
            }}
          >
            Enable
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={bandDialog} onClose={handleCloseDialog}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ width: "400px" }}>
          <img src={icon} /> Band Details
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <TextField
            label="Band Name"
            value={bandFormData.bandName}
            onChange={(e) => hnadleBandChnage("bandName", e.target.value)}
            sx={{
              marginTop: 2,
            }}
          />
          {errors.bandName && (
            <Box>
              <Typography color="error"> {errors.bandName}</Typography>
            </Box>
          )}
          <Typography>Enter CTC</Typography>
          <Typography>Minimum</Typography>
          <TextField
            name="Minimum"
            value={bandFormData.minimumCtc}
            onChange={(e) => hnadleBandChnage("minimumCtc", e.target.value)}
          />
          {errors.minimum && (
            <Box>
              <Typography color="error"> {errors.minimum}</Typography>
            </Box>
          )}
          <Typography>Maximum</Typography>
          <TextField
            name="Maximum"
            value={bandFormData.maximumCtc}
            onChange={(e) => hnadleBandChnage("maximumCtc", e.target.value)}
          />
          {errors.maximum && (
            <Box>
              <Typography color="error"> {errors.maximum}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {edit ? (
            <Button
              onClick={handleAddDesignationCancle}
              sx={{
                color: "#000",
                width: "100px",
                marginTop: "-10px",
                border: "1px solid #AEAEAE",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            onClick={() =>
              edit === false
                ? handleSubmit(chnageDataType, chnageDataId)
                : handleUpdate(chnageDataType, chnageDataId)
            }
            sx={{
              backgroundColor: "#008080",
              color: "#ffff",
              marginRight: "30px",
              width: "100px",
              marginTop: "-10px",
              "&:hover": {
                backgroundColor: "#008080",
              },
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={holidayDialog} onClose={handleCloseDialog}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ width: "400px" }}>
          <img src={icon} /> Manage Holidays
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="column"
            mt={2}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="actualEndDate"
                format="DD/MM/YYYY"
                label="Choose Date"
                value={
                  holidayFormData.date ? dayjs(holidayFormData.date) : null
                }
                onChange={(value) => handleHolidayChnage("date", value)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ borderRadius: "8px" }} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {errors.date && (
            <Box>
              <Typography color="error"> {errors.date}</Typography>
            </Box>
          )}
          <Typography>Holiday Type</Typography>
          <Dropdown
            options={holidayType} // Pass any additional options if needed
            value={holidayFormData.holidayType}
            onChange={(e) => handleHolidayChnage("holidayType", e.target.value)}
            title="HolidayType"
            placeholder="HolidayType"
            style={{
              ...style.TimesheetTextField,
              border: "1px solid #8897ad87",
              borderRadius: "5px",
            }}
          />
          {errors.holidayType && (
            <Box>
              <Typography color="error"> {errors.holidayType}</Typography>
            </Box>
          )}
          <Typography>Enter Holiday Name</Typography>
          <TextField
            placeholder="Holiday Name"
            value={holidayFormData.holidayName}
            onChange={(e) => handleHolidayChnage("holidayName", e.target.value)}
          />
          {errors.holidayName && (
            <Box>
              <Typography color="error"> {errors.holidayName}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {edit ? (
            <Button
              onClick={handleAddDesignationCancle}
              sx={{
                color: "#000",
                width: "100px",
                marginTop: "-10px",
                border: "1px solid #AEAEAE",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            onClick={() =>
              edit === false
                ? handleSubmit(chnageDataType, chnageDataId)
                : handleUpdate(chnageDataType, chnageDataId)
            }
            sx={{
              backgroundColor: "#008080",
              color: "#ffff",
              marginRight: "30px",
              width: "100px",
              marginTop: "-10px",
              "&:hover": {
                backgroundColor: "#008080",
              },
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={clientDialog} onClose={handleCloseDialog}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ width: "400px" }}>
          <img src={icon} /> Client Details
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <label htmlFor="upload-photo">
            <Avatar
              sx={{
                cursor: "pointer",
              }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <InsertPhotoOutlinedIcon />
              )}
            </Avatar>
            <Input
              accept="image/*"
              id="upload-photo"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
          <Typography>Client Name</Typography>
          <TextField
            placeholder="Enter Client Name"
            name="clinetName"
            value={clinetDetails.clinetName}
            onChange={(e) => handleClinetDetails("clinetName", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.clinetName && (
            <Box>
              <Typography color="error"> {errors.clinetName}</Typography>
            </Box>
          )}
          <Typography>Address Line 1</Typography>
          <TextField
            placeholder="Enter Client Address"
            name="addressLine1"
            value={clinetDetails.addressLine1}
            onChange={(e) => handleClinetDetails("addressLine1", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.addressLine1 && (
            <Box>
              <Typography color="error"> {errors.addressLine1}</Typography>
            </Box>
          )}
          <Typography>Address Line 2</Typography>
          <TextField
            placeholder="Enter Client Address"
            name="addressLine2"
            value={clinetDetails.addressLine2}
            onChange={(e) => handleClinetDetails("addressLine2", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.addressLine2 && (
            <Box>
              <Typography color="error"> {errors.addressLine2}</Typography>
            </Box>
          )}
          <Typography>Phone Number</Typography>
          <MuiPhoneNumber
            defaultCountry={"IN"}
            name="phone"
            placeholder="Enter Phone Number"
            value={clinetDetails.phone}
            onChange={(value) => {
              handleClinetDetails("phoneNumber", value);
            }}
            sx={{ marginBottom: 1 }}
          />

          {errors.phone && (
            <Box>
              <Typography color="error"> {errors.phone}</Typography>
            </Box>
          )}
          <Typography>Country</Typography>

          <Autocomplete
            disableFreeSolo
            id="Country"
            options={country || []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={
              country.find(
                (country) => country.id === clinetDetails.countryId
              ) || null
            }
            onChange={(e, value) => handleClinetDetails("country", e, value)}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
          {errors.countryId && (
            <Box>
              <Typography color="error"> {errors.countryId}</Typography>
            </Box>
          )}
          <Typography>State</Typography>
          <Autocomplete
            disableFreeSolo
            id="state"
            options={clinetDetails.countryId ? state : []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={
              state.find((state) => state.id === clinetDetails.stateId) || null
            }
            onChange={(e, value) => handleClinetDetails("state", e, value)}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
          {errors.stateId && (
            <Box>
              <Typography color="error"> {errors.stateId}</Typography>
            </Box>
          )}
          <Typography>City</Typography>

          <Autocomplete
            disableFreeSolo
            id="City"
            options={clinetDetails.stateId ? city : []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={
              city.find((city) => city.id === clinetDetails.cityId) || null
            }
            onChange={(e, value) => handleClinetDetails("city", e, value)}
            renderInput={(params) => <TextField {...params} label="City" />}
          />
          {errors.cityId && (
            <Box>
              <Typography color="error"> {errors.cityId}</Typography>
            </Box>
          )}
          <Typography>Zip / Postal Code</Typography>
          <TextField
            placeholder="Zip / Postal Code"
            value={clinetDetails.postalCode}
            onChange={(e) => handleClinetDetails("postalCode", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.postalCode && (
            <Box>
              <Typography color="error"> {errors.postalCode}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {edit ? (
            <Button
              onClick={handleAddDesignationCancle}
              sx={{
                color: "#000",
                width: "100px",
                marginTop: "-10px",
                border: "1px solid #AEAEAE",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            onClick={() =>
              edit === false
                ? handleSubmit(chnageDataType, chnageDataId)
                : handleUpdate(chnageDataType, chnageDataId)
            }
            sx={{
              backgroundColor: "#008080",
              color: "#ffff",
              marginRight: "30px",
              width: "100px",
              marginTop: "-10px",
              "&:hover": {
                backgroundColor: "#008080",
              },
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={clientLocationDialog} onClose={handleCloseDialog}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ width: "400px" }}>
          <img src={icon} /> Client Onsite Office Location
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Typography>Client Name</Typography>
          <TextField
            placeholder="Office Address"
            name="addressName"
            value={clientLocationData.addressName}
            onChange={(e) => handleOnsiteLocation("addressName", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.clinetName && (
            <Box>
              <Typography color="error"> {errors.clinetName}</Typography>
            </Box>
          )}
          <Typography>Address Line 1</Typography>
          <TextField
            placeholder="Office Address"
            name="addressLine1"
            value={clientLocationData.addressLine1}
            onChange={(e) => handleOnsiteLocation("addressLine1", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.addressLine1 && (
            <Box>
              <Typography color="error"> {errors.addressLine1}</Typography>
            </Box>
          )}
          <Typography>Address Line 2</Typography>
          <TextField
            placeholder="Office Address"
            name="addressLine2"
            value={clientLocationData.addressLine2}
            onChange={(e) => handleOnsiteLocation("addressLine2", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.addressLine2 && (
            <Box>
              <Typography color="error"> {errors.addressLine2}</Typography>
            </Box>
          )}
          <Typography>Phone Number</Typography>
          <MuiPhoneNumber
            defaultCountry={"IN"}
            name="phone"
            placeholder="Enter Phone Number"
            value={clientLocationData.phone}
            onChange={(value) => {
              handleOnsiteLocation("phoneNumber", value);
            }}
            sx={{ marginBottom: 1 }}
          />
          {errors.phone && (
            <Box>
              <Typography color="error"> {errors.phone}</Typography>
            </Box>
          )}
          <Typography>Country</Typography>

          <Autocomplete
            disableFreeSolo
            id="Country"
            options={country || []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={
              country.find(
                (country) => country.id === clientLocationData.countryId
              ) || null
            }
            onChange={(e, value) => handleOnsiteLocation("country", e, value)}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
          {errors.countryId && (
            <Box>
              <Typography color="error"> {errors.countryId}</Typography>
            </Box>
          )}
          <Typography>State</Typography>

          <Autocomplete
            disableFreeSolo
            id="State"
            options={clientLocationData.countryId ? state : []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={
              state.find((state) => state.id === clientLocationData.stateId) ||
              null
            }
            onChange={(e, value) => handleOnsiteLocation("state", e, value)}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
          {errors.stateId && (
            <Box>
              <Typography color="error"> {errors.stateId}</Typography>
            </Box>
          )}
          <Typography>City</Typography>
          <Autocomplete
            disableFreeSolo
            id="city"
            options={clientLocationData.stateId ? city : []}
            getOptionLabel={(option) => option.dataValue}
            getOptionValue={(option) => option.id}
            style={{
              borderRadius: "10px",
            }}
            value={
              city.find((city) => city.id === clientLocationData.cityId) || null
            }
            onChange={(e, value) => handleOnsiteLocation("city", e, value)}
            renderInput={(params) => <TextField {...params} label="City" />}
          />
          {errors.cityId && (
            <Box>
              <Typography color="error"> {errors.cityId}</Typography>
            </Box>
          )}
          <Typography>Zip / Postal Code</Typography>
          <TextField
            placeholder="Zip / Postal Code"
            value={clientLocationData.postalCode}
            onChange={(e) => handleOnsiteLocation("postalCode", e)}
            sx={{ marginBottom: 1 }}
          />
          {errors.postalCode && (
            <Box>
              <Typography color="error"> {errors.postalCode}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {edit ? (
            <Button
              onClick={handleAddDesignationCancle}
              sx={{
                color: "#000",
                width: "100px",
                marginTop: "-10px",
                border: "1px solid #AEAEAE",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            onClick={() =>
              edit === false
                ? handleSubmit("clientOfficeLocation", chnageDataId)
                : handleUpdate(chnageDataType, chnageDataId)
            }
            sx={{
              backgroundColor: "#008080",
              color: "#ffff",
              marginRight: "30px",
              width: "100px",
              marginTop: "-10px",
              "&:hover": {
                backgroundColor: "#008080",
              },
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
