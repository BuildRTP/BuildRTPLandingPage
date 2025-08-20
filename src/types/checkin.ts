export type CheckInType = 'visitor' | 'event' | 'team'

export interface BaseCheckIn {
  id: string
  type: CheckInType
  timestamp: string
  checkOutTime?: string
}

export interface VisitorCheckIn extends BaseCheckIn {
  type: 'visitor'
  firstName: string
  lastName: string
  company?: string
  purpose?: string
  email?: string
  phone?: string
}

export interface EventCheckIn extends BaseCheckIn {
  type: 'event'
  eventId: string
  firstName: string
  lastName: string
  email?: string
  customFields?: Record<string, string | number | boolean>
}

export interface TeamMemberCheckIn extends BaseCheckIn {
  type: 'team'
  memberName: string
  memberId: string
}

export type CheckIn = VisitorCheckIn | EventCheckIn | TeamMemberCheckIn

export interface TeamMember {
  id: string
  name: string
  active: boolean
}

export interface Event {
  id: string
  name: string
  date: string
  customFields: Array<{
    id: string
    label: string
    type: 'text' | 'email' | 'select'
    required: boolean
    options?: string[]
  }>
}