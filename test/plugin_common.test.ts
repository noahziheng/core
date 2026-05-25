import path from 'path';
import { getInlinePackageEntryPath } from '../src/plugin/common';

describe('getInlinePackageEntryPath', () => {
  it('should resolve exports["."] string shorthand before main', async () => {
    const pkgRoot = path.resolve(
      __dirname,
      './fixtures/plugins/plugin_with_entry_c',
    );
    const resolved = await getInlinePackageEntryPath(pkgRoot);
    expect(resolved).toBe(path.resolve(pkgRoot, 'mock_lib'));
  });

  it('should resolve exports["."] object with require', async () => {
    const pkgRoot = path.resolve(
      __dirname,
      './fixtures/plugins/plugin_with_entry_dot_require',
    );
    const resolved = await getInlinePackageEntryPath(pkgRoot);
    expect(resolved).toBe(path.resolve(pkgRoot, 'mock_lib'));
  });
});
