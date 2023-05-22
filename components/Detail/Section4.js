import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';

export default function Section4({ exhibited, literature, essay }) {
  const list = [
    {
      id: 0,
      title: 'Exhibited',
      content: exhibited,
    },
    {
      id: 1,
      title: 'Literature',
      content: literature,
    },
    {
      id: 2,
      title: 'Essay',
      content: essay,
    },
  ];

  const [openTabs, setOpenTabs] = useState([false, false, false]);

  const toggleOpen = (action, id) => {
    if (action === 'open') {
      setOpenTabs((openTabs) =>
        openTabs.map((openTab, index) => (id === index ? true : openTab))
      );
    } else {
      setOpenTabs((openTabs) =>
        openTabs.map((openTab, index) => (id === index ? false : openTab))
      );
    }
  };

  const popupVar = {
    invisible: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className='w-screen px-[14.75rem] py-24 bg-[#FDFCF8] lg:px-10 md:px-4'>
      <div className='flex justify-between lg:col-start-center'>
        {list.map((l) => (
          <div
            key={l.id}
            className={
              l.id !== 2
                ? 'w-1/3 mr-9 lg:w-full lg:mr-0 lg:mb-20'
                : 'w-1/3 lg:w-full'
            }
          >
            <h1 className='text-black-900 text-[2rem] font-semibold border-b border-black-400 pb-2 lg:text-p-[2.875rem] md:text-2xl'>
              {l.title}
            </h1>
            {l.content.length > 0 && (
              <>
                <div className='relative pt-7 font-[Helvetica] whitespace-pre-line text-[#5b5b5b] lg:text-[1.375rem] md:text-base'>
                  {l.content.length <= 500
                    ? l.content
                    : `${l.content.substring(0, 500)}...`}

                  {l.content.length > 500 && (
                    <div
                      className='absolute top-0 left-0 w-full h-full'
                      style={{
                        background:
                          'linear-gradient(rgba(255, 255, 255, 0) 0px, #FDFCF8 100%)',
                      }}
                    />
                  )}

                  <AnimatePresence>
                    {openTabs[l.id] && (
                      <div className='fixed top-0 left-0 w-screen h-screen bg-[#00000040] z-[9999]'>
                        <motion.div
                          className='w-full h-full bg-transparent'
                          variants={popupVar}
                          initial='invisible'
                          animate='visible'
                          exit='exit'
                        >
                          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[45rem] aspect-square px-10 pt-16 pb-32 overflow-y-scroll md:w-[18.875rem] md:h-[31.688rem] md:px-5 md:pt-9 md:pb-12'>
                            <div
                              className='text-[2rem] font-semibold text-black-900 border-b border-black-900 mb-7 pb-2 md:pb-4 md:mb-4'
                              style={{
                                fontFamily: "'EB Garamond', serif",
                              }}
                            >
                              {l.title}
                            </div>
                            <div>{l.content}</div>

                            <div
                              onClick={() =>
                                setOpenTabs(
                                  openTabs.map((openTab, index) =>
                                    l.id === index ? false : openTab
                                  )
                                )
                              }
                              className='absolute top-10 right-10 text-5xl text-black-900 cursor-pointer md:top-5 md:right-5 md:text-3xl'
                            >
                              <IoCloseOutline />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div className='flex-center-center pt-6'>
                  {l.content.length > 500 && (
                    <AiFillPlusCircle
                      className='flex justify-center items-center rounded-full w-6 h-6 text-black-400 text-2xl cursor-pointer lg:w-11 lg:h-11 md:w-6 md:h-6'
                      onClick={() => toggleOpen('open', l.id)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
