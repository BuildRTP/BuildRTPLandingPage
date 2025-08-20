/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
})

const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!)

async function getSetting(key: string): Promise<string | null> {
  try {
    const records = await base('Settings').select({
      filterByFormula: `key = "${key}"`
    }).firstPage()

    if (records.length > 0) {
      return (records[0].fields as any).value
    }
    return null
  } catch (error) {
    console.error(`Failed to fetch setting ${key}:`, error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password, type } = await request.json()

    let storedPassword: string | null = null
    
    if (type === 'admin') {
      storedPassword = await getSetting('admin_password')
      if (!storedPassword) {
        storedPassword = process.env.ADMIN_PASSWORD || 'buildrtp2024'
      }
    } else if (type === 'team') {
      storedPassword = await getSetting('team_password')
      if (!storedPassword) {
        storedPassword = process.env.TEAM_PASSWORD || 'buildrtp2024'
      }
    }

    const isValid = password === storedPassword

    return NextResponse.json({ valid: isValid })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}