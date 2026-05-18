import 'reflect-metadata';
import path from 'path';
import { getInlinePackageEntryPath } from '../src/plugin/common';

describe('test/plugin_inline_entry.test.ts', () => {
  it('should resolve exports["."] string to entry dirname', async () => {
    const root = path.resolve(__dirname, 'fixtures/inline_pkg_exports_dot_string');
    const resolved = await getInlinePackageEntryPath(root);
    expect(resolved).toBe(path.join(root, 'resolved'));
  });

  it('should resolve exports["."] object with default to entry dirname', async () => {
    const root = path.resolve(__dirname, 'fixtures/inline_pkg_exports_dot_object_default');
    const resolved = await getInlinePackageEntryPath(root);
    expect(resolved).toBe(path.join(root, 'resolved'));
  });

  it('should resolve exports["."] object with require to entry dirname', async () => {
    const root = path.resolve(__dirname, 'fixtures/inline_pkg_exports_dot_object_require');
    const resolved = await getInlinePackageEntryPath(root);
    expect(resolved).toBe(path.join(root, 'resolved'));
  });
});
