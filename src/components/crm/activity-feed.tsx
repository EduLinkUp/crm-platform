import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MoreHorizontal, User, Calendar, Mail, Phone, Target, TrendingUp } from "lucide-react"

interface Activity {
  id: string | number
  type: string
  title: string
  description?: string
  time: string
  status: string
  priority?: string
  assignee?: string
}

interface ActivityFeedProps {
  activities: Activity[]
  title?: string
  showViewAll?: boolean
  className?: string
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'lead': return User
    case 'deal': return Target
    case 'contact': return Phone
    case 'meeting': return Calendar
    case 'email': return Mail
    case 'call': return Phone
    case 'task': return TrendingUp
    default: return Clock
  }
}

const getStatusColor = (status: Activity['status']) => {
  switch (status) {
    case 'new': return 'bg-green-400'
    case 'won': return 'bg-yellow-400'
    case 'updated': return 'bg-blue-400'
    case 'scheduled': return 'bg-purple-400'
    case 'sent': return 'bg-cyan-400'
    case 'completed': return 'bg-green-400'
    case 'pending': return 'bg-orange-400'
    default: return 'bg-gray-400'
  }
}

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high': return 'border-red-500/50 text-red-400'
    case 'medium': return 'border-yellow-500/50 text-yellow-400'
    case 'low': return 'border-green-500/50 text-green-400'
    default: return 'border-gray-500/50 text-gray-400'
  }
}

export function ActivityFeed({ activities, title = "Recent Activities", showViewAll = true }: ActivityFeedProps) {
  return (
    <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-yellow-400 font-bold flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          {title}
        </CardTitle>
        {showViewAll && (
          <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-3 rounded-lg border border-yellow-500/20 hover:border-yellow-400/30 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)} animate-pulse`}></div>
                  <Icon className="w-4 h-4 text-yellow-400/60" />
                  <div className="flex-1">
                    <p className="text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors">
                      {activity.title}
                    </p>
                    {activity.description && (
                      <p className="text-yellow-400/60 text-sm">{activity.description}</p>
                    )}
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-yellow-400/60 text-sm">{activity.time}</p>
                      {activity.assignee && (
                        <p className="text-yellow-400/60 text-sm">Assigned to {activity.assignee}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {activity.priority && (
                    <Badge 
                      variant="outline" 
                      className={`border ${getPriorityColor(activity.priority)} text-xs`}
                    >
                      {activity.priority}
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
