import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCircle, faCog, faFlask, faCheckCircle, faExclamationCircle, faExclamationTriangle, faArrowUp, faArrowRight, faArrowDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssuesSuccess, updateFilteredIssues } from '../redux/user/userSlice.js';
import UpdateIssue from './UpdateIssue.jsx';

export default function Issues() {
  const issues = useSelector((state) => state.user.filteredIssues);
  const dispatch = useDispatch();
  const [clickedIssue, setClickedIssue] = useState(null);

  const handleClickIssue = (issue) => {
    setClickedIssue(issue);
  }

  const closeIssueBox = () => {
    setClickedIssue(null);
  };

  const fetchIssues = async () => {
    try {
      const response = await axios.get('/server/issue/get');
      dispatch(fetchIssuesSuccess(response.data));
      dispatch(updateFilteredIssues(response.data));
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };
  useEffect(() => {
    fetchIssues();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open':
        return <FontAwesomeIcon icon={faCircle} className='text-green-500' />;
      case 'In Progress':
        return <FontAwesomeIcon icon={faCog} className='text-yellow-500' />;
      case 'To be Tested':
        return <FontAwesomeIcon icon={faFlask} className='text-blue-500' />;
      case 'Closed':
        return <FontAwesomeIcon icon={faCheckCircle} className='text-green-500' />;
      case 'Reopen':
        return <FontAwesomeIcon icon={faExclamationCircle} className='text-red-500' />;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Urgent':
        return <FontAwesomeIcon icon={faExclamationTriangle} className='text-red-500' />;
      case 'High':
        return <FontAwesomeIcon icon={faArrowUp} className='text-orange-500' />;
      case 'Medium':
        return <FontAwesomeIcon icon={faArrowRight} className='text-yellow-500' />;
      case 'Low':
        return <FontAwesomeIcon icon={faArrowDown} className='text-gray-500' />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    const [month, day] = new Date(dateString)
      .toLocaleDateString('en-US', options)
      .split(' ');
    return `${day} ${month}`;
  };

  return (
    <div className='text-slate-300 flex flex-col gap-2 p-4 justify-center mt-14'>
      {issues.length === 0 ? (
        <div className='text-center mt-60 text-2xl font-semibold'>Click on + to create issues</div>
        ) : (
          issues.map((issue) => (
            <div 
              key={issue._id} 
              className='bg-gray-800 p-3 rounded-md shadow-md hover:cursor-pointer' 
              onClick={() => handleClickIssue(issue)}
            >
              <div className='flex justify-between items-center'>
                <div className='flex flex-row gap-2 items-center'>
                  <span className='bg-gray-900 px-2 py-0.5 rounded-full flex items-center gap-1'>
                    {getPriorityIcon(issue.priority)}
                    <span className='hidden sm:inline text-xs sm:text-sm'>{issue.priority}</span>
                  </span>
                  <span className='bg-gray-900 px-2 py-0.5 rounded-full flex items-center gap-1'>
                    {getStatusIcon(issue.status)}
                    <span className='hidden sm:inline truncate text-xs sm:text-sm'>{issue.status}</span>
                  </span>
                  <div className='text-sm lg:text-base line-clamp-1'>{issue.issueTitle}</div>
                </div>
                <div className='flex flex-row gap-2'>
                  <div className='flex flex-row items-center gap-1 line-clamp-1'>
                    {issue.label.map((label) => (
                      <span
                        key={label}
                        className='px-1 text-sm hidden sm:inline'
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className='text-sm flex flex-row gap-2 items-center'>
                    <div className='md:bg-gray-900 md:px-2 md:py-0.5 rounded-full flex items-center md:gap-0.5 truncate'>
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className='text-red-500 mr-1 hidden md:inline'
                      />
                      <span className='hidden md:inline'>{formatDate(issue.dueDate)}</span>
                    </div>
                    <div className='text-slate-400 bg-gray-900 px-2 py-0.5 rounded-full hidden lg:inline'>
                      {formatDate(issue.createdAt)}
                    </div>
                    <div>
                      <img
                        src={issue.profilephoto}
                        alt={`${issue.assignee}'s profile`}
                        className='w-7 h-7 rounded-full object-contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
      )))}
      {clickedIssue && <UpdateIssue issue={clickedIssue} onClose={closeIssueBox} fetchIssues={fetchIssues} />}
    </div>
  );
}
