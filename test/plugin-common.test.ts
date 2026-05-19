import 'reflect-metadata';
import path from 'path';
import { getInlinePackageEntryPath } from '../src/plugin/common';

describe('test/plugin-common.test.ts', () => {
  describe('getInlinePackageEntryPath', () => {
    it('resolves dirname when exports["."] is a string', async () => {
      const pkgRoot = path.resolve(
        __dirname,
        'fixtures/inline_pkg_exports_string_dot',
      );
      const resolved = await getInlinePackageEntryPath(pkgRoot);
      expect(resolved).toBe(path.join(pkgRoot, 'entrypoint'));
    });

    it('resolves dirname when exports["."] is object with default but no require', async () => {
      const pkgRoot = path.resolve(
        __dirname,
        'fixtures/inline_pkg_exports_object_default',
      );
      const resolved = await getInlinePackageEntryPath(pkgRoot);
      expect(resolved).toBe(path.join(pkgRoot, 'out'));
    });
  });
});
