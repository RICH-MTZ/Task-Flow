import  { Schema, SchemaTypes, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: SchemaTypes.String, required: true, trim: true, maxLenght: 120},
  description: { type: SchemaTypes.String, default: '', maxLenght: 1000 },
  status: {
    type: SchemaTypes.String,
    enum: ['pending','in_progress','done'],
    default: 'pending' 
  },
  priority: {
    type: SchemaTypes.String, enum: ['low','medium','high'], default: 'medium',
  },
  ownerId: { type: SchemaTypes.ObjectId },
  }, {
    timestamps: true, collection: 'taks',
});

export const Task = model('Task',taskSchema);