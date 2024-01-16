import { Link } from 'react-router-dom';
import { BsPlus, BsBell, BsFilter } from 'react-icons/bs';
import { useState } from 'react';
import { CreateIssue } from '../pages';

export default function AuthenticatedAppbar({ currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
      <ul className='flex gap-4'>
        <Link to='/dashboard'>
          <li className='text-slate-300 flex text-sm sm:text-base'>
            Dashboard
          </li>
        </Link>
        <Link to='/issues'>
          <li className='text-slate-300 flex text-sm sm:text-base'>
            Issues
          </li>
        </Link>
      </ul>
      <ul className='flex items-center gap-4'>
        <BsPlus className='text-slate-400 mr-1 cursor-pointer' size={28} onClick={openModal} />
        <BsFilter className='text-slate-400 mr-1' size={22} />
        <Link to='/dashboard'>
          <BsBell className='text-slate-400 mr-1' />
        </Link>
        <Link to='/profile'>
          <img 
            className='rounded-full h-8 w-8 object-contain' 
            src={currentUser.profilephoto} 
            alt='profile' 
          />
        </Link>
      </ul>
      <CreateIssue isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
