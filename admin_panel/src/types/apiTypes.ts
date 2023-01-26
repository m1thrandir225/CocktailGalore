export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  likedFlavours: Flavour[];
  favouriteCocktails: Cocktail[];
  readInsights: Insight[];
};

export type Cocktail = {
  id: number;
  name: string;
  timeToMake: number;
  ingredients: string;
  instructions: string;
  image: string;
  flavours: Flavour[];
};

export type Author = {
  id: number;
  name: string;
  image: string;
};

export type Insight = {
  id: number;
  authorId: number;
  date: string;
  image: string;
  title: string;
  description: any;
  readTime: number;
};

export type Flavour = {
  id: number;
  name: string;
};
