/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  createItem,
  initializeItems,
  removeItem,
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
  const router = useRouter();
  const { id } = router.query;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const { category, currentItems } = useSelector(
    (store: any) => store.inventory
  );

  const handleRemove = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCreateItem = () => {
    if (itemName.length > 0) {
      dispatch(
        createItem({
          id,
          itemName,
        })
      );
      setItemName('');
      closeModal();
    } else {
      toast('Enter Item Name');
    }
  };

  const handleItemName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setItemName(e.target.value);
  };

  useEffect(() => {
    //Need to update from session storage
    const categoryItems = category.find((item: any) => item.id === id);
    dispatch(initializeItems(categoryItems));
  }, [category, dispatch, id]);

  if (!currentItems) return <div>Loading...</div>;

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
          <div className='text-xl font-semibold capitalize'>
            Add Item to this category
          </div>
          <Button className='h-6' variant='dark' onClick={closeModal}>
            close
          </Button>
        </div>

        <div className='mt-10'>
          <label>Item Name</label>
          <input
            required
            type='text'
            onChange={handleItemName}
            className='relative mt-4 block w-full appearance-none rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm'
            placeholder='Item Name'
          />
          <div className='mt-6'>
            <Button onClick={handleCreateItem} className='w-full'>
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
              {currentItems.items.length > 0 && (
                <div className='flex flex-row justify-between'>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    {currentItems.name}'s Item Categories
                  </h2>

                  <div>
                    <Button onClick={openModal} variant='light'>
                      Add Item
                    </Button>
                  </div>
                </div>
              )}

              <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
                {currentItems.items.length > 0 ? (
                  currentItems.items.map((item: any, i: number) => (
                    <React.Fragment key={item.name}>
                      <div className='flex flex-col'>
                        <div className='group relative'>

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
                        </div>

                        <div
                          onClick={() => handleRemove(item.id)}
                          className='my-4'
                        >
                          <Button className='border-0 bg-red-700 hover:bg-red-600'>
                            Delete Item
                          </Button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div className='flex flex-col gap-y-10'>
                    <div>Nothing Items Here! </div>
                    <div>
                      <Button onClick={openModal} variant='light'>
                        Add Item
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
