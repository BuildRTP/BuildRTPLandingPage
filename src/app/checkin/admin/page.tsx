'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckInStore } from '@/lib/checkin-store'
import { CheckIn, VisitorCheckIn, TeamMemberCheckIn } from '@/types/checkin'
import { 
  Users, 
  UserCheck, 
  Calendar, 
  ArrowLeft, 
  Clock, 
  LogOut,
  Eye,
  EyeOff,
  Download
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [activeCheckIns, setActiveCheckIns] = useState<CheckIn[]>([])
  const [filter, setFilter] = useState<'all' | 'visitor' | 'team' | 'event'>('all')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = () => {
    const store = CheckInStore.getInstance()
    const allCheckIns = store.getCheckIns()
    const activeOnes = store.getActiveCheckIns()
    
    setCheckIns(allCheckIns.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
    setActiveCheckIns(activeOnes)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const store = CheckInStore.getInstance()
    
    if (store.validateAdminPassword(password)) {
      setIsAuthenticated(true)
      loadData()
    } else {
      alert('Invalid admin password')
    }
  }

  const handleCheckOut = (checkInId: string) => {
    const store = CheckInStore.getInstance()
    const success = store.checkOut(checkInId)
    
    if (success) {
      loadData()
      alert('Successfully checked out!')
    } else {
      alert('Check-out failed')
    }
  }

  const exportData = () => {
    const data = {
      checkIns: checkIns,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `buildrtp-checkins-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getStatusBadge = (checkIn: CheckIn) => {
    if (checkIn.checkOutTime) {
      return <Badge variant="secondary">Checked Out</Badge>
    }
    return <Badge variant="default" className="bg-green-600">Active</Badge>
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      visitor: 'bg-blue-600',
      team: 'bg-purple-600',
      event: 'bg-orange-600'
    }
    return <Badge className={colors[type as keyof typeof colors] || 'bg-gray-600'}>{type}</Badge>
  }

  const filteredCheckIns = filter === 'all' 
    ? checkIns 
    : checkIns.filter(c => c.type === filter)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Admin Login
              </CardTitle>
              <CardDescription>
                Enter the admin password to access the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Login to Dashboard
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <Link href="/checkin">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Check-In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-mainblue mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage check-ins and view building activity</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Link href="/checkin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Check-In
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{checkIns.filter(c => c.type === 'visitor').length}</p>
                  <p className="text-sm text-gray-600">Total Visitors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <UserCheck className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{checkIns.filter(c => c.type === 'team').length}</p>
                  <p className="text-sm text-gray-600">Team Check-ins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{checkIns.filter(c => c.type === 'event').length}</p>
                  <p className="text-sm text-gray-600">Event Attendees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{activeCheckIns.length}</p>
                  <p className="text-sm text-gray-600">Currently In Building</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Currently In Building */}
        {activeCheckIns.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Currently In Building ({activeCheckIns.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeCheckIns.map((checkIn) => (
                  <Card key={checkIn.id} className="bg-green-50 border-green-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">
                          {checkIn.type === 'visitor' && `${(checkIn as VisitorCheckIn).firstName} ${(checkIn as VisitorCheckIn).lastName}`}
                          {checkIn.type === 'team' && (checkIn as TeamMemberCheckIn).memberName}
                          {checkIn.type === 'event' && 'Event Attendee'}
                        </div>
                        {getTypeBadge(checkIn.type)}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Checked in: {formatDateTime(checkIn.timestamp)}
                      </p>
                      <Button
                        onClick={() => handleCheckOut(checkIn.id)}
                        size="sm"
                        variant="outline"
                        className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Check Out
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Check-ins */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Check-ins ({filteredCheckIns.length})</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'visitor' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('visitor')}
                >
                  Visitors
                </Button>
                <Button
                  variant={filter === 'team' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('team')}
                >
                  Team
                </Button>
                <Button
                  variant={filter === 'event' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('event')}
                >
                  Events
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCheckIns.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No check-ins found.</p>
              ) : (
                filteredCheckIns.map((checkIn) => (
                  <Card key={checkIn.id} className="border-l-4 border-l-mainblue">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="font-medium">
                            {checkIn.type === 'visitor' && `${(checkIn as VisitorCheckIn).firstName} ${(checkIn as VisitorCheckIn).lastName}`}
                            {checkIn.type === 'team' && (checkIn as TeamMemberCheckIn).memberName}
                            {checkIn.type === 'event' && 'Event Attendee'}
                          </div>
                          {getTypeBadge(checkIn.type)}
                          {getStatusBadge(checkIn)}
                        </div>
                        {!checkIn.checkOutTime && (
                          <Button
                            onClick={() => handleCheckOut(checkIn.id)}
                            size="sm"
                            variant="outline"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Check Out
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Check-in:</span> {formatDateTime(checkIn.timestamp)}
                        </div>
                        {checkIn.checkOutTime && (
                          <div>
                            <span className="font-medium">Check-out:</span> {formatDateTime(checkIn.checkOutTime)}
                          </div>
                        )}
                        {checkIn.type === 'visitor' && (checkIn as VisitorCheckIn).company && (
                          <div>
                            <span className="font-medium">Company:</span> {(checkIn as VisitorCheckIn).company}
                          </div>
                        )}
                      </div>
                      
                      {checkIn.type === 'visitor' && (checkIn as VisitorCheckIn).purpose && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Purpose:</span> {(checkIn as VisitorCheckIn).purpose}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}