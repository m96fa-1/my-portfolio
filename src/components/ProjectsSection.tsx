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

  const h2InView = useInView(h2Ref, { once: true });
  const leftArrowInView = useInView(leftArrowRef, { once: true });
  const rightArrowInView = useInView(rightArrowRef, { once: true });

  // project sliding variables
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // left arrow animation
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

  // initializing project list as react nodes
  const projectElements = projects.map((proj, index) => (
    <button key={index} id={`project-${index}`} className='shrink-0 w-70 lg:w-100 m-2 p-2 flex flex-col text-left bg-black shadow-project-card shadow-neutral-500 rounded-sm'>
      <img className='w-full aspect-square object-cover rounded-sm select-none' src={proj.imageSrc[0]} alt={`${proj.name} Preview`} />
      <h3 className='text-lg font-semibold'>{proj.name}</h3>
      <p className='text-sm'>{proj.description}</p>
    </button>
  ));

  const handleInViewProjectOnScroll = () => {
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

  // handle mouse x-scrolling
  useEffect(() => {
    if (!projectsContainerRef.current) return;

    const projectsContainer = projectsContainerRef.current as HTMLDivElement;
    
    // start scrolling
    const handleMouseDown = (ev: MouseEvent) => {
      isDown.current = true;
      projectsContainer.style.cursor = 'grabbing';
      projectsContainer.style.cursor = '-webkit-grabbing';
      startX.current = ev.pageX - projectsContainer.offsetLeft;
      scrollLeft.current = projectsContainer.scrollLeft;
    };

    // end scrolling
    const handleMouseLeave = () => {
      isDown.current = false;
      projectsContainer.style.cursor = window.innerWidth >= 768 ? 'none' : 'default';
    };

    // end scrolling
    const handleMouseUp = () => {
      isDown.current = false;
      projectsContainer.style.cursor = window.innerWidth >= 768 ? 'none' : 'default';
    };
    
    // scroll logic
    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDown.current) {
        // not using screenWidth['md'] because it's a static variable and i'm too lazy to make it dynamic
        projectsContainer.style.cursor = window.innerWidth >= 768 ? 'none' : 'default';
        return;
      }
      ev.preventDefault();
      const x = ev.pageX - projectsContainer.offsetLeft;
      projectsContainer.scrollLeft = scrollLeft.current - (x - startX.current);

      // change inViewProject over scroll
      handleInViewProjectOnScroll();
    };

    projectsContainer.addEventListener('mousedown', handleMouseDown);
    projectsContainer.addEventListener('mouseleave', handleMouseLeave);
    projectsContainer.addEventListener('mouseup', handleMouseUp);
    projectsContainer.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      projectsContainer.removeEventListener('mousedown', handleMouseDown);
      projectsContainer.removeEventListener('mouseleave', handleMouseLeave);
      projectsContainer.removeEventListener('mouseup', handleMouseUp);
      projectsContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id='projects' className='min-h-screen flex flex-col items-center'>
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
            document.getElementById(`project-${inViewProject.current}`)?.scrollIntoView({ behavior: 'smooth', inline: inViewProject.current === 0 ? 'nearest' : 'center', block: 'nearest' });
          }}
          ref={leftArrowRef}
          className='absolute top-42 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:top-60 lg:w-20 lg:h-20 rounded-full'
          initial={{ x: -10, opacity: 0, scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <svg viewBox='0 0 24 24' fill='none' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <path d='M 14.55, 6 8.55, 12 14.55, 18' stroke='#ffffff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }} />
          </svg>
        </motion.button>
        <motion.button
          onClick={() => {
            if (inViewProject.current >= projects.length - 1) return;
            inViewProject.current++;
            document.getElementById(`project-${inViewProject.current}`)?.scrollIntoView({ behavior: 'smooth', inline: inViewProject.current === projects.length - 1 ? 'nearest' : 'center', block: 'nearest' });
          }}
          ref={rightArrowRef}
          className='absolute top-42 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:top-60 lg:w-20 lg:h-20 rounded-full'
          initial={{ x: 10, opacity: 0, scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <svg viewBox='0 0 24 24' fill='none' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <path d='M 9.45, 6 15.45, 12 9.45, 18' stroke='#ffffff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }} />
          </svg>
        </motion.button>
      </div>
      <div onScroll={() => handleInViewProjectOnScroll()} ref={projectsContainerRef} className='w-[80vw] h-100 lg:h-140 flex gap-3 select-none overflow-auto hide-scrollbar'>
        {projectElements}
      </div>
      <div>{/* displays how many slides there are as dots (should have a ref) */}</div>
    </section>
  );
}