import { signIn, signOut, useSession } from 'next-auth/react';

import Button from '@/components/buttons/Button';

export default function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <Button onClick={() => signOut()}>Sign Out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign In</Button>
    </>
  );
}
