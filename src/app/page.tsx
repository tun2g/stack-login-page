"use client";

import AuthGuard from "@/components/auth/guard";
import { getRefreshToken, getToken } from "@/lib/utils/auth";
import { getClientId, getRedirectUrl, removeStorageKeys } from "@/lib/utils/storage";
import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    const redirectUrl = getRedirectUrl();
    const clientId = getClientId();
    
    const token = getToken();
    const refreshToken = getRefreshToken();

    if (redirectUrl && clientId && token) {
      removeStorageKeys();
      redirectUrl.includes("?")
        ? (window.location.href = `${redirectUrl}&access_token=${token}&refresh_token=${refreshToken}`)
        : (window.location.href = `${redirectUrl}?access_token=${token}&refresh_token=${refreshToken}`);
    }
  }, []);

  return (
    <AuthGuard>
      <div className="flex justify-center items-center min-h-screen">
        Jarvis Account Page
      </div>
    </AuthGuard>
  );
}
