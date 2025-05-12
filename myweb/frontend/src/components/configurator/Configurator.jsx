import { useState } from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Базовая конфигурация', 'Комплектующие', 'Дополнительно'];

export default function Configurator() {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {/* Здесь будут компоненты выбора конфигурации */}
    </Box>
  );
}