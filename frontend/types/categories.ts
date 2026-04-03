export type CategoryAPI = {
  id: number;
  name: string;
  slug: string;
  image: {
    url: string;
  };
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};
