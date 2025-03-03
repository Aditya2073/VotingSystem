
import Vote from '@/models/Vote';
import User from '@/models/User';
import Candidate from '@/models/Candidate';
import connectToDatabase from '@/lib/mongodb';

// Submit a vote
export const submitVote = async (userId: string, candidateId: string) => {
  await connectToDatabase();
  
  // Check if user has already voted
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.hasVoted) {
    throw new Error('You have already cast your vote');
  }
  
  // Check if candidate exists
  const candidate = await Candidate.findById(candidateId);
  
  if (!candidate) {
    throw new Error('Candidate not found');
  }
  
  // Create the vote
  const vote = await Vote.create({
    user: userId,
    candidate: candidateId,
  });
  
  // Update candidate's vote count
  await Candidate.findByIdAndUpdate(
    candidateId,
    { $inc: { votes: 1 } }
  );
  
  // Mark user as having voted
  await User.findByIdAndUpdate(
    userId,
    { hasVoted: true }
  );
  
  return vote;
};

// Get election results
export const getElectionResults = async () => {
  await connectToDatabase();
  
  // Get candidates with vote counts
  const candidates = await Candidate.find({}).sort({ votes: -1 });
  
  // Get total votes
  const totalVotes = candidates.reduce((acc, candidate) => acc + candidate.votes, 0);
  
  // Calculate percentages
  const candidateResults = candidates.map(candidate => ({
    id: candidate._id,
    name: candidate.name,
    party: candidate.party,
    votes: candidate.votes,
    percentage: totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 1000) / 10 : 0,
    winner: false,
  }));
  
  // Mark the winner
  if (candidateResults.length > 0 && totalVotes > 0) {
    candidateResults[0].winner = true;
  }
  
  return {
    candidates: candidateResults,
    totalVotes,
    turnoutPercentage: 0, // Will be calculated when we have total registered voters
    winningCandidate: candidateResults.length > 0 ? candidateResults[0].name : null,
    winningParty: candidateResults.length > 0 ? candidateResults[0].party : null,
  };
};

// Get regional voting data
export const getRegionalData = async () => {
  await connectToDatabase();
  
  // In a real app, this would query by region
  // Here we're generating mock data until regional data is implemented
  const regions = ["North", "South", "East", "West", "Central"];
  const regionalData = [];
  
  for (const region of regions) {
    const randomTurnout = Math.floor(Math.random() * 20) + 60; // 60-80%
    const candidates = await Candidate.find({}).sort({ votes: -1 });
    const winner = candidates.length > 0 ? candidates[0].name : "No winner";
    
    regionalData.push({
      region,
      turnout: randomTurnout,
      winner
    });
  }
  
  return regionalData;
};
