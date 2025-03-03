
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getCandidates } from "@/api/candidates";
import { submitVote } from "@/api/votes";
import { useAuth } from "@/context/AuthContext";

type Candidate = {
  _id: string;
  id?: string;
  name: string;
  party: string;
  photo: string;
};

const VotingBooth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      toast.error("You must be logged in to vote");
      navigate("/login");
      return;
    }

    // Redirect if already voted
    if (user.hasVoted) {
      toast.info("You have already cast your vote");
      navigate("/results");
      return;
    }

    // Load candidates
    const loadCandidates = async () => {
      try {
        setIsLoading(true);
        const data = await getCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Failed to load candidates:", error);
        toast.error("Failed to load candidates");
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidates();
  }, [user, navigate]);

  const handleVote = async () => {
    if (!selectedCandidate) {
      toast.error("Please select a candidate before submitting your vote");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to vote");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitVote(user.id, selectedCandidate);
      
      toast.success("Vote Submitted Successfully!");
      
      // Refresh user data by forcing a page reload
      // In a real app, we would update the user context directly
      localStorage.setItem('user', JSON.stringify({
        ...user,
        hasVoted: true
      }));
      
      navigate("/results");
    } catch (error: any) {
      console.error("Voting error:", error);
      toast.error(error.message || "Failed to submit vote");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Loading Candidates...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Voting Booth</h1>
        <p className="text-muted-foreground">
          Select your preferred candidate and submit your vote. You can only vote once.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {candidates.map((candidate) => (
          <Card
            key={candidate._id}
            className={`p-4 cursor-pointer transition-all ${
              selectedCandidate === candidate._id
                ? "ring-2 ring-indian-orange shadow-lg"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedCandidate(candidate._id)}
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-muted">
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground">{candidate.party}</p>
              
              {selectedCandidate === candidate._id && (
                <div className="mt-2 bg-indian-orange text-white px-2 py-1 rounded-full text-xs">
                  Selected
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={handleVote}
          disabled={!selectedCandidate || isSubmitting}
          className="bg-indian-blue hover:bg-indian-blue/90"
        >
          {isSubmitting ? "Submitting..." : "Submit Vote"}
        </Button>
      </div>
    </div>
  );
};

export default VotingBooth;
