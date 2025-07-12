import { useEffect, useRef } from 'react';
import HoverElement from "./HoverElement";
import * as motion from 'motion/react-client';
import { animate } from 'motion';
import { useInView } from 'motion/react';

export default function Main({ screenWidth }: { screenWidth: any }) {
  const imageRef = useRef(null);
  const paragraphRef = useRef(null);
  const popupRef = useRef(null);

  const imageInView = useInView(imageRef, { once: true });
  const paragraphInView = useInView(paragraphRef, { once: true });

  useEffect(() => {
    if (imageInView) {
      const image = imageRef.current!;
      const popup = popupRef.current!;

      animate(image, { opacity: 1 }, { duration: 2, ease: 'easeIn' });
      animate([
        [popup, { x: '25vw' }, { duration: 0.3, ease: 'easeOut', at: 2 }],
        [popup, { scale: 1.1, rotate: 1.5 }, { duration: 0.5, ease: 'easeOut', at: '-0.1s' }],
        [popup, { scale: 1, rotate: 0 }, { duration: 0.5, ease: 'anticipate' }],
        [popup, { x: screenWidth['sm'] ? '-50vw' : '125vw', scale: 1 }, { duration: 0.3, ease: 'easeIn' }],
      ]);
    }
  }, [imageInView]);

  useEffect(() => {
    if (paragraphRef.current) {
      if (paragraphInView) {
        animate(paragraphRef.current, { y: 0, opacity: 1 }, { duration: 2, ease: 'anticipate' });
      }
    }
  }, [paragraphInView]);
  
  return (
    <main>
      <section id='intro' className='min-h-screen px-4 py-20 flex items-center justify-center'>
        <div className='lg:w-[66rem]'>
          <motion.div
            className='flex items-center'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: 'anticipate' }}
          >
            <em className='mr-3 text-[5vw] lg:text-[calc(64rem*0.05)]'>I'm a</em>
            <HoverElement className='text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Full-Stack' />
          </motion.div>
          <motion.div
            className='flex items-center justify-end'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: 'anticipate' }}
          >
            <HoverElement className='mr-[2vw] text-[9vw] lg:mr-[calc(64rem*0.02)] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Web' />
            <HoverElement className='text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Developer' />
            <em className='ml-3 text-[5vw] lg:text-[calc(64rem*0.05)]'>& a</em>
          </motion.div>
          <motion.div
            className='ml-5 flex'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: 'anticipate' }}
          >
            <HoverElement className='ml-2 text-[9vw] lg:ml-8 lg:text-[calc(64rem*0.09)]' elementType='h1' text='Software' />
          </motion.div>
          <motion.div
            className='mr-10 flex justify-end'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: 'anticipate' }}
          >
            <HoverElement className='mr-4 text-[9vw] lg:mr-10 lg:text-[calc(64rem*0.09)]' elementType='h1' text='Engineer' />
          </motion.div>
        </div>
      </section>
      <section id='about' className='relative flex max-sm:flex-col items-center'>
        <motion.div
          ref={imageRef}
          className='relative w-[80vw] h-[106.4vw] sm:w-[50vw] sm:h-[calc(133vw/2)] bg-[url(./assets/my-photo.jpg)] bg-cover bg-center after:absolute after:inset-0 after:bg-radial after:from-[#0001] after:from-30% after:to-black after:to-75%'
          initial={{ opacity: 0 }}
        />
        <motion.p
          ref={paragraphRef}
          className='sm:w-[calc(100vw/2)] px-8 py-2 sm:p-4 text-[4vw] sm:text-[3vw] lg:text-[2.5vw] 2xl:text-[2vw]'
          initial={{ y: 10, opacity: 0 }}
        >
          My name is Mustafa Al-Ali. As a junior full-stack web developer I mainly develop web apps using <b>JavaScript</b> frameworks such as <b>Next.js</b> and <b>React</b>. I also had some experience building desktop apps and games using <b>C++</b> with <b>SFML</b> and <b>OpenGL</b> libraries. I look forward to dive deeply into the world of web development and learn to build something new each day.
        </motion.p>
        <motion.div
          ref={popupRef}
          className='absolute top-[calc(40vw+50px)] sm:top-[calc(25vw+50px)] w-[50vw] h-[100px] flex items-center justify-center text-[2rem] sm:text-[3rem] font-medium -translate-1/2'
          initial={{ x: screenWidth['sm'] ? '-25vw' : '-50vw' }}
        >
          Smile! 📸
        </motion.div>
      </section>
      <section id='languages' className=''>
        <h2>Languages I Know</h2>
      </section>
      <section id='projects' className='min-h-[50vh]'>
        Projects
      </section>
      <section id='contact' className='min-h-[50vh]'>
        Contact
      </section>
    </main>
  );
}