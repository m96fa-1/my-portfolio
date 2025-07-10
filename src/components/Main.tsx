import * as motion from 'motion/react-client';
import HoverElement from "./HoverElement";
import type { Transition } from 'motion';

const transition: Transition = {
  duration: 2,
  ease: 'anticipate'
}

export default function Main() {
  return (
    <main>
      <section id='intro' className='min-h-screen px-4 py-20 flex items-center justify-center'>
        <div className='lg:w-[66rem]'>
          <motion.div
            className='flex items-center'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={transition}
          >
            <em className='mr-3 text-[4vw] lg:text-[calc(64rem*0.04)]'>I'm a</em>
            <HoverElement className='text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Full-Stack' />
          </motion.div>
          <motion.div
            className='flex items-center justify-end'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={transition}
          >
            <HoverElement className='mr-[2vw] text-[9vw] lg:mr-[calc(64rem*0.02)] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Web' />
            <HoverElement className='text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Developer' />
            <em className='ml-3 text-[4vw] lg:text-[calc(64rem*0.04)]'>& a</em>
          </motion.div>
          <motion.div
            className='ml-5 flex'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={transition}
          >
            <HoverElement className='ml-2 text-[9vw] lg:ml-8 lg:text-[calc(64rem*0.09)]' elementType='h1' text='Software' />
          </motion.div>
          <motion.div
            className='mr-10 flex justify-end'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={transition}
          >
            <HoverElement className='mr-4 text-[9vw] lg:mr-10 lg:text-[calc(64rem*0.09)]' elementType='h1' text='Engineer' />
          </motion.div>
        </div>
      </section>
      <section id='about'>
        <div className='flex items-center'>
          <motion.p
            className='w-[calc(100vw/2)] p-4 text-[3.5vw] md:text-[3vw] lg:text-[2.5vw] 2xl:text-[2vw]'
          >
            My name is Mustafa Al-Ali. As a junior full-stack web developer I mainly develop web apps using <b>JavaScript</b> frameworks such as <b>Next.js</b> and <b>React</b>. I also had some experience building desktop apps and games using <b>C++</b> with <b>SFML</b> and <b>OpenGL</b> libraries. I look forward to dive deeply into the world of web development and learn to build something new each day.
          </motion.p>
          <div className='relative w-[calc(100vw/2)] h-[calc(133vw/2)] after:absolute after:inset-0 after:bg-radial after:from-[#0003] after:from-30% after:to-black after:to-75%'>
            <motion.div
              className='w-full h-full bg-[url(./assets/my-photo.jpg)] bg-cover bg-center'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
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