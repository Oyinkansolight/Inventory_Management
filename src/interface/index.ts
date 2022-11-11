export interface User {
  email: string;
  name: string;
  password: string;
  category: Category[] | [];
}

type Category = {
  name: string;
  items: Item[] | [];
};

type Item = {
  name: string;
  items: [];
};

export type Inventory = {
  name: string;
  email: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  category: [];
};
