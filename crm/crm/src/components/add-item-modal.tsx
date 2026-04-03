'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, User, Mail, Phone, Building, DollarSign, Calendar, CheckSquare, AlertCircle } from 'lucide-react'

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'contact' | 'deal' | 'task'
  onAdd: (data: any) => void
}

export function AddItemModal({ isOpen, onClose, type, onAdd }: AddItemModalProps) {
  const [formData, setFormData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newItem = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    
    onAdd(newItem)
    setFormData({})
    setIsSubmitting(false)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const getTitle = () => {
    switch (type) {
      case 'contact': return 'Add New Contact'
      case 'deal': return 'Add New Deal'
      case 'task': return 'Add New Task'
      default: return 'Add Item'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'contact': return <User className="w-6 h-6" />
      case 'deal': return <DollarSign className="w-6 h-6" />
      case 'task': return <CheckSquare className="w-6 h-6" />
      default: return <AlertCircle className="w-6 h-6" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="modern-card w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <div className="text-blue-600">{getIcon()}</div>
            </div>
            {getTitle()}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'contact' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      className="modern-input w-full pl-10"
                      placeholder="Enter contact name"
                      value={formData.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      className="modern-input w-full pl-10"
                      placeholder="Enter email address"
                      value={formData.email || ''}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      className="modern-input w-full pl-10"
                      placeholder="Enter phone number"
                      value={formData.phone || ''}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="modern-input w-full pl-10"
                      placeholder="Enter company name"
                      value={formData.company || ''}
                      onChange={(e) => handleChange('company', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    className="modern-input w-full"
                    value={formData.status || 'active'}
                    onChange={(e) => handleChange('status', e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </>
            )}

            {type === 'deal' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deal Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="modern-input w-full"
                    placeholder="Enter deal title"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      className="modern-input w-full pl-10"
                      placeholder="Enter company name"
                      value={formData.company || ''}
                      onChange={(e) => handleChange('company', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      required
                      min="0"
                      className="modern-input w-full pl-10"
                      placeholder="Enter deal value"
                      value={formData.value || ''}
                      onChange={(e) => handleChange('value', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stage
                  </label>
                  <select
                    className="modern-input w-full"
                    value={formData.stage || 'lead'}
                    onChange={(e) => handleChange('stage', e.target.value)}
                  >
                    <option value="lead">Lead</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed-won">Closed Won</option>
                    <option value="closed-lost">Closed Lost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Close Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      className="modern-input w-full pl-10"
                      value={formData.closeDate || ''}
                      onChange={(e) => handleChange('closeDate', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {type === 'task' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="modern-input w-full"
                    placeholder="Enter task title"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="modern-input w-full h-20 resize-none"
                    placeholder="Enter task description"
                    value={formData.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    className="modern-input w-full"
                    value={formData.priority || 'medium'}
                    onChange={(e) => handleChange('priority', e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      className="modern-input w-full pl-10"
                      value={formData.dueDate || ''}
                      onChange={(e) => handleChange('dueDate', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignee
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="modern-input w-full pl-10"
                      placeholder="Enter assignee name"
                      value={formData.assignee || ''}
                      onChange={(e) => handleChange('assignee', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                className="modern-button flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="modern-button-outline flex-1"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
