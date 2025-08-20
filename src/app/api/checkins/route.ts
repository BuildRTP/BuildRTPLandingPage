/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'
import { CheckIn, VisitorCheckIn, TeamMemberCheckIn, EventCheckIn } from '@/types/checkin'

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
})

const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!)

function convertToCheckIn(record: any): CheckIn {
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('activeOnly') === 'true'

    const selectOptions: any = {
      sort: [{ field: 'timestamp', direction: 'desc' }]
    }

    if (activeOnly) {
      selectOptions.filterByFormula = 'checkOutTime = BLANK()'
    }

    const records = await base('Check-ins').select(selectOptions).all()
    const checkIns = records.map(record => convertToCheckIn(record))

    return NextResponse.json(checkIns)
  } catch (error) {
    console.error('Failed to fetch check-ins:', error)
    return NextResponse.json(
      { error: 'Failed to fetch check-ins' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check environment variables first
    if (!process.env.AIRTABLE_API_KEY || !process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
      console.error('Missing Airtable configuration:', {
        hasApiKey: !!process.env.AIRTABLE_API_KEY,
        hasBaseId: !!process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
      })
      return NextResponse.json(
        { error: 'Airtable not configured' },
        { status: 500 }
      )
    }

    const checkInData = await request.json()
    console.log('Received check-in data:', checkInData)

    const fields: any = {
      type: checkInData.type,
      timestamp: new Date().toISOString()
    }

    if (checkInData.type === 'visitor') {
      fields.firstName = checkInData.firstName
      fields.lastName = checkInData.lastName
      if (checkInData.company) fields.company = checkInData.company
      if (checkInData.purpose) fields.purpose = checkInData.purpose
      if (checkInData.email) fields.email = checkInData.email
      if (checkInData.phone) fields.phone = checkInData.phone
    } else if (checkInData.type === 'team') {
      fields.memberName = checkInData.memberName
      fields.memberId = checkInData.memberId
    } else if (checkInData.type === 'event') {
      fields.eventId = checkInData.eventId
      fields.firstName = checkInData.firstName
      fields.lastName = checkInData.lastName
      if (checkInData.email) fields.email = checkInData.email
      if (checkInData.customFields) fields.customFields = JSON.stringify(checkInData.customFields)
    }

    console.log('Sending to Airtable:', fields)

    const records = await base('Check-ins').create([{ fields }])
    console.log('Airtable response:', records[0])
    
    const checkIn = convertToCheckIn(records[0])

    return NextResponse.json(checkIn)
  } catch (error: any) {
    console.error('Failed to add check-in:', {
      message: error.message,
      stack: error.stack,
      airtableError: error.error,
      statusCode: error.statusCode
    })
    return NextResponse.json(
      { 
        error: 'Failed to add check-in',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}