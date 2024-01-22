import React from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="text-slate-300 min-h-screen flex flex-col justify-center mt-20">
      <header className="text-left mb-8 min-h-64 md:min-h-80 my-16 md:my-32 mx-14 md:mx-32">
        <h1 className="text-3xl md:text-6xl font-bold mb-4">Ship great software with</h1>
        <h1 className="text-3xl md:text-6xl font-bold mb-8">IssueTracker</h1>
        <p className="text-gray-400 text-sm md:text-base">
          A simple, fast, and scalable bug tracking system that helps
        </p>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
        manage bugs easily and deliver great products on time.
        </p>
        <Link to={'/sign-up'}>
          <span className='bg-indigo-500 text-sm md:text-base text-slate-300 p-3 rounded-md hover:bg-opacity-90 focus:outline-none'>
            Get Started with IssueTracker
          </span>
        </Link>
      </header>

      <section className="bg-gray-950 rounded-lg p-8 shadow-md mb-8 mx-14 md:mx-32">
        <h2 className="text-2xl font-bold mb-4">Create Issue</h2>
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://placekitten.com/600/400" 
            alt="Create Issues Screenshot"
            className="rounded-md shadow-md"
          />
        </div>
        <p className="text-gray-600">
          Issue management: Record bugs easily and track them based on desired criteria. 
          Create custom views for your issue tracking software to focus on bugs that are 
          the most time-sensitive. See how many bugs have been logged, if they've been 
          resolved, and more with reports.
        </p>
      </section>

      <section className="p-8 shadow-md mb-8 mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold mb-7">
          The issue tracker<br/>built to deliver<br/>issue-free software!
        </h2>
        <p className="text-gray-400 text-base md:text-xl mb-4">
          Submit, track and fix your bugs faster in our<br/> free bug tracking tool with the help of<br/> easy creation, assigning and tracking issues.
        </p>
      </section>

      <section className="flex flex-col items-center bg-gray-950 rounded-lg p-8 shadow-md mb-8 mx-14 md:mx-32">
        <h2 className="text-4xl md:text-6xl font-semibold mb-4">
          Issue tracking<br/>you’ll enjoy using
        </h2>
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://placekitten.com/600/400" 
            alt="Create Issues Screenshot"
            className="rounded-md shadow-md"
          />
        </div>
      </section>

      <div className='flex flex-col lg:flex-row gap-3 lg:gap-7 mx-14 md:mx-32'>
        <section className="bg-gray-950 rounded-lg p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Get Notifications
          </h2>
          <p className="text-gray-600">
            Issue management: Record bugs easily and track them based on desired criteria. 
            Create custom views for your issue tracking software to focus on bugs that are 
            the most time-sensitive. See how many bugs have been logged, if they've been 
            resolved, and more with reports.
          </p>
          <div className="flex items-center justify-center mb-6">
            <img
              src="https://placekitten.com/600/400" 
              alt="Create Issues Screenshot"
              className="rounded-md shadow-md"
            />
          </div>
        </section>
        <section className="bg-gray-950 rounded-lg p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Make it yours
          </h2>
          <p className="text-gray-600">
            Issue management: Record bugs easily and track them based on desired criteria. 
            Create custom views for your issue tracking software to focus on bugs that are 
            the most time-sensitive. See how many bugs have been logged, if they've been 
            resolved, and more with reports.
          </p>
          <div className="flex items-center justify-center mb-6">
            <img
              src="https://placekitten.com/600/400" 
              alt="Create Issues Screenshot"
              className="rounded-md shadow-md"
            />
          </div>
        </section>
      </div>

      <section className="flex flex-col lg:flex-row items-center bg-gray-950 rounded-lg p-8 shadow-md mb-8 mx-14 md:mx-32">
        <div>
          <h2 className="text-4xl md:text-6xl font-semibold mb-4">
            Time tracking
          </h2>
          <p className="text-gray-600">
            Issue management: Record bugs easily and track them based on desired criteria. 
            Create custom views for your issue tracking software to focus on bugs that are 
            the most time-sensitive. See how many bugs have been logged, if they've been 
            resolved, and more with reports.
          </p>
        </div>
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://placekitten.com/600/400" 
            alt="Create Issues Screenshot"
            className="rounded-md shadow-md"
          />
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-center rounded-lg p-8 shadow-md mb-8 mx-14 md:mx-32">
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://placekitten.com/600/400" 
            alt="Create Issues Screenshot"
            className="rounded-md shadow-md"
          />
        </div>
        <div>
          <h2 className="text-4xl md:text-6xl font-semibold mb-4">
          Bug tracking,<br/>at your fingertips
          </h2>
          <p className="text-gray-600">
            Issue management: Record bugs easily and track them based on desired criteria. 
            Create custom views for your issue tracking software to focus on bugs that are 
            the most time-sensitive. See how many bugs have been logged, if they've been 
            resolved, and more with reports.
          </p>
        </div>
      </section>

      <section className="bg-slate-600 flex flex-col lg:flex-row items-center p-24 shadow-md mb-8 gap-20">
        <h2 className="text-4xl md:text-6xl font-semibold mb-4 ml-5">
        Swat bugs before<br/>they know what hit them!
        </h2>
        <Link to={'/sign-up'}>
          <span className='bg-indigo-500 text-sm md:text-lg text-slate-300 p-4  ml-5 rounded-md hover:bg-opacity-90 focus:outline-none'>
            Get Started with IssueTracker
          </span>
        </Link>
      </section>

      <p className='text-center'>© 2024, by Nilay Patel, All Rights Reserved</p>

    </div>
  );
};

export default Home;
