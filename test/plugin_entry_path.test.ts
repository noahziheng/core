import "reflect-metadata";
import path from "path";
import { getInlinePackageEntryPath } from "../src/plugin/common";

describe("getInlinePackageEntryPath", () => {
  const fixtures = path.join(__dirname, "fixtures/plugins");

  it("resolves exports field when it is a top-level string", async () => {
    const pkgPath = path.join(fixtures, "plugin_with_entry_b");
    const resolved = await getInlinePackageEntryPath(pkgPath);
    expect(resolved).toBe(path.join(pkgPath, "mock_lib"));
  });

  it('resolves exports["."] when the target is a string (not only .require object)', async () => {
    const pkgPath = path.join(fixtures, "plugin_with_entry_c");
    const resolved = await getInlinePackageEntryPath(pkgPath);
    expect(resolved).toBe(path.join(pkgPath, "mock_lib"));
  });
});
