export interface Burger {
  _id?: string;
  name: string;
  image: string;
  ingredients: string[];
  restaurants: string[];
}

export interface Restaurant {
  _id?: string;
  name: string;
  address: string;
  menu: string[];
}
