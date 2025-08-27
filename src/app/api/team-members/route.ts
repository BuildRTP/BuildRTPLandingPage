/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import Airtable from 'airtable'
// import bcrypt from 'bcryptjs' // if you later store hashed passwords

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY })
const base = Airtable.base(
  process.env.AIRTABLE_BASE_ID || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!
)

const CHECKINS_TABLE = process.env.AIRTABLE_CHECKINS_TABLE || 'Check-ins'
const TEAM_MEMBERS_TABLE = 'TeamMembers'

// Check-ins fields
const CI_TYPE = 'type'
const CI_FIRST = 'firstName'
const CI_LAST = 'lastName'
const CI_TS = 'timestamp'
// Plain-text field on Check-ins to store the TeamMember record id:
const CI_MEMBER_ID = process.env.AIRTABLE_CHECKINS_MEMBER_ID_FIELD || 'memberId'

// TeamMembers fields
const TM_FIRST = 'firstName'
const TM_LAST = 'lastName'
const TM_ACTIVE = 'active'
const TM_TOTALCHECK_INS = 'Total-Check-ins'
const TM_PASSWORD = 'password' // per-member password (plain text for MVP)

// ---------- GET: fetch active team members (no passwords) ----------
export async function GET() {
  try {
    const filterFormula = `{${TM_ACTIVE}} = TRUE()`

    const records = await base(TEAM_MEMBERS_TABLE)
      .select({
        fields: [TM_FIRST, TM_LAST, TM_ACTIVE, TM_TOTALCHECK_INS],
        filterByFormula: filterFormula,
        sort: [
          { field: TM_FIRST, direction: 'asc' },
          { field: TM_LAST, direction: 'asc' },
        ],
      })
      .all()

    const payload = records.map((r) => {
      const firstName = (r.fields as any)[TM_FIRST] ?? ''
      const lastName  = (r.fields as any)[TM_LAST]  ?? ''
      return {
        id: r.id,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim(),
        active: !!(r.fields as any)[TM_ACTIVE],
        totalCheckIns: (r.fields as any)[TM_TOTALCHECK_INS] ?? 0,
      }
    })

    return NextResponse.json(payload)
  } catch (err) {
    console.error('GET /api/team-members failed:', err)
    return NextResponse.json(
      { error: 'Failed to fetch team members.' },
      { status: 500 }
    )
  }
}

// ---------- POST: verify per-member password, then create check-in ----------
type PostBody = {
  memberId?: string
  password?: string
  name?: string
  firstName?: string
  lastName?: string
}

function splitName(full: string) {
  const cleaned = (full || '').trim().replace(/\s+/g, ' ')
  const [first, ...rest] = cleaned.split(' ')
  return { firstName: first || '', lastName: rest.join(' ').trim() }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PostBody

    const memberId = (body.memberId || '').trim()
    const providedPassword = (body.password ?? '').toString().trim()

    if (!memberId) {
      return NextResponse.json({ error: 'memberId is required.' }, { status: 400 })
    }
    if (!providedPassword) {
      return NextResponse.json({ error: 'password is required.' }, { status: 400 })
    }

    // 1) Fetch TeamMember and verify password
    let memberRec
    try {
      memberRec = await base(TEAM_MEMBERS_TABLE).find(memberId)
    } catch {
      return NextResponse.json({ error: 'Team member not found.' }, { status: 404 })
    }

    const m = memberRec.fields as any
    const expectedPassword = (m[TM_PASSWORD] ?? '').toString().trim()
    // Plain compare for MVP (swap to bcrypt.compare if you store hashes)
    if (providedPassword !== expectedPassword) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
    }

    // 2) Resolve names (prefer Airtable values)
    const tmFirst = (m[TM_FIRST] || '').toString().trim()
    const tmLast  = (m[TM_LAST]  || '').toString().trim()

    let firstName = (body.firstName || '').trim()
    let lastName  = (body.lastName  || '').trim()

    if ((!firstName || !lastName) && body.name) {
      const s = splitName(body.name)
      firstName = firstName || s.firstName
      lastName  = lastName  || s.lastName
    }
    if (!firstName) firstName = tmFirst
    if (!lastName)  lastName  = tmLast

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Could not resolve first/last name.' },
        { status: 400 }
      )
    }

    // 3) Create Check-in record (includes plain-text memberId field)
    const fields: Record<string, any> = {
      [CI_TYPE]: 'team',
      [CI_FIRST]: firstName,
      [CI_LAST]: lastName,
      [CI_TS]: new Date().toISOString(),
      [CI_MEMBER_ID]: memberId, // <-- store TeamMember record id here
    }

    const [rec] = await base(CHECKINS_TABLE).create([{ fields }], { typecast: true })
    return NextResponse.json({ id: rec.id, fields: rec.fields }, { status: 201 })
  } catch (err) {
    console.error('POST /api/team-members (password-verify) failed:', err)
    return NextResponse.json(
      { error: 'Failed to create team check-in.' },
      { status: 500 }
    )
  }
}
