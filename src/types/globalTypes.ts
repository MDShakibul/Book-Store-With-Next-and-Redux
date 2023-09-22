
export type Review = {
  body: string;
  userEmail: string;
  createdAt: string;
};

export type IUser = {
  _id: number;
  email: string;
  password: string;
  wishList?: string[];
  continueList?: string[];
};

export type IBook = {
  _id: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  review?: Review[];
  addBy: string | IUser;
  finishedBy?: string[];
  isComplete: boolean;
};




