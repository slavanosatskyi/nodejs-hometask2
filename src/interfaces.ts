export type UserId = string;

export type User = {
  id: UserId;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type UserDTO = Omit<User, 'id' | 'isDeleted'>;

export type UserParams = {
  id: string;
};

export type FilterQueryParams = {
  loginSubstring?: string;
  limit?: string;
};
