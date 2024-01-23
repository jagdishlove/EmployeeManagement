export const getLeaveType = (id, masterData) => {
  console.log("masterData", masterData);
  const leaveType = masterData?.find(
    (itemId) => itemId.leaveMasterId === id
  )?.leaveType;
  return leaveType;
};
