import {
  Grid,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Stack, IconButton, Typography } from "@mui/material";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

export default function ReporteesList() {
  const [expanded, setExpanded] = useState(false);

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
      column4: "+9876543210",
      column5: "Bob Williams",
      column6: "Project Y",
      column7: "Data Analyst",
    },
    {
      id: 2,
      column1: {
        image:
          "https://s3-alpha-sig.figma.com/img/9379/8ae3/f200add447d64e967a74191ab54207c1?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p-3tOPRX3EpFN1mS6RmgotIj5yKD61be-9md2fRtkV7D8z~S7lL2vjnuvFdXCixDZfjyvCzJZPTqnkf1ym3mHMCnapYD-azOV3DnELP~rFz6H4ATpgaD~brI2y~2wAqC40HLREssU2qF88W00Jpdo9ixxEmtHWqGyXqZ3KTuHfPWK5FYlra-9NFmH-iFB4tSRo8L4Qpk01qoDuMmWU-uu3W3ybggQzC4CP7IPGMY8X8wh7Lo4j93R-0mj4NWAOYesMFMfkUnV74UCcRlluCT0eT8oxJ3Mn6kjSNIwTsHUb4xNo3uyZ5Ka2~BjTrdYhvrwrssk5ra~vOXaTggtIYrCg__",
        name: "Kiran Kumar",
      },
      column2: {
        employeeSkills: [
          { skillName: "Skill 4", rating: 6 },
          { skillName: "Skill 5", rating: 7 },
          { skillName: "Skill 6", rating: 4 },
        ],
      },
      column3: 10,
      column4: "+1122334455",
      column5: "Emily Davis",
      column6: "Project Z",
      column7: "Data Analyst",
    },
    {
      id: 2,
      column1: {
        image:
          "https://s3-alpha-sig.figma.com/img/9379/8ae3/f200add447d64e967a74191ab54207c1?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p-3tOPRX3EpFN1mS6RmgotIj5yKD61be-9md2fRtkV7D8z~S7lL2vjnuvFdXCixDZfjyvCzJZPTqnkf1ym3mHMCnapYD-azOV3DnELP~rFz6H4ATpgaD~brI2y~2wAqC40HLREssU2qF88W00Jpdo9ixxEmtHWqGyXqZ3KTuHfPWK5FYlra-9NFmH-iFB4tSRo8L4Qpk01qoDuMmWU-uu3W3ybggQzC4CP7IPGMY8X8wh7Lo4j93R-0mj4NWAOYesMFMfkUnV74UCcRlluCT0eT8oxJ3Mn6kjSNIwTsHUb4xNo3uyZ5Ka2~BjTrdYhvrwrssk5ra~vOXaTggtIYrCg__",
        name: "Kiran Kumar",
      },
      column2: {
        employeeSkills: [
          { skillName: "Skill 4", rating: 6 },
          { skillName: "Skill 5", rating: 7 },
          { skillName: "Skill 6", rating: 4 },
        ],
      },
      column3: 10,
      column4: "+1122334455",
      column5: "Emily Davis",
      column6: "Project Z",
      column7: "Data Analyst",
    },
    {
      id: 2,
      column1: {
        image:
          "https://s3-alpha-sig.figma.com/img/9379/8ae3/f200add447d64e967a74191ab54207c1?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p-3tOPRX3EpFN1mS6RmgotIj5yKD61be-9md2fRtkV7D8z~S7lL2vjnuvFdXCixDZfjyvCzJZPTqnkf1ym3mHMCnapYD-azOV3DnELP~rFz6H4ATpgaD~brI2y~2wAqC40HLREssU2qF88W00Jpdo9ixxEmtHWqGyXqZ3KTuHfPWK5FYlra-9NFmH-iFB4tSRo8L4Qpk01qoDuMmWU-uu3W3ybggQzC4CP7IPGMY8X8wh7Lo4j93R-0mj4NWAOYesMFMfkUnV74UCcRlluCT0eT8oxJ3Mn6kjSNIwTsHUb4xNo3uyZ5Ka2~BjTrdYhvrwrssk5ra~vOXaTggtIYrCg__",
        name: "Kiran Kumar",
      },
      column2: {
        employeeSkills: [
          { skillName: "Skill 4", rating: 6 },
          { skillName: "Skill 5", rating: 7 },
          { skillName: "Skill 6", rating: 4 },
        ],
      },
      column3: 10,
      column4: "+1122334455",
      column5: "Emily Davis",
      column6: "Project Z",
      column7: "Data Analyst",
    },
    // Add more objects for additional rows
  ];
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const totalPages = 3;

  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      mt={3}
      sx={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "5px",
      }}
    >
      <Grid container justifyContent="flex-end">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography variant="body1" sx={{ color: "#5E5E5E" }}>
            {currentPage + 1} of {totalPages}Pages
          </Typography>
          <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>

          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
        </Stack>
      </Grid>
      <Grid container>
        <TableContainer
          component={Paper}
          sx={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Table
            sx={{
              borderTop: "1px solid #DADADA",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>

                <TableCell>Full Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Reporting Manager</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                textAlign: "center",
              }}
            >
              {rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>

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
                  <TableCell>{row.column7}</TableCell>

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
                            !expanded && row.column2.employeeSkills.length > 5
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
                  <TableCell>{row.column4}</TableCell>
                  <TableCell>{row.column5}</TableCell>
                  <TableCell>{row.column6}</TableCell>
                  <TableCell
                    sx={{
                      color: "#1475E7",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "18px",
                    }}
                  >
                    view{" "}
                    <KeyboardArrowRightIcon
                      sx={{
                        marginLeft: "-10px",
                      }}
                    />
                    <KeyboardArrowRightIcon
                      sx={{
                        marginLeft: "-18px",
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
  );
}
