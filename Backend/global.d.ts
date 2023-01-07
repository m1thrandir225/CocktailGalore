namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_BUCKET_NAME: string;
  }
}
