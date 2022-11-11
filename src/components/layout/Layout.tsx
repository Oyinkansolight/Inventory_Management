/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useSelector((store: any) => store.inventory);

  useEffect(() => {
    const routes = ['/', '/register'];
    if (!isLoggedIn && !routes.includes(router.pathname)) {
      router.push('/')
    }

    setIsLoading(false);
  }, [isLoggedIn, router])

  if (isLoading) return <div>Loading.....</div>

  return (
    <>
      <Header />
      {children}
    </>
  );
}
