import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  MoreHorizontal,
  Shield,
  Mail,
  Phone,
  Calendar,
  Activity,
  Settings,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Analyst' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  avatar?: string;
  department: string;
  joinDate: string;
}

const UsersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  // Mock user data
  const users: User[] = [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@zerotouch.com",
      role: "Admin",
      status: "Active",
      lastActive: "2 minutes ago",
      department: "Operations",
      joinDate: "Jan 2024"
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      email: "marcus.r@zerotouch.com",
      role: "Manager",
      status: "Active",
      lastActive: "1 hour ago",
      department: "Supply Chain",
      joinDate: "Mar 2024"
    },
    {
      id: "3",
      name: "Emily Watson",
      email: "emily.watson@zerotouch.com",
      role: "Analyst",
      status: "Active",
      lastActive: "3 hours ago",
      department: "Risk Analysis",
      joinDate: "Feb 2024"
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@zerotouch.com",
      role: "Analyst",
      status: "Inactive",
      lastActive: "2 days ago",
      department: "Port Operations",
      joinDate: "Dec 2023"
    },
    {
      id: "5",
      name: "Lisa Thompson",
      email: "lisa.t@zerotouch.com",
      role: "Viewer",
      status: "Pending",
      lastActive: "Never",
      department: "Compliance",
      joinDate: "Today"
    },
    {
      id: "6",
      name: "Alex Johnson",
      email: "alex.johnson@zerotouch.com",
      role: "Manager",
      status: "Active",
      lastActive: "30 minutes ago",
      department: "Analytics",
      joinDate: "Nov 2023"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'Manager': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Analyst': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Viewer': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Inactive': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      case 'Pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role.toLowerCase() === selectedRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    pending: users.filter(u => u.status === 'Pending').length,
    admins: users.filter(u => u.role === 'Admin').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 mb-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 min-h-[44px]"
            >
              ← Back to Dashboard
            </Button>
            <Button size="sm" className="gap-2 min-h-[44px]">
              <UserPlus className="h-4 w-4" />
              <span className="ml-2">Add User</span>
            </Button>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage team members and their access permissions
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-in slide-in-from-bottom-2 duration-300 delay-100">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Total Users</span>
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-muted-foreground">Active</span>
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">{stats.active}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-muted-foreground">Pending</span>
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-muted-foreground">Admins</span>
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">{stats.admins}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 animate-in slide-in-from-bottom-2 duration-300 delay-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table/Cards */}
        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          {/* Grid View */}
          <TabsContent value="grid" className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user, index) => (
                <Card key={user.id} className={`animate-in slide-in-from-bottom-2 duration-300 delay-${(index + 3) * 100}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{user.name}</h3>
                          <p className="text-xs text-muted-foreground">{user.department}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Joined {user.joinDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className={`text-xs ${getRoleColor(user.role)}`}>
                          {user.role}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(user.status)}`}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Last active: {user.lastActive}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Table View */}
          <TabsContent value="table" className="animate-in fade-in duration-300">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                        <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Department</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                        <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Status</th>
                        <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Last Active</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-foreground text-sm">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">
                            {user.department}
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className={`text-xs ${getRoleColor(user.role)}`}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <Badge variant="outline" className={`text-xs ${getStatusColor(user.status)}`}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">
                            {user.lastActive}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredUsers.length === 0 && (
          <Card className="animate-in fade-in duration-300">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <Button variant="outline" onClick={() => {setSearchQuery(""); setSelectedRole("all");}}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UsersPage;