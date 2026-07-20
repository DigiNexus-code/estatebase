"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { agencyProfile } from "@/lib/mock-data";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTestCreds, setShowTestCreds] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      // Add detailed logging
      console.log("[v0] Login attempt with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        console.error("[v0] Login error:", error.message);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data.session) {
        console.error("[v0] No session created");
        setError("Login successful but no session created. Please try again.");
        setLoading(false);
        return;
      }

      console.log("[v0] Login successful for:", email);
      console.log("[v0] Session user ID:", data.session.user.id);
      
      const redirectUrl = searchParams.get("next") || "/dashboard";
      console.log("[v0] Redirecting to:", redirectUrl);
      
      router.push(redirectUrl);
      router.refresh();
    } catch (err) {
      console.error("[v0] Unexpected error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  const fillTestCredentials = (type: 'admin' | 'agent') => {
    if (type === 'admin') {
      setEmail('admin@estatebase.test');
      setPassword('Test@123456');
    } else {
      setEmail('agent@estatebase.test');
      setPassword('Test@123456');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-black">
              <span className="font-serif text-lg font-bold text-white">
                {agencyProfile.logoInitials}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-black">Dashboard Login</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your listings and leads. Create test users first.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder-gray-400 transition focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="admin@estatebase.test"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder-gray-400 transition focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800 border border-red-200">
                <p className="font-medium">Login Failed</p>
                <p className="mt-1">{error}</p>
                <p className="mt-2 text-xs text-red-700">
                  💡 Tip: Test users must be created in Supabase first. See CREATE_TEST_USERS.md
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black py-2.5 text-sm font-bold text-white transition hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Test Credentials Helper */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => setShowTestCreds(!showTestCreds)}
              className="text-xs font-semibold text-gray-600 hover:text-black transition"
            >
              {showTestCreds ? '▼ Hide' : '▶ Show'} Test Credentials
            </button>

            {showTestCreds && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-600 mb-3">
                  Click to fill test credentials (must exist in Supabase):
                </p>
                
                <button
                  type="button"
                  onClick={() => fillTestCredentials('admin')}
                  className="w-full rounded-lg border border-amber-600 bg-amber-50 px-3 py-2 text-left text-xs hover:bg-amber-100 transition"
                >
                  <p className="font-semibold text-amber-900">Admin Account</p>
                  <p className="text-amber-700">admin@estatebase.test</p>
                </button>

                <button
                  type="button"
                  onClick={() => fillTestCredentials('agent')}
                  className="w-full rounded-lg border border-amber-600 bg-amber-50 px-3 py-2 text-left text-xs hover:bg-amber-100 transition"
                >
                  <p className="font-semibold text-amber-900">Agent Account</p>
                  <p className="text-amber-700">agent@estatebase.test</p>
                </button>

                <p className="mt-3 rounded-lg bg-blue-50 p-2 text-xs text-blue-800 border border-blue-200">
                  <strong>Setup Required:</strong> Before logging in, create these users in your Supabase dashboard (Authentication → Users). See CREATE_TEST_USERS.md for details.
                </p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-6 rounded-lg bg-gray-50 p-4 text-xs text-gray-600">
            <p className="mb-2">
              <strong>First time?</strong> Follow these steps:
            </p>
            <ol className="list-inside list-decimal space-y-1">
              <li>Go to Supabase dashboard</li>
              <li>Create test users (Authentication → Users)</li>
              <li>Return here and login</li>
              <li>Access the dashboard</li>
            </ol>
            <p className="mt-3 text-xs text-gray-500">
              📖 Read CREATE_TEST_USERS.md for detailed instructions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-paper">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
