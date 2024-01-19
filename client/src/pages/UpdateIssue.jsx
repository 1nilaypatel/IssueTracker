import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IssueBox } from '../components';
import { deleteIssuesSuccess, updateIssuesSuccess } from '../redux/user/userSlice.js';

export default function UpdateIssue({ issue, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [issueData, setIssueData] = useState({
    issueTitle: issue.issueTitle,
    description: issue.description,
    status: issue.status,
    priority: issue.priority,
    assignee: issue.assignee,
    label: issue.label,
    dueDate: issue.dueDate,
    profilephoto: issue.profilephoto,
    assigneeId: issue.assigneeId,
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
    onClose();
  };

  const handleIssueDataChange = (newIssueData) => {
    setIssueData(newIssueData);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdateLoading(true);
      setError(false);
      const response = await axios.put(`/server/issue/update/${issue._id}`, issueData);
      dispatch(updateIssuesSuccess([response.data]));
      setIsUpdateLoading(false);
      resetAndClose();
      navigate('/issues');
    } catch (error) {
      setError(error.response.data.message);
      setIsUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this issue?");
    if (!confirmDelete) {
      return;
    }
    try {
      setIsDeleteLoading(true);
      setError(false);
      await axios.delete(`/server/issue/delete/${issue._id}`);
      dispatch(deleteIssuesSuccess(issue._id));
      setIsDeleteLoading(false);
      resetAndClose();
      navigate('/issues');
    } catch (error) {
      setError(error.response.data.message);
      setIsDeleteLoading(false);
    }
  };


  return (
    <div className={`fixed inset-0 overflow-y-auto`}>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-20'></div>
        </div>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true' />

        <div className='inline-block align-bottom rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full'>
          <div className='bg-gray-900 max-w-4xl px-4 pt-5 pb-4 sm:p-5 sm:pb-4'>
            <IssueBox
              initialData={issueData}
              onClose={onClose}
              title="Update Issue"
              onIssueDataChange={handleIssueDataChange}
            />
            <div className='flex flex-row gap-3'>
              <button
                disabled={isUpdateLoading || isDeleteLoading}
                type='button'
                className='bg-indigo-500 text-slate-200 text-sm px-2 py-1 rounded-sm hover:bg-indigo-600 focus:outline-none disabled:bg-opacity-40'
                onClick={handleUpdate}
              >
                {isUpdateLoading ? "Updating..." : "Update Issue"}
              </button>
              <button
                disabled={isDeleteLoading || isUpdateLoading}
                type='button'
                className='bg-red-500 text-slate-200 text-sm px-2 py-1 rounded-sm hover:bg-red-600 focus:outline-none disabled:bg-opacity-40'
                onClick={handleDelete}
              >
                {isDeleteLoading ? "Deleting..." : "Delete Issue"}
              </button>
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p> }
          </div>
        </div>
      </div>
    </div>
  );
};