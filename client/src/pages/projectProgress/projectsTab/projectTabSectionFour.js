import {
  Avatar,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import TeamMemebrs from "../../../assets/Team Members.svg";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ProjectTabSectionFour = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  // const percentage = 80;

  // const rating = 3;
  const rows = [
    {
      id: 1,
      column1: {
        image:
          "https://s3-alpha-sig.figma.com/img/9379/8ae3/f200add447d64e967a74191ab54207c1?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p-3tOPRX3EpFN1mS6RmgotIj5yKD61be-9md2fRtkV7D8z~S7lL2vjnuvFdXCixDZfjyvCzJZPTqnkf1ym3mHMCnapYD-azOV3DnELP~rFz6H4ATpgaD~brI2y~2wAqC40HLREssU2qF88W00Jpdo9ixxEmtHWqGyXqZ3KTuHfPWK5FYlra-9NFmH-iFB4tSRo8L4Qpk01qoDuMmWU-uu3W3ybggQzC4CP7IPGMY8X8wh7Lo4j93R-0mj4NWAOYesMFMfkUnV74UCcRlluCT0eT8oxJ3Mn6kjSNIwTsHUb4xNo3uyZ5Ka2~BjTrdYhvrwrssk5ra~vOXaTggtIYrCg__",
        name: "Kiran Kumar",
      },
      column2: {
        employeeSkills: [
          { skillName: "Skill 1", rating: 8 },
          { skillName: "Skill 2", rating: 5 },
          { skillName: "Skill 3", rating: 3 },
        ],
      },
      column3: 10,
      column4: 100,
      column5: 200,
      column6: 200,
    },
    {
      id: 2,
      column1: "Row 2, Cell 1",
      column2: {
        employeeSkills: [
          { skillName: "Skill 4", rating: 6 },
          { skillName: "Skill 5", rating: 7 },
          { skillName: "Skill 6", rating: 4 },
        ],
      },
      column3: 10,
      column4: 100,
      column5: 200,
      column6: 200,
    },
    // Add more objects for additional rows
  ];
  return (
    <div>
      <Grid
        container
        style={{ paddingTop: "30px", justifyContent: "space-between" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              paddingLeft: "20px",
            }}
          >
            <Grid item xs={12} display={"flex"} flexDirection={"row"}>
              <img src={TeamMemebrs} />
              <Typography margin={2}> Timesheet Breakdown</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell>Total No. of Hours</TableCell>
                    <TableCell>Logged In Hours</TableCell>
                    <TableCell>Logged In Hours</TableCell>
                    <TableCell>Hours Left</TableCell>

                    {/* Add more TableCells for additional columns */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        {typeof row.column1 === "object" ? ( // Check if column1 is an object
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <Avatar src={row.column1.image} />
                            </Grid>
                            <Grid item>{row.column1.name}</Grid>
                          </Grid>
                        ) : (
                          row.column1 // Render as text if not an object
                        )}
                      </TableCell>
                      <TableCell>
                        {row.column2.employeeSkills?.length > 0 && (
                          <Grid
                            container
                            sx={{
                              border: "1px solid #F3F3F3",
                              borderRadius: "5px",
                              backgroundColor: "#F3F3F3",
                              overflow: "auto",
                            }}
                          >
                            {row.column2.employeeSkills
                              .slice(
                                0,
                                !expanded &&
                                  row.column2.employeeSkills.length > 5
                                  ? 5
                                  : row.column2.employeeSkills.length
                              )
                              .map((employeeSkill, index) => (
                                <Grid
                                  item
                                  key={index}
                                  sx={{
                                    border: "1px solid #AEAEAE",
                                    borderRadius: "8px",
                                    padding: "4px",
                                    margin: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    color: "#000000",
                                    backgroundColor: "#ffffff",
                                  }}
                                >
                                  {index > 0 && ", "}
                                  <span style={{ color: "black" }}>
                                    {employeeSkill.skillName}
                                  </span>{" "}
                                  {employeeSkill.rating && (
                                    <>
                                      <StarOutlinedIcon
                                        style={{
                                          backgroundColor:
                                            employeeSkill.rating < 5
                                              ? "#90DC90"
                                              : employeeSkill.rating >= 5 &&
                                                employeeSkill.rating <= 7
                                              ? "#E6E62C"
                                              : "#E38F75",
                                          color: "#ffff",
                                          borderRadius: "50%",
                                          width: 15,
                                          height: 15,
                                          marginTop: 0,
                                          marginLeft: 2,
                                          marginRight: 2,
                                        }}
                                      />
                                      {employeeSkill.rating}
                                    </>
                                  )}
                                </Grid>
                              ))}
                            {row.column2.employeeSkills.length > 5 && (
                              <Grid
                                item
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                  marginLeft: "auto", // Pushes the button to the right
                                }}
                              >
                                <Button onClick={toggleExpand}>
                                  {expanded ? (
                                    <>
                                      View Less
                                      <KeyboardArrowUpIcon />
                                    </>
                                  ) : (
                                    <>
                                      View More
                                      <KeyboardArrowDownIcon />
                                    </>
                                  )}
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        )}
                      </TableCell>
                      <TableCell>{row.column3}</TableCell>
                      <TableCell>{row.column4}</TableCell>
                      <TableCell>{row.column5}</TableCell>
                      <TableCell>
                        <CircularProgressbar
                          value={row.column6}
                          text={`${row.column6} hrs left`}
                          styles={{
                            root: { width: "70px" }, // Adjust the width to reduce the size
                            path: { stroke: "#4CAF50" }, // Adjust path color if needed
                            text: { fontSize: "10px", fill: "#000" }, // Adjust font size
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Add more TableRows for additional rows */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectTabSectionFour;
