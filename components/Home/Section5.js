import { useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

export default function Section5() {
  const list = [
    {
      id: 0,
      title: 'What is Aimme?',
      content: (
        <>
          Aimme is an AI system which is named with the combination of the word
          “aim” and “me”. Aimme is an AI art market analytic program which is
          designed to provide market analysis and daily update the data of
          artists and their works. For now, we are building data from the
          Secondary market and planning on expanding our database to galleries
          and contemporary artists in the Primary Market. We are here to present
          new perspective, new prospect and diverse inspirations beyond simply
          conveying the facts.
        </>
      ),
    },
    {
      id: 1,
      title: 'How does you analyze the work?',
      content: (
        <>
          Aimme daily collects data to create art market statistics. We provide
          transaction records and information of the similar artwork related to
          that of yours. We also provide market price and status of the
          corresponding category to market price of the artists. Market Report
          on the artwork will be updated on a daily basis for you to understand
          the value change from the past to the present.\n\nAimme’s database is
          based on the artwork auction results. We gather detailed information
          on the artwork, auctioneer results as well as the information on the
          news, exhibitions etc. The database is first labeled and cleansed
          through the AI system. Then analyzed with the sorted-out date of
          similar artworks related to those you registered. The next step for
          Aimme, will be to provide price estimation service as well.
        </>
      ),
    },
    {
      id: 2,
      title: 'Who can use Aimme?',
      content: (
        <>
          Experts who views the art market continuously rather than just the
          results and would like to follow the change flow. Auction Houses or
          Galleries who would want to do business logically with the right
          statistics. Collectors who would like to know the market value with
          the real-time auction results.
        </>
      ),
    },
    {
      id: 3,
      title: 'What do you offer in Aimme membership?',
      content: (
        <>
          Aimme offer your own workspace to allow your artwork to be analyzed
          and reported when registered. The report can be shared and forwarded
          to your clients allowing them to follow the market price and flow,
          thus useful for client management. With Aimme, you can also check what
          the users search in artists and their works as to the market trend and
          insights.
        </>
      ),
    },
    {
      id: 4,
      title: 'How do I become a member?',
      content: (
        <>
          You can sign up when it is officially released, and the beta version
          is currently open to the public for free. If you sign up for the
          waiting list now, we have a promotion that saves you up to 50% of your
          first-year’s subscription fee. You can sign up for the waiting list{' '}
          <span
            className='text-pink underline cursor-pointer'
            onClick={() =>
              window.open('https://kvn062bilo5.typeform.com/to/L1Ij7dSu')
            }
          >
            here
          </span>
          .
        </>
      ),
    },
    {
      id: 5,
      title: 'Could we sell or purchase the artwork?',
      content: (
        <>
          We are sorry but that is impossible. We are here to help you in making
          decisions when selling or purchasing by collecting and providing the
          right information. Therefore, we do not directly trade in order to
          maintain fairness of the gathered information. However, we do consider
          all options when there are customer needs. So, let us know! We value
          all feedbacks.
        </>
      ),
    },
  ];

  const [open, setOpen] = useState([false, false, false, false, false, false]);

  const toggleOpen = (id) => {
    setOpen((prev) => prev.map((p, i) => (i === id ? !p : p)));
  };

  const qnaVar = {
    invisible: {
      opacity: 0,
      height: 0,
      y: 0,
    },
    visible: {
      opacity: 1,
      height: 'auto',
      y: '1.75rem',
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className='w-screen bg-beige-200 px-56 py-40 lg:px-10 lg:py-[5.75rem] md:px-4'>
      <div>
        <h1 className='text-5xl font-bold lg:text-[2.5rem] md:text-[1.688rem]'>
          Frequently Asked Questions
        </h1>
        <div className='mt-16'>
          {list.map((l) => (
            <div key={l.id} className='mb-14'>
              <div className='flex justify-between items-center border-b border-black-400 pb-2'>
                <h2 className='text-2xl font-medium md:w-72'>{l.title}</h2>
                {open[l.id] ? (
                  <AiFillMinusCircle
                    className='flex justify-center items-center rounded-full w-6 h-6 text-black-400 text-2xl cursor-pointer'
                    onClick={() => toggleOpen(l.id)}
                  />
                ) : (
                  <AiFillPlusCircle
                    className='flex justify-center items-center rounded-full w-6 h-6 text-black-400 text-2xl cursor-pointer'
                    onClick={() => toggleOpen(l.id)}
                  />
                )}
              </div>
              <AnimatePresence>
                {open[l.id] && (
                  <motion.div
                    className='text-base font-[Helvetica] whitespace-pre-line'
                    variants={qnaVar}
                    initial='invisible'
                    animate='visible'
                    exit='exit'
                  >
                    {l.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
