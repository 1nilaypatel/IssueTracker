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
    <div className='text-slate-300'>
      <h2>All Issues</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue._id}>
            <strong>{issue.issueTitle}</strong>
            <p>Status: {issue.status}</p>
            <p>Assignee: {issue.assignee}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

