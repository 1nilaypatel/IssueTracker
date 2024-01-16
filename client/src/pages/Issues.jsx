import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Issues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/server/issue/get');
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div className='text-slate-300 flex flex-col gap-2 p-4 justify-center'>
      {issues.map((issue) => (
        <div
          key={issue._id}
          className='bg-gray-800 p-4 rounded-md shadow-md text-slate-200'
        >
          <div className='flex justify-between items-center'>
            <div className='flex flex-row gap-2 items-center'>
              <div className='font-bold'>{issue.priority}</div>
              <div>{issue.status}</div>
              <div>{issue.issueTitle}</div>
            </div>
            <div className='flex flex-row gap-2'>
              <div className='flex flex-row items-center'>
                {issue.label.map((label) => (
                  <span
                    key={label}
                    className='bg-indigo-500 text-white px-2 py-1 rounded-full text-sm mr-2'
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className='text-sm flex flex-row gap-2 items-center'>
                <div>{new Date(issue.dueDate).toLocaleDateString()}</div>
                <div>{new Date(issue.createdAt).toLocaleDateString()}</div>
                <div>{issue.assignee}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
