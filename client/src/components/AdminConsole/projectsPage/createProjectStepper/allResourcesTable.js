// TableComponent.js
import React from "react";

const AllResourcesTable = (data) => {
  // Your table rendering logic here using the 'data' prop
  return (
    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Designation</th>
          <th>Skills</th>
          <th>Occupancy Hours</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through each employee data and render a row for each */}
        {data.map((employee, index) => (
          <tr key={index}>
            <td>{employee.employeeName}</td>
            <td>{employee.designation}</td>
            <td>{employee.skills.join(", ")}</td>
            <td>{employee.occupancyHours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllResourcesTable;
