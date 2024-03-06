import { config } from 'dotenv';
import { resolve } from 'path';
import { expand } from 'dotenv-expand';
import { existsSync } from 'fs';
export const configLoader = () => {
  const defaultEnv = resolve(process.cwd(), `.env`);
  let cfg;
  if (existsSync(defaultEnv)) {
    cfg = config({ path: defaultEnv });
    expand(cfg);
  }
  if (process.env.APP_ENV) {
    const filePath = resolve(
      process.cwd(),
      `.env${process.env.APP_ENV ? `.${process.env.APP_ENV}` : ''}`,
    );
    if (existsSync(filePath)) {
      const cf2 = config({ path: filePath });
      expand(cf2);
    }
  }
};

export const dbKey = (key: string) => {
  const stackName = (process.env.STACK_NAME || `des-${process.env.APP_ENV}-api`)
    .split('-')
    .join('_')
    .toUpperCase();
  return `STACK#${stackName}#${key}`;
};
