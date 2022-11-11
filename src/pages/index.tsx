/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { getFromSessionStorage } from '@/lib/helper';

import { Banner } from '@/components/banners';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { handleLogin } from '@/features/inventory/inventorySlice';
import { User } from '@/interface';

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const users = getFromSessionStorage('users');

    if (users) {
      const parsed_users: User[] = JSON.parse(users);

      //Find user
      const user = parsed_users.find((user: User) => user.email === data.email);

      //Check if user exists and handle
      if (user) {
        if (user.email === data.email && user.password === data.password) {
          toast.success(`Welcome ${user.name}`);
          dispatch(handleLogin(user));
          setTimeout(() => {
            toast('Loading...');
          }, 1000);

          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          toast.error('Invalid Email or Password');
        }
        return;
      } else {
        toast.error('User Not Found');
      }
    } else {
      toast.error('User Not Found');
    }
  };

  return (
    <Layout>
      <Seo />

      <Toaster />

      <main>
        <section className='bg-white'>
          <div className='flex min-h-full items-center justify-center py-56 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-8'>
              <div>
                <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                  Sign In
                </h2>
              </div>

              {errors.email && (
                <Banner type='error' message='Valid Email Required' />
              )}
              {errors.password && (
                <Banner
                  type='error'
                  message='Password Must Be At Least 8 Characters'
                />
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-8 space-y-6'
              >
                <input type='hidden' name='remember' defaultValue='true' />
                <div className='-space-y-px rounded-md shadow-sm'>
                  <div>
                    <label htmlFor='email-address' className='sr-only'>
                      Email address
                    </label>
                    <input
                      id='email-address'
                      type='email'
                      autoComplete='email'
                      required
                      className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
                      placeholder='Email address'
                      {...register('email', {
                        required: 'Valid email required',
                        pattern:
                          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,10})+$/,
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor='password' className='sr-only'>
                      Password
                    </label>
                    <input
                      id='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
                      placeholder='Password'
                      {...register('password', {
                        required: true,
                        minLength: 8,
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type='submit'
                    className='group relative flex w-full justify-center rounded-md border border-transparent'
                  >
                    Sign In
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
