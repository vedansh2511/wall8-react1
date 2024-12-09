import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LockIcon, RefreshCcwIcon } from 'lucide-react'

interface OtpResponse {
  isUserExists: boolean
  userDataResponse?: {
    // Define the structure of userDataResponse here
    // For example:
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  jwtToken?: string
  refreshToken?: string
}

export function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(120) // 2 minutes in seconds
  const [mobileNumber, setMobileNumber] = useState('') // You would get this from your app's state management
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setResendCooldown((prevCooldown) => {
        if (prevCooldown <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevCooldown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullOtp = otp.join('')
    if (fullOtp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setIsLoading(true)
    try {
      const { mobileNumber } = location.state || {};
      const response = await fetch('http://localhost:8085/auth/login/validateOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: mobileNumber,
          otp: fullOtp,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to verify OTP')
      }

      const data: OtpResponse = await response.json()

      if (data.isUserExists) {
        // Store user data, JWT token, and refresh token in memory
        // You might want to use a state management solution like Redux or Context API for this
        localStorage.setItem('firstName', data.userDataResponse?.firstName || '')
        localStorage.setItem('lastName', data.userDataResponse?.lastName || '')
        localStorage.setItem('jwtToken', data.jwtToken || '')
        localStorage.setItem('refreshToken', data.refreshToken || '')

        // Redirect to home page
        navigate('/home')
      } else {
        // Redirect to register page
        console.log(mobileNumber)
        localStorage.setItem('mobileNumber', mobileNumber)
        navigate('/register')
      }
      // In a real app, you would use router.push('/dashboard') here
    } catch (error) {
      setError('Failed to verify OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return

    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:8085/auth/login/generateOtp?mobileNumber=${mobileNumber}`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to resend OTP')
      }

      setResendCooldown(120) // Reset cooldown
      alert('New OTP sent successfully')
    } catch (error) {
      setError('Failed to resend OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Wall8</CardTitle>
          <CardDescription className="text-center">Enter the OTP sent to your mobile</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp-0" className="text-sm font-medium">
                One-Time Password
              </Label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-lg"
                  />
                ))}
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              className="text-secondry"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || isLoading}
            >
              <RefreshCcwIcon className="mr-2 h-4 w-4" />
              {resendCooldown > 0
                ? `Resend OTP in ${resendCooldown}s`
                : 'Resend OTP'}
            </Button>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <LockIcon className="inline-block mr-2 h-4 w-4" />
            Your information is secure and encrypted
          </div>
        </CardContent>
      </Card>
    </div>
  )
}