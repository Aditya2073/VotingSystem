
import { Button } from "@/components/ui/card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Share2, Download, PrinterIcon } from "lucide-react";

const ElectionResults = () => {
  // Mock election result data
  const electionData = {
    title: "General Election 2023",
    status: "Completed",
    date: "October 15, 2023",
    totalVoters: 12500,
    votesCast: 8750,
    turnoutPercentage: 70,
    winningCandidate: "Rajesh Kumar",
    winningParty: "Party C",
  };

  // Mock candidate results
  const candidateResults = [
    {
      name: "Rajesh Kumar",
      party: "Party C",
      votes: 2300,
      percentage: 26.3,
      color: "#138808", // Indian green
      winner: true,
    },
    {
      name: "Aditya Sharma",
      party: "Party A",
      votes: 2500,
      percentage: 28.6,
      color: "#1a365d", // Indian blue
      winner: false,
    },
    {
      name: "Priya Patel",
      party: "Party B",
      votes: 2100,
      percentage: 24.0,
      color: "#ff9933", // Indian orange
      winner: false,
    },
    {
      name: "Sunita Verma",
      party: "Party D",
      votes: 1850,
      percentage: 21.1,
      color: "#6b7280", // Gray
      winner: false,
    },
  ];

  // Sort candidates by votes for display
  const sortedCandidates = [...candidateResults].sort((a, b) => b.votes - a.votes);

  // Regional voting data for map visualization
  const regionalData = [
    { region: "North", turnout: 72, winner: "Rajesh Kumar" },
    { region: "South", turnout: 68, winner: "Aditya Sharma" },
    { region: "East", turnout: 65, winner: "Priya Patel" },
    { region: "West", turnout: 75, winner: "Rajesh Kumar" },
    { region: "Central", turnout: 70, winner: "Rajesh Kumar" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{electionData.title} - Results</h1>
        <div className="flex justify-center items-center gap-2">
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
          >
            {electionData.status}
          </Badge>
          <p className="text-muted-foreground">
            {electionData.date}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Voters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{electionData.totalVoters.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Votes Cast</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{electionData.votesCast.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Voter Turnout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{electionData.turnoutPercentage}%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Winning Candidate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{electionData.winningCandidate}</p>
            <p className="text-sm text-muted-foreground">{electionData.winningParty}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Results */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Vote Distribution</CardTitle>
            <CardDescription>Breakdown of votes per candidate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedCandidates}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value.toLocaleString()} votes`, 
                      props.payload.party
                    ]}
                  />
                  <Legend />
                  <Bar 
                    dataKey="votes" 
                    name="Votes" 
                    radius={[4, 4, 0, 0]}
                  >
                    {sortedCandidates.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Percentage Share</CardTitle>
            <CardDescription>Vote share by percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sortedCandidates}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="percentage"
                  >
                    {sortedCandidates.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`]}
                    labelFormatter={(index) => sortedCandidates[index].name}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidate Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Candidate Results</CardTitle>
          <CardDescription>Detailed breakdown of all candidates</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Position</th>
                <th className="text-left p-4">Candidate</th>
                <th className="text-left p-4">Party</th>
                <th className="text-right p-4">Votes</th>
                <th className="text-right p-4">Percentage</th>
                <th className="text-center p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedCandidates.map((candidate, index) => (
                <tr 
                  key={index} 
                  className={`border-b ${candidate.winner ? 'bg-green-50' : ''}`}
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4">{candidate.name}</td>
                  <td className="p-4">{candidate.party}</td>
                  <td className="p-4 text-right">
                    {candidate.votes.toLocaleString()}
                  </td>
                  <td className="p-4 text-right">{candidate.percentage}%</td>
                  <td className="p-4 text-center">
                    {candidate.winner ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        Winner
                      </Badge>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Regional Results */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Regional Results</CardTitle>
          <CardDescription>Voting patterns across different regions</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Region</th>
                <th className="text-left p-4">Winning Candidate</th>
                <th className="text-right p-4">Voter Turnout</th>
              </tr>
            </thead>
            <tbody>
              {regionalData.map((region, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 font-medium">{region.region}</td>
                  <td className="p-4">{region.winner}</td>
                  <td className="p-4 text-right">{region.turnout}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          <Share2 size={16} />
          Share Results
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
          <Download size={16} />
          Download Report
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
          <PrinterIcon size={16} />
          Print Results
        </button>
      </div>
    </div>
  );
};

export default ElectionResults;
