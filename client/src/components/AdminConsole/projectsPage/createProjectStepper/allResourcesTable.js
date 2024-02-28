// import { useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
// import { getAllResourcesAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";

const AllResourcesTable = () => {
  // const dispatch = useDispatch();
  // const projectId = useSelector(
  //   (state) => state.nonPersist.projectDetails?.projectId
  // );

  const allResourcesData = useSelector(
    (state) => state.nonPersist.projectDetails?.allResourcesData
  );
  console.log("allResourcesData", allResourcesData);
  // useEffect(() => {
  //   dispatch(getAllResourcesAction(projectId));
  // }, []);

  // Check if allResourcesData is available and not null
  if (!allResourcesData || !Array.isArray(allResourcesData)) {
    return <p>No resources available</p>;
  }
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
        {allResourcesData?.map((allResources, index) => (
          <tr key={allResources.allResourcesId}>
            <td>{index + 1}</td>
            <td>{allResources.employeeName}</td>
            <td>{allResources.designation}</td>
            <td>{allResources.skills.join(", ")}</td>
            <td>{allResources.occupancyHours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllResourcesTable;
