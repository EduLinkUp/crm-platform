import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  DollarSign, 
  Calendar, 
  User, 
  MoreHorizontal,
  Clock,
  TrendingUp,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PipelineCardProps {
  id: string
  title: string
  company: string
  value: number
  stage: string
  probability: number
  expectedClose: string
  owner: string
  createdAt: string
  className?: string
}

const stageColors = {
  discovery: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  qualification: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  proposal: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  negotiation: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  closing: 'bg-green-500/20 text-green-400 border-green-500/50',
  won: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
  lost: 'bg-red-500/20 text-red-400 border-red-500/50',
}

const getProbabilityColor = (probability: number) => {
  if (probability >= 75) return 'text-green-400 bg-green-500/20'
  if (probability >= 50) return 'text-yellow-400 bg-yellow-500/20'
  if (probability >= 25) return 'text-orange-400 bg-orange-500/20'
  return 'text-red-400 bg-red-500/20'
}

export function PipelineCard({ 
  id, 
  title, 
  company, 
  value, 
  stage, 
  probability, 
  expectedClose, 
  owner, 
  createdAt,
  className 
}: PipelineCardProps) {
  return (
    <Card className={cn(
      "border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group cursor-pointer",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors mb-1">
              {title}
            </h3>
            <p className="text-yellow-400/60 text-sm">{company}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-yellow-400/60" />
            <span className="text-yellow-400 font-bold text-lg">
              ${(value / 1000).toFixed(0)}k
            </span>
          </div>
          <Badge className={stageColors[stage as keyof typeof stageColors]}>
            {stage.charAt(0).toUpperCase() + stage.slice(1)}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-yellow-400/70">Probability</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-yellow-500/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    probability >= 75 ? 'bg-green-400' :
                    probability >= 50 ? 'bg-yellow-400' :
                    probability >= 25 ? 'bg-orange-400' :
                    'bg-red-400'
                  }`}
                  style={{ width: `${probability}%` }}
                ></div>
              </div>
              <span className={`font-medium ${
                probability >= 75 ? 'text-green-400' :
                probability >= 50 ? 'text-yellow-400' :
                probability >= 25 ? 'text-orange-400' :
                'text-red-400'
              }`}>
                {probability}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-yellow-400/70">
            <Calendar className="w-4 h-4" />
            <span>{expectedClose}</span>
          </div>
          <div className="flex items-center space-x-2 text-yellow-400/70">
            <User className="w-4 h-4" />
            <span>{owner}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-yellow-500/20">
          <div className="flex items-center space-x-2 text-yellow-400/60 text-xs">
            <Clock className="w-3 h-3" />
            <span>Created {createdAt}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 p-1"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
