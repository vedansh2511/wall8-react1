'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { UserIcon, MailIcon, PhoneIcon } from 'lucide-react'

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    //Retrieve mobile number from localStorage (set in the OTP verification page)
    const storedMobileNumber = localStorage.getItem('mobileNumber')
    if (storedMobileNumber) {
      setMobileNumber(storedMobileNumber)
    } else {
      // If mobile number is not found, redirect back to login
      navigate('/login')
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!firstName || !lastName || !email) {
      setError('Please fill in all fields')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8085/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile: mobileNumber,
        }),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      // Handle successful registration
      // For example, store user data and tokens
      localStorage.setItem('userDataResponse', JSON.stringify(data.userDataResponse))
      localStorage.setItem('jwtToken', data.jwtToken || '')
      localStorage.setItem('refreshToken', data.refreshToken || '')

      // Redirect to home page or dashboard
      navigate('/home')
    } catch (error) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Wall8</CardTitle>
          <CardDescription className="text-center">Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="mobileNumber"
                  value={mobileNumber}
                  readOnly
                  className="pl-10 bg-muted"
                />
              </div>
            </div> */}
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}