'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import Airtable from 'airtable'
import { CheckIn, TeamMember, Event, VisitorCheckIn, EventCheckIn, TeamMemberCheckIn } from '@/types/checkin'

interface AirtableCheckInRecord {
  id: string
  fields: {
    type: 'visitor' | 'team' | 'event'
    timestamp: string
    checkOutTime?: string
    firstName?: string
    lastName?: string
    memberName?: string
    memberId?: string
    eventId?: string
    company?: string
    purpose?: string
    email?: string
    phone?: string
    customFields?: string
  }
}


export class AirtableCheckInStore {
  private static instance: AirtableCheckInStore
  private base: Airtable.Base | null = null
  private initialized = false

  static getInstance(): AirtableCheckInStore {
    if (!AirtableCheckInStore.instance) {
      AirtableCheckInStore.instance = new AirtableCheckInStore()
    }
    return AirtableCheckInStore.instance
  }

  private constructor() {
    this.initializeAirtable()
  }

  private initializeAirtable() {
    if (typeof window === 'undefined') return

    try {
      const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
      const apiKey = process.env.AIRTABLE_API_KEY

      if (!baseId || !apiKey) {
        console.error('Airtable configuration missing. Please set NEXT_PUBLIC_AIRTABLE_BASE_ID and AIRTABLE_API_KEY')
        return
      }

      Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: apiKey
      })

