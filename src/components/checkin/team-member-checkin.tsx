'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { CheckInClient } from '@/lib/checkin-client'
import { TeamMemberCheckIn as TeamMemberCheckInType, TeamMember } from '@/types/checkin'
import { CheckCircle, Lock, UserCheck, LogOut } from 'lucide-react'

export default function TeamMemberCheckIn() {
  const [step, setStep] = useState<'password' | 'select' | 'success'>('password')
  const [password, setPassword] = useState('')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [checkInId, setCheckInId] = useState<string>('')
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const client = CheckInClient.getInstance()
      const isValid = await client.validateTeamPassword(password)
      
      if (isValid) {
        const members = await client.getTeamMembers()
        setTeamMembers(members)
        setStep('select')
      } else {
        alert('Invalid password. Please contact admin.')
      }
    } catch (error) {
      console.error('Password validation error:', error)
      alert('Unable to validate password. Please check your internet connection.')
    }
  }

  const handleMemberSelect = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const handleCheckIn = async () => {
    if (!selectedMember) return

    try {
      const client = CheckInClient.getInstance()
      const checkIn = await client.addCheckIn({
        type: 'team',
        firstName: selectedMember.name,
        lastName: selectedMember.name,
        memberId: selectedMember.id
      } as Omit<TeamMemberCheckInType, 'id' | 'timestamp'>)
      
      setCheckInId(checkIn.id)
      setIsCheckedIn(true)
      setStep('success')
    } catch (error) {
      console.error('Check-in error:', error)
      alert('Check-in failed. Please check your internet connection and try again.')
    }
  }

  const handleCheckOut = async () => {
    try {
      const client = CheckInClient.getInstance()
      const success = await client.checkOut(checkInId)
      
      if (success) {
        alert('Successfully checked out!')
        setStep('password')
        setPassword('')
        setSelectedMember(null)
        setIsCheckedIn(false)
        setCheckInId('')
      } else {
        alert('Check-out failed. Please contact admin.')
      }
    } catch (error) {
      console.error('Check-out error:', error)
      alert('Check-out failed. Please check your internet connection and try again.')
    }
  }

  const reset = () => {
    setStep('password')
    setPassword('')
    setSelectedMember(null)
    setIsCheckedIn(false)
    setCheckInId('')
  }

  if (step === 'password') {
    return (
      <div className="space-y-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Team Member Access</h3>
            </div>
            <p className="text-blue-700 mb-4">
              Enter the team password to access the member list.
            </p>
          </CardContent>
        </Card>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Team Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter team password"
              required
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={!password.trim()}
            className="w-full bg-mainblue hover:bg-secondaryblue text-white"
          >
            <Lock className="w-4 h-4 mr-2" />
            Access Team Check-In
          </Button>
        </form>
      </div>
    )
  }

  if (step === 'select') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select Your Name</h3>
          <Button variant="outline" size="sm" onClick={reset}>
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {teamMembers.filter(m => m.active).map((member) => (
            <Button
              key={member.id}
              variant={selectedMember?.id === member.id ? "default" : "outline"}
              onClick={() => handleMemberSelect(member)}
              className="h-auto p-4 text-left justify-start"
            >
              <UserCheck className="w-5 h-5 mr-3" />
              {member.name}
            </Button>
          ))}
        </div>

        {selectedMember && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <UserCheck className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Welcome, {selectedMember.name}!
                </h4>
                <Button 
                  onClick={handleCheckIn}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Check In
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (step === 'success' && isCheckedIn) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Welcome back, {selectedMember?.name}!
            </h3>
            <p className="text-green-700 mb-6">
              You&apos;re now checked in to BuildRTP.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleCheckOut}
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Check Out
              </Button>
              <div>
                <Button 
                  onClick={reset}
                  variant="ghost" 
                  size="sm"
                  className="text-green-600"
                >
                  Check In Someone Else
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}