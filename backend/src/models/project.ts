import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  projectId: string;
  userId: mongoose.Types.ObjectId;
  data: object;
}

const ProjectSchema: Schema = new Schema({
  projectId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: Object,
});

export default mongoose.model<IProject>('Project', ProjectSchema);