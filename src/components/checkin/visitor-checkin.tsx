'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { CheckInClient } from '@/lib/checkin-client'
import { VisitorCheckIn as VisitorCheckInType } from '@/types/checkin'
import { CheckCircle, User } from 'lucide-react'

export default function VisitorCheckIn() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    purpose: '',
    email: '',
    phone: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [checkInId, setCheckInId] = useState<string>('')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert('First name and last name are required.')
      return
    }

    setIsSubmitting(true)
    
    try {
      const client = CheckInClient.getInstance()
      const checkIn = await client.addCheckIn({
        type: 'visitor',
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        company: formData.company.trim() || undefined,
        purpose: formData.purpose.trim() || undefined,
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined
      } as Omit<VisitorCheckInType, 'id' | 'timestamp'>)
      
      setCheckInId(checkIn.id)
      setIsSuccess(true)
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          purpose: '',
          email: '',
          phone: ''
        })
      }, 5000)
      
    } catch (error) {
      console.error('Check-in failed:', error)
      alert('Check-in failed. Please check your internet connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCheckOut = async () => {
    try {
      const client = CheckInClient.getInstance()
      const success = await client.checkOut(checkInId)
      
      if (success) {
        alert('Successfully checked out!')
        setIsSuccess(false)
        setCheckInId('')
      } else {
        alert('Check-out failed. Please contact admin.')
      }
    } catch (error) {
      console.error('Check-out error:', error)
      alert('Check-out failed. Please check your internet connection and try again.')
    }
  }

  if (isSuccess) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Welcome to BuildRTP, {formData.firstName}!
            </h3>
            <p className="text-green-700 mb-6">
              You&apos;re now checked in. Please make yourself at home.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={handleCheckOut}
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                Check Out Now
              </Button>
              <p className="text-sm text-green-600">
                Don&apos;t forget to check out when you leave!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Enter your first name"
            required
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Enter your last name"
            required
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-medium">
          Company/Organization
        </Label>
        <Input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          placeholder="Your company or organization (optional)"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose" className="text-sm font-medium">
          Purpose of Visit
        </Label>
        <Textarea
          id="purpose"
          value={formData.purpose}
          onChange={(e) => handleInputChange('purpose', e.target.value)}
          placeholder="What brings you to BuildRTP today? (optional)"
          className="w-full min-h-[80px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com (optional)"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(123) 456-7890 (optional)"
            className="w-full"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting || !formData.firstName.trim() || !formData.lastName.trim()}
        className="w-full bg-mainblue hover:bg-secondaryblue text-white py-3 text-lg"
      >
        {isSubmitting ? (
          <>
            <User className="w-5 h-5 mr-2 animate-spin" />
            Checking In...
          </>
        ) : (
          <>
            <User className="w-5 h-5 mr-2" />
            Check In to BuildRTP
          </>
        )}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        By checking in, you agree to follow BuildRTP&apos;s building policies and guidelines.
      </p>
    </form>
  )
}