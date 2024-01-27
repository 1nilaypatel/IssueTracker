import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersSuccess } from '../redux/user/userSlice.js';
import { AiOutlineClose } from 'react-icons/ai';

export default function IssueBox({ initialData, title, onClose, onIssueDataChange }){
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const handleIssueDataChange = (newIssueData) => {
    onIssueDataChange(newIssueData);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/server/user');
        dispatch(fetchUsersSuccess(response.data));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  const formatDueDate = (date) => {
    if (!date) return 'DD/MM/YYYY';
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-md font-lg text-slate-200'>{title}</h2>
        <AiOutlineClose className='text-slate-300 cursor-pointer' size={25} onClick={onClose} />
      </div>
      <div className='mb-4'>
        <input
          type='text'
          id='issueTitle'
          className='bg-gray-900 text-slate-200 text-xl py-2 w-full focus:outline-none'
          placeholder='Issue title'
          required
          value={initialData.issueTitle}
          onChange={(e) => handleIssueDataChange({...initialData, issueTitle: e.target.value})}
        />
      </div>
      <div className='mb-4'>
        <textarea
          id='description'
          className='bg-gray-900 text-slate-200 text-base py-2 w-full focus:outline-none'
          placeholder='Add description...'
          value={initialData.description}
          onChange={(e) => handleIssueDataChange({...initialData, description: e.target.value})}
        />
      </div>
      <div className='flex flex-col sm:flex-row sm:items-center justify-start gap-2 mb-4 text-sm'>
        <select
          id='status'
          className='bg-gray-700 text-slate-200 rounded-sm py-1 focus:outline-none w-32'
          value={initialData.status || ''}
          onChange={(e) => handleIssueDataChange({...initialData, status: e.target.value})}
        >
          <option value='' disabled hidden>Change Status</option>
          <option value='Open'>Open</option>
          <option value='In Progress'>In Progress</option>
          <option value='To be Tested'>To be Tested</option>
          <option value='Closed'>Closed</option>
          <option value='Reopen'>Reopen</option>
        </select>
        <select
          id='priority'
          className='bg-gray-700 text-slate-200 rounded-sm p-1 focus:outline-none w-28'
          value={initialData.priority || ''}
          onChange={(e) => handleIssueDataChange({...initialData, priority: e.target.value})}
        >
          <option value='' disabled hidden>Set Priority</option>
          <option value='Urgent'>Urgent</option>
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>
        <select
          id='assignee'
          className='bg-gray-700 text-slate-200 rounded-sm p-1 focus:outline-none w-36'
          value={initialData.assigneeId || ''}
          onChange={(e) =>
            handleIssueDataChange({
              ...initialData,
              assignee: users.find(user => user._id === e.target.value)?.username || '',
              profilephoto: users.find(user => user._id === e.target.value)?.profilephoto || '',
              assigneeId: e.target.value || '',
            })
          }
        >
          <option value='' disabled hidden>Assignee</option>
          {users && users.map((user) => (
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
          value={initialData.label.join(', ')}
          onChange={(e) => 
            handleIssueDataChange({ 
              ...initialData, 
              label: e.target.value.split(',').map((label) => label.trim())
            })
          }
        />
        <input
          type="text"
          id="dueDate"
          className="bg-gray-700 text-slate-200 rounded-sm p-1 focus:outline-none w-28"
          placeholder="Due Date"
          required
          value={title === 'Update Issue' ? formatDueDate(initialData.dueDate) : initialData.dueDate}
          onChange={(e) => handleIssueDataChange({...initialData, dueDate: e.target.value})}
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
    </>
  );
};
