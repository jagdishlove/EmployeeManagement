import React, { useState } from 'react'
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Accordion, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ProjectAccordion = () => {
    const [accordionDetails, setAccordionDetails] = useState(false);

    const handleExpand = () => {
      setAccordionDetails(!accordionDetails);
    };

  return (
    <div>
        <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
            }}
            onChange={handleExpand}
          >
            <AccordionSummary
              sx={{
                flexDirection: "row",
                "&.Mui-focusVisible": {
                  background: "none",
                },
                width: "100%",
                backgroundColor: "#008080",
              }}
            >
              {accordionDetails ? (
                <RemoveIcon color="secondary" />
              ) : (
                <AddIcon color="secondary" />
              )}
              <Typography variant="h6" color="secondary" ml={3}>
                Project Description
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
            }}
            onChange={handleExpand}
          >
            <AccordionSummary
              sx={{
                flexDirection: "row",
                "&.Mui-focusVisible": {
                  background: "none",
                },
                width: "100%",
                backgroundColor: "#008080",
              }}
            >
              {accordionDetails ? (
                <RemoveIcon color="secondary" />
              ) : (
                <AddIcon color="secondary" />
              )}
              <Typography variant="h6" color="secondary" ml={3}>
                Project Resources
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow  style={{backgroundColor:"#008080", color:"#ffffff"}}>
                  <TableCell style={{color:"#ffffff",}}>Sl. No</TableCell>
                  <TableCell style={{color:"#ffffff",}}>Name</TableCell>
                  <TableCell style={{color:"#ffffff",}}>Designation</TableCell>
                  <TableCell style={{color:"#ffffff",}}>Skill</TableCell>
                  <TableCell style={{color:"#ffffff",}}>Occupancy Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Developer</TableCell>
                  <TableCell>React, JavaScript</TableCell>
                  <TableCell>40</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </TableContainer>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              border: "1px solid #898989",
              width: "100%",
            }}
            onChange={handleExpand}
          >
            <AccordionSummary
              sx={{
                flexDirection: "row",
                "&.Mui-focusVisible": {
                  background: "none",
                },
                width: "100%",
                backgroundColor: "#008080",
              }}
            >
              {accordionDetails ? (
                <RemoveIcon color="secondary" />
              ) : (
                <AddIcon color="secondary" />
              )}
              <Typography variant="h6" color="secondary" ml={3}>
                Project Cost Allocation
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
    </div>
  )
}

export default ProjectAccordion;
