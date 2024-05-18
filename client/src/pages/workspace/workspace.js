import React from "react";
import AdminHeader from "../../components/admin/adminHeader";

const WorkSpace = () => {
  localStorage.setItem("selectedTabIndex", 0);
  localStorage.removeItem("selectedProject");
  return (
    <>
      <AdminHeader />
    </>
  );
};

export default WorkSpace;
