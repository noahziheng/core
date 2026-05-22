import path from 'path';
import { getInlinePackageEntryPath } from '../src/plugin/common';

describe('test/plugin-common.test.ts', () => {
  describe('getInlinePackageEntryPath', () => {
    it('should resolve exports["."] when the target is a string', async () => {
      const root = path.join(__dirname, 'fixtures/inline_package_exports_dot_string');
      const resolved = await getInlinePackageEntryPath(root);
      expect(resolved).toBe(root);
    });

    it('should resolve exports["."] when only default condition is present', async () => {
      const root = path.join(__dirname, 'fixtures/inline_package_exports_default_only');
      const resolved = await getInlinePackageEntryPath(root);
      expect(resolved).toBe(root);
    });
  });
});
