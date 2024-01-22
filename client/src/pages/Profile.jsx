import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logOutUserFailure, logOutUserStart, logOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice.js";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const response = await axios.post(`/server/user/update/${currentUser._id}`, formData);
      if(response.data.success === false){
        dispatch(updateUserFailure(response.data.message));
        return;
      }
      dispatch(updateUserSuccess(response.data));
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try{
      dispatch(deleteUserStart());
      const response = await axios.delete(`/server/user/delete/${currentUser._id}`);
      if(response.data.success === false){
        dispatch(deleteUserFailure(response.data.message));
        return;
      }
      dispatch(deleteUserSuccess(response.data));
    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleLogout = async () => {
    try{
      dispatch(logOutUserStart());
      const response = await axios.get("/server/auth/logout");
      if(response.data.success === false){
        dispatch(logOutUserFailure(response.data.message));
        return;
      }
      dispatch(logOutUserSuccess(response.data));
    }catch(error){
      dispatch(logOutUserFailure(error.message));
    }
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
      <form onSubmit={handleSubmit} className="flex flex-row gap-5">
        <input
          type='text'
          id='username'
          placeholder='Enter your new username'
          required
          value={formData.username}
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
      <p className='text-red-500 font-medium sm:font-semibold mt-1 mb-11'>{error ? error : ''}</p>
      <h2 className="text-2xl font-semibold mb-4">User Activity</h2>
      <div className="flex flex-col gap-2 text-gray-500">
          <p>Total Issues Created: {currentUser.issuesCreated}</p>
          {/* <p>Total Issues Assigned: </p> */}
          {/* for assigned i also need to check when the assignee is updated */}
      </div>
      <div className="mt-5 flex justify-between">
        <span onClick={handleDelete} className="text-red-500 cursor-pointer font-medium sm:font-semibold">
          Delete account
        </span>
        <span onClick={handleLogout} className="text-red-500 cursor-pointer font-medium sm:font-semibold">
          Log out
        </span>
      </div>
    </div>
  )
}
