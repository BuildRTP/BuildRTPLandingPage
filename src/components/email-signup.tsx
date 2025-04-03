"use client"

import { useState } from "react"
import { subscribeToNewsletter } from "@/app/actions/email-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function EmailSignup() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await subscribeToNewsletter(formData)

      if (result.success) {
        setEmail("")
        setMessage({ text: result.message, isError: false })
      } else {
        setMessage({ text: result.message, isError: true })
      }
    } catch {
      setMessage({
        text: "Something went wrong. Please try again later.",
        isError: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container relative z-10 -mt-8 mb-12">
      <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-mainblue">Join Our Community</h2>
          <p className="text-muted-foreground mt-2">Stay updated with the latest events and opportunities</p>
        </div>

        <form action={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 border-mainblue/20 focus-visible:ring-mainblue"
              required
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-6 bg-secondaryblue hover:bg-mainblue transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        {message && (
          <div className={`mt-4 text-center ${message.isError ? "text-red-500" : "text-green-600"}`}>
            {message.text}
          </div>
        )}
      </div>
    </section>
  )
}

