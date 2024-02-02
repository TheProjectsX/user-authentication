"use client";

import { useState } from "react";
import Link from "next/link";

import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/Context/AuthContext";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  const [user] = useAuthState(auth);
  // Check if User Signed In or Not
  if (user) {
    router.push("/firebase-auth");
  }

  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleSignIn = async () => {
    try {
      const loginResponse = await SignInWithEmailAndPassword(email, password);
      if (!loginResponse) {
        setNotice("Wrong Credentials!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="m-auto p-6 bg-gray-800 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-2 right-2 cursor-pointer text-gray-400"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none mb-4"
          onClick={handleSignIn}
        >
          Sign In
        </button>

        <button
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => signInWithGoogle()}
        >
          Sign In with Google
        </button>

        {notice && <div className="mt-4 text-sm text-red-500">{notice}</div>}

        <div className="mt-4 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/firebase-auth/sign-up" className="text-blue-400">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
