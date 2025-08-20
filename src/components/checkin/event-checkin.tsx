'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Info } from 'lucide-react'

export default function EventCheckIn() {
  return (
    <Card className="bg-orange-50 border-orange-200">
      <CardContent className="pt-6">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-orange-800 mb-2">
            Event Check-In Coming Soon
          </h3>
          <p className="text-orange-700 mb-4">
            Event-specific check-in forms with customizable fields will be available soon.
          </p>
          <div className="bg-orange-100 rounded-lg p-4 text-left">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-medium mb-2">Planned Features:</p>
                <ul className="space-y-1 text-orange-700">
                  <li>• Custom forms for each event</li>
                  <li>• Event-specific questions</li>
                  <li>• Automatic event detection</li>
                  <li>• Registration integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}