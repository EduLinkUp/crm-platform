import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Phone, 
  Mail, 
  Calendar, 
  Target, 
  Users, 
  BarChart3, 
  Settings,
  Zap,
  FileText,
  MessageSquare
} from "lucide-react"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  color: string
  href: string
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Add Contact',
    description: 'Create a new contact entry',
    icon: Users,
    color: 'from-blue-400 to-blue-600',
    href: '/contacts/new'
  },
  {
    id: '2',
    title: 'Create Deal',
    description: 'Add a new deal to pipeline',
    icon: Target,
    color: 'from-green-400 to-green-600',
    href: '/deals/new'
  },
  {
    id: '3',
    title: 'Schedule Meeting',
    description: 'Set up a new meeting',
    icon: Calendar,
    color: 'from-purple-400 to-purple-600',
    href: '/meetings/new'
  },
  {
    id: '4',
    title: 'Send Email',
    description: 'Compose an email campaign',
    icon: Mail,
    color: 'from-cyan-400 to-cyan-600',
    href: '/email/new'
  },
  {
    id: '5',
    title: 'Make Call',
    description: 'Log a phone call',
    icon: Phone,
    color: 'from-orange-400 to-orange-600',
    href: '/calls/new'
  },
  {
    id: '6',
    title: 'Create Task',
    description: 'Add a new task',
    icon: FileText,
    color: 'from-pink-400 to-pink-600',
    href: '/tasks/new'
  }
]

export function QuickActions() {
  return (
    <Card className="border-yellow-500/30 bg-black/50 backdrop-blur-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-yellow-400 font-bold flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center space-y-2 text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs opacity-70">{action.description}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
