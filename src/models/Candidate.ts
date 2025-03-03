
import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide candidate name'],
    maxLength: [60, 'Name cannot be more than 60 characters'],
  },
  party: {
    type: String,
    required: [true, 'Please provide political party'],
  },
  photo: {
    type: String,
    default: '/placeholder.svg',
  },
  description: {
    type: String,
    default: '',
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Candidate || mongoose.model('Candidate', CandidateSchema);
