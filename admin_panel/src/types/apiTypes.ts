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
  ingredients: JSON;
  instructions: JSON;
  image: string;
  flavours: Flavour[];
  categories: CocktailCategory[];
};

export type CocktailCategory = {
  id: number;
  name: string;
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
