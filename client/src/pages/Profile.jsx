import { useState } from "react";
import { useSelector } from "react-redux"

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const[username, setUsername] = useState('');
  const[loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUsername(e.target.value);
  }

  return (
    <div className="text-gray-300 p-6 max-w-lg mx-auto mt-40 flex flex-col">
      <div className="flex items-center justify-center mb-12">
        <img 
          className="rounded-full h-28 w-28 object-contain mr-4" 
          src={currentUser.profilephoto} 
          alt="profile" 
        />
        <div>
          <h2 className="text-2xl font-semibold">{currentUser.username}</h2>
          <p className="text-gray-500">{currentUser.email}</p>
        </div>
      </div>
      <form className="flex flex-row gap-5 mb-12">
        <input
          type='text'
          placeholder='Enter your new username'
          value={currentUser.username}
          className='rounded-md p-2 focus:border-indigo-400 text-black w-64'
          onChange={handleChange}
        />
        <button 
          disabled={loading}
          className="bg-indigo-500 text-slate-300 p-2 rounded-md hover:bg-opacity-90 focus:outline-none"
        >
          {loading ? "Updating..." : "Update Username"}
        </button>
      </form>
      <h2 className="text-2xl font-semibold mb-4">User Activity</h2>
      <div className="flex flex-col gap-2 text-gray-500">
          <p>Total Issues Created: </p>
          <p>Total Issues Assigned: </p>
      </div>
      <div className="mt-5 flex justify-between">
        <span className="text-red-500 cursor-pointer font-medium sm:font-semibold">
          Delete account
        </span>
        <span className="text-red-500 cursor-pointer font-medium sm:font-semibold">
          Log out
        </span>
      </div>
    </div>
  )
}
