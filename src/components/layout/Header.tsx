/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';

import { clearInventory } from '@/features/inventory/inventorySlice';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, name } = useSelector((store: any) => store.inventory);

  const handleLogout = () => {
    setTimeout(() => {
      toast('Logging out');
    }, 1000);

    setTimeout(() => {
      router.push('/');
      dispatch(clearInventory());
    }, 2500);
  };

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {!isLoggedIn && (
              <li>
                <UnstyledLink href='/' className='hover:text-gray-600'>
                  Sign In
                </UnstyledLink>
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <UnstyledLink href='/register' className='hover:text-gray-600'>
                  Sign Up
                </UnstyledLink>
              </li>
            )}

            {isLoggedIn && (
              <li className='truncate'>
                <Link href='/dashboard'>{name}</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <Button variant='ghost' onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
