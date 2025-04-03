"use server"

import { z } from "zod"
import { Resend } from "resend"

// Email validation schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(formData: FormData) {
  try {
    // Get and validate email
    const email = formData.get("email") as string
    const result = emailSchema.safeParse({ email })

    if (!result.success) {
      return {
        success: false,
        message: result.error.errors[0].message,
      }
    }

    // Here you would typically save the email to your database
    // For example: await db.insert({ email, subscribedAt: new Date() }).into('subscribers')

    // Send welcome email using Resend
    await resend.emails.send({
      from: "BuildRTP <welcome@buildrtp.org>",
      to: email,
      subject: "Welcome to the BuildRTP Community!",
      html: `
        <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto;">
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
            <style>
              @media only screen and (max-width: 600px) {
                .logo-container {
                  text-align: left !important;
                  padding-left: 10px;
                }
              }
            </style>
          </head>
          <h1 style="color: #00b4d8;">Welcome to BuildRTP!</h1>
          <p>Thank you for joining our community of student innovators in the Research Triangle Park area.</p>
          <p>We're excited to have you on board and will keep you updated on upcoming events, workshops, and opportunities.</p>
          <p>Stay creative and keep building!</p>
          <p>The BuildRTP Team</p>
          <p>team@buildrtp.org</p>
          <div class="logo-container" style="text-align: center; margin-top: 20px;">
            <img 
              src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/2831129e6166b73890168ea5e863fec1bde7c86e_buildrtp_logo_instagram_post__1_.png" 
              alt="BuildRTP Logo" 
              style="width: 25%; height: auto;"
            >
          </div>
        </div>
      `,
    })
    
    
    

    return {
      success: true,
      message: "You've been successfully subscribed!",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

