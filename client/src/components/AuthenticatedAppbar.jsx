import {Link} from 'react-router-dom';
import { BsPlus, BsSearch, BsBell } from 'react-icons/bs';

export default function AuthenticatedAppbar({currentUser}) {
  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
      <ul className='flex gap-4'>
        <Link to='/dashboard'>
          <li className='text-slate-300 flex text-sm sm:text-base'>
            Dashboard
          </li>
        </Link>
        <Link to='/bugs'>
          <li className='text-slate-300 flex text-sm sm:text-base'>
            Bugs
          </li>
        </Link>
      </ul>
      <ul className='flex items-center gap-4'>
        <Link to='/create-bug'>
          <li className='text-slate-400 hover:underline'>
            <BsPlus className='mr-1' />
          </li>
        </Link>
        <Link to='/dashboard'>
          <li className='text-slate-400 hover:underline'>
            <BsSearch className='mr-1' />
          </li>
        </Link>
        <Link to='/dashboard'>
          <li className='text-slate-400 hover:underline'>
            <BsBell className='mr-1' />
          </li>
        </Link>
        <Link to='/profile'>
          <img 
            className='rounded-full h-8 w-8 object-contain' 
            src={currentUser.profilephoto} 
            alt='profile' 
          />
        </Link>
      </ul>
    </div>
  )
}
