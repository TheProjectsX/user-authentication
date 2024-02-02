"use client";
import { useRouter } from "next/navigation";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [signOut] = useSignOut(auth);

  // Check if User Signed In or Not
  if (!user && !loading) {
    router.push("/firebase-auth/login");
    return;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { displayName: fullName, email, metadata } = user;
  const createDate = new Date(metadata.creationTime).toDateString();

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="m-auto p-6 bg-gray-800 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            Full Name
          </label>
          <div className="text-white">{fullName}</div>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            Email
          </label>
          <div className="text-white">{email}</div>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            Create Date
          </label>
          <div className="text-white">{createDate}</div>
        </div>

        <button
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
