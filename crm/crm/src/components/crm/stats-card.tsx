import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: "increase" | "decrease"
  icon: LucideIcon
  description?: string
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  description, 
  className 
}: StatsCardProps) {
  const isPositive = changeType === "increase"
  
  return (
    <Card className={cn(
      "border-yellow-500/30 bg-black/50 backdrop-blur-lg hover:border-yellow-400/50 transition-all duration-300 group",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-yellow-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black text-yellow-400 mb-1">
          {value}
        </div>
        {change !== undefined && (
          <div className="flex items-center text-xs text-yellow-400/70">
            {isPositive ? (
              <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
            ) : (
              <ArrowDown className="w-3 h-3 mr-1 text-red-400" />
            )}
            <span className={isPositive ? "text-green-400" : "text-red-400"}>
              {Math.abs(change)}%
            </span>
            <span className="ml-1">from last month</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-yellow-400/70 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
