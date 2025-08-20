'use client'

import { CheckIn, TeamMember, Event } from '@/types/checkin'

const STORAGE_KEYS = {
  CHECKINS: 'buildrtp_checkins',
  TEAM_MEMBERS: 'buildrtp_team_members',
  EVENTS: 'buildrtp_events',
  ADMIN_PASSWORD: 'buildrtp_admin_password'
}

export class CheckInStore {
  private static instance: CheckInStore
  
  static getInstance(): CheckInStore {
    if (!CheckInStore.instance) {
      CheckInStore.instance = new CheckInStore()
    }
    return CheckInStore.instance
  }

  private getFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  private setToStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  // Check-ins management
  getCheckIns(): CheckIn[] {
    return this.getFromStorage(STORAGE_KEYS.CHECKINS, [])
  }

  addCheckIn(checkIn: Omit<CheckIn, 'id' | 'timestamp'>): CheckIn {
    const newCheckIn: CheckIn = {
      ...checkIn,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    } as CheckIn

    const checkIns = this.getCheckIns()
    checkIns.push(newCheckIn)
    this.setToStorage(STORAGE_KEYS.CHECKINS, checkIns)
    return newCheckIn
  }

  checkOut(checkInId: string): boolean {
    const checkIns = this.getCheckIns()
    const checkInIndex = checkIns.findIndex(c => c.id === checkInId)
    
    if (checkInIndex !== -1) {
      checkIns[checkInIndex].checkOutTime = new Date().toISOString()
      this.setToStorage(STORAGE_KEYS.CHECKINS, checkIns)
      return true
    }
    return false
  }

  getActiveCheckIns(): CheckIn[] {
    return this.getCheckIns().filter(c => !c.checkOutTime)
  }

  // Team members management
  getTeamMembers(): TeamMember[] {
    return this.getFromStorage(STORAGE_KEYS.TEAM_MEMBERS, [
      { id: '1', name: 'Arnav Chauhan', active: true },
      { id: '2', name: 'John Doe', active: true },
      { id: '3', name: 'Jane Smith', active: true }
    ])
  }

  setTeamMembers(members: TeamMember[]): void {
    this.setToStorage(STORAGE_KEYS.TEAM_MEMBERS, members)
  }

  // Events management
  getEvents(): Event[] {
    return this.getFromStorage(STORAGE_KEYS.EVENTS, [])
  }

  setEvents(events: Event[]): void {
    this.setToStorage(STORAGE_KEYS.EVENTS, events)
  }

  // Admin password
  getAdminPassword(): string {
    return this.getFromStorage(STORAGE_KEYS.ADMIN_PASSWORD, 'buildrtp2024')
  }

  setAdminPassword(password: string): void {
    this.setToStorage(STORAGE_KEYS.ADMIN_PASSWORD, password)
  }

  validateAdminPassword(password: string): boolean {
    return password === this.getAdminPassword()
  }
}