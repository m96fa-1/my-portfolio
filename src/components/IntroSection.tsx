import { useRef } from 'react';
import * as motion from 'motion/react-client';
import { useInView } from 'motion/react';

import HoverElement from './HoverElement';

export default function IntroSection() {
  const containerRef = useRef(null);

  // "once" doesn't change anything in this case but i like how it looks
  const containerInView = useInView(containerRef, { once: true });

  return (
    <section id='intro-section' className='min-h-screen md:mb-20 px-4 py-20 flex items-center justify-center'>
      <div ref={containerRef} className='lg:w-[66rem]'>
        <motion.div
          className='flex items-center'
          initial={{ x: -300, opacity: 0 }}
          animate={containerInView && { x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: 'anticipate' }}
        >
          <em className='mr-3 text-[5vw] lg:text-[calc(64rem*0.05)]'>I'm a</em>
          <HoverElement className='text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Full-Stack' />
        </motion.div>
        <motion.div
          className='flex items-center justify-end'
          initial={{ x: 300, opacity: 0 }}
          animate={containerInView && { x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: 'anticipate' }}
        >
          <HoverElement className='mr-[2vw] text-[9vw] lg:mr-[calc(64rem*0.02)] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Web' />
          <HoverElement className='text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Developer' />
          <em className='ml-3 text-[5vw] lg:text-[calc(64rem*0.05)]'>& a</em>
        </motion.div>
        <motion.div
          className='ml-5 flex'
          initial={{ x: -300, opacity: 0 }}
          animate={containerInView && { x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: 'anticipate' }}
        >
          <HoverElement className='ml-2 text-[9vw] lg:ml-8 lg:text-[calc(64rem*0.09)]' elementType='h1' text='Software' />
        </motion.div>
        <motion.div
          className='mr-10 flex justify-end'
          initial={{ x: 300, opacity: 0 }}
          animate={containerInView && { x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: 'anticipate' }}
        >
          <HoverElement className='mr-4 text-[9vw] lg:mr-10 lg:text-[calc(64rem*0.09)]' elementType='h1' text='Engineer' />
        </motion.div>
      </div>
    </section>
  );
}