declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string;
    }
  }
}

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

