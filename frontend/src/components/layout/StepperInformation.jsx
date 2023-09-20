import React from 'react'
import { Stepper } from '@mui/material'
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { SolutionOutlined, UserOutlined } from '@ant-design/icons'

export const StepperInformation = ({orientation,stepCounter}) => {
  return (
    <Stepper 
                            activeStep={stepCounter}
                            orientation={orientation}
                            style={{width: '100%'}}
                            
                            >
                            <Step>
                                <StepLabel 
                                    className='text-secondary text-xs'>
                                        <div className='flex items-center'>
                                            <SolutionOutlined />
                                            {orientation == 'vertical'? "" :"Create user data"}
                                        </div>
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel 
                                    className='text-secondary'>
                                        <div className='flex items-center'>
                                            <UserOutlined />
                                            {orientation == 'vertical'? "" :"User Eyebrows"}
                                        </div>
                                    </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel 
                                    className='text-secondary'>
                                        <div className='flex items-center'>
                                            <UserOutlined />
                                            {orientation == 'vertical'? "" :"User Left Eye"}
                                        </div>
                                    </StepLabel>
                                    
                            </Step>
                            <Step>
                                <StepLabel 
                                    className='text-secondary'>
                                        <div className='flex items-center'>
                                            <UserOutlined />
                                            {orientation == 'vertical'? "" :"User Right Eye"}
                                        </div>
                                    </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel 
                                    className='text-secondary'>
                                        <div className='flex items-center'>
                                            <UserOutlined />
                                            {orientation == 'vertical'? "" :"User Mouth"}
                                        </div>
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel 
                                    className='text-secondary'>
                                        <div className='flex items-center'>
                                            <UserOutlined />
                                            {orientation == 'vertical'? "" :"User Nose"}
                                        </div>
                                </StepLabel>
                            </Step>
                        </Stepper>
  )
}
