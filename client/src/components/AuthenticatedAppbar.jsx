import { Link } from 'react-router-dom';
import { BsPlus, BsBell, BsFilter } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import { CreateIssue } from '../pages';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, updateFilteredIssues } from '../redux/user/userSlice.js';
import axios from 'axios';

export default function AuthenticatedAppbar() {
  const dispatch = useDispatch();
  const { issues, currentUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const filterRef = useRef(null);
  const notifiactionsRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
  };

  const filterIssues = (filter) => {
    let filtered = [...issues];
    if (filter === 'status') {
      const statusOrder = ['Open', 'In Progress', 'To be Tested', 'Closed', 'Reopen'];
      filtered.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    }
    if (filter === 'priority') {
      const priorityOrder = ['Urgent', 'High', 'Medium', 'Low'];
      filtered.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
    }
    if (filter === 'dueDate') {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    dispatch(updateFilteredIssues(filtered));
    closeDropdown();
  };
  
  const resetFilters = () => {
    dispatch(updateFilteredIssues(issues));
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        closeDropdown();
      }
      if (notifiactionsRef.current && !notifiactionsRef.current.contains(event.target)) {
        closeNotifications();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const fetchUser = async () => {
    try{
      const response = await axios.get(`/server/user/${currentUser._id}`);
      dispatch(signInSuccess(response.data));
    }catch{
      console.error('Error fetching User', error);
    }
  };
  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
      <Link to='/issues'>
        <li className='text-slate-300 flex text-sm sm:text-lg'>
          Issues
        </li>
      </Link>
      <ul className='flex items-center gap-4'>
        <BsPlus className='text-slate-400 mr-1 cursor-pointer' size={28} onClick={openModal} />
        <div className='relative' ref={filterRef}>
          <BsFilter className='text-slate-400 mr-1 cursor-pointer' size={22} onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className='absolute bg-gray-900 rounded-md shadow-lg p-4 h-auto w-60 -right-4 text-slate-300'>
              <div className="text-sm font-light mb-2">Group By</div>
              <div className='flex flex-col items-start gap-2'>
                <button onClick={() => filterIssues('status')}>Status</button>
                <button onClick={() => filterIssues('priority')}>Priority</button>
                <button onClick={() => filterIssues('dueDate')}>Due Date</button>
                <button onClick={resetFilters} className="text-slate-300 hover:font-semibold hover:text-slate-100 transition">RESET</button>
              </div>
            </div>
          )}
        </div>
        <div className='relative' ref={notifiactionsRef}>
          <BsBell className='text-slate-400 mr-1 cursor-pointer' onClick={toggleNotifications} />
          {isNotificationsOpen && (
            <div className='absolute bg-gray-900 rounded-md shadow-lg p-4 h-auto w-80 -right-4 text-slate-300'>
              <div className="text-sm font-light mb-2">Notifications</div>
              <ul className="divide-y divide-slate-500">
                {currentUser.notifications && currentUser.notifications.map((notification) => (
                  <li key={notification._id} className="py-2 line-clamp-3">
                    {notification.message}
                  </li>
                ))}
              </ul>
              <button className="text-slate-300 hover:font-semibold hover:text-slate-100 transition">
                Clear all
              </button>
            </div>
          )}
        </div>
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
