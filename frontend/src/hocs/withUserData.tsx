"use client"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
 
const ClientMiddleware = ({ children }:any) => {
  const [loading, setLoading] = useState(true);
  const [code,setCode] = useState("");
  const {login,user} =useAuth();
 const router=useRouter();
  const fetchToken = async () => {
    try {
      // Call the backend API to validate the token
      const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
      });
       
  
      if (!apiResponse.ok) {
    
        return router.push('/');
      }
      const userData = await apiResponse.json();

      login({name:userData.message.name,nickname:userData.message.nickname,picture:userData.message.picture,email:userData.message.email});

      setLoading(false);

    } catch (error) {
      router.push('/');
      console.error("Error validating token:", error);
      // Redirect to login if there was an error
    }
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    setCode(code??"");
 
  }, [code]);

  useEffect(()=>{
   if(code!="" && user == null){
    console.log(code);
    fetchToken();
   }
   if(user){
    setLoading(false);
   }
  },[code,user])


  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ClientMiddleware;
