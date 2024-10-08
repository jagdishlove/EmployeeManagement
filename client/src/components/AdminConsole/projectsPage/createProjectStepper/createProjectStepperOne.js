import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectFormDetails from "./createProjectFormDetails";

const steps = ["Create Project", "Resource Allocation", "Cost Allocation"];

const CreateProjectStepperOne = () => {
  const Navigate = useNavigate();
  const handleBackClick = () => {
    Navigate(-1);
  };

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
          <b>Create Project</b>
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
                          color: index === 0 ? "#ffffff" : "#000000",
                          backgroundColor: index === 0 ? "#008080" : "#e6e6e6",
                          padding: index === 0 ? "10px 55px" : "10px 0px",
                          zIndex: "1",
                          borderRadius: "5px",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  )}
                  connector={null}
                ></StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>

      <CreateProjectFormDetails />
    </>
  );
};

export default CreateProjectStepperOne;
