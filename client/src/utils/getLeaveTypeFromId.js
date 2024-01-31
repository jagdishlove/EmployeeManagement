export const getLeaveType = (id, masterData) => {
  const leaveType = masterData?.find(
    (itemId) => itemId.leaveMasterId === id
  )?.leaveType;
  return leaveType;
};
