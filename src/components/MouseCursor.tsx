import { useState, useEffect, useRef } from 'react';

export default function MouseCursor() {
  const [hoverTarget, setHoverTarget] = useState<Element | null>(null);
  const cursorDotRef = useRef(null);
  const cursorCircleRef = useRef(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const circleX = useRef(0);
  const circleY = useRef(0);
  const circleR = useRef(12);

  // set mouse cursor
  useEffect(() => {
    const updateCursorPos = (ev: MouseEvent) => {
      if (cursorDotRef.current) {
        const cursorDot = cursorDotRef.current as HTMLDivElement;
        mouseX.current = ev.clientX;
        mouseY.current = ev.clientY;
        cursorDot.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px)`;
      }
    };

    const checkHover = (ev: MouseEvent) => {
      const el = ev.target as HTMLElement;
      const closestHoverable = el.closest('.cursor-hover');
      setHoverTarget(closestHoverable);

      if (cursorDotRef.current) {
        const cursorDot = cursorDotRef.current as HTMLDivElement;
        if (el.closest('a') || el.closest('button') || el.classList.contains('cursor-green')) {
          cursorDot.style.backgroundColor = '#00f000';
        }
        else if (closestHoverable) {
          cursorDot.style.backgroundColor = 'hsl(30, 100%, 50%)';
        }
        else {
          cursorDot.style.backgroundColor = 'white';
        }
      }
    };

    window.addEventListener('mousemove', updateCursorPos);
    window.addEventListener('mouseover', checkHover);
    window.addEventListener('mouseout', checkHover);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPos);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mouseout', checkHover);
    }
  }, [hoverTarget]);

  // circle animation
  useEffect(() => {
    let id: number;

    const animateCircle = () => {
      if (cursorCircleRef.current) {
        const cursorCircle = cursorCircleRef.current as HTMLDivElement;
        if (hoverTarget) {
          const rect = hoverTarget.getBoundingClientRect();
          circleX.current += (rect.x - circleX.current) * 0.2;
          circleY.current += (rect.y - circleY.current) * 0.2;

          cursorCircle.style.transform = `translate(${circleX.current}px, ${circleY.current}px)`;
          cursorCircle.style.width = `${rect.width}px`;
          cursorCircle.style.height = `${rect.height}px`;
          cursorCircle.style.borderRadius = '0';
        }
        else {
          circleX.current += (mouseX.current - circleX.current) * 0.075;
          circleY.current += (mouseY.current - circleY.current) * 0.075;

          cursorCircle.style.transform = `translate(${circleX.current - circleR.current}px, ${circleY.current - circleR.current}px)`;
          cursorCircle.style.width = `${circleR.current * 2}px`;
          cursorCircle.style.height = `${circleR.current * 2}px`;
          cursorCircle.style.borderRadius = '50%';
        }

      }

      id = requestAnimationFrame(animateCircle);
    };

    animateCircle();

    return () => {
      cancelAnimationFrame(id);
    };
  }, [hoverTarget]);

  return (
    <>
      <div
        ref={cursorDotRef}
        className='fixed w-[4px] h-[4px] bg-white rounded-full pointer-events-none -translate-1/2 z-1000'
      />
      <div
        ref={cursorCircleRef}
        style={{
          transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out, border-radius 0.2s ease-in-out',
        }}
        className='fixed border rounded-[50%] border-white pointer-events-none z-999'
      />
    </>
  );
}
