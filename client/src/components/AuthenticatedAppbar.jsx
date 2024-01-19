import { Link } from 'react-router-dom';
import { BsPlus, BsBell, BsFilter } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import { CreateIssue } from '../pages';

export default function AuthenticatedAppbar({ currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filterRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

        <div className='relative' ref={filterRef}>
          <BsFilter className='text-slate-400 mr-1 cursor-pointer' size={22} onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className='absolute bg-gray-900 rounded-md shadow-lg p-4 h-auto w-60 -right-4 text-slate-300'>
              <div className="text-sm font-light mb-2">Group By</div>
              <div className='flex flex-col gap-2 text-lg'>
                <div>Status</div>
                <div>Priority</div>
                <div>Due Date</div>
                <div>Assignee</div>
              </div>
            </div>
          )}
        </div>

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
