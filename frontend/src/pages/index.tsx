// pages/login.tsx

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

const Login = () => {
  const url =`https://${process.env.NEXT_PUBLIC_ISSUER_BASE_URL}/authorize?` + new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      redirect_uri: "http://localhost:3000/profile",
      response_type: "code",
      scope: "openid profile email",  
      audience:`http://locahost:5000`,
      
      connection: "discord", // Forces Discord login
    });
 
  const router = useRouter();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/profile");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">
     Welcome
        </h1>
        <p className="text-lg text-center text-gray-500 mb-8">
          Please log in to continue.
        </p>

        <div className="space-y-4">
 <a href={url}>
 <button
            
            className="w-full flex items-center justify-center space-x-4 bg-black text-white py-3 rounded-lg shadow-md hover:bg-black transition duration-200"
          >
          <img src="/discord.svg" className="w-[50px] " alt="discord button" />
            <span>Continue With discord</span>
          </button>

 </a>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
