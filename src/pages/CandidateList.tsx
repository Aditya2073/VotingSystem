
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CandidateList = () => {
  // Mock candidates data - in a real app, this would come from an API
  const candidates = [
    {
      id: "1",
      name: "Aditya Sharma",
      party: "Party A",
      photo: "/placeholder.svg",
      age: 45,
      education: "Ph.D in Political Science",
      experience: "Former State Minister (2015-2020)",
      manifesto: "Economic reforms, healthcare accessibility, and education improvements.",
    },
    {
      id: "2",
      name: "Priya Patel",
      party: "Party B",
      photo: "/placeholder.svg",
      age: 38,
      education: "MBA, Public Administration",
      experience: "Social Activist, City Council Member (2018-2022)",
      manifesto: "Environmental protection, women's rights, and rural development.",
    },
    {
      id: "3",
      name: "Rajesh Kumar",
      party: "Party C",
      photo: "/placeholder.svg",
      age: 52,
      education: "Law Degree",
      experience: "Senior Advocate, Member of Parliament (2010-2020)",
      manifesto: "Judicial reforms, infrastructure development, and farmers' welfare.",
    },
    {
      id: "4",
      name: "Sunita Verma",
      party: "Party D",
      photo: "/placeholder.svg",
      age: 41,
      education: "Masters in Economics",
      experience: "Financial Advisor, District Chairperson (2016-2022)",
      manifesto: "Economic growth, youth employment, and technological advancement.",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Meet the Candidates</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn about each candidate's background, experience, and proposed policies before casting your vote.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 bg-muted p-6 flex flex-col items-center justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 bg-secondary">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-center">{candidate.name}</h3>
                <Badge className="mt-2 bg-indian-orange">{candidate.party}</Badge>
              </div>

              <div className="w-full md:w-3/4 p-6">
                <Tabs defaultValue="background">
                  <TabsList className="mb-4">
                    <TabsTrigger value="background">Background</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="manifesto">Manifesto</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="background" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">Age</h4>
                        <p>{candidate.age} years</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">Education</h4>
                        <p>{candidate.education}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <p>{candidate.experience}</p>
                  </TabsContent>
                  
                  <TabsContent value="manifesto">
                    <p>{candidate.manifesto}</p>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <Button variant="outline" className="mr-2">
                    Download Full Profile
                  </Button>
                  <Button className="bg-indian-blue hover:bg-indian-blue/90">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
