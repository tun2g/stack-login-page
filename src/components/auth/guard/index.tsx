"use client";

import { useEffect } from "react";
import { setClientId, setRedirectUrl } from "@/lib/utils/storage";
import { useSearchParams } from "next/navigation";
import { getToken, setRefreshToken, setToken } from "@/lib/utils/auth";
import { useUser } from "@stackframe/stack";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const search = useSearchParams();
  const user = useUser();
  const isAuthenticatedBefore = !!getToken();

  useEffect(() => {
    const redirectUrl = search.get("redirect");
    const clientId = search.get("client_id");

    if (redirectUrl && clientId) {
      setClientId(clientId);
      setRedirectUrl(redirectUrl);
    }

    if(!user){
      window.location.href = '/signin';
    }
    else if(!isAuthenticatedBefore){
      user.currentSession.getTokens().then((tokens)=>{
        setToken(tokens.accessToken!);
        setRefreshToken(tokens.refreshToken!);
      })
    }
    
  },[isAuthenticatedBefore]);

  return <>{children}</>;
};

export default AuthGuard;
