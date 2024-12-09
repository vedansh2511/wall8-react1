import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PhoneIcon, LockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


export function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setMobileNumber(value)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:8085/auth/login/generateOtp?mobileNumber=${mobileNumber}`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to generate OTP')
      }

      navigate('/verify-otp', { state: { mobileNumber } })
    } catch (error) {
      setError('Failed to generate OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Wall8</CardTitle>
          <CardDescription className="text-center">Enter your mobile number to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile-number" className="text-sm font-medium">
                Mobile Number
              </Label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="mobile-number"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  className="pl-10"
                  maxLength={10}
                />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending OTP...' : 'Get OTP'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <LockIcon className="inline-block mr-2 h-4 w-4" />
            Your information is secure and encrypted
          </div>
        </CardContent>
      </Card>
    </div>
  )
}