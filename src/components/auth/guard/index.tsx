'use client';

import { useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!user) {
        const params = new URLSearchParams(searchParams);
        router.push(`/signin?${params.toString()}`);
      }
    };

    handleAuthentication();
  }, [user, searchParams, router]);

  return <>{children}</>;
};

export default AuthGuard;
