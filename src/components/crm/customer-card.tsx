import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, DollarSign, TrendingUp, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomerCardProps {
  id: string
  name: string
  revenue: number
  deals: number
  status: 'active' | 'pending' | 'inactive'
  lastContact?: string
  email?: string
  phone?: string
  avatar?: string
  className?: string
}

export function CustomerCard({ 
  id, 
  name, 
  revenue, 
  deals, 
  status, 
  lastContact, 
  email, 
  phone, 
  avatar,
  className 
}: CustomerCardProps) {
  const statusColors = {
    active: 'bg-green-500/20 text-green-400 border-green-500/50',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    inactive: 'bg-red-500/20 text-red-400 border-red-500/50'
  }

  return (
    <Card className={cn(
      "p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-400/30 transition-all duration-300 group cursor-pointer",
      "bg-black/50 backdrop-blur-lg hover:bg-black/70",
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            ) : (
              <span className="text-black font-bold text-sm">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">
              {name}
            </h3>
            {lastContact && (
              <p className="text-yellow-400/60 text-sm">Last contact: {lastContact}</p>
            )}
          </div>
        </div>
        <Badge className={statusColors[status]}>
          {status}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center">
            <span className="text-yellow-400/70 text-sm flex items-center">
              <DollarSign className="w-3 h-3 mr-1" />
              Revenue
            </span>
            <span className="text-yellow-400 font-bold">
              ${(revenue / 1000).toFixed(1)}k
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-400/70 text-sm flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Deals
            </span>
            <span className="text-yellow-400 font-bold">{deals}</span>
          </div>
        </div>

        {(email || phone) && (
          <div className="flex items-center space-x-4 text-yellow-400/60 text-sm">
            {email && (
              <div className="flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>{phone}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-yellow-500/20">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-3 h-3",
                  i < 4 ? "text-yellow-400 fill-yellow-400" : "text-yellow-400/30"
                )}
              />
            ))}
            <span className="text-yellow-400/60 text-sm ml-1">4.0</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 p-1"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
