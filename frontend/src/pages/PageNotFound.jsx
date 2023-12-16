import React from 'react'
import notfound from '../assets/notfound.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
AOS.init();
export const PageNotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <div className='relative flex justify-center w-full h-screen overflow-hidden py-[2rem] md:py-[5rem] p-[2rem]'>
      <div className='w-full h-full flex justify-center z-[2]'>
        <div className='py-0 flex flex-col items-center'>
          <img 
              src={notfound} 
              alt="404 not found image" 
              className='max-w-sm'
              data-aos="zoom-in"
            />
          <div
             data-aos="fade-up"
            className='flex flex-col gap-5'>
              <div className='font-seondary text-2xl flex flex-col items-center gap-1'>
                <p className='font-bold italic'>404 page not found</p>
                <p className='text-sm md:text-md'>There is no <span className='text-red-500'>{location.pathname}</span> path</p>
              </div>
              <button 
                  onClick={() => navigate(-1)}
                  data-aos="fade-up"
                  className='bg-primary rounded-md m-auto px-10 py-2 text-white font-secondary hover:bg-blue-500
                  transition-all delay-50 ease-in-out'>
                    Go back
              </button>
          </div>
        </div>
      </div>

    <div 
        data-aos="zoom-in"
        data-aos-easing="ease-in-out"
        data-aos-delay="50"
        className='hidden md:block absolute z-[-2] inset-0 w-[20rem] h-[20rem] bg-optional top-[-9rem] left-[-5rem] rounded-full'></div>
      <div 
        data-aos="zoom-in"
        data-aos-easing="ease-in-out"
        data-aos-delay="50"
        className='hidden md:block absolute w-[10rem] h-[10rem] bg-primary bottom-[10rem] right-[-4rem] md:right-[-5rem] rounded-full'></div>

      <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className='absolute bottom-[-1rem] md:bottom-[-2rem] lg:bottom-[-3rem] xl:bottom-[-5rem] w-full'
          data-aos="fade-up-right"
          data-aos-easing="ease-in-out"
          >
          
            <path 
                fill="#5d99ff" 
                fill-opacity="1" 
                d="M0,64L30,58.7C60,53,120,43,180,74.7C240,107,300,181,360,181.3C420,181,480,107,540,96C600,
                85,660,139,720,149.3C780,160,840,128,900,117.3C960,107,1020,117,1080,128C1140,139,1200,149,
                1260,154.7C1320,160,1380,160,1410,160L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,
                320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,
                320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
            </path>
      </svg>
      <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className='absolute bottom-[1rem] md:bottom-[2rem] lg:bottom-[1rem] xl:bottom-[-2rem] w-full
          z-[-2]'
          data-aos-delay="200"
          data-aos="fade-up-right"
          data-aos-easing="ease-in-out"
          >
          
            <path 
                fill="#b9d3ff" 
                fill-opacity="1" 
                d="M0,64L30,58.7C60,53,120,43,180,74.7C240,107,300,181,360,181.3C420,181,480,107,540,96C600,
                85,660,139,720,149.3C780,160,840,128,900,117.3C960,107,1020,117,1080,128C1140,139,1200,149,
                1260,154.7C1320,160,1380,160,1410,160L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,
                320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,
                320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
            </path>
      </svg>

    </div>
  )
}
