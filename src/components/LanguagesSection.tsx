import * as motion from 'motion/react-client'
import clsx from 'clsx';

/**
 * TODO - Think about what structure will you be implementing to this section:
 * 1- Making every language a hoverable element.
 * 2- Making left to right and right to left animations for languages,
 *    delayed animations for the percentage bars and bottom-up animation
 *    for headings.
 * 3- Colors?
 */

export default function LanguagesSection() {
  const languageElements = languagesList.map((value, index) => (
    <li key={index} className='w-[calc(4vw*7)] flex flex-col text-[4vw] sm:w-[calc(3.5vw*7)] sm:text-[3.5vw] lg:w-[calc(1024px*0.035*7)] lg:text-[calc(1024px*0.035)]'>
      {value.name}
      <div className='w-full flex items-center gap-2 text-[3vw] lg:text-[calc(1024px*0.03)]'>
        <Bar className='flex-1 h-[1vw] lg:h-[calc(1024px*0.01)] bg-black' percentage={value.percentage} />
        {value.percentage}%
      </div>
    </li>
  ));

  const frameworkElements = frameworksList.map((value, index) => (
    <li key={index} className='w-[calc(4vw*7)] flex flex-col text-[4vw] sm:w-[calc(3.5vw*7)] sm:text-[3.5vw] lg:w-[calc(1024px*0.035*7)] lg:text-[calc(1024px*0.035)]'>
      {value.name}
      <div className='w-full flex items-center gap-2 text-[3vw] lg:text-[calc(1024px*0.03)]'>
        <Bar className='flex-1 h-[1vw] lg:h-[calc(1024px*0.01)] bg-black' percentage={value.percentage} />
        {value.percentage}%
      </div>
    </li>
  ));

  return (
    <section id='languages' className='my-20 flex flex-col items-center'>
      <h2 className='text-[5.5vw] lg:text-[calc(1024px*0.055)] font-bold'>Programming Languages I Know</h2>
      <ul className='grid grid-cols-2 gap-x-[20vw] lg:gap-x-[calc(1024px*0.20)]'>
        {languageElements}
      </ul>
      <h2 className='mt-20 text-[5.5vw] lg:text-[calc(1024px*0.055)] font-bold'>JS Frameworks & Libraries I Know</h2>
      <ul className='grid grid-cols-2 gap-x-[20vw] lg:gap-x-[calc(1024px*0.20)]'>
        {frameworkElements}
      </ul>
    </section>
  );
}

function Bar({ className, percentage }: { className?: string, percentage: number }) {
  return (
    <div className={clsx(className, 'rounded-full')}>
      <div
        style={{
          width: `${percentage}%`
        }}
        className='h-full bg-white rounded-full'
      />
    </div>
  );
}

const languagesList = [
  { name: 'HTML5 & CSS3', percentage: 90 },
  { name: 'JavaScript', percentage: 80 },
  { name: 'TypeScript', percentage: 70 },
  { name: 'C/C++', percentage: 80 },
  { name: 'PHP', percentage: 30 },
  { name: 'Python', percentage: 40 },
];

const frameworksList = [
  { name: 'Next.js', percentage: 70 },
  { name: 'React', percentage: 90 },
  { name: 'Tailwind CSS', percentage: 80 },
  { name: 'Motion', percentage: 50 },
  { name: 'MongoDB', percentage: 50 },
  { name: 'MySQL', percentage: 20 },
];