"use client";
import { useEffect, useRef } from "react";
import Lock from "auth0-lock";

const Auth0LockComponent = () => {
  const lockContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lockContainerRef.current) {
 
      // Initialize Auth0 Lock
      const lock = new Lock(
        process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
        process.env.NEXT_PUBLIC_ISSUER_BASE_URL ?? "",
        {
          container: "lock", // Pass the actual DOM element (from ref)
          auth: {
            redirect:false,
            redirectUrl: "http://localhost:3000/callback", // URL to redirect to after login
            responseType: "token id_token", // Tokens to return
          },
          theme: {
            primaryColor: "#31324F", // Theme customization
          },
        }
      );

      // Show the lock UI inside the container
       
      lock.show();
      // Cleanup on unmount
      return () => {
        lock.hide();
      };
    }
  }, []); // Run only once, when the component is mounted

 
  return (
    // The container div where Lock UI will render
    <div
      id="lock" // Pass ref to the div
      ref={lockContainerRef}
      style={{ width: "750px", height: "400px", backgroundColor: "#f4f4f4" }} // Ensure the container has size
    ></div>
  );
};

export default Auth0LockComponent;
