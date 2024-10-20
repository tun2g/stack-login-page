'use client';
import { useEffect } from 'react';
import { CredentialSignIn } from '@stackframe/stack';
import { useSearchParams } from 'next/navigation';

import { removeTokens } from '@/lib/utils/auth';
import { setClientId, setRedirectUrl } from '@/lib/utils/storage';

export default function SignInPage() {
  const search = useSearchParams();

  useEffect(() => {
    removeTokens();
    const redirectUrl = search.get('redirect');
    const clientId = search.get('client_id');

    if (redirectUrl && clientId) {
      setClientId(clientId);
      setRedirectUrl(redirectUrl);
    }
  }, [search]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CredentialSignIn></CredentialSignIn>
    </div>
  );
}
