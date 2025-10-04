"use client";
import { useState } from "react";

export default function LoginPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally validate login
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500); // auto hide after 2.5s
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white relative">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="absolute top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce">
          ✅ You have successfully signed in!
        </div>
      )}
    </div>
  );
}
