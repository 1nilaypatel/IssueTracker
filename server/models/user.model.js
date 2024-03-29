import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  profilephoto:{
    type: String,
    default: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
  },
  issuesCreated:{
    type: Number,
    default: 0,
  },
  showRedDot:{
    type: Boolean,
    default: false,
  },
  notifications:[
    {
      message: String,
    }
  ]
}, 
{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;