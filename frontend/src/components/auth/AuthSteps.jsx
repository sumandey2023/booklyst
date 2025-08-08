import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

const steps = ["Sign in", "Choose Role", "Finish Setup"];

const AuthSteps = ({ activeStep = 0 }) => (
  <Box className="px-4 py-3">
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
);

export default AuthSteps;
