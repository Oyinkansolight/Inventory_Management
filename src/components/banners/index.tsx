import clsx from 'clsx';
import React from 'react';

interface BannerProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export const Banner = ({ type, message }: BannerProps) => {
  return (
    <div
      className={clsx(
        type === 'success' && 'bg-green-500',
        type === 'error' && 'bg-red-500',
        type === 'warning' && 'bg-yellow-500',
        type === 'success' && 'bg-blue-500',
        'rounded-md'
      )}
    >
      <div className='mx-auto max-w-7xl py-[0.35rem] px-3 sm:px-6 lg:px-8'>
        <div className='flex items-center'>
          <div className='mx-auto flex items-center'>
            <p className='truncate font-medium text-white'>
              <span>{message}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
