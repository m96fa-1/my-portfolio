import { useState, useEffect, useRef } from 'react';
import * as motion from 'motion/react-client';
import clsx from 'clsx';
import emailjs from '@emailjs/browser';

import HoverElement from './HoverElement';

import contacts from '../lib/contacts';

const styles = {
  input: 'w-full px-2 py-1 border border-[#a0a0a0] rounded-md placeholder:select-none placeholder:drag-none outline-0 peer',
  label: 'absolute left-2 top-[5px] text-[#a0a0a0] transition-all duration-300 -z-1 peer-focus:-top-[30px] sm:peer-focus:-top-[38px] peer-focus:-left-0.5 not-peer-placeholder-shown:-top-[30px] sm:not-peer-placeholder-shown:-top-[38px] not-peer-placeholder-shown:-left-0.5',
  hoverElement: 'w-fit text-[7vw] lg:text-[4.9vw] 2xl:text-[calc(1024px*0.07)]',
  errorMessage: 'text-[hsl(30,100%,50%)] text-[1rem] sm:text-[1.25rem]',
};

const regex = {
  name: /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const maxMessageLength = 500; // 500 characters
const minInterval = 60000; // 1 minute

export default function ContactSection() {
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(maxMessageLength);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [lastSent, setLastSent] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // initialize emailjs
  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      limitRate: { throttle: 60000 } // 1m
    });
  }, []);

  // contact elements
  const contactElements = contacts.map((contact, index) => (
    <li key={index}>
      <a className='flex flex-col items-center' href={contact.url}>
        <img className='h-[6vw] lg:h-[4vw] 2xl:h-[calc(1024px*0.06)] select-none drag-none' src={contact.svg} alt={`${contact.name} Logo`} />
        <div className='text-[calc(6vw/3)] lg:text-[calc(4vw/3)] 2xl:text-[calc(1024px*0.06/3)]'>{contact.username}</div>
      </a>
    </li>
  ));

  // handle email and password input events
  useEffect(() => {
    if (!nameInputRef.current || !emailInputRef.current || !titleInputRef.current || !messageInputRef.current) return;

    const nameInput = nameInputRef.current;
    const nameLabel = document.getElementById('name-label')!;
    const emailInput = emailInputRef.current;
    const emailLabel = document.getElementById('email-label')!;
    const titleInput = titleInputRef.current;
    const titleLabel = document.getElementById('title-label')!;
    const messageInput = messageInputRef.current;
    const messageLabel = document.getElementById('message-label')!;
    
    const handleNameInput = () => {
      if (!nameInput.value.match(regex.name)) {
        setInvalidName(true);
        nameInput.style.border = '1px solid hsl(30, 100%, 50%)';
        nameLabel.style.color = 'hsl(30, 100%, 50%)';
      }
      else {
        setInvalidName(false);
        nameInput.style.border = '1px solid #a0a0a0';
        nameLabel.style.color = '#a0a0a0';
      }
    };
    
    const handleEmailInput = () => {
      if (!emailInput.value.toLowerCase().match(regex.email)) {
        setInvalidEmail(true);
        emailInput.style.border = '1px solid hsl(30, 100%, 50%)';
        emailLabel.style.color = 'hsl(30, 100%, 50%)';
      }
      else {
        setInvalidEmail(false);
        emailInput.style.border = '1px solid #a0a0a0';
        emailLabel.style.color = '#a0a0a0';
      }
    };
    
    const handleTitleInput = () => {
      if (!titleInput.value) {
        setInvalidTitle(true);
        titleInput.style.border = '1px solid hsl(30, 100%, 50%)';
        titleLabel.style.color = 'hsl(30, 100%, 50%)';
      }
      else {
        setInvalidTitle(false);
        titleInput.style.border = '1px solid #a0a0a0';
        titleLabel.style.color = '#a0a0a0';
      }
    };
    
    const handleMessageInput = () => {
      setCharactersLeft(maxMessageLength - messageInput.value.length);
      if (!messageInput.value) {
        setInvalidMessage(true);
        messageInput.style.border = '1px solid hsl(30, 100%, 50%)';
        messageLabel.style.color = 'hsl(30, 100%, 50%)';
      }
      else {
        setInvalidMessage(false);
        messageInput.style.border = '1px solid #a0a0a0';
        messageLabel.style.color = '#a0a0a0';
      }
    };

    nameInput.addEventListener('input', handleNameInput);
    emailInput.addEventListener('input', handleEmailInput);
    titleInput.addEventListener('input', handleTitleInput);
    messageInput.addEventListener('input', handleMessageInput);
    
    return () => {
      emailInput.removeEventListener('input', handleEmailInput);
      nameInput.removeEventListener('input', handleNameInput);
      titleInput.removeEventListener('input', handleTitleInput);
      messageInput.removeEventListener('input', handleMessageInput);
    };
  }, [nameInputRef, emailInputRef, titleInputRef, messageInputRef]);

  // submit form
  const send = (data: FormData) => {
    const now = Date.now(); // 1 * 1000 * 60 * 60 * 24 * 365.2524 * 50 = 1,577,890,368,000 = (1970 -> 2020), that's a lot of milliseconds
    if (now - lastSent < minInterval) {
      setStatus('error');
      setError('Too many requests, wait a minute and try again.');
      return;
    }
    setLastSent(now);

    const [ name, email, title, message ] = Array.from(data.values());

    emailjs.send('service_rhwh8go', 'template_tpt8g8o', {
      first_name: name.slice(0, name.toString().indexOf(' ')),
      name,
      email: email.toString().toLowerCase().replace(/\s+/g, ''),
      title,
      message
    }).then(res => {
      if (res.status === 200) {
        setStatus('success');
      }
      else {
        setStatus('error');
        setError('Unknown error occured, please try again later.');
      }
    }).catch(err => {
      setStatus('error');
      setError(err);
    });
    
    setCharactersLeft(maxMessageLength);
  };

  return (
    <section id='contact-section' className='min-h-screen px-10 lg:px-6 lg:mt-40 flex max-lg:flex-col lg:items-center gap-[50px] lg:gap-6'>
      <div className='lg:w-3/5 flex flex-col items-center'>
        <HoverElement className={styles.hoverElement} elementType='h2' text='Contact Me' />
        <HoverElement className={styles.hoverElement} elementType='h2' text='Create Your Website' />
        <HoverElement className={styles.hoverElement} elementType='h2' text='Send Me An Offer' />
        <HoverElement className={styles.hoverElement} elementType='h2' text='Follow Me On' />
        <ul className='mt-2 flex items-center gap-[calc(6vw/3)] lg:gap-[calc(4vw/3)] 2xl:gap-[calc(1024px*0.06/3)]'>{contactElements}</ul>
      </div>
      <form ref={formRef} action={send} className='lg:flex-1 flex flex-col gap-10 text-[1.25rem] sm:text-[1.75rem]'>
        <div className='relative'>
          <input ref={nameInputRef} id='name-input' type='text' name='name' autoComplete='name' maxLength={100} className={styles.input} placeholder=' ' />
          <label id='name-label' htmlFor='name-input' className={styles.label}>Full Name</label>
          {invalidName && <motion.div initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }} className={styles.errorMessage}>Please enter your real name</motion.div>}
        </div>
        <div className='relative'>
          <input ref={emailInputRef} id='email-input' type='email' name='email' autoComplete='email' maxLength={100} className={styles.input} placeholder=' ' />
          <label id='email-label' htmlFor='email-input' className={styles.label}>Email</label>
          {invalidEmail && <motion.div initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }} className={styles.errorMessage}>Invalid email address</motion.div>}
        </div>
        <div className='relative'>
          <input ref={titleInputRef} id='title-input' type='text' name='title' autoComplete='off' maxLength={100} className={styles.input} placeholder=' ' />
          <label id='title-label' htmlFor='title-input' className={styles.label}>Title</label>
          {invalidTitle && <motion.div initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }} className={styles.errorMessage}>Title should not be empty</motion.div>}
        </div>
        <div>
          <div className='relative flex'>
            <textarea ref={messageInputRef} id='message-input' name='message' autoComplete='off' maxLength={maxMessageLength} className={clsx(styles.input, 'max-h-100')} placeholder=' ' rows={4} />
            <div className='absolute -bottom-[18px] right-0 text-[#a0a0a0] text-md'>{charactersLeft}</div>
            <label id='message-label' htmlFor='message-input' className={styles.label}>Write me something...</label>
          </div>
          {invalidMessage && <motion.div initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }} className={styles.errorMessage}>Your message should not be empty</motion.div>}
        </div>
        <button type='submit' disabled={invalidName || invalidEmail || invalidTitle || invalidMessage || !nameInputRef.current?.value || !emailInputRef.current?.value || !titleInputRef.current?.value || !messageInputRef.current?.value} className='px-10 py-1 bg-white text-black rounded-sm disabled:opacity-25'>
          Send
        </button>
      </form>
      {(status === 'success' || status === 'error') && (
        <motion.div
          onClick={(ev) => {
            const el = ev.target as HTMLElement;
            !el.closest('#form-popup') && setStatus('idle');
          }}
          className='fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center'
          initial={{ backdropFilter: 'blur(2px)' }}
          animate={{ backdropFilter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            id='form-popup'
            className='w-100 p-[20px] flex flex-col bg-black border border-[#303030] rounded-md font-medium'
            initial={{ x: -10, skewX: 3, skewY: 1 }}
            animate={{ x: 0, skewX: 0, skewY: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h2 className='relative text-2xl/tight'>
              {status.slice(0, 1).toUpperCase() + status.slice(1)}
              <button onClick={() => setStatus('idle')} className='absolute right-0'>
                <svg xmlns='http://www.w3.org/2000/svg' width={18} height={18} fill='none'>
                  <path d='M 14 4 L 4 14 M 14 14 L 4 4' fill='#000' stroke-width='1.3' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </button>
            </h2>
            <p className='my-5'>{status === 'success' ? 'The message has been sent successfully.' : error + '.'}</p>
            <button onClick={() => setStatus('idle')} className='self-end w-fit px-8 py-1 bg-[hsl(30,100%,35%)] rounded-sm font-normal'>Okay</button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}