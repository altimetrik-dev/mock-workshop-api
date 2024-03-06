import { unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { configLoader } from './config.helper';

describe('Config Helpers', () => {
  it('exist .env', () => {
    writeFileSync(join(process.cwd(), '.env'), 'TEST_ROOT_VAR=root');
    configLoader();
    unlinkSync(join(process.cwd(), '.env'));
    expect(process.env.TEST_ROOT_VAR).toBe('root');
  });
  it('not exist .env', () => {
    configLoader();
    expect(process.env.TEST_VAR).toBeUndefined();
  });
  it('exist stack .env', () => {
    process.env.APP_ENV = 'test';
    writeFileSync(join(process.cwd(), '.env.test'), 'TEST_LOCAL_VAR=local');
    configLoader();
    unlinkSync(join(process.cwd(), '.env.test'));
    expect(process.env.TEST_LOCAL_VAR).toBe('local');
  });
  it('not exist stack .env', () => {
    configLoader();
    expect(process.env.TEST_VAR).toBeUndefined();
  });
});
