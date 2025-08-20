import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
})

const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!)

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await base('Check-ins').update([{
      id: id,
      fields: {
        checkOutTime: new Date().toISOString()
      }
    }])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to check out:', error)
    return NextResponse.json(
      { error: 'Failed to check out' },
      { status: 500 }
    )
  }
}