      this.base = Airtable.base(baseId)
      this.initialized = true
    } catch (error) {
      console.error('Failed to initialize Airtable:', error)
    }
  }

  private checkInitialized() {
    if (!this.initialized || !this.base) {
      throw new Error('Airtable not initialized. Please check your configuration.')
    }
  }

  // Check-ins management
  async getCheckIns(): Promise<CheckIn[]> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')
    
    try {
      const records = await this.base('Check-ins').select({
        sort: [{ field: 'timestamp', direction: 'desc' }]
      }).all()

      return records.map((record) => this.convertToCheckIn(record as unknown as AirtableCheckInRecord))
    } catch (error) {
      console.error('Failed to fetch check-ins:', error)
      throw new Error('Failed to fetch check-ins')
    }
  }

  async addCheckIn(checkIn: Omit<CheckIn, 'id' | 'timestamp'>): Promise<CheckIn> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      const fields: Record<string, string | undefined> = {
        type: checkIn.type,
        timestamp: new Date().toISOString()
      }

      if (checkIn.type === 'visitor') {
        const visitor = checkIn as Omit<VisitorCheckIn, 'id' | 'timestamp'>
        fields.firstName = visitor.firstName
        fields.lastName = visitor.lastName
        if (visitor.company) fields.company = visitor.company
        if (visitor.purpose) fields.purpose = visitor.purpose
        if (visitor.email) fields.email = visitor.email
        if (visitor.phone) fields.phone = visitor.phone
      } else if (checkIn.type === 'team') {
        const team = checkIn as Omit<TeamMemberCheckIn, 'id' | 'timestamp'>
        fields.memberName = team.memberName
        fields.memberId = team.memberId
      } else if (checkIn.type === 'event') {
        const event = checkIn as Omit<EventCheckIn, 'id' | 'timestamp'>
        fields.eventId = event.eventId
        fields.firstName = event.firstName
        fields.lastName = event.lastName
        if (event.email) fields.email = event.email
        if (event.customFields) fields.customFields = JSON.stringify(event.customFields)
      }

      const records = await this.base('Check-ins').create([{ fields }])
      return this.convertToCheckIn(records[0] as unknown as AirtableCheckInRecord)
    } catch (error) {
      console.error('Failed to add check-in:', error)
      throw new Error('Failed to add check-in')
    }
  }

  async checkOut(checkInId: string): Promise<boolean> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      await this.base('Check-ins').update([{
        id: checkInId,
        fields: {
          checkOutTime: new Date().toISOString()
        }
      }])
      return true
    } catch (error) {
      console.error('Failed to check out:', error)
      return false
    }
  }

  async getActiveCheckIns(): Promise<CheckIn[]> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      const records = await this.base('Check-ins').select({
        filterByFormula: 'checkOutTime = BLANK()',
        sort: [{ field: 'timestamp', direction: 'desc' }]
      }).all()

      return records.map((record) => this.convertToCheckIn(record as unknown as AirtableCheckInRecord))
    } catch (error) {
      console.error('Failed to fetch active check-ins:', error)
      throw new Error('Failed to fetch active check-ins')
    }
  }

  // Team members management
  async getTeamMembers(): Promise<TeamMember[]> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      const records = await this.base('Team-members').select({
        filterByFormula: 'active = TRUE()',
        sort: [{ field: 'name', direction: 'asc' }]
      }).all()

      return records.map((record) => ({
        id: record.id,
        name: (record.fields as Record<string, any>).name,
        active: (record.fields as Record<string, any>).active
      }))
    } catch (error) {
      console.error('Failed to fetch team members:', error)
      // Return default team members if Airtable fails
      return [
        { id: '1', name: 'Arnav Chauhan', active: true },
        { id: '2', name: 'John Doe', active: true },
        { id: '3', name: 'Jane Smith', active: true }
      ]
    }
  }

  async setTeamMembers(members: TeamMember[]): Promise<void> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      // This is a simplified implementation - in practice you'd want to handle updates more carefully
      const records = members.map(member => ({
        fields: {
          name: member.name,
          active: member.active
        }
      }))

      await this.base('Team-members').create(records)
    } catch (error) {
      console.error('Failed to update team members:', error)
      throw new Error('Failed to update team members')
    }
  }

  // Events management
  async getEvents(): Promise<Event[]> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      const records = await this.base('Events').select({
        sort: [{ field: 'date', direction: 'desc' }]
      }).all()

      return records.map((record) => ({
        id: record.id,
        name: (record.fields as Record<string, any>).name,
        date: (record.fields as Record<string, any>).date,
        customFields: (record.fields as Record<string, any>).customFields ? JSON.parse((record.fields as Record<string, any>).customFields) : []
      }))
    } catch (error) {
      console.error('Failed to fetch events:', error)
      return []
    }
  }

  async setEvents(events: Event[]): Promise<void> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      const records = events.map(event => ({
        fields: {
          name: event.name,
          date: event.date,
          customFields: JSON.stringify(event.customFields)
        }
      }))

      await this.base('Events').create(records)
    } catch (error) {
      console.error('Failed to update events:', error)
      throw new Error('Failed to update events')
    }
  }

  // Settings management
  async getSetting(key: string): Promise<string | null> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      const records = await this.base('Settings').select({
        filterByFormula: `key = "${key}"`
      }).firstPage()

      if (records.length > 0) {
        return (records[0].fields as Record<string, any>).value
      }
      return null
    } catch (error) {
      console.error(`Failed to fetch setting ${key}:`, error)
      return null
    }
  }

  async setSetting(key: string, value: string): Promise<void> {
    this.checkInitialized()
    if (!this.base) throw new Error('Airtable base not available')

    try {
      // Try to find existing record first
      const existingRecords = await this.base('Settings').select({
        filterByFormula: `key = "${key}"`
      }).firstPage()

      if (existingRecords.length > 0) {
        // Update existing
        await this.base('Settings').update([{
          id: existingRecords[0].id,
          fields: { value }
        }])
      } else {
        // Create new
        await this.base('Settings').create([{
          fields: { key, value }
        }])
      }
    } catch (error) {
      console.error(`Failed to set setting ${key}:`, error)
      throw new Error(`Failed to set setting ${key}`)
    }
  }

  // Password management
  async getAdminPassword(): Promise<string> {
    const password = await this.getSetting('admin_password')
    return password || process.env.ADMIN_PASSWORD || 'buildrtp2024'
  }

  async setAdminPassword(password: string): Promise<void> {
    await this.setSetting('admin_password', password)
  }

  async getTeamPassword(): Promise<string> {
    const password = await this.getSetting('team_password')
    return password || process.env.TEAM_PASSWORD || 'buildrtp2024'
  }

  async setTeamPassword(password: string): Promise<void> {
    await this.setSetting('team_password', password)
  }

  async validateAdminPassword(password: string): Promise<boolean> {
    const adminPassword = await this.getAdminPassword()
    return password === adminPassword
  }

  async validateTeamPassword(password: string): Promise<boolean> {
    const teamPassword = await this.getTeamPassword()
    return password === teamPassword
  }

  // Helper method to convert Airtable record to CheckIn
  private convertToCheckIn(record: AirtableCheckInRecord): CheckIn {
    const base = {
      id: record.id,
      type: record.fields.type,
      timestamp: record.fields.timestamp,
      checkOutTime: record.fields.checkOutTime
    }

    if (record.fields.type === 'visitor') {
      return {
        ...base,
        type: 'visitor',
        firstName: record.fields.firstName || '',
        lastName: record.fields.lastName || '',
        company: record.fields.company,
        purpose: record.fields.purpose,
        email: record.fields.email,
        phone: record.fields.phone
      } as VisitorCheckIn
    } else if (record.fields.type === 'team') {
      return {
        ...base,
        type: 'team',
        memberName: record.fields.memberName || '',
        memberId: record.fields.memberId || ''
      } as TeamMemberCheckIn
    } else {
      return {
        ...base,
        type: 'event',
        eventId: record.fields.eventId || '',
        firstName: record.fields.firstName || '',
        lastName: record.fields.lastName || '',
        email: record.fields.email,
        customFields: record.fields.customFields ? JSON.parse(record.fields.customFields) : undefined
      } as EventCheckIn
    }
  }
}