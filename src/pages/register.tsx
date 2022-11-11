/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { generateUniqueId, getFromSessionStorage } from '@/lib/helper';

import { Banner } from '@/components/banners';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { User } from '@/interface';

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    if (data.password !== data.confirm_password) {
      toast.error('Enter Matching Passwords!');
      return;
    }

    // Remove confirm_password from payload
    delete data.confirm_password;

    const users = getFromSessionStorage('users');

    //Preload user with a default category
    data.category = [
      {
        id: generateUniqueId(),
        name: 'Books',
        items: [],
      },
    ];

    if (users) {
      const parsed_users: User[] = JSON.parse(users);

      //Find user
      const user = parsed_users.find((user: User) => user.email === data.email);

      //Check if user exists and handle
      if (user) {
        toast.error('User Already Exists');
        return;
      } else {
        //Copy all user and append new user
        sessionStorage.setItem(
          'users',
          JSON.stringify([...parsed_users, data])
        );
        toast.success('User Created');
      }
    } else {
      //Create new user array
      sessionStorage.setItem('users', JSON.stringify([data]));
      toast.success('User Created');
      toast('Redirecting To Login');
      setTimeout(() => {
        router.push('/');
      }, 3000);
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
                  Register
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
              {errors.confirm_password && (
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
                    <label htmlFor='email-address' className='sr-only'>
                      Username
                    </label>
                    <input
                      id='name'
                      type='text'
                      autoComplete='name'
                      required
                      className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
                      placeholder='Username'
                      {...register('name', { required: true })}
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
                      className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
                      placeholder='Password'
                      {...register('password', {
                        required: true,
                        minLength: 8,
                      })}
                    />
                  </div>

                  <div>
                    <label htmlFor='password' className='sr-only'>
                      Confirm Password
                    </label>
                    <input
                      id='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
                      placeholder='Confirm Password'
                      {...register('confirm_password', {
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
                    Sign up
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
