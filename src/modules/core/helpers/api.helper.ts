import { existsSync } from 'fs';
import { join } from 'path';

export const API_PATH = (path: string, version = 'v1') => {
  path = path.startsWith('/') ? path.slice(1) : `${path}`;
  return `${version}/${path}`;
};

export const ENV = () => {
  const defaultEnv = join(process.cwd(), '.env');
  let envFilePath = defaultEnv;
  if (process.env.APP_ENV) {
    envFilePath = join(process.cwd(), `.env.${process.env.APP_ENV}`);
    if (!existsSync(envFilePath)) {
      envFilePath = defaultEnv;
    }
  }
  if (!existsSync(envFilePath)) {
    envFilePath = null;
  }
  return envFilePath;
};
