import { createSlice } from '@reduxjs/toolkit';

import { generateUniqueId, getFromSessionStorage } from '../../lib/helper';

const initialState = {
  name: '',
  email: '',
  isLoading: true,
  isLoggedIn: false,
  category: [],
  currentItems: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearInventory: (state) => {
      state.name = '';
      state.email = '';
      state.isLoggedIn = false;
      state.category = [];
    },
    createCategory: (state, { payload }) => {
      const data = {
        id: generateUniqueId(),
        name: payload,
        items: [],
      };

      state.category.push(data);

      const users = getFromSessionStorage('users');
      const parsed_users = JSON.parse(users);

      const computed = parsed_users.map((user) => {
        if (user.email === state.email) {
          user.category.push(data);
          return user;
        }

        return user;
      });

      sessionStorage.setItem('users', JSON.stringify(computed));
    },
    createItem: (state, { payload }) => {
      const data = {
        id: generateUniqueId(),
        name: payload.itemName,
      };

      const users = getFromSessionStorage('users');
      const parsed_users = JSON.parse(users);

      const computed = parsed_users.map((user) => {
        if (user.email === state.email) {
          user.category.map((category) => {
            if (category.id === payload.id) {
              category.items.push(data);
              state.currentItems.items = category.items;
              return category;
            }

            return category;
          });
          return user;
        }

        return user;
      });

      sessionStorage.setItem('users', JSON.stringify(computed));
    },
    changeCategoryName: (state, { payload }) => {
      const category = state.category.find(
        (item) => item.id === payload.categoryId
      );

      category.name = payload.name;
    },
    initializeItems: (state, { payload }) => {
      state.currentItems = payload;
    },
    removeCategory: (state, { payload }) => {
      state.category = state.category.filter((item) => item.id !== payload);

      const users = getFromSessionStorage('users');
      const parsed_users = JSON.parse(users);

      const computed = parsed_users.map((user) => {
        if (user.email === state.email) {
          user.category = state.category;
          return user;
        }

        return user;
      });

      sessionStorage.setItem('users', JSON.stringify(computed));
    },
    removeItem: (state, { payload }) => {
      // const category = state.category.find(
      //   (item) => item.id === payload.categoryId
      // );

      // category.items = category.items.filter(
      //   (item) => item.id !== payload.itemId
      // );

      state.category = state.category.filter((item) => item.id !== payload);

      const users = getFromSessionStorage('users');
      const parsed_users = JSON.parse(users);

      const computed = parsed_users.map((user) => {
        if (user.email === state.email) {
          user.category.map((category) => {
            if (category.id === payload.id) {
              const cat = category.items.filter(
                (item) => item.id !== payload.itemId
              );
              return cat;
            }

            return category;
          });
          return user;
        }

        return user;
      });

      sessionStorage.setItem('users', JSON.stringify(computed));
    },
    handleLogin: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.isLoggedIn = true;
      state.category = payload.category;
    },
  },
});

export const {
  createItem,
  removeItem,
  handleLogin,
  clearInventory,
  createCategory,
  removeCategory,
  initializeItems,
  changeCategoryName,
} = inventorySlice.actions;

export default inventorySlice.reducer;
