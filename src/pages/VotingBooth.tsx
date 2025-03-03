
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const VotingBooth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock candidates data - in a real app, this would come from an API
  const candidates = [
    { id: "1", name: "Aditya Sharma", party: "Party A", photo: "/placeholder.svg" },
    { id: "2", name: "Priya Patel", party: "Party B", photo: "/placeholder.svg" },
    { id: "3", name: "Rajesh Kumar", party: "Party C", photo: "/placeholder.svg" },
    { id: "4", name: "Sunita Verma", party: "Party D", photo: "/placeholder.svg" },
  ];

  const handleVote = () => {
    if (!selectedCandidate) {
      toast({
        title: "No selection made",
        description: "Please select a candidate before submitting your vote.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Vote Submitted Successfully!",
        description: "Thank you for participating in the democratic process.",
      });
      setIsSubmitting(false);
      navigate("/results");
    }, 1500);
  };

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
            key={candidate.id}
            className={`p-4 cursor-pointer transition-all ${
              selectedCandidate === candidate.id
                ? "ring-2 ring-indian-orange shadow-lg"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedCandidate(candidate.id)}
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
              
              {selectedCandidate === candidate.id && (
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
