
import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  region: {
    type: String,
    default: 'Not specified',
  },
});

export default mongoose.models.Vote || mongoose.model('Vote', VoteSchema);
