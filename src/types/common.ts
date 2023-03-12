declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string;
      PRIVATE_KEY: string;
    }
  }
}

export {};
