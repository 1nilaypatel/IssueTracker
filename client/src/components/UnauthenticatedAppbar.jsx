import {Link} from 'react-router-dom';

export default function UnauthenticatedAppbar() {
  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
      <Link to='/'>
        <h1 className='flex font-bold text-sm sm:text-xl'>
          <span className='text-slate-100'>Issue</span>
          <span className='text-slate-400'>Tracker</span>
        </h1>
      </Link>
      <ul className='flex gap-4'>
        <Link to='/features'>
          <li className='text-slate-400 hover:underline'>
            Features
          </li>
        </Link>
        <Link to='/sign-in'>
          <li className='text-slate-400 hidden sm:inline hover:underline'>
            Log In
          </li>
        </Link>
        <Link to='/sign-up'>
          <li className='text-slate-400 hover:underline'>
            Sign Up
          </li>
        </Link>
      </ul>
    </div>
  )
}
