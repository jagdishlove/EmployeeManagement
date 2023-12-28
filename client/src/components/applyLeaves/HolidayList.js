import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import prakat_favicon_list from "../../assets/prakat_favicon_list.png";
import { getHolidayListAction } from "../../redux/actions/leaves/leaveAction";
const formatDateString = (inputDate) => {
  const options = { weekday: "short", day: "numeric", month: "short" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

const HolidayList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const { fixedHolidays, optionalHolidays } = useSelector(
    (state) => state?.nonPersist?.leavesData?.holidayListData
  );

  useEffect(() => {
    dispatch(getHolidayListAction());
  }, [dispatch]);

  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="holidayListStyle" style={{ height: "100%" }}>
      <Box variant="h6" className="holidayListHeader">
        <b style={{ textDecoration: "underline" }}> HOLIDAY LIST</b>
        <h6 className="holidayListTitle">Fixed</h6>
        {fixedHolidays?.map((holiday) => {
          return (
            <Box key={holiday.id}>
              <p className="holidaylist">
                {formatDateString(holiday.date)} - {holiday.name}
              </p>
            </Box>
          );
        })}

        <h6 className="holidayListTitle01">Optional</h6>
        {optionalHolidays?.map((holiday) => {
          return (
            <Box key={holiday.id}>
              <p className="holidaylist">
                {formatDateString(holiday.date)} - {holiday.name}
              </p>
            </Box>
          );
        })}
      </Box>

      <Box
        style={{
          textAlign: "right",
          marginTop: "1.5rem",
        }}
      >
        <IconButton onClick={handleIconClick}>
          <InfoIcon
            className="infoIconstyle"
            sx={{ color: "#008080", fontSize: "30px" }}
          />
        </IconButton>

        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "80%",
              bgcolor: "#ffffff",
              boxShadow: 24,
              p: 4,
              border: "5px solid #008080",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "0%",
                left: "50%",
                transform: "translate(-50%, 0)",
                width: "100%",
                bgcolor: "",
                color: "#008080",
                p: 1,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                fontWeight="bold"
                sx={{ textDecoration: "underline" }}
              >
                Holidays
              </Typography>
            </Box>

            <Box sx={{ paddingTop: "30px", backgroundColor: "#ffffff" }}>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> 12 days of public holidays are
                offered to all employees
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> From the list of optional
                holidays shared in the ‘Holiday List’, all employees are
                eligible to avail any two of their choice
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> Any other circumstantial
                holiday will be intimated via mail if required
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> Leaves are calculated from 1st
                Jan to 31st Dec
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> Total of 12 sick leaves are
                offered to all employees in a year. 1 SL accumulates each month
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> Privilege leaves are offered
                to all permanent employees. 12 PL in a year is the entitlement
                that accumulates 1 day each month
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> Only 12 PL can be carried
                forward in any given year
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> 26 weeks of maternity leave
                are offered to all permanent female employees and not more than
                8 weeks before the child&apos;s birth. An employee should have
                worked for at least 80 days in the past 12 months. Any female
                employee who has two or more surviving children can take only 12
                weeks of maternity leave 6 weeks before the child&apos;s birth
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> 5 Paternity leaves are offered
                to all male permanent employees. Eligibility of the leaves is
                only one month from the date of birth of the child
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> Any employee who adopts a
                child who is less than 3 months old is entitled to a 12-week
                maternity leave benefit
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> Compensatory off is offered to
                all permanent employees who work on a holiday or weekend. It is
                auto-calculated from your approved timesheet entries
              </Typography>
              <Typography sx={{ lineHeight: "20px", marginBottom: "10px" }}>
                <img src={prakat_favicon_list} /> Maternity illness leave is
                offered to permanent female employees in case of any maternity
                complexity they may go through. Please contact the HR to get the
                details
              </Typography>
            </Box>

            <hr style={{ borderTop: "3px solid #001F1F", margin: "16px 0" , color:'#D9D9D9'}} />

            <Typography
              variant="h6"
              style={{marginBottom:'-2%'}}
              sx={{ color: "#008080", textAlign: "center" }}
            >
              For more details on any of the leave policies or any queries,
              contact your HR.
            </Typography>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default HolidayList;
