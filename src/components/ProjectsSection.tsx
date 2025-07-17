import { useEffect, useRef } from 'react';
import HoverElement from './HoverElement';
import * as motion from 'motion/react-client';
import { animate } from 'motion';
import { useInView } from 'motion/react';

import projects from '../lib/projects';

export default function ProjectsSection() {
  const h2Ref = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const projectsContainerRef = useRef(null);
  const inViewProject = useRef(0);
  const sliderContainerRef = useRef(null);
  const sliderRef = useRef(null);

  const h2InView = useInView(h2Ref, { once: true });
  const leftArrowInView = useInView(leftArrowRef, { once: true });
  const rightArrowInView = useInView(rightArrowRef, { once: true });
  const projectsContainerInView = useInView(projectsContainerRef, { once: true });
  const sliderContainerInView = useInView(sliderContainerRef, { once: true });

  // projects container sliding variables
  const isDownContainer = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // slider variables
  const isDownSlider = useRef(false);
  const mouseOffsetX = useRef(0);

  // h2 animation
  useEffect(() => {
    if (h2InView) {
      animate(h2Ref.current!, { y: 0, opacity: 1 }, { duration: 1, ease: 'easeOut' });
    }
  }, [h2InView]);

  // left arrow animation
  useEffect(() => {
    if (leftArrowInView) {
      animate(leftArrowRef.current!, { x: 0, opacity: 1 }, { duration: 1, ease: 'easeOut' });
    }
  }, [leftArrowInView]);
  
  // right arrow animation
  useEffect(() => {
    if (rightArrowInView) {
      animate(rightArrowRef.current!, { x: 0, opacity: 1 }, { duration: 1, ease: 'easeOut' });
    }
  }, [rightArrowInView]);

  // projects container animation
  useEffect(() => {
    if (projectsContainerInView) {
      animate(projectsContainerRef.current!, { y: 0, opacity: 1 }, { duration: 1 });
    }
  }, [projectsContainerInView]);

  // slider animation
  useEffect(() => {
    if (sliderContainerInView) {
      animate(sliderContainerRef.current!, { y: 0, opacity: 1 }, { duration: 1, ease: 'easeOut' });
    }
  }, [sliderContainerInView]);

  // initializing project list as react nodes
  const projectElements = projects.map((proj, index) => (
    <motion.button key={index} initial={{ scale: 1 }} whileHover={{ scale: 1.01 }} id={`project-${index}`} className='relative shrink-0 w-70 lg:w-100 m-2 p-2 flex flex-col text-left bg-black shadow-project-card shadow-neutral-500 rounded-sm'>
      <img className='w-full aspect-square object-cover rounded-sm select-none drag-none' src={proj.imageSrc[0]} alt={`${proj.name} Preview Image`} />
      <h3 className='text-lg lg:text-xl font-semibold'>{proj.name}</h3>
      <p className='text-sm lg:text-md'>{proj.description}</p>
      <a href='/' className='absolute bottom-1 text-sm lg:text-md drag-none underline opacity-85 hover:opacity-100'>View On GitHub</a>
    </motion.button>
  ));

  const handleSliderMovement = () => {
    const projectsContainer = projectsContainerRef.current! as HTMLDivElement;
    const sliderContainer = sliderContainerRef.current! as HTMLDivElement;
    const slider = sliderRef.current! as HTMLDivElement;

    slider.style.left = `${projectsContainer.scrollLeft * sliderContainer.clientWidth / projectsContainer.scrollWidth}px`;
  };

  const handleInViewProject = () => {
    if (!projectsContainerRef.current) return;
    const projectsContainer = projectsContainerRef.current as HTMLDivElement;

    const containerRect = projectsContainer.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    // get elements as html elements
    const elements = Array.from(projectsContainer.children);

    let closestDistance = Infinity;

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.left + rect.width / 2;

      const distance = Math.abs(containerCenter - elementCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        inViewProject.current = index;
      }
    });
  };

  // handle mouse vertical scrolling
  useEffect(() => {
    if (!projectsContainerRef.current) return;

    const projectsContainer = projectsContainerRef.current as HTMLDivElement;
    
    // start scrolling
    const handleMouseDown = (ev: MouseEvent) => {
      isDownContainer.current = true;
      isDragging.current = false;

      if (window.innerWidth < 768) {
        projectsContainer.style.cursor = 'grabbing';
        projectsContainer.style.cursor = '-webkit-grabbing';
      }

      startX.current = ev.pageX - projectsContainer.offsetLeft;
      scrollLeft.current = projectsContainer.scrollLeft;
    };
    
    // scroll logic
    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDownContainer.current) {
        // not using screenWidth['md'] because it's a static variable and i'm too lazy to make it dynamic
        projectsContainer.style.cursor = window.innerWidth < 768 ? 'default' : 'none';
        return;
      }
      isDragging.current = true;
      
      const x = ev.pageX - projectsContainer.offsetLeft;
      projectsContainer.scrollLeft = scrollLeft.current - (x - startX.current);
    };

    // end scrolling
    const handleMouseLeave = () => {
      isDownContainer.current = false;
      projectsContainer.style.cursor = window.innerWidth < 768 ? 'default' : 'none';
    };

    // end scrolling
    const handleMouseUp = () => {
      isDownContainer.current = false;
      projectsContainer.style.cursor = window.innerWidth < 768 ? 'default' : 'none';
    };

    // prevent clicks when scrolling
    const handleMouseClick = (ev: MouseEvent) => {
      if (isDragging.current) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    };

    projectsContainer.addEventListener('mousedown', handleMouseDown);
    projectsContainer.addEventListener('mouseleave', handleMouseLeave);
    projectsContainer.addEventListener('mouseup', handleMouseUp);
    projectsContainer.addEventListener('mousemove', handleMouseMove);
    projectsContainer.addEventListener('click', handleMouseClick);
    
    return () => {
      projectsContainer.removeEventListener('mousedown', handleMouseDown);
      projectsContainer.removeEventListener('mouseleave', handleMouseLeave);
      projectsContainer.removeEventListener('mouseup', handleMouseUp);
      projectsContainer.removeEventListener('mousemove', handleMouseMove);
      projectsContainer.removeEventListener('click', handleMouseClick);
    };
  }, [projectsContainerRef]);

  // handle slider width
  useEffect(() => {
    if (!sliderRef.current) return;

    const handleWindowResize = () => {
      const slider = sliderRef.current! as HTMLDivElement;
      const sliderContainer = sliderContainerRef.current! as HTMLDivElement;
      const projectsContainer = projectsContainerRef.current! as HTMLDivElement;
      
      const projectsContainerWidth = projectsContainer.getBoundingClientRect().width;
      const sliderContainerWidth = sliderContainer.clientWidth;
      const scrollWidth = projectsContainer.scrollWidth;
      
      slider.style.width = `${projectsContainerWidth * sliderContainerWidth / scrollWidth}px`;
    };

    // initialize first
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [sliderRef]);

  // handle slider events
  useEffect(() => {
    if (!sliderContainerRef.current) return;
    const sliderContainer = sliderContainerRef.current as HTMLDivElement;
    const slider = sliderRef.current! as HTMLDivElement;
    const projectsContainer = projectsContainerRef.current! as HTMLDivElement;
    
    // handle both slider and sliderContainer mousedown events
    const handleMouseDown = (ev: MouseEvent) => {
      if (ev.target === slider) {
        isDownSlider.current = true;
        mouseOffsetX.current = ev.clientX - slider.offsetLeft;
        
        if (window.innerWidth < 768) {
          document.body.style.cursor = 'grabbing';
          document.body.style.cursor = '-webkit-grabbing';
          slider.style.cursor = 'grabbing';
          slider.style.cursor = '-webkit-grabbing';
        }
      }
      else {
        const mouseX = ev.clientX - sliderContainer.offsetLeft;
        projectsContainer.scroll({ left: (mouseX - slider.clientWidth / 2) * projectsContainer.scrollWidth / sliderContainer.clientWidth, behavior: 'smooth' });
      }
    }

    // scroll slider
    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDownSlider.current) {
        document.body.style.cursor = window.innerWidth < 768 ? 'auto' : 'none';
        slider.style.cursor = window.innerWidth < 768 ? 'grab' : 'none';
        return;
      }

      projectsContainer.scrollLeft = (ev.clientX - mouseOffsetX.current) * projectsContainer.scrollWidth / sliderContainer.clientWidth;
    };

    // stop scrolling
    const handleMouseUp = () => {
      isDownSlider.current = false;
      document.body.style.cursor = window.innerWidth < 768 ? 'auto' : 'none';
      slider.style.cursor = window.innerWidth < 768 ? 'grab' : 'none';
    };

    sliderContainer.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove); // so the mouse can freely get out of the slider boundaries
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      sliderContainer.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [sliderContainerRef]);

  return (
    <section id='projects-section' className='min-h-screen flex flex-col items-center'>
      <motion.div
        ref={h2Ref}
        initial={{ y: 5, opacity: 0 }}
      >
        <HoverElement
          className='mb-8 text-[6vw] lg:text-[calc(1024px*0.06)] font-bold'
          elementType='h2'
          text='Projects I Worked On'
          uppercase={false}
        />
      </motion.div>
      <div className='relative w-screen'>
        <motion.button
          onClick={() => {
            if (inViewProject.current <= 0) return;
            inViewProject.current--;

            const leftProject = document.getElementById(`project-${inViewProject.current}`)!;
            if (inViewProject.current === 0) {
              const projectContainer = projectsContainerRef.current! as HTMLDivElement;
              projectContainer.scroll({ left: 0, behavior: 'smooth' });
            }
            else {
              leftProject.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
          }}
          ref={leftArrowRef}
          className='absolute top-49 left-0 w-12 h-12 sm:top-47 sm:w-16 sm:h-16 lg:top-60 lg:w-20 lg:h-20 rounded-full'
          initial={{ x: -10, opacity: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <svg viewBox='0 0 24 24' fill='none' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <path d='M 14.55, 6 8.55, 12 14.55, 18' stroke='#ffffff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }} />
          </svg>
        </motion.button>
        <motion.button
          onClick={() => {
            if (inViewProject.current >= projects.length - 1) return;
            inViewProject.current++;

            const rightProject = document.getElementById(`project-${inViewProject.current}`)!;
            if (inViewProject.current === projects.length - 1) {
              const projectContainer = projectsContainerRef.current! as HTMLDivElement;
              projectContainer.scroll({ left: projectContainer.scrollWidth, behavior: 'smooth' });
            }
            else {
              rightProject.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
          }}
          ref={rightArrowRef}
          className='absolute top-49 right-0 w-12 h-12 sm:top-47 sm:w-16 sm:h-16 lg:top-60 lg:w-20 lg:h-20 rounded-full'
          initial={{ x: 10, opacity: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <svg viewBox='0 0 24 24' fill='none' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <path d='M 9.45, 6 15.45, 12 9.45, 18' stroke='#ffffff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }} />
          </svg>
        </motion.button>
      </div>
      <motion.div
        onScroll={() => {
          // gets called on all scroll events on this element
          handleSliderMovement();
          handleInViewProject();
        }}
        ref={projectsContainerRef}
        className='w-[80vw] h-110 lg:h-140 flex gap-3 select-none overflow-y-hidden overflow-x-auto hide-scrollbar'
        initial={{ y: 20, opacity: 0 }}
      >
        {projectElements}
      </motion.div>
      <motion.div ref={sliderContainerRef} initial={{ y: 5, opacity: 0 }} className='relative h-2 w-25 mt-5 bg-neutral-700 rounded-full cursor-pointer cursor-green'>
        <div ref={sliderRef} className='absolute top-0 h-2 bg-white rounded-full max-md:cursor-grab cursor-green' />
      </motion.div>
    </section>
  );
}