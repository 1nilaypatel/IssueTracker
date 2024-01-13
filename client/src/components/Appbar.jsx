import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Appbar() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <header className='bg-black shadow-md'>
      <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
        <Link to='/'>
          <h1 className='flex font-bold text-sm sm:text-xl'>
            <span className='text-slate-100'>Issue</span>
            <span className='text-slate-400'>Tracker</span>
          </h1>
        </Link>
        <div className='flex gap-4'>
          <Link to='/features'>
            <span className='text-slate-400 hover:underline'>
              Features
            </span>
          </Link>
          <Link to='/profile'>
            {currentUser ?(
              <img className='rounded-full h-8 w-8 object-cover' src={currentUser.profilephoto} alt='profile' />
            ): (
              <ul className='flex sm:gap-4'>
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
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}