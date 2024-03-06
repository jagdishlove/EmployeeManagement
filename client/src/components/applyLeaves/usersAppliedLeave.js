import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { getAllLeaveRequestsOfEmployeesAction } from "../../redux/actions/leaves/leaveAction";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";
import { getLeaveType } from "../../utils/getLeaveTypeFromId";
import useDebounce from "../../utils/useDebounce";
import ModalCust from "../modal/ModalCust";

const UsersAppliedLeave = ({ color }) => {
  const dispatch = useDispatch();
  const allemployeesleave = useSelector(
    (state) => state?.nonPersist?.leavesData.allEmployeesLeaveData.content
  );
  const allemployeesleavesData = useSelector(
    (state) => state?.nonPersist?.leavesData.allEmployeesLeaveData
  );
  const searchAPIData = useSelector(
    (state) => state?.nonPersist?.leavesData?.allEmployeesSearchData
  );

  const leaveTypesData = useSelector(
    (state) => state.persistData.masterData?.leaveTypes
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [filtered, setFilteredData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
          name: `${employeeFirstName.toLowerCase()} ${employeeLastName.toLowerCase()}`,
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
  };

  const iconColor = color ? "#FFFFFF" : "#008080";

  const handleInputChange = (data) => {
    setSelectedSearchOption(data);
    dispatch(getAllLeaveRequestsOfEmployeesAction(15, filterData, null, data));
    setSelectedOptions(data);
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
        selectedOptions
      )
    );
  }, [filterData]);

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
    dispatch(
      getAllLeaveRequestsOfEmployeesAction(
        allemployeesleavesData?.numberOfElements + 15,
        filterData,
        null,
        selectedSearchOption
      )
    );
    setLoading(false);
    setHasMore(
      allemployeesleavesData?.numberOfElements <
        allemployeesleavesData.totalElements
    );
  };

  const handleScroll = () => {
    const table = tableRef.current;
    const isNearBottom =
      table.clientHeight + table.scrollTop + 1 >= table.scrollHeight;

    if (isNearBottom && hasMore) {
      fetchMoreData();
      setLoading(true);
    }
  };

  const CustomSelectControl = (props) => {
    return (
      <components.Control {...props}>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <SearchIcon sx={{ marginLeft: "10px" }} />
          {props.children}
        </div>
      </components.Control>
    );
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
            sx={{ textDecoration: "underline" }}
          >
            All Employees Leave Request
          </Typography>
        </Box>

        <Box
          display={"flex"}
          alignItems="flex-end"
          justifyContent={"center"}
          gap={"30px"}
        >
          <Box>
            <Select
              isMulti
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderRadius: "20px",
                  height: "55px",
                  maxWidth: "800px",
                  width: "400px",
                }),
              }}
              isSearchable={true}
              menuPortalTarget={document.body}
              value={selectedOptions}
              components={{ Control: CustomSelectControl }}
              onChange={handleInputChange}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              options={searchAPIData?.result}
              isLoading={searchAPIData?.length === 0}
              placeholder="Search by Name or Leave Type"
            />
          </Box>
          <Box>
            <Typography variant="body1" align="center" fontWeight="bold">
              From
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
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
                name="toDate"
                format="ddd, MMM DD,YYYY"
                value={dayjs(filterData?.toDate)}
                onChange={(value) => onChangeHandler(value, "toDate")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: "20px",
            border: "1px solid #008080",
            overflowX: "auto",
          }}
        >
          <TableContainer
            sx={{ maxHeight: "calc(92vh - 200px)", overflowY: "auto" }}
            onScroll={handleScroll}
            ref={tableRef}
          >
            <Table stickyHeader>
              <TableHead
                sx={{
                  backgroundColor: "red",
                }}
              >
                <TableRow>
                  <TableCell
                    style={{
                      ...tableHead,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      ...tableHead,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    style={{
                      ...tableHead,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    No. of Days
                  </TableCell>
                  <TableCell
                    style={{
                      ...tableHead,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Leave Type
                  </TableCell>
                  <TableCell
                    style={{
                      ...tableHead,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.date}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.days}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.type}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                zIndex: 1,
              }}
            >
              {loading && (
                <Box>
                  <CircularProgress />
                </Box>
              )}
            </Box>
          </TableContainer>

          {/* {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="fixed"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bgcolor="rgba(255, 255, 255, 0.7)"
            >
              <CircularProgress />
            </Box>
          )} */}
        </Box>
      </ModalCust>
    </Box>
  );
};

export default UsersAppliedLeave;
