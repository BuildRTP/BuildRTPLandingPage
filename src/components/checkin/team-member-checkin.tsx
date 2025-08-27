'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { CheckInClient } from '@/lib/checkin-client'
import { TeamMember } from '@/types/checkin'
import {
  CheckCircle,
  Eye, EyeOff,
  Loader2,
  Lock,
  LogOut,
  UserCheck
} from 'lucide-react'

type Step = 'teamPassword' | 'select' | 'memberPassword' | 'success'

export default function TeamMemberCheckIn() {
  const [step, setStep] = useState<Step>('teamPassword')

  // team gate
  const [teamPassword, setTeamPassword] = useState('')
  const [validatingTeam, setValidatingTeam] = useState(false)

  // members
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loadingMembers, setLoadingMembers] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // per-member password
  const [memberPassword, setMemberPassword] = useState('')
  const [showMemberPw, setShowMemberPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // outcome
  const [checkInId, setCheckInId] = useState('')
  const [status, setStatus] = useState<string>('')

  const resetAll = () => {
    setStep('teamPassword')
    setTeamPassword('')
    setMembers([])
    setSelectedMember(null)
    setMemberPassword('')
    setShowMemberPw(false)
    setSubmitting(false)
    setCheckInId('')
    setStatus('')
  }

  // 1) Validate shared team password, then load members
  const handleTeamPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('')
    try {
      setValidatingTeam(true)
      const client = CheckInClient.getInstance()

      // Your app already had this:
      const ok = await client.validateTeamPassword(teamPassword.trim())
      if (!ok) {
        setStatus('Invalid team password.')
        return
      }

      // Load members only after secret is validated to avoid SSR hydration diff
      setLoadingMembers(true)
      const list = await client.getTeamMembers()
      setMembers(Array.isArray(list) ? list.filter(m => m.active) : [])
      setStep('select')
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message || 'Unable to validate. Check connection.')
    } finally {
      setValidatingTeam(false)
      setLoadingMembers(false)
    }
  }

  // 2) Select member → go to memberPassword step
  const handleSelect = (m: TeamMember) => {
    setSelectedMember(m)
    setMemberPassword('')
    setStatus('')
    setStep('memberPassword')
  }

  // 3) Verify per-member password (server) and create check-in
  const handleMemberCheckIn = async () => {
    if (!selectedMember) return
    if (!memberPassword.trim()) {
      setStatus('Please enter your password.')
      return
    }
    try {
      setSubmitting(true)
      setStatus('')
      const res = await fetch('/api/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: selectedMember.id,
          password: memberPassword.trim()
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus(data?.error || 'Check-in failed.')
        return
      }
      setCheckInId(data.id)
      setStep('success')
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message || 'Network error.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCheckOut = async () => {
    try {
      const client = CheckInClient.getInstance()
      const ok = await client.checkOut(checkInId)
      if (ok) {
        setStatus('Checked out successfully.')
        resetAll()
      } else {
        setStatus('Check-out failed.')
      }
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message || 'Check-out failed.')
    }
  }

  // ---------- RENDER ----------

  if (step === 'teamPassword') {
    return (
      <div className="space-y-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Team Member Access</h3>
            </div>
            <p className="text-blue-700 mb-4">
              Enter the team password to view the member list.
            </p>
          </CardContent>
        </Card>

        <form onSubmit={handleTeamPasswordSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="teamPassword">Team Password</Label>
            <Input
              id="teamPassword"
              type="password"
              value={teamPassword}
              onChange={(e) => setTeamPassword(e.target.value)}
              placeholder="Enter team password"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!teamPassword.trim() || validatingTeam}
            className="w-full bg-mainblue hover:bg-secondaryblue text-white"
          >
            {validatingTeam ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
            Access Team Check-In
          </Button>
        </form>

        {status && (
          <Card className="border border-gray-200">
            <CardContent className="py-3 text-sm">{status}</CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (step === 'select') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select Your Name</h3>
          <Button variant="outline" size="sm" onClick={resetAll}>Back</Button>
        </div>

        {loadingMembers ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading team members…
          </div>
        ) : members.length === 0 ? (
          <p className="text-sm text-gray-600">No active team members found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {members.map((m) => (
              <Button
                key={m.id}
                variant={selectedMember?.id === m.id ? 'default' : 'outline'}
                onClick={() => handleSelect(m)}
                className="h-auto p-4 text-left justify-start"
              >
                <UserCheck className="w-5 h-5 mr-3" />
                {m.name}
              </Button>
            ))}
          </div>
        )}

        {status && (
          <Card className="border border-gray-200">
            <CardContent className="py-3 text-sm">{status}</CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (step === 'memberPassword' && selectedMember) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Checking in as <span className="text-mainblue">{selectedMember.name}</span>
          </h3>
          <Button variant="outline" size="sm" onClick={() => setStep('select')}>Back</Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="memberPassword">Your Password</Label>
          <div className="relative">
            <Input
              id="memberPassword"
              type={showMemberPw ? 'text' : 'password'}
              placeholder="Enter your password"
              value={memberPassword}
              onChange={(e) => setMemberPassword(e.target.value)}
              disabled={submitting}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowMemberPw(s => !s)}
              disabled={submitting}
              aria-label={showMemberPw ? 'Hide password' : 'Show password'}
            >
              {showMemberPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <Button onClick={handleMemberCheckIn} disabled={submitting || !memberPassword.trim()}>
          {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Check In
        </Button>

        {status && (
          <Card className="border border-gray-200">
            <CardContent className="py-3 text-sm">{status}</CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (step === 'success') {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Welcome back, {selectedMember?.name}!
            </h3>
            <p className="text-green-700 mb-6">You&apos;re now checked in.</p>
            <div className="space-y-3">
              <Button
                onClick={handleCheckOut}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Check Out
              </Button>
              <Button variant="ghost" size="sm" onClick={resetAll} className="text-green-600">
                Check In Someone Else
              </Button>
            </div>
            {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
