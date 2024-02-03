"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";

const SignUp = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  // Check if User Signed In or Not
  if (session) {
    router.push("/nextauth");
  }

  const handleSignUp = async () => {
    // Check if passwords match
    if (password.length < 6) {
      setNotice("Password must be at least 6 Characters Long!");
      return;
    }

    if (password !== retypePassword) {
      setNotice("Passwords do not match. Please re-enter.");
      return;
    }

    try {
      const signUpResponse = await fetch("/api/userauths/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
        }),
      });

      const resData = await signUpResponse.json();
      if (!resData) {
        setNotice(resData.msg);
        return;
      }

      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResponse.error) {
        console.log(signInResponse.error);
      } else {
        router.push("/nextauth");
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
        <h1 className="text-3xl font-bold text-white mb-6">Sign Up</h1>

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-white text-sm font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

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

        <div className="mb-4">
          <label
            htmlFor="retypePassword"
            className="block text-white text-sm font-medium mb-2"
          >
            Re-type Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="retypePassword"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            placeholder="Re-enter your password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none mb-4"
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        <button
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => console.log("Google Signin")}
        >
          Sign Up with Google
        </button>

        {notice && <div className="mt-4 text-sm text-red-500">{notice}</div>}

        <div className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/nextauth/login" className="text-blue-400">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
