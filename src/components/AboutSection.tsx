import { useEffect, useRef } from 'react';
import * as motion from 'motion/react-client';
import { useInView } from 'motion/react';
import { animate } from 'motion';

export default function AboutSection({ screenWidth }: { screenWidth: any }) {
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
        [popup, { x: screenWidth['sm'] ? '25vw' : '40vw' }, { duration: 1, ease: 'anticipate', at: 1.5 }],
        [popup, { scale: 1.1, rotate: 1.5 }, { duration: 0.72, ease: 'easeOut', at: '-0.1s' }],
        [popup, { scale: 1, rotate: 0 }, { duration: 0.5, ease: 'anticipate' }],
        [popup, { x: screenWidth['sm'] ? '-50vw' : '125vw', scale: 1 }, { duration: 0.4, ease: 'easeIn' }],
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
    <section id='about-section' className='min-h-screen my-20 flex items-center max-sm:flex-col'>
      <motion.div
        ref={imageRef}
        className='relative w-[80vw] h-[106.4vw] sm:w-[50vw] sm:h-[calc(133vw/2)] bg-[url(./assets/my-photo.jpg)] bg-cover bg-center after:absolute after:inset-0 after:bg-radial after:from-[#0001] after:from-30% after:to-black after:to-75%'
        initial={{ opacity: 0 }}
      >
        <motion.div
          ref={popupRef}
          className='absolute top-[calc(106.4vw/2)] sm:top-[calc(133vw/4)] w-[50vw] h-[100px] flex items-center justify-center text-[2rem] sm:text-[3rem] select-none font-medium -translate-1/2 z-1'
          initial={{ x: '-50vw' }}
        >Smile! 📸</motion.div>
      </motion.div>
      <motion.p
        ref={paragraphRef}
        className='sm:w-[calc(100vw/2)] px-8 py-2 sm:p-4 text-[4vw] sm:text-[3vw] lg:text-[2.5vw] 2xl:text-[2vw]'
        initial={{ y: 10, opacity: 0 }}
      >
        My name is Mustafa Al-Ali. As a junior full-stack web developer I mainly develop web applications using <b>JavaScript</b> frameworks such as <b>Next.js</b> and <b>React</b>. I also had some experience building desktop applications and games using <b>C++</b> with <b>SFML</b> and <b>OpenGL</b> libraries. I look forward to dive deeply into the world of web development and learn to build something new each day.
      </motion.p>
    </section>
  );
}