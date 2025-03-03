
import Candidate from '@/models/Candidate';
import connectToDatabase from '@/lib/mongodb';

// Get all candidates
export const getCandidates = async () => {
  await connectToDatabase();
  
  const candidates = await Candidate.find({}).sort({ name: 1 });
  
  return candidates;
};

// Initialize default candidates if none exist
export const initializeDefaultCandidates = async () => {
  await connectToDatabase();
  
  const count = await Candidate.countDocuments();
  
  if (count === 0) {
    const defaultCandidates = [
      { name: "Aditya Sharma", party: "Party A", photo: "/placeholder.svg" },
      { name: "Priya Patel", party: "Party B", photo: "/placeholder.svg" },
      { name: "Rajesh Kumar", party: "Party C", photo: "/placeholder.svg" },
      { name: "Sunita Verma", party: "Party D", photo: "/placeholder.svg" },
    ];
    
    await Candidate.insertMany(defaultCandidates);
  }
  
  return await Candidate.find({});
};

// Get candidate by ID
export const getCandidateById = async (id: string) => {
  await connectToDatabase();
  
  const candidate = await Candidate.findById(id);
  
  if (!candidate) {
    throw new Error('Candidate not found');
  }
  
  return candidate;
};
