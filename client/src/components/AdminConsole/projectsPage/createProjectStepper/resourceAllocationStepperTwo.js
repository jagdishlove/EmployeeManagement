import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React from "react";
import ResourceAllocationFormDetails from "./resourceAllocationFormDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ResourceAllocationStepperTwo = () => {
  const steps = ["Create Project", "Resource Allocation", "Cost Allocation"];
  const Navigate = useNavigate();

  const { id } = useParams();

  const projectId = useSelector(
    (state) => state.persistData.projectDetails?.projectId
  );

  const handleBackClick = () => {
    if (projectId) {
      Navigate(`/EditForm/${projectId}`);
    } else if (id) {
      Navigate(`/EditForm/${id}`);
    }
  };
  const { getProjectData } = useSelector(
    (state) => state?.persistData?.projectDetails
  );
  return (
    <>
      <div
        className="Heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        <IconButton
          style={{ color: "silver" }}
          onClick={() => handleBackClick()}
        >
          <ArrowBackIcon
            sx={{
              color: "#000",
            }}
          />
        </IconButton>
        <Typography variant="h6">
          <b>{getProjectData?.projectName}</b>
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />

      <div
        style={{ margin: "auto", display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "72%",
            backgroundColor: "#e6e6e6 !important",
            padding: "10px 0px !important",
            borderRadius: "10px",
          }}
        >
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel
                  StepIconComponent={() => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          color: index === 1 ? "#ffffff" : "#000000",
                          backgroundColor: index === 1 ? "#008080" : "#e6e6e6",
                          padding: index === 1 ? "10px 35px" : "10px 0px",
                          zIndex: "1",
                          borderRadius: "5px",
                        }}
                      >
                        {label}
                        {index === 0 && (
                          <DoneIcon
                            style={{
                              color: index === 0 ? "#000000" : "#ffffff",
                              fontSize: "1rem",
                              marginLeft: "8px",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                ></StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>

      <ResourceAllocationFormDetails />
    </>
  );
};

export default ResourceAllocationStepperTwo;
