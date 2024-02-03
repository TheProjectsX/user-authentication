"use client";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return <div>Loading...</div>;
  }

  const [fullName, email, createDate] = [
    user.fullName,
    user.email,
    new Date(user.createdAt).toUTCString(),
  ];

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
