import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasBaseId: !!process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID,
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    baseId: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID?.substring(0, 8) + '...',
    apiKey: process.env.AIRTABLE_API_KEY?.substring(0, 8) + '...',
  })
}