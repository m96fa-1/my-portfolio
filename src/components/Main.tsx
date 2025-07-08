import * as motion from 'motion/react-client';
import HoverElement from "./HoverElement";

export default function Main() {
  return (
    <main>
      <section id='intro' className='px-4 py-20'>
        <motion.div
          className='flex items-center'
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween', duration: 1 }}
        >
          <em className='mr-2 text-[4vw]'>I'm a</em>
          <HoverElement className='text-[10vw]' elementType='h1' text='Full-Stack' />
        </motion.div>
        <motion.div
          className='flex items-center justify-end'
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween', duration: 1 }}
        >
          <HoverElement className='mr-[3vw] text-[10vw]' elementType='h1' text='Web' />
          <HoverElement className='text-[10vw]' elementType='h1' text='Developer' />
          <em className='ml-2 text-[4vw]'>& a</em>
        </motion.div>
        <motion.div
          className='flex items-center'
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween', duration: 1 }}
        >
          <HoverElement className='ml-2 text-[10vw]' elementType='h1' text='Software' />
        </motion.div>
        <motion.div
          className='flex items-center justify-end'
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween', duration: 1 }}
        >
          <HoverElement className='mr-2 text-[10vw]' elementType='h1' text='Engineer' />
        </motion.div>
      </section>
      <section id='about' className='flex'>
        <div className='relative w-[calc(100vw/2)] h-[calc(133vw/2)] max-w-[750px] max-h-[1000px] after:absolute after:inset-0 after:bg-radial after:from-[#0003] after:from-30% after:to-black after:to-75%'>
          <motion.div
            className='w-full h-full bg-[url(./assets/my-photo.jpg)] bg-cover bg-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
          />
        </div>
        <p className='px-6 py-8'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta consectetur reprehenderit corrupti possimus assumenda atque illum veniam, consequatur error impedit. Hic iste ducimus nam ipsum quidem sequi repellendus! Ullam, at?</p>
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