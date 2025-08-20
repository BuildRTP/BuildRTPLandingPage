'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, UserCheck, Calendar, Settings } from 'lucide-react'
import Link from 'next/link'
import VisitorCheckIn from '@/components/checkin/visitor-checkin'
import TeamMemberCheckIn from '@/components/checkin/team-member-checkin'
import EventCheckIn from '@/components/checkin/event-checkin'
import { CheckInType } from '@/types/checkin'

export default function CheckInPage() {
  const [activeTab, setActiveTab] = useState<CheckInType>('visitor')

  const tabs = [
    {
      id: 'visitor' as CheckInType,
      label: 'Visitor Check-In',
      icon: Users,
      description: 'For building visitors'
    },
    {
      id: 'team' as CheckInType,
      label: 'Team Member',
      icon: UserCheck,
      description: 'For BuildRTP team members'
    },
    {
      id: 'event' as CheckInType,
      label: 'Event Check-In',
      icon: Calendar,
      description: 'For event attendees'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-mainblue mb-2">BuildRTP Check-In System</h1>
          <p className="text-gray-600">Welcome to our building. Please check in below.</p>
        </div>

        {/* Admin Link */}
        <div className="flex justify-end mb-6">
          <Link href="/checkin/admin">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Admin Dashboard
            </Button>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className="flex-col h-auto p-4 min-w-[140px]"
              >
                <Icon className="w-6 h-6 mb-2" />
                <div className="text-sm font-medium">{tab.label}</div>
                <div className="text-xs opacity-70">{tab.description}</div>
              </Button>
            )
          })}
        </div>

        {/* Active Tab Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const activeTabData = tabs.find(t => t.id === activeTab)
                if (activeTabData) {
                  const Icon = activeTabData.icon
                  return <Icon className="w-5 h-5" />
                }
                return null
              })()}
              {tabs.find(t => t.id === activeTab)?.label}
            </CardTitle>
            <CardDescription>
              {activeTab === 'visitor' && 'Please fill out your information to check into the building.'}
              {activeTab === 'team' && 'Team members can check in and out using their credentials.'}
              {activeTab === 'event' && 'Check in for specific events happening at BuildRTP.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === 'visitor' && <VisitorCheckIn />}
            {activeTab === 'team' && <TeamMemberCheckIn />}
            {activeTab === 'event' && <EventCheckIn />}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>BuildRTP - Research Triangle Park&apos;s Student-Driven Innovation Hub</p>
        </div>
      </div>
    </div>
  )
}