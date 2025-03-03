
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [electionActive, setElectionActive] = useState(true);

  // Mock data for statistics
  const votingStats = [
    { name: "Total Registered Voters", value: 12500 },
    { name: "Votes Cast", value: 8750 },
    { name: "Pending Voters", value: 3750 },
    { name: "Voter Turnout", value: "70%" },
  ];

  // Mock data for charts
  const candidateVotes = [
    { name: "Aditya Sharma", votes: 2500, fill: "#1a365d" },
    { name: "Priya Patel", votes: 2100, fill: "#ff9933" },
    { name: "Rajesh Kumar", votes: 2300, fill: "#138808" },
    { name: "Sunita Verma", votes: 1850, fill: "#9333ea" },
  ];

  const ageDistribution = [
    { name: "18-25", value: 1800 },
    { name: "26-40", value: 3200 },
    { name: "41-60", value: 2500 },
    { name: "60+", value: 1250 },
  ];

  const COLORS = ["#1a365d", "#ff9933", "#138808", "#9333ea"];

  // Mock recent voters
  const recentVoters = [
    { id: "V12345", name: "Ananya Desai", time: "10:45 AM", booth: "Booth #5" },
    { id: "V12346", name: "Vikram Singh", time: "10:42 AM", booth: "Booth #3" },
    { id: "V12347", name: "Meera Joshi", time: "10:38 AM", booth: "Booth #1" },
    { id: "V12348", name: "Arjun Reddy", time: "10:35 AM", booth: "Booth #2" },
    { id: "V12349", name: "Kavita Sharma", time: "10:30 AM", booth: "Booth #4" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage elections and monitor voting statistics
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="election-status"
              checked={electionActive}
              onCheckedChange={setElectionActive}
            />
            <Label htmlFor="election-status">
              Election {electionActive ? "Active" : "Inactive"}
            </Label>
          </div>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {votingStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="voters">Voters</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Vote Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={candidateVotes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#1a365d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Voter Age Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {ageDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card className="mt-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Voters</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voter ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Booth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentVoters.map((voter) => (
                    <TableRow key={voter.id}>
                      <TableCell>{voter.id}</TableCell>
                      <TableCell>{voter.name}</TableCell>
                      <TableCell>{voter.time}</TableCell>
                      <TableCell>{voter.booth}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Manage Candidates</h3>
              <Button>Add New Candidate</Button>
            </div>
            <div className="space-y-4 mb-4">
              <div className="flex gap-4">
                <Input placeholder="Search candidates..." className="max-w-sm" />
                <Button variant="outline">Search</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Votes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidateVotes.map((candidate) => (
                  <TableRow key={candidate.name}>
                    <TableCell>{candidate.name}</TableCell>
                    <TableCell>Party {candidate.name.charAt(0)}</TableCell>
                    <TableCell>{candidate.votes}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="voters">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Voter Management</h3>
            <p>Voter management content will appear here.</p>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">System Settings</h3>
            <p>System settings content will appear here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
