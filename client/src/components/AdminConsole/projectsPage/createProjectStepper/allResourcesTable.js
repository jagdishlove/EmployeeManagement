import { useSelector } from "react-redux";
import React from "react";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { getAllResourcesAction } from "../../../../redux/actions/AdminConsoleAction/projects/projectsAction";

const AllResourcesTable = ({ handleEdit }) => {
  const allResourcesData = useSelector(
    (state) => state.nonPersist.projectDetails?.allResourcesData
  );
  console.log("allResourcesData", allResourcesData);
  if (!allResourcesData || !Array.isArray(allResourcesData)) {
    return <p>No resources available</p>;
  }

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={12} sm={8} md={12} lg={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                style={{ backgroundColor: "#008080", color: "#ffffff" }}
              >
                <TableCell style={{ color: "#ffffff" }}>SL No.</TableCell>
                <TableCell style={{ color: "#ffffff" }}>
                  Employee Name
                </TableCell>
                <TableCell style={{ color: "#ffffff" }}>Designation</TableCell>
                <TableCell style={{ color: "#ffffff" }}>Skills</TableCell>
                <TableCell style={{ color: "#ffffff" }}>
                  Occupancy Hours
                </TableCell>
                <TableCell style={{ color: "#ffffff" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Map through each employee data and render a row for each */}
              {allResourcesData?.map((allResources, index) => (
                <TableRow key={allResources.resourceId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{allResources.employeeName}</TableCell>
                  <TableCell>{allResources.designation}</TableCell>
                  <TableCell>{allResources.employeeSkills.skillName}</TableCell>
                  <TableCell>{allResources.occupancyHours}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon
                        onClick={() =>
                          handleEdit(
                            allResources.employeeId,
                            allResources.resourceId
                          )
                        }
                      />
                    </IconButton>

                    <IconButton color="primary">
                      <DeleteIcon
                      // onClick={() =>
                      //   dispatch(
                      //     deleteCostIncurredAction(
                      //       costIncurred.costIncurredId,
                      //       projectId
                      //     )
                      //   )
                      // }
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AllResourcesTable;
