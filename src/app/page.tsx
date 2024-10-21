'use client';

import { useEffect } from 'react';
import { AccountSettings, useUser } from '@stackframe/stack';
import { useSearchParams } from 'next/navigation';

import AuthGuard from '@/components/auth/guard';
import { getClientId, getRedirectUrl, removeStorageKeys } from '@/lib/utils/storage';

export default function Home() {
  const search = useSearchParams();
  const user = useUser();

  useEffect(() => {
    const redirectUrl = getRedirectUrl() ?? search.get('redirect');
    const clientId = getClientId() ?? search.get('client_id');

    if (redirectUrl && clientId && user) {
      removeStorageKeys();
      user.currentSession.getTokens().then((token) => {
        redirectUrl.includes('?')
          ? (window.location.href = `${redirectUrl}&access_token=${token.accessToken}&refresh_token=${token.refreshToken}`)
          : (window.location.href = `${redirectUrl}?access_token=${token.accessToken}&refresh_token=${token.refreshToken}`);
      });
    }
  }, [user]);

  return (
    <AuthGuard>
      <AccountSettings></AccountSettings>
    </AuthGuard>
  );
}
