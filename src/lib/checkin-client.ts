'use client'

import { CheckIn, TeamMember } from '@/types/checkin'

export class CheckInClient {
  private static instance: CheckInClient
  
  static getInstance(): CheckInClient {
    if (!CheckInClient.instance) {
      CheckInClient.instance = new CheckInClient()
    }
    return CheckInClient.instance
  }

  // Check-ins management
  async getCheckIns(): Promise<CheckIn[]> {
    try {
      const response = await fetch('/api/checkins')
      if (!response.ok) throw new Error('Failed to fetch check-ins')
      return await response.json()
    } catch (error) {
      console.error('Failed to fetch check-ins:', error)
      throw new Error('Failed to fetch check-ins')
    }
  }

  async addCheckIn(checkIn: Omit<CheckIn, 'id' | 'timestamp'>): Promise<CheckIn> {
    try {
      const response = await fetch('/api/checkins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkIn),
      })
      
      if (!response.ok) throw new Error('Failed to add check-in')
      return await response.json()
    } catch (error) {
      console.error('Failed to add check-in:', error)
      throw new Error('Failed to add check-in')
    }
  }

  async checkOut(checkInId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/checkins/${checkInId}/checkout`, {
        method: 'PATCH',
      })
      
      if (!response.ok) return false
      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('Failed to check out:', error)
      return false
    }
  }

  async getActiveCheckIns(): Promise<CheckIn[]> {
    try {
      const response = await fetch('/api/checkins?activeOnly=true')
      if (!response.ok) throw new Error('Failed to fetch active check-ins')
      return await response.json()
    } catch (error) {
      console.error('Failed to fetch active check-ins:', error)
      throw new Error('Failed to fetch active check-ins')
    }
  }

  // Team members management
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await fetch('/api/team-members')
      if (!response.ok) throw new Error('Failed to fetch team members')
      return await response.json()
    } catch (error) {
      console.error('Failed to fetch team members:', error)
      // Return default team members if API fails
      return [
        { id: '1', name: 'Arnav Chauhan', active: true },
        { id: '2', name: 'John Doe', active: true },
        { id: '3', name: 'Jane Smith', active: true }
      ]
    }
  }

  // Authentication
  async validateAdminPassword(password: string): Promise<boolean> {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, type: 'admin' }),
      })
      
      if (!response.ok) return false
      const result = await response.json()
      return result.valid
    } catch (error) {
      console.error('Failed to validate admin password:', error)
      return false
    }
  }

  async validateTeamPassword(password: string): Promise<boolean> {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, type: 'team' }),
      })
      
      if (!response.ok) return false
      const result = await response.json()
      return result.valid
    } catch (error) {
      console.error('Failed to validate team password:', error)
      return false
    }
  }
}