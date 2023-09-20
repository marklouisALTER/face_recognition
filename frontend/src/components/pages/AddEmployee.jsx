import React,{useEffect,useState} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { Employee_information } from '../Employee_registration/Employee_information'
import { Employee_eyebrows } from '../Employee_registration/Employee_eyebrows'
import { Employee_leyes } from '../Employee_registration/Employee_leyes'
import { Employee_reyes } from '../Employee_registration/Employee_reyes'
import { Employee_mouth } from '../Employee_registration/Employee_mouth'
import { Employee_nose } from '../Employee_registration/Employee_nose'
import { StepperInformation } from '../layout/StepperInformation'
export const AddEmployee = ({leftbar,setLeftbar,title}) => {
    const {getUser, logout} = useAuth();
    const [user] = useState(getUser());
    const [orientation, setOrientation] = useState('vertical');

    const [stepCounter, setStepCounter] = useState(0);

    useEffect(() => {
        document.title = title;

        function windowSize() {
            return window.innerWidth >= 768 ? 'horizontal' : 'vertical';
        }
      
        
        setOrientation(windowSize());
      
        window.addEventListener('resize', () => {
            setOrientation(windowSize());
        });
      
        return () => {
            window.removeEventListener('resize', () => {
            setOrientation(windowSize());
            });
          };

    })

    function showStep(step){
        switch(step){
            case 0 :
                return <Employee_information
                            orientation={orientation} 
                            toggle={() => 
                                setStepCounter(prevState => (prevState + 1))
                            }
                            toggleDown={() => 
                                setStepCounter(prevState => (prevState - 1))
                            }
                        />
            case 1 :
                return <Employee_eyebrows 
                            orientation={orientation} 
                            toggle={() => 
                                setStepCounter(prevState => (prevState + 1))
                            }
                            toggleDown={() => 
                                setStepCounter(prevState => (prevState - 1))
                            }
                        />
            case 2 :
                return <Employee_leyes 
                        orientation={orientation} 
                            toggle={() => 
                                setStepCounter(prevState => (prevState + 1))
                            }
                            toggleDown={() => 
                                setStepCounter(prevState => (prevState - 1))
                            }
                        />
            case 3 :
                return <Employee_reyes 
                            orientation={orientation} 
                                toggle={() => setStepCounter(prevState => (prevState + 1))
                            }
                            toggleDown={() => 
                                setStepCounter(prevState => (prevState - 1))
                            }
                        />
            case 5 :
                return <Employee_mouth 
                            orientation={orientation} 
                                toggle={() => setStepCounter(prevState => (prevState + 1))
                            }
                            toggleDown={() => 
                                setStepCounter(prevState => (prevState - 1))
                            }
                        />
            case 4 :
                return <Employee_nose 
                            orientation={orientation} 
                                toggle={() => 
                                    setStepCounter(prevState => (prevState + 1))
                                }
                                toggleDown={() => 
                                    setStepCounter(prevState => (prevState - 1))
                                }
                            />
            default:
                break;
        }
    }

    return (
    <div className='w-screen h-screen flex overflow-hidden'>
        <div>
            <Leftbar leftbar={leftbar}/>
        </div>
        <div className='w-full h-full'>
            <Header user={user} logout={logout} leftbar={() => setLeftbar(prevState => !prevState)}/>
            <div className='h-[85%]'>
            
                <div className='m-2'>
                    <Breadcrumbs/>
                </div>
                <div className='h-full border-t grid grid-rows-5 gap-3 p-3'>
                    <div className='row-span-5 grid grid-cols-4 md:grid-cols-1 bg-optional shadow-md shadow-spread-md shadow-gray-300'>
                        <div className='hidden md:flex px-10 items-center col-span-1 md:col-span-1 justify-center mt-5 flex-nowrap'>
                            
                        <StepperInformation orientation={orientation} stepCounter={stepCounter}/>
                        </div>
                        <div className='flex justify-center items-center md:items-center col-span-3 md:col-span-1'>
                        {showStep(stepCounter)}
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
)
}
