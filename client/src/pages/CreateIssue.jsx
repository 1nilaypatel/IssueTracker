import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IssueBox } from '../components';
import { fetchIssuesSuccess, fetchUsersSuccess, signInSuccess, updateFilteredIssues } from '../redux/user/userSlice.js';

export default function CreateIssue({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, issues } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [issueData, setIssueData] = useState({
    issueTitle: '',
    description: '',
    status: '',
    priority: '',
    assignee: '',
    label: [],
    dueDate: '',
    profilephoto: '',
    assigneeId: '',
  });

  const resetAndClose = () => {
    setIssueData({
      issueTitle: '',
      description: '',
      status: '',
      priority: '',
      assignee: '',
      label: [],
      dueDate: '',
      profilephoto: '',
      assigneeId: '',
    });
    setError(false);
    onClose();
  };

  const handleIssueDataChange = (newIssueData) => {
    setIssueData(newIssueData);
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
      const createdIssue = response.data;
      setIsLoading(false);
      if (createdIssue.success === false) {
        setError(createdIssue.message);
      } else {
        const notificationMessage = `New issue "${createdIssue.issueTitle}" assigned to you.`;
        await axios.post(`/server/user/add-notification/${createdIssue.assigneeId}`, {
          message: notificationMessage,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const usersResponse = await axios.get('/server/user');
        const updatedUsers = usersResponse.data;
        dispatch(fetchUsersSuccess(updatedUsers));
        const updatedCurrentUser = updatedUsers.find(user => user._id === currentUser._id);
        dispatch(signInSuccess(updatedCurrentUser));
        dispatch(fetchIssuesSuccess([...issues, createdIssue]));
        dispatch(updateFilteredIssues([...issues, createdIssue]));
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
            <IssueBox
              initialData={issueData}
              onClose={resetAndClose}
              title="New Issue"
              onIssueDataChange={handleIssueDataChange}
            />
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