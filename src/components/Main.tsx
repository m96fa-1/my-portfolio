import * as motion from 'motion/react-client';
import HoverElement from "./HoverElement";

export default function Main() {
  return (
    <main>
      <section id='intro' className='min-h-screen px-4 py-20 flex items-center justify-center'>
        <div className='lg:w-[66rem]'>
          <motion.div
            className='flex items-center'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
          >
            <em className='mr-3 text-[4vw] lg:text-[calc(64rem*0.04)]'>I'm a</em>
            <HoverElement className='text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Full-Stack' />
          </motion.div>
          <motion.div
            className='flex items-center justify-end'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
          >
            <HoverElement className='mr-[2vw] text-[9vw] lg:mr-[calc(64rem*0.02)] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Web' />
            <HoverElement className='text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Developer' />
            <em className='ml-3 text-[4vw] lg:text-[calc(64rem*0.04)]'>& a</em>
          </motion.div>
          <motion.div
            className='ml-5 flex'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
          >
            <HoverElement className='ml-2 text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Software' />
          </motion.div>
          <motion.div
            className='mr-10 flex justify-end'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
          >
            <HoverElement className='mr-2 text-[9vw] lg:text-[calc(64rem*0.09)]' elementType='h1' text='Engineer' />
          </motion.div>
        </div>
      </section>
      <section id='about' className='flex'>
        <p className='w-[calc(100vw/2)] px-4 py-8 text-md'>My name is Mustafa Al-Ali. I was born in 2004. I lived in Syria and went to live in Turkey when the war began.</p>
        <div className='relative w-[calc(100vw/2)] h-[calc(133vw/2)] after:absolute after:inset-0 after:bg-radial after:from-[#0003] after:from-30% after:to-black after:to-75%'>
          <motion.div
            className='w-full h-full bg-[url(./assets/my-photo.jpg)] bg-cover bg-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
          />
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