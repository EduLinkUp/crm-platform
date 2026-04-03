'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddItemModal } from "@/components/add-item-modal"
import { 
  Users, 
  TrendingUp, 
  Activity,
  Target,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Star,
  Plus,
  UserPlus,
  Briefcase,
  CheckSquare
} from "lucide-react"

interface DashboardData {
  user: {
    id: string
    email: string
    name: string
  }
  metrics: {
    organizationCount: number
    totalApiCalls: number
    storageUsed: number
    totalRevenue: number
    activeUsers: number
    conversionRate: number
    customerSatisfaction: number
    dealsInPipeline: number
  }
  recentActivities: Array<{
    id: string
    type: string
    title: string
    time: string
    status: string
  }>
  topCustomers: Array<{
    id: string
    name: string
    revenue: number
    deals: number
    status: string
  }>
}

export function DashboardClient({ data }: { data: DashboardData }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'contact' | 'deal' | 'task'>('contact')
  const openModal = (type: 'contact' | 'deal' | 'task') => {
    setModalType(type)
    setModalOpen(true)
  }

  const handleViewAllActivities = () => {
    alert('View all activities! This would navigate to the full activities page.')
  }

  const handleViewAllCustomers = () => {
    alert('View all customers! This would navigate to the customers page.')
  }

  const handleAddContact = (newContact: any) => {
    const existingContacts = JSON.parse(localStorage.getItem('crm_contacts') || '[]')
    const updatedContacts = [newContact, ...existingContacts]
    localStorage.setItem('crm_contacts', JSON.stringify(updatedContacts))
    
    // Add to recent activities
    const newActivity = {
      id: Date.now().toString(),
      type: 'contact',
      title: `New contact added: ${newContact.name}`,
      time: 'Just now',
      status: 'new'
    }
    const existingActivities = JSON.parse(localStorage.getItem('crm_activities') || '[]')
    localStorage.setItem('crm_activities', JSON.stringify([newActivity, ...existingActivities]))
    
    alert(`Contact "${newContact.name}" added successfully!`)
    window.location.reload()
  }

  const handleAddDeal = (newDeal: any) => {
    const existingDeals = JSON.parse(localStorage.getItem('crm_deals') || '[]')
    const updatedDeals = [newDeal, ...existingDeals]
    localStorage.setItem('crm_deals', JSON.stringify(updatedDeals))
    
    // Add to recent activities
    const newActivity = {
      id: Date.now().toString(),
      type: 'deal',
      title: `New deal created: ${newDeal.title}`,
      time: 'Just now',
      status: 'new'
    }
    const existingActivities = JSON.parse(localStorage.getItem('crm_activities') || '[]')
    localStorage.setItem('crm_activities', JSON.stringify([newActivity, ...existingActivities]))
    
    alert(`Deal "${newDeal.title}" created successfully!`)
    window.location.reload()
  }

  const handleAddTask = (newTask: any) => {
    const existingTasks = JSON.parse(localStorage.getItem('crm_tasks') || '[]')
    const updatedTasks = [newTask, ...existingTasks]
    localStorage.setItem('crm_tasks', JSON.stringify(updatedTasks))
    
    // Add to recent activities
    const newActivity = {
      id: Date.now().toString(),
      type: 'task',
      title: `New task assigned: ${newTask.title}`,
      time: 'Just now',
      status: 'new'
    }
    const existingActivities = JSON.parse(localStorage.getItem('crm_activities') || '[]')
    localStorage.setItem('crm_activities', JSON.stringify([newActivity, ...existingActivities]))
    
    alert(`Task "${newTask.title}" added successfully!`)
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                CRM Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Welcome back, <span className="font-medium">{data.user.name || data.user.email}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="modern-badge-success">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                System Online
              </Badge>
              <div className="flex items-center space-x-2">
                <Button className="modern-button" onClick={() => openModal('contact')}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
                <Button className="modern-button" onClick={() => openModal('deal')}>
                  <Briefcase className="w-4 h-4 mr-2" />
                  Add Deal
                </Button>
                <Button className="modern-button" onClick={() => openModal('task')}>
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="modern-stats-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Organizations
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data.metrics.organizationCount}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-green-500">12%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card className="modern-stats-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                API Calls
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data.metrics.totalApiCalls.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-green-500">8%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card className="modern-stats-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${(data.metrics.totalRevenue / 100).toFixed(2)}k
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-green-500">23%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card className="modern-stats-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Conversion Rate
              </CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data.metrics.conversionRate}%
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <ArrowDown className="w-3 h-3 mr-1 text-red-500" />
                <span className="text-red-500">3%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="modern-card mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-900 font-bold flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activities
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="modern-button-outline" onClick={() => openModal('task')}>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
              <Button variant="outline" className="modern-button-outline" onClick={handleViewAllActivities}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-400' :
                      activity.status === 'new' ? 'bg-blue-400' :
                      activity.status === 'scheduled' ? 'bg-purple-400' :
                      activity.status === 'sent' ? 'bg-cyan-400' :
                      'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="text-gray-900 font-medium">{activity.title}</p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="modern-button-outline text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="modern-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-900 font-bold flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Top Customers
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="modern-button-outline" onClick={() => openModal('contact')}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
              <Button variant="outline" className="modern-button-outline" onClick={() => openModal('deal')}>
                <Briefcase className="w-4 h-4 mr-2" />
                Add Deal
              </Button>
              <Button variant="outline" className="modern-button-outline" onClick={handleViewAllCustomers}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.topCustomers.map((customer) => (
                <div key={customer.id} className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                      {customer.name}
                    </h3>
                    <Badge className={`${
                      customer.status === 'active' ? 'modern-badge-success' :
                      'modern-badge-warning'
                    }`}>
                      {customer.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revenue</span>
                      <span className="text-gray-900 font-bold">${(customer.revenue / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deals</span>
                      <span className="text-gray-900 font-bold">{customer.deals}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Item Modal */}
      <AddItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        onAdd={(data) => {
          if (modalType === 'contact') handleAddContact(data)
          else if (modalType === 'deal') handleAddDeal(data)
          else if (modalType === 'task') handleAddTask(data)
        }}
      />
    </div>
  )
}
