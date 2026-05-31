"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (loading) return; 

    try {
      setLoading(true);

      const result = await authClient.signUp.email({
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim(),
      });

      if (result?.error) {
        toast.error(result.error.message || "Registration failed");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration operational error:", error);
      toast.error(error.body?.message || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google Social Sign Up Handler
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Social authenticating runtime fail:", err);
      toast.error("Social login initialization failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#111827] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">

        <div className="mb-8 text-center">
          <p className="text-[#22C55E] text-xs uppercase tracking-[0.3em] font-bold">
            SportNest Access
          </p>
          <h1 className="text-4xl font-black text-[#F8FAFC] mt-3 tracking-tight">
            Create Account
          </h1>
          <p className="text-sm text-[#F8FAFC]/50 mt-3">
            Start booking premium sports facilities instantly.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-[#F8FAFC]/40">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              disabled={loading}
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-2 w-full px-4 py-3 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#22C55E] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-[#F8FAFC]/40">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="mt-2 w-full px-4 py-3 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#22C55E] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-[#F8FAFC]/40">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              disabled={loading}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-2 w-full px-4 py-3 bg-[#111827] border border-[#F8FAFC]/10 rounded-xl text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#22C55E] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Standard Credentials Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16a34a] text-[#111827] py-3.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#22C55E]/10"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Register
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Custom Google Authentication Button Placed Directly Below Register */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full border border-[#F8FAFC]/10 hover:border-[#22C55E]/40 bg-[#F8FAFC]/5 hover:bg-[#22C55E]/10 text-[#F8FAFC] py-3.5 rounded-xl font-bold transition-all duration-200"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-sm text-[#F8FAFC]/50 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#22C55E] hover:underline font-medium transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;