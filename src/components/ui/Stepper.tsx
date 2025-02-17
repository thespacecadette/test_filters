import React, { useState } from 'react';
import MUIStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

interface props {
    steps: Array<string>;
    activeStep: number;
    setActiveStep: (prevActiveStep: number) => void;
}

export const Stepper: React.FC<props> = ({ activeStep, setActiveStep, steps }) => {
    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };
    
    return (
        <MUIStepper activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};

                return (
                    <Step key={label} {...stepProps}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                );
            })}
      </MUIStepper>
    );
};
