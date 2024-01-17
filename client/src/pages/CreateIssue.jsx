import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIssuesSuccess } from '../redux/user/userSlice.js';


export default function CreateIssue({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [issueData, setIssueData] = useState({
    issueTitle: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    assignee: '',
    label: [],
    dueDate: '',
    profilephoto: '',
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/server/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []); 

  const resetAndClose = () => {
    setIssueData({
      issueTitle: '',
      description: '',
      status: 'Open',
      priority: 'Medium',
      assignee: '',
      label: [],
      dueDate: '',
      profilephoto: '',
    });
    onClose();
  };
  

  const handleChange = (e) => {
    setIssueData({
      ...issueData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAssigneeChange = (user) => {
    setIssueData({
      ...issueData,
      assignee: user.username,
      profilephoto: user.profilephoto,
    });
  };

  const handleLabelChange = (e) => {
    const labels = e.target.value.split(',').map((label) => label.trim());
    setIssueData({
      ...issueData,
      label: labels,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(true);
      const response = await axios.post("/server/issue/create", {
        ...issueData,
        userRef: currentUser._id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      setIsLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        const response = await axios.get('/server/issue/get');
        dispatch(fetchIssuesSuccess(response.data));
        resetAndClose();
        navigate('/issues');
      }
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-20'></div>
        </div>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true' />

        <div className='inline-block align-bottom rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full'>
          <div className='bg-gray-900 max-w-4xl px-4 pt-5 pb-4 sm:p-5 sm:pb-4'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-md font-lg text-slate-200'>New issue</h2>
              <AiOutlineClose className='text-slate-300 cursor-pointer' size={25} onClick={resetAndClose} />
            </div>
            <div className='mb-4'>
              <input
                type='text'
                id='issueTitle'
                className='bg-gray-900 text-slate-200 text-xl py-2 w-full focus:outline-none'
                placeholder='Issue title'
                required
                value={issueData.issueTitle}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <textarea
                id='description'
                className='bg-gray-900 text-slate-200 text-base py-2 w-full focus:outline-none'
                placeholder='Add description...'
                value={issueData.description}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center justify-start gap-2 mb-4 text-sm'>
              <select
                id='status'
                className='bg-gray-700 text-slate-200 rounded-sm py-1 focus:outline-none w-32'
                onChange={handleChange}
              >
                <option value=''>Change Status</option>
                <option value='Open'>Open</option>
                <option value='In Progress'>In Progress</option>
                <option value='To be Tested'>To be Tested</option>
                <option value='Closed'>Closed</option>
                <option value='Reopen'>Reopen</option>
              </select>
              <select
                id='priority'
                className='bg-gray-700 text-slate-200 rounded-sm p-1 focus:outline-none w-28'
                onChange={handleChange}
              >
                <option value=''>Set Priority</option>
                <option value='Urgent'>Urgent</option>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
              </select>
              <select
                id='assignee'
                className='bg-gray-700 text-slate-200 rounded-sm p-1 focus:outline-none w-36'
                onChange={(e) => handleAssigneeChange(users.find(user => user._id === e.target.value))}
              >
                <option value=''>Assignee</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
              <input
                type='text'
                id='label'
                className='bg-gray-700 text-slate-200 rounded-sm p-1 focus:outline-none w-52'
                placeholder='bug, feature, improvement'
                required
                value={issueData.label.join(', ')}
                onChange={handleLabelChange}
              />
              <input
                type="text"
                id="dueDate"
                className="bg-gray-700 text-slate-200 rounded-sm p-1 focus:outline-none w-28"
                placeholder="Due Date"
                required
                value={issueData.dueDate}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                  if (!e.target.value) {
                    e.target.placeholder = "Due Date";
                  }
                }}
              />
            </div>
            <button
              disabled={isLoading}
              type='button'
              className='bg-indigo-500 text-slate-200 text-sm px-2 py-1 rounded-sm hover:bg-indigo-600 focus:outline-none disabled:bg-opacity-40'
              onClick={handleSubmit}
            >
              {isLoading ? "Creating..." : "Create Issue"}
            </button>
            {error && <p className='text-red-500 text-sm'>{error}</p> }
          </div>
        </div>
      </div>
    </div>
  );
};