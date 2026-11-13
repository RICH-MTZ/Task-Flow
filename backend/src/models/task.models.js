import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true, maxlength: 120 
  },
  description: { 
    type: String, 
    default: '', 
    maxlength: 1000
  },
  status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'done'], 
    default: 'pending' 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true, collection: 'tasks' });

export const Task = mongoose.model('Task', taskSchema);