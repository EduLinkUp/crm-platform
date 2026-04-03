import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ModernNavigation } from "@/components/crm/navigation"
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  MoreHorizontal,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Star
} from "lucide-react"

export const metadata: Metadata = {
  title: "Tasks - NeonFlow CRM",
  description: "Manage your tasks and activities",
}

// Mock tasks data
const tasks = [
  {
    id: '1',
    title: 'Follow up with Tech Corporation',
    description: 'Discuss proposal details and next steps',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-04-10',
    assignee: 'John Smith',
    createdAt: '2024-04-01',
  },
  {
    id: '2',
    title: 'Prepare quarterly report',
    description: 'Compile Q2 performance metrics and analytics',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2024-04-15',
    assignee: 'Sarah Johnson',
    createdAt: '2024-04-02',
  },
  {
    id: '3',
    title: 'Email campaign review',
    description: 'Review and approve upcoming marketing campaign',
    priority: 'low',
    status: 'completed',
    dueDate: '2024-04-08',
    assignee: 'Mike Wilson',
    createdAt: '2024-03-28',
  },
  {
    id: '4',
    title: 'Client meeting preparation',
    description: 'Prepare presentation for Digital Agency meeting',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-04-12',
    assignee: 'Emily Davis',
    createdAt: '2024-04-03',
  },
  {
    id: '5',
    title: 'Database cleanup',
    description: 'Remove duplicate contacts and update records',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2024-04-20',
    assignee: 'John Smith',
    createdAt: '2024-04-04',
  },
  {
    id: '6',
    title: 'Sales training session',
    description: 'Conduct training for new sales team members',
    priority: 'low',
    status: 'pending',
    dueDate: '2024-04-25',
    assignee: 'Sarah Johnson',
    createdAt: '2024-04-05',
  },
]

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/50',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  low: 'bg-green-500/20 text-green-400 border-green-500/50',
}

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  completed: 'bg-green-500/20 text-green-400 border-green-500/50',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/50',
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return CheckCircle
    case 'in-progress': return AlertCircle
    case 'pending': return Clock
    case 'cancelled': return XCircle
    default: return Clock
  }
}

export default async function TasksPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/auth/signin")
  }

  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    highPriorityTasks: tasks.filter(t => t.priority === 'high').length,
    overdueTasks: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ModernNavigation />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black text-yellow-400 mb-2 tracking-wider" 
                  style={{ textShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)' }}>
                TASKS
              </h1>
              <p className="text-yellow-400/70 text-lg">
                Manage your tasks and track team progress
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-yellow-400">
                  Total Tasks
                </CardTitle>
                <Calendar className="h-3 w-3 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-yellow-400">
                  {stats.totalTasks}
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-yellow-400">
                  Completed
                </CardTitle>
                <CheckCircle className="h-3 w-3 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-green-400">
                  {stats.completedTasks}
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-yellow-400">
                  In Progress
                </CardTitle>
                <AlertCircle className="h-3 w-3 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-blue-400">
                  {stats.inProgressTasks}
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-yellow-400">
                  Pending
                </CardTitle>
                <Clock className="h-3 w-3 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-yellow-400">
                  {stats.pendingTasks}
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-yellow-400">
                  High Priority
                </CardTitle>
                <Star className="h-3 w-3 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-red-400">
                  {stats.highPriorityTasks}
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-yellow-400">
                  Overdue
                </CardTitle>
                <XCircle className="h-3 w-3 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-red-400">
                  {stats.overdueTasks}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400/60" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 bg-black/50 border border-yellow-500/30 rounded-lg text-yellow-400 placeholder-yellow-400/60 focus:outline-none focus:border-yellow-400/50 focus:bg-black/70 transition-all duration-200 w-full"
              />
            </div>
            <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={priorityColors.high}>
              {stats.highPriorityTasks} High
            </Badge>
            <Badge className={priorityColors.medium}>
              {tasks.filter(t => t.priority === 'medium').length} Medium
            </Badge>
            <Badge className={priorityColors.low}>
              {tasks.filter(t => t.priority === 'low').length} Low
            </Badge>
          </div>
        </div>

        {/* Tasks List */}
        <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-yellow-400 font-bold">All Tasks</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                <Calendar className="w-4 h-4 mr-1" />
                Calendar View
              </Button>
              <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                <TrendingUp className="w-4 h-4 mr-1" />
                Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => {
                const StatusIcon = getStatusIcon(task.status)
                return (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-400/30 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        task.status === 'completed' ? 'bg-green-500/20' :
                        task.status === 'in-progress' ? 'bg-blue-500/20' :
                        task.status === 'pending' ? 'bg-yellow-500/20' :
                        'bg-red-500/20'
                      }`}>
                        <StatusIcon className={`w-5 h-5 ${
                          task.status === 'completed' ? 'text-green-400' :
                          task.status === 'in-progress' ? 'text-blue-400' :
                          task.status === 'pending' ? 'text-yellow-400' :
                          'text-red-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors">
                            {task.title}
                          </h3>
                          <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                            {task.priority}
                          </Badge>
                          <Badge className={statusColors[task.status as keyof typeof statusColors]}>
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-yellow-400/60 text-sm mb-2">{task.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-yellow-400/60">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Due: {task.dueDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{task.assignee}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Created: {task.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
