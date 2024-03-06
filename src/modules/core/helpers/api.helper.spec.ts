import { unlinkSync, writeFileSync } from 'fs';
import { API_PATH, ENV } from './api.helper';
import { join } from 'path';

describe('Core API Helpers', () => {
  describe('Path Helper', () => {
    it('should get test path', () => {
      const path = API_PATH('test');
      expect(path).toBe('v1/test');
    });
    it('should return sliced path', () => {
      const path = API_PATH('/test');
      expect(path).toBe('v1/test');
    });
  });
  describe('Env Helper', () => {
    it('should get Test Env path', () => {
      writeFileSync(join(process.cwd(), '.env.test'), 'TEST_VAR=test');
      const path = ENV();
      unlinkSync(join(process.cwd(), '.env.test'));
      expect(path).toBe(join(process.cwd(), '.env.test'));
    });
    it('should get root Env path', () => {
      writeFileSync(join(process.cwd(), '.env'), 'TEST_VAR=test');
      const path = ENV();
      unlinkSync(join(process.cwd(), '.env'));
      expect(path).toBe(join(process.cwd(), '.env'));
    });
    it('should get null Env path', () => {
      const path = ENV();
      expect(path).toBeNull();
    });
  });
});
