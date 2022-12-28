export type UserId = string;

export type User = {
  id: UserId;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type UserData = Omit<User, 'id'>;
