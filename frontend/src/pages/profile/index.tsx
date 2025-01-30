// src/pages/profile.tsx
 
import { useRouter } from 'next/router';
 
import ClientMiddleware from '@/hocs/withUserData';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
  const { user,logout, loading } = useAuth();
  const router = useRouter();

  // If loading, show a loading state
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // If the user is not logged in, redirect to login page
  

  return (
    <ClientMiddleware>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Profile Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h2>
        
        {/* User Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={user?.picture}
            alt={user?.nickname}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
          />
        </div>

        {/* User Info */}
        <div className="text-left mb-6">
          <p className="text-2xl text-gray-700 mb-2"><span className="font-semibold">{user?.nickname}</span></p>
          <p className="text-lg text-gray-600">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {/* Logout Button */}
        <button
        onClick={()=>logout()}
        className="px-6 py-2 bg-red-500 w-full text-white rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
      </div>
    </div>
    </ClientMiddleware>
  );
};

export default ProfilePage;
