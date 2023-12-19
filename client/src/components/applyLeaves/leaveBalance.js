import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaveBalanceAction } from "../../redux/actions/leaves/leaveAction";

const LeaveBalance = () => {
  const dispatch = useDispatch();

  const leaveBalance = useSelector(
    (state) => state?.nonPersist?.leavesData?.leaveBalanceData
  );


  useEffect(() => {
    dispatch(getLeaveBalanceAction());
  }, [dispatch]);

  const leaveTypeMasterData = useSelector(
    (state) => state.persistData.masterData?.leaveTypes
  );


  const result = leaveBalance.map((item) => {
    const leaveMasterId = parseInt(Object.keys(item)[0]);
    const matchingMasterData = leaveTypeMasterData.find(
      (data) => data.leaveMasterId === leaveMasterId
    );

    return {
      leaveMasterId,
      leaveType: matchingMasterData ? matchingMasterData.leaveType : undefined,
      numberDays: item[leaveMasterId],
    };
  });

  return (
    <Box className="gridspace">
      <Typography className="leaveBalance" variant="h6">
        <b>LEAVE BALANCE</b>
      </Typography>
      <Grid container spacing={0.5} justifyContent={"space-around"}>
        {result?.length > 0 ? (
          result?.map((data, index) => {
            return (
              <Box
                key={index}
                sx={{
                  background: "#008080",
                  minWidth: "140px",
                  borderRadius: "5px",
                  padding: "10px 0px",
                }}
              >
                <Typography
                  style={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                    textWrap: "wrap",
                  }}
                >
                  {data.leaveType}
                  <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                    {data.numberDays}
                  </Typography>
                </Typography>
              </Box>
            );
          })
        ) : (
          <Typography variant="h3">No Leave Data Found</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default LeaveBalance;
