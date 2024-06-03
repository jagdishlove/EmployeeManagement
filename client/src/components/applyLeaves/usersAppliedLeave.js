import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Autocomplete,
  useMediaQuery,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeaveRequestsOfEmployeesAction } from "../../redux/actions/leaves/leaveAction";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";
import { getLeaveType } from "../../utils/getLeaveTypeFromId";
import useDebounce from "../../utils/useDebounce";
import ModalCust from "../modal/ModalCust";
import Approve_Leaves from "../../assets/Approve_Leaves.svg";
import Pending_Leaves from "../../assets/Pending_Leaves.svg";

const UsersAppliedLeave = ({ color }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const allemployeesleave = useSelector(
    (state) => state?.persistData?.leavesData.allEmployeesLeaveData.content
  );
  const allemployeesleavesData = useSelector(
    (state) => state?.persistData?.leavesData.allEmployeesLeaveData
  );
  const searchAPIData = useSelector(
    (state) => state?.persistData?.leavesData?.allEmployeesSearchData?.result
  );

  const leaveTypesData = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.leaveTypes
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [filtered, setFilteredData] = useState();
  const [selectedSearchOption, setSelectedSearchOption] = useState();
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef(null);
  const [filterData, setFilterData] = useState({
    searchName: "",
    fromDate: dayjs().format("YYYY-MM-DD"),
    toDate: dayjs().add(7, "day").format("YYYY-MM-DD"),
  });

  const debouncedValue = useDebounce(filterData.searchName);

  useEffect(() => {
    dispatch(masterDataAction());
    if (allemployeesleave) {
      const modifiedData = allemployeesleave?.map((item) => {
        const {
          employeeFirstName,
          employeeLastName,
          fromDate,
          toDate,
          noOfDays,
          status,
          leaveMasterId,
        } = item;
        return {
          name: `${employeeFirstName} ${employeeLastName}`,
          date: `${fromDate} ${toDate}`,
          days: noOfDays,
          type: getLeaveType(leaveMasterId, leaveTypesData),
          status: status,
        };
      });
      setFilteredData(modifiedData);
    }
  }, [allemployeesleave]);

  const handleIconClick = () => {
    dispatch(getAllLeaveRequestsOfEmployeesAction(15, filterData));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFilteredData([]);
    setHasMore(true);
  };

  const iconColor = color ? "#FFFFFF" : "#008080";

 

  const handleSearchChange = (e) => {
    dispatch(
      getAllLeaveRequestsOfEmployeesAction(15, e.target.value, "searchFilter")
    );
  };

  useEffect(() => {
    dispatch(
      getAllLeaveRequestsOfEmployeesAction(15, debouncedValue, "searchFilter")
    );
  }, [debouncedValue, dispatch]);
  useEffect(() => {
    dispatch(
      getAllLeaveRequestsOfEmployeesAction(
        15,
        filterData,
        null,
        selectedSearchOption
      )
    );
  }, [filterData, selectedSearchOption]);

  const onChangeHandler = (newValue, name) => {
    setFilterData((prev) => ({
      ...prev,
      [name]: newValue.format("YYYY-MM-DD"),
    }));
  };

  const tableHead = { backgroundColor: "#008080" };

  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "95vh",
    border: "5px solid #008080",
  };

  const fetchMoreData = async () => {
    if (
      allemployeesleavesData?.numberOfElements <
      allemployeesleavesData.totalElements
    ) {
      dispatch(
        getAllLeaveRequestsOfEmployeesAction(
          allemployeesleavesData?.numberOfElements + 15,
          filterData,
          null,
          selectedSearchOption
        )
      );
      setHasMore(true);
    } else {
      setHasMore(false); // No more data to fetch
    }
  };

  const handleScroll = () => {
    const table = tableRef.current;
    const isNearBottom =
      table.clientHeight + table.scrollTop + 1 >= table.scrollHeight;

    if (isNearBottom && hasMore) {
    
      fetchMoreData();
    }
  };


  return (
    <Box>
      <IconButton onClick={handleIconClick}>
        <InfoIcon
          sx={{ fontSize: "25px", marginTop: "-3px", color: iconColor }}
        />
      </IconButton>
      <ModalCust sx={modalStyle} open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            color: "#008080",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{ textDecoration: "underline" ,
           marginRight: isMobile ? '20px' : '0px' }}
          >
            All Employees Leave Request
          </Typography>
        </Box>

        <Box
      display={{ xs: 'block', md: 'flex' }} 
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems={{ md: 'flex-end' }} 
      justifyContent={{ md: 'center' }} 
      gap={{ xs: '20px', md: '30px' }} 
    >
      <Box>
       
        <Autocomplete
             sx={{
            borderRadius: "8px",
            maxWidth: "800px",
             width: isMobile ? '100%' : '400px' ,
             marginTop: isMobile ? '20px' : '0px' }}

          options={searchAPIData || []}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={(event, data) => {
            setSelectedSearchOption(data);
          }}
          isSearchable={true}
          getOptionValue={(option) => option.id}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search by User Name"
              onChange={handleSearchChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon />
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: null,
                style: { borderRadius: "20px" },
              }}
            />
          )}
        />
      </Box>
      <Box>
       
        <Typography variant="body1" align="center" fontWeight="bold">
          From
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%", 
          }}
            name="fromDate"
            format="ddd, MMM DD,YYYY"
            value={dayjs(filterData?.fromDate)}
            onChange={(value) => onChangeHandler(value, "fromDate")}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box>
      
        <Typography variant="body1" align="center" fontWeight="bold">
          To
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%", 
          }}
            name="toDate"
            format="ddd, MMM DD,YYYY"
            value={dayjs(filterData?.toDate)}
            onChange={(value) => onChangeHandler(value, "toDate")}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </Box>
        {filtered && filtered.length > 0 ? (
          <Box
            sx={{
              marginTop: "20px",
              border: "1px solid #008080",
              overflowX: "auto",
            }}
          >
           <TableContainer
  sx={{
    maxHeight: "calc(92vh - 200px)",
    overflowY: "auto",
    position: "relative",
    '@media (max-width: 900px)': {
      maxHeight: "calc(92vh - 100px)",
    }
  }}
  onScroll={handleScroll}
  ref={tableRef}
>
  <Table style={{ tableLayout: "fixed" }}>
    <TableHead
      sx={{
        backgroundColor: "red",
        position: "sticky",
        top: 0,
        zIndex: 1,
        '@media (max-width: 900px)': {
          display: "none", // Hide header on mobile
        }
      }}
    >
      <TableRow>
        <TableCell
          style={{
            ...tableHead,
            color: "white",
            textAlign: "left",
            fontSize: "18px"
          }}
        >
          Name
        </TableCell>
        <TableCell
          style={{
            ...tableHead,
            color: "white",
            textAlign: "left",
            width: "30%",
            fontSize: "18px"
          }}
        >
          Date
        </TableCell>
        <TableCell
          style={{
            ...tableHead,
            color: "white",
            textAlign: "left",
            fontSize: "18px"
          }}
        >
          No. of Days
        </TableCell>
        <TableCell
          style={{
            ...tableHead,
            color: "white",
            textAlign: "left",
            fontSize: "18px"
          }}
        >
          Leave Type
        </TableCell>
        <TableCell
          style={{
            ...tableHead,
            color: "white",
            textAlign: "left",
            fontSize: "18px"
          }}
        >
          Status
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filtered?.map((row, index) => (
        <TableRow
          key={index}
          sx={{
            '@media (max-width: 900px)': {
              display: "block",
              borderBottom: "1px solid #ddd",
              padding: "10px",
            }
          }}
        >
          <TableCell
            sx={{
              textAlign: "left",
              fontSize: "16px",
              '@media (max-width: 900px)': {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }
            }}
          >
            <span style={{ display: "none" }} className="mobile-label">Name:</span> {row.name}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "left",
              fontSize: "16px",
              '@media (max-width: 900px)': {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }
            }}
          >
            <span style={{ display: "none" }} className="mobile-label">Date:</span> {row.date.split(" ").join(" to ")}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "left",
              fontSize: "16px",
              '@media (max-width: 900px)': {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }
            }}
          >
            <span style={{ display: "none" }} className="mobile-label">No. of Days:</span> {row.days}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "left",
              fontSize: "16px",
              '@media (max-width: 900px)': {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }
            }}
          >
            <span style={{ display: "none" }} className="mobile-label">Leave Type:</span> {row.type}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "left",
              fontSize: "16px",
              '@media (max-width: 900px)': {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }
            }}
          >
            <span style={{ display: "none" }} className="mobile-label">Status:</span> 
            <span>{row.status}
            <img
              src={
                row?.status === "APPROVED"
                  ? Approve_Leaves
                  : row?.status === "SUBMITTED"
                  ? Pending_Leaves
                  : ""
              }
              alt="image"
              height={24}
              style={{
                marginLeft: "10px",
              }}
            />
            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>



          </Box>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              padding: "100px",
              fontSize: "16px",
              color: "gray",
              fontWeight: "600",
            }}
          >
            No Leave Data Available.
          </Typography>
        )}
      </ModalCust>
    </Box>
  );
};

export default UsersAppliedLeave;
