/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  createCategory,
  removeCategory,
} from '@/features/inventory/inventorySlice';

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Modal.setAppElement('#yourAppElement');

export default function Dashboard() {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const { name, category } = useSelector((store: any) => store.inventory);

  const handleRemove = (categoryId: string) => {
    dispatch(removeCategory(categoryId));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCreateCategory = () => {
    if (categoryName.length > 0) {
      dispatch(createCategory(categoryName));
      setCategoryName('');
      closeModal();
    } else {
      toast('Enter Category Name');
    }
  };

  const handleCategoryName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategoryName(e.target.value);
  };

  return (
    <Layout>
      <Seo />

      <Toaster />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='flex w-[30rem] flex-row justify-between'>
          <div className='text-xl font-semibold'>Add Item Category</div>
          <Button className='h-6' variant='dark' onClick={closeModal}>
            close
          </Button>
        </div>

        <div className='mt-10'>
          <label>Category Name</label>
          <input
            required
            type='text'
            onChange={handleCategoryName}
            className='relative mt-4 block w-full appearance-none rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
            placeholder='Category Name'
          />
          <div className='mt-6'>
            <Button onClick={handleCreateCategory} className='w-full'>
              <div className='flex w-full flex-row justify-center'>
                <div>Create</div>
              </div>
            </Button>
          </div>
        </div>
      </Modal>

      <main>
        <div className='bg-gray-100'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12'>
              <div className='flex flex-row justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  {name}'s Item Categories
                </h2>

                <div>
                  <Button onClick={openModal} variant='light'>
                    Add Category
                  </Button>
                </div>
              </div>

              <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
                {category.length > 0 ? (
                  category.map((item: any, i: number) => (
                    <React.Fragment key={item.name}>
                      <div className='flex flex-col'>
                        <div className='group relative'>
                          <Link key={item.name} href={`/category/${item.id}`}>
                            <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
                              <img
                                src={`https://picsum.photos/1280/1280?random=${i}`}
                                alt={item.name}
                                className='h-full w-full object-cover object-center'
                              />
                            </div>
                            <h3 className='mt-6 text-sm text-gray-500'>
                              <span className='absolute inset-0' />
                              {item.name}
                            </h3>
                          </Link>
                        </div>

                        <div
                          onClick={() => handleRemove(item.id)}
                          className='my-4'
                        >
                          <Button className='border-0 bg-red-700 hover:bg-red-600'>
                            Delete Category
                          </Button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div>Nothing To See Here! 🥺</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
