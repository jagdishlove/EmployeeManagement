import { useSelector } from "react-redux";

const AllResourcesTable = () => {
  const allResourcesData = useSelector(
    (state) => state.nonPersist.projectDetails?.allResourcesData
  );
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
