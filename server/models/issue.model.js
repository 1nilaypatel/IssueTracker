import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  issueTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'To be Tested', 'Closed', 'Reopen'],
    default: 'Open',
  },
  priority: {
    type: String,
    enum: ['No priority', 'Urgent', 'High', 'Medium', 'Low'],
    default: 'Medium',
  },
  assignee: {
    type: String,
    required: true,
  },
  label: {
    type: [String],
  },
  dueDate: {
    type: Date,
  },
}, 
{timestamps: true});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;