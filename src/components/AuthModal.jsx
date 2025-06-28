"use client"
import { useState } from "react"
import { X, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AuthModal({ isOpen, onClose, onAuthComplete }) {
  const [step, setStep] = useState(1) // 1: Details, 2: OTP
  const [userDetails, setUserDetails] = useState({ name: "", phone: "" })
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);

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

const otp = otpDigits.join("");
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
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="WhatsApp Number"
  value={userDetails.phone}
  onChange={e =>
    setUserDetails({
      ...userDetails,
      phone: e.target.value.replace(/\D/g, "")
    })
  }
  onPaste={e => {
    const pasted = e.clipboardData.getData("Text");
    if (/\D/.test(pasted)) {
      e.preventDefault();
    }
  }}
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

             <div className="flex justify-center gap-2">
  {otpDigits.map((digit, index) => (
    <input
      key={index}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={digit}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (!value) return; // ignore non-numeric
        const newDigits = [...otpDigits];
        newDigits[index] = value;
        setOtpDigits(newDigits);
        // Focus next box
        const next = document.getElementById(`otp-${index + 1}`);
        if (next) next.focus();
      }}
      onKeyDown={(e) => {
        if (e.key === "Backspace") {
          e.preventDefault();
          const newDigits = [...otpDigits];
          if (otpDigits[index]) {
            // Clear current box
            newDigits[index] = "";
            setOtpDigits(newDigits);
          } else {
            // Move focus back
            const prev = document.getElementById(`otp-${index - 1}`);
            if (prev) prev.focus();
          }
        }
      }}
      id={`otp-${index}`}
      className="w-12 h-12 border border-gray-300 rounded text-center text-xl focus:outline-none focus:border-orange-500"
    />
  ))}
</div>


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
                  disabled={otpDigits.some(d => d === "") || isVerifying}

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
