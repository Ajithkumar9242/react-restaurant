"use client"
import { useState } from "react"
import { X, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AuthModal({ isOpen, onClose, onAuthComplete }) {
  const [step, setStep] = useState(1) // 1: Details, 2: OTP
  const [userDetails, setUserDetails] = useState({ name: "", phone: "" })
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  if (!isOpen) return null

  const handleSendOtp = () => {
    if (userDetails.name && userDetails.phone) {
      setStep(2)
      // Simulate OTP sending
      console.log("OTP sent to", userDetails.phone)
    }
  }

  const handleVerifyOtp = async () => {
    setIsVerifying(true)
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (otp === "1234" || otp.length === 4) {
      // Accept any 4-digit OTP for demo
      onAuthComplete(userDetails)
      onClose()
      setStep(1)
      setUserDetails({ name: "", phone: "" })
      setOtp("")
    } else {
      alert("Invalid OTP. Try 1234 for demo.")
    }
    setIsVerifying(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {step === 1 ? "Enter Details" : "Verify OTP"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-600">Enter your details to continue</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Full Name"
                    value={userDetails.name}
                    onChange={e =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="WhatsApp Number"
                    value={userDetails.phone}
                    onChange={e =>
                      setUserDetails({ ...userDetails, phone: e.target.value })
                    }
                    className="pl-10"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={
                  !userDetails.name ||
                  !userDetails.phone ||
                  userDetails.phone.length !== 10
                }
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  Enter the OTP sent to +91 {userDetails.phone}
                </p>
                <p className="text-sm text-gray-500 mt-2">Use 1234 for demo</p>
              </div>

              <Input
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={e =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                className="text-center text-2xl tracking-widest"
                maxLength={4}
              />

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 4 || isVerifying}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
