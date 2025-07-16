import React, { useEffect, useRef } from 'react';
import HoverElement from './HoverElement';
import * as motion from 'motion/react-client';
import { animate, type TargetAndTransition } from 'motion';
import { useInView } from 'motion/react';
import clsx from 'clsx';

import { languages, frameworks } from '../lib/languages';

export default function LanguagesSection() {
  const langH2ContainerRef = useRef(null);
  const frameH2ContainerRef = useRef(null);
  const langNameRefs = languages.map(() => useRef(null));
  const frameNameRefs = frameworks.map(() => useRef(null));
  const langBarRefs = languages.map(() => useRef(null));
  const frameBarRefs = frameworks.map(() => useRef(null));
  const langPercentRefs = languages.map(() => useRef(null));
  const framePercentRefs = frameworks.map(() => useRef(null));

  const langElements = languages.map((value, index) => (
    <li key={index} className='w-[calc(4vw*7)] flex flex-col text-[4vw] sm:w-[calc(3.5vw*7)] sm:text-[3.5vw] lg:w-[calc(1024px*0.035*7)] lg:text-[calc(1024px*0.035)]'>
      <motion.span
        ref={langNameRefs[index]}
      >{value.name}</motion.span>
      <div className='w-full flex items-center gap-2 text-[3vw] lg:text-[calc(1024px*0.03)]'>
        <Bar
          ref={langBarRefs[index]}
          className='flex-1 h-[1vw] lg:h-[calc(1024px*0.01)] bg-black'
          percentage={value.percentage}
          initial={{ x: -50, opacity: 0 }}
        />
        <motion.span
          ref={langPercentRefs[index]}
          initial={{ y: 5, opacity: 0 }}
        >{value.percentage}%</motion.span>
      </div>
    </li>
  ));

  const frameElements = frameworks.map((value, index) => (
    <li key={index} className='w-[calc(4vw*7)] flex flex-col text-[4vw] sm:w-[calc(3.5vw*7)] sm:text-[3.5vw] lg:w-[calc(1024px*0.035*7)] lg:text-[calc(1024px*0.035)]'>
      <motion.span
        ref={frameNameRefs[index]}
      >{value.name}</motion.span>
      <div className='w-full flex items-center gap-2 text-[3vw] lg:text-[calc(1024px*0.03)]'>
        <Bar
          ref={frameBarRefs[index]}
          className='flex-1 h-[1vw] lg:h-[calc(1024px*0.01)] bg-black'
          percentage={value.percentage}
          initial={{ x: -50, opacity: 0 }}
        />
        <motion.span
          ref={framePercentRefs[index]}
          initial={{ y: 5, opacity: 0 }}
        >{value.percentage}%</motion.span>
      </div>
    </li>
  ));

  const langH2ContainerInView = useInView(langH2ContainerRef, { once: true });
  const frameH2ContainerInView = useInView(frameH2ContainerRef, { once: true });
  const langBarsInView = langBarRefs.map(ref => useInView(ref, { once: true }));
  const frameBarsInView = frameBarRefs.map(ref => useInView(ref, { once: true }));
  const langPercentsInView = langPercentRefs.map(ref => useInView(ref, { once: true }));
  const framePercentsInView = framePercentRefs.map(ref => useInView(ref, { once: true }));

  // Animations

  // language heading
  useEffect(() => {
    if (langH2ContainerInView) {
      animate(langH2ContainerRef.current!, { y: 0, opacity: 1 }, { duration: 1 });
    }
  }, [langH2ContainerInView]);

  // framework heading
  useEffect(() => {
    if (frameH2ContainerInView) {
      animate(frameH2ContainerRef.current!, { y: 0, opacity: 1 }, { duration: 1 });
    }
  }, [frameH2ContainerInView]);

  // language bars
  useEffect(() => {
    langBarsInView.forEach((barInView, index) => {
      if (barInView) {
        animate(langBarRefs[index].current!, { x: 0, opacity: 1 }, { duration: 1 });
      }
    });
  }, [langBarsInView]);

  // framework bars
  useEffect(() => {
    frameBarsInView.forEach((barInView, index) => {
      if (barInView) {
        animate(frameBarRefs[index].current!, { x: 0, opacity: 1 }, { duration: 1 });
      }
    });
  }, [frameBarsInView]);

  // language percentage
  useEffect(() => {
    langPercentsInView.forEach((percentInView, index) => {
      if (percentInView) {
        animate(langPercentRefs[index].current!, { y: 0, opacity: 1 }, { duration: 1 });
      }
    });
  }, [langPercentsInView]);

  // framework percentage
  useEffect(() => {
    framePercentsInView.forEach((percentInView, index) => {
      if (percentInView) {
        animate(framePercentRefs[index].current!, { y: 0, opacity: 1 }, { duration: 1 });
      }
    });
  }, [framePercentsInView]);

  return (
    <section id='languages' className='min-h-screen my-20 flex flex-col items-center justify-center'>
      <motion.div
        ref={langH2ContainerRef}
        initial={{ y: 10, opacity: 0 }}
      >
        <HoverElement
          className='mb-[2vw] text-[5.5vw] lg:text-[calc(1024px*0.055)] font-bold'
          elementType='h2'
          text='Programming Languages I Know'
          uppercase={false}
        />
      </motion.div>
      <ul className='grid grid-cols-2 gap-x-[20vw] lg:gap-x-[calc(1024px*0.20)]'>
        {langElements}
      </ul>
      <motion.div
        ref={frameH2ContainerRef}
        initial={{ y: 10, opacity: 0 }}
      >
        <HoverElement
          className='mb-[2vw] mt-20 text-[5.5vw] lg:text-[calc(1024px*0.055)] font-bold'
          elementType='h2'
          text='JS Frameworks & Libraries I Know'
          uppercase={false}
        />
      </motion.div>
      <ul className='grid grid-cols-2 gap-x-[20vw] lg:gap-x-[calc(1024px*0.20)]'>
        {frameElements}
      </ul>
    </section>
  );
}

function Bar({
  ref,
  className,
  percentage,
  initial,
}: {
  ref?: React.Ref<HTMLDivElement> | undefined,
  className?: string | undefined,
  percentage: number,
  initial?: TargetAndTransition | undefined,
}) {
  return (
    <motion.div
      ref={ref}
      className={clsx(className, 'rounded-full')}
      initial={initial}
    >
      <div
        style={{
          width: `${percentage}%`
        }}
        className='h-full bg-white rounded-full'
      />
    </motion.div>
  );
}