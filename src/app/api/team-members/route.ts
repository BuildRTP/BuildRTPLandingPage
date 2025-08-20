/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import Airtable from 'airtable'
import { TeamMember } from '@/types/checkin'

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
})

const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!)

export async function GET() {
  try {
    const records = await base('Team-members').select({
      filterByFormula: 'active = TRUE()',
      sort: [{ field: 'name', direction: 'asc' }]
    }).all()

    const teamMembers: TeamMember[] = records.map((record) => ({
      id: record.id,
      name: (record.fields as any).name,
      active: (record.fields as any).active
    }))

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('Failed to fetch team members:', error)
    // Return default team members if Airtable fails
    const defaultMembers: TeamMember[] = [
      { id: '1', name: 'Arnav Chauhan', active: true },
      { id: '2', name: 'John Doe', active: true },
      { id: '3', name: 'Jane Smith', active: true }
    ]
    return NextResponse.json(defaultMembers)
  }
}