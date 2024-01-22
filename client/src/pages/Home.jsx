import { Link } from 'react-router-dom';
import { createIssue, filterByDueDate, filterByPriority, filterByStatus, issuesList, mobileView, notification } from '../assets/images';

const Home = () => {
  return (
    <div className="text-slate-300 min-h-screen flex flex-col justify-center mt-20">
      <header className="text-left mb-8 min-h-64 md:min-h-80 my-16 md:my-32 mx-14 md:mx-32">
        <h1 className="text-3xl md:text-6xl font-bold mb-4">Ship great software with</h1>
        <h1 className="text-3xl md:text-6xl font-bold mb-8">IssueTracker</h1>
        <p className="text-gray-400 text-sm md:text-base mb-8">
          A simple, fast, and scalable bug tracking system that helps<br/>manage bugs easily and deliver great products on time.
        </p>
        <Link to={'/sign-up'}>
          <span className='bg-indigo-500 text-sm md:text-base text-slate-300 p-3 rounded-md hover:bg-opacity-90 focus:outline-none'>
            Get Started Now
          </span>
        </Link>
      </header>

      <section className="bg-gray-700 bg-opacity-30 rounded-lg p-8 shadow-2xl mb-8 mx-auto text-center">
        <img
          src={issuesList}
          alt="Issues List img"
          className="rounded-md shadow-2xl h-auto md:w-10/12 inline-block md:my-7"
        />
      </section>

      <section className="p-8 shadow-2xl mb-8 mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold mb-7">
          The issue tracker<br/>built to deliver<br/>issue-free software!
        </h2>
        <p className="text-gray-400 text-sm md:text-xl mb-4">
          Submit, track and fix your bugs faster in our<br/> free bug tracking tool with the help of<br/> easy creation, assigning and tracking issues.
        </p>
      </section>

      <section className="flex flex-col items-center bg-slate-950 bg-opacity-30 rounded-lg p-8 shadow-2xl mb-8 mx-auto">
        <h2 className="text-4xl md:text-6xl font-semibold mb-6">
          Issue tracking<br/>you’ll enjoy using
        </h2>
        <div className="flex items-center justify-center mb-6">
          <img
            src={createIssue}
            alt="Create Issue img"
            className="rounded-md shadow-2xl h-auto md:w-7/12 md:my-7"
          />
        </div>
      </section>

      <div className='flex flex-col lg:flex-row gap-3 lg:gap-7 mx-14 md:mx-32'>
        <section className="bg-gray-600 bg-opacity-50 rounded-lg p-8 shadow-2xl mb-8 lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay in the loop! 
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-7">
          Receive notifications whenever a new task<br/> is assigned to you, keeping you<br/> informed and on top of your responsibilities.
          </p>
          <div className="flex items-center justify-center mb-6">
            <img
              src={notification}
              alt="Notification img"
              className="rounded-md shadow-2xl md:h-96 lg:h-fit"
            />
          </div>
        </section>
        <section className="bg-gray-600 bg-opacity-30 rounded-lg p-8 shadow-2xl mb-8 lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Make it yours
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-7">
            Quickly apply filters to view<br/> the issues list in your<br/>suitable manner.
          </p>
          <div className="flex flex-col items-center justify-center mb-6 gap-4">
            <img
              src={filterByPriority}
              alt="Filter By Priority img"
              className="rounded-md shadow-2xl md:h-96 lg:h-fit"
            />
            <img
              src={filterByStatus}
              alt="Filter By Status img"
              className="rounded-md shadow-2xl md:h-96 lg:h-fit"
            />
          </div>
        </section>
      </div>

      <section className="flex flex-col lg:flex-row items-center bg-gray-700 rounded-lg p-8 shadow-2xl mb-8 mx-14 md:mx-32">
        <div className='lg:w-2/3 mb-7'>
          <h2 className="text-4xl md:text-6xl font-semibold mb-4">
            Time tracking
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Effortlessly manage your project timelines with our intuitive time tracking feature.<br/> Track the creation and due dates of each issue, and easily filter your tasks<br/> based on due dates to prioritize your work efficiently.
          </p>
        </div>
        <div className="flex items-center justify-center mb-6 lg:w-1/3">
          <img
            src={filterByDueDate}
            alt="Filter By Due Date img"
            className="rounded-md shadow-2xl md:h-96 lg:h-fit lg:mr-12"
          />
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-center rounded-lg p-8 shadow-2xl mb-8 md:mx-32">
        <div className="flex items-center justify-center mb-6 lg:w-2/5 order-2 lg:order-1">
          <img
            src={mobileView}
            alt="Mobile View img"
            className="rounded-md h-96 md:h-96 lg:h-fit"
          />
        </div>
        <div className='lg:w-2/3 p-9 order-1 lg:order-2'>
          <h2 className="text-4xl md:text-6xl font-semibold mb-7">
          Bug tracking,<br/>at your fingertips
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Experience bug tracking seamlessly, whether you're at your desk or on the go. Our responsive design ensures a smooth bug tracking experience on your desktop, tablet, or mobile device. Track and manage issues effortlessly, right at your fingertips.
          </p>
        </div>
      </section>

      <section className="bg-slate-600 flex flex-col lg:flex-row items-center p-24 shadow-2xl mb-8 gap-20">
        <div className="text-center lg:text-left lg:w-2/3">
          <h2 className="text-4xl md:text-6xl font-semibold mb-4">
            Swat bugs before<br />they know what hit them!
          </h2>
        </div>
        <div className="text-center lg:text-left lg:w-1/3">
          <Link to={'/sign-up'}>
            <span className='bg-indigo-500 text-sm md:text-lg text-slate-300 p-4 ml-5 rounded-md hover:bg-opacity-90 focus:outline-none'>
              Get Started Now
            </span>
          </Link>
        </div>
      </section>

      <p className='text-center font-thin mb-6'>© 2024, by Nilay Patel, All Rights Reserved</p>
    </div>
  );
};

export default Home;
