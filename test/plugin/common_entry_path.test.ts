import path from 'path';
import { getInlinePackageEntryPath } from '../../src/plugin/common';

describe('test/plugin/common_entry_path.test.ts', () => {
  describe('getInlinePackageEntryPath', () => {
    it('should resolve exports["."] when it is a string', async () => {
      const pkgRoot = path.resolve(
        __dirname,
        '../fixtures/inline_pkg_exports_dot_string',
      );
      const resolved = await getInlinePackageEntryPath(pkgRoot);
      expect(resolved).toBe(path.join(pkgRoot, 'dist'));
    });

    it('should resolve exports["."] object using default when require is absent', async () => {
      const pkgRoot = path.resolve(
        __dirname,
        '../fixtures/inline_pkg_exports_dot_object_default',
      );
      const resolved = await getInlinePackageEntryPath(pkgRoot);
      expect(resolved).toBe(path.join(pkgRoot, 'lib'));
    });

    it('should prefer require over import for conditional exports', async () => {
      const pkgRoot = path.resolve(
        __dirname,
        '../fixtures/inline_pkg_exports_dot_object_require',
      );
      const resolved = await getInlinePackageEntryPath(pkgRoot);
      expect(resolved).toBe(path.join(pkgRoot, 'cjs'));
    });
  });
});
