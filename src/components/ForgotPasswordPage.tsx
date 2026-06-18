import React, { useState, useRef } from "react";
import { authAPI } from "../services/api";
import { useLmsStore } from "../store/index";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { PlanetLogo } from "./PlanetLogo";

export const ForgotPasswordPage: React.FC = () => {
  const { setView } = useLmsStore();
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [email, setEmail] = useState("");

  // OTP state: 6 separate character boxes
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password fields
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle email step submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email) return setError("Please enter your email");

    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setMessage("6-digit OTP code sent to your registered email.");
      setLoading(false);
      setTimeout(() => {
        setStep("otp");
        setMessage("");
        setError("");
      }, 1200);
    } catch (err: any) {
      setLoading(false);
      const msg = err?.message || "Failed to send OTP";
      if (msg.toLowerCase().includes("user not found")) {
        setError("Email is not registered. Enroll the account and get the credentials.");
      } else {
        setError(msg);
      }
    }
  };

  // Handle resend code action
  const handleResendCode = async () => {
    setError("");
    setMessage("");
    setOtp(Array(6).fill(""));
    try {
      await authAPI.forgotPassword(email);
      setMessage("A fresh 6-digit OTP code has been sent.");
      // Auto focus first digit field
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      setError(err?.message || "Failed to resend code");
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    const cleanVal = val.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = cleanVal.substring(cleanVal.length - 1);
    setOtp(newOtp);

    // Auto focus next box if typed
    if (cleanVal && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace movements
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle full OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").replace(/[^0-9]/g, "").substring(0, 6);
    if (pastedText.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        if (pastedText[i] !== undefined) {
          newOtp[i] = pastedText[i];
        }
      }
      setOtp(newOtp);
      const nextFocusIndex = Math.min(pastedText.length, 5);
      otpRefs.current[nextFocusIndex]?.focus();
    }
  };

  // Handle OTP verification step
  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const code = otp.join("");
    if (code.length < 6) return setError("Please fill in all 6 OTP digits.");

    setLoading(true);
    try {
      await authAPI.verifyOtp(email, code);
      setMessage("Verification successful! Setup your new password.");
      setLoading(false);
      setTimeout(() => {
        setStep("password");
        setMessage("");
        setError("");
      }, 1200);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Invalid OTP code. Please check and try again.");
    }
  };

  // Handle Password creation step
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const code = otp.join("");
      await authAPI.resetPassword(email, code, password);
      setMessage("Your password was updated successfully. Redirecting to login...");
      setLoading(false);
      setTimeout(() => {
        setView("login");
      }, 1800);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to update password. Please request a new OTP.");
    }
  };

  const isPasswordValid = password.length >= 6;
  const isPasswordMatching = password === confirm && confirm !== "";

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute rounded-full blur-[120px] opacity-[0.06] pointer-events-none w-[400px] h-[400px] bg-brand-royal -top-20 -left-20" />
      <div className="absolute rounded-full blur-[120px] opacity-[0.06] pointer-events-none w-[450px] h-[450px] bg-brand-violet -bottom-20 -right-20" />

      {/* Floating brand header */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-10 select-none">
        <div onClick={() => setView("landing")} className="flex items-center gap-2 cursor-pointer group">
          <PlanetLogo className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span className="font-extrabold font-display text-sm tracking-tight text-slate-900 group-hover:text-brand-violet transition-colors">
            Nexora Learning
          </span>
        </div>
        <div className="h-4 w-px bg-slate-300" />
        <button
          onClick={() => setView("login")}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </button>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-royal opacity-90" />

      <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-2xl relative z-10 animate-fade-in-up">
        {/* Main Status messages */}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium text-left flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-left flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: ENTER EMAIL */}
        {step === "email" && (
          <div className="text-left">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-brand-royal bg-opacity-10 border border-brand-royal border-opacity-20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-brand-royal" />
              </div>
              <h2 className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">Forgot Password</h2>
              <p className="text-xs text-slate-500 mt-2">Enter your registered email to receive a 6-digit OTP.</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Gmail Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="premium-input pl-10 text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 text-xs font-bold rounded-xl text-white bg-brand-royal hover:bg-blue-650 transition-all shadow-md"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="flex-1 py-3.5 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-50 transition-all"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: VERIFICATION CODE */}
        {step === "otp" && (
          <div className="text-center">
            {/* Custom SVG Unlocked Padlock Icon in solid blue circle */}
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0v2" />
                <rect x="5" y="11" width="14" height="10" rx="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="16" r="1.2" fill="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.5v1.5" />
              </svg>
            </div>

            <h2 className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">Verification Code</h2>
            <p className="text-xs text-slate-500 mt-2">
              Please enter the code sent to <br />
              <span className="font-semibold text-slate-800">{email}</span>
            </p>

            <form onSubmit={handleVerifyOtpSubmit} className="mt-8 space-y-6">
              {/* Digit Input Blocks */}
              <div className="flex justify-between gap-2 max-w-sm mx-auto">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className="w-12 h-12 sm:w-14 sm:h-14 border border-slate-300 rounded-2xl text-center text-xl font-bold bg-white text-slate-900 shadow-sm focus:border-brand-royal focus:ring-1 focus:ring-brand-royal outline-none transition-all"
                  />
                ))}
              </div>

              {/* Resend Code Link */}
              <div className="text-xs">
                Didn't receive code?{" "}
                <button type="button" onClick={handleResendCode} className="text-brand-royal hover:underline font-semibold">
                  Resend Code
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 text-xs font-bold rounded-xl text-white bg-rose-600 hover:bg-rose-700 transition-all shadow-md uppercase tracking-wider"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="flex-1 py-3.5 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === "password" && (
          <div className="text-left">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-600 bg-opacity-10 border border-green-600 border-opacity-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">Create New Password</h2>
              <p className="text-xs text-slate-500 mt-2">Choose a secure, strong password for your account.</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">New password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="premium-input pl-10 pr-10 text-xs sm:text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-800"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Validation rule helper */}
                {password && (
                  <p className={`text-[10px] flex items-center gap-1 font-semibold ${isPasswordValid ? "text-green-600" : "text-slate-400"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Must be at least 6 characters</span>
                  </p>
                )}
              </div>

              {/* Re-enter Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Re-enter new password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      setError("");
                    }}
                    className="premium-input pl-10 pr-10 text-xs sm:text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-800"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Real-time match rule helper */}
                {confirm && (
                  <p className={`text-[10px] flex items-center gap-1 font-semibold ${isPasswordMatching ? "text-green-600" : "text-rose-500"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Passwords must match</span>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 text-xs font-bold rounded-xl text-white bg-brand-royal hover:bg-blue-650 transition-all shadow-md uppercase tracking-wide"
                  disabled={loading || !isPasswordValid || !isPasswordMatching}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
