export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  likedFlavours: [];
  favouriteCocktails: [];
  readInsights: [];
};

export type Cocktail = {
  id: number;
  name: string;
  flavours: [];
  timeToMake: number;
  ingredients: string[];
  instructions: string[];
  image: string;
};

export type Flavour = {
  id: number;
  name: string;
};

export type Insight = {
  id: number;
  date: string;
  title: string;
  description: JSON;
  image: string;
  authorId: number;
};
