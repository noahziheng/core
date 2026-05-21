import path from "path";
import { getInlinePackageEntryPath } from "../src/plugin/common";

describe("getInlinePackageEntryPath", () => {
  const fixtures = path.join(__dirname, "fixtures/plugins");

  it("resolves exports[\".\"] when it is a string subpath", async () => {
    const base = path.join(fixtures, "plugin_with_entry_c");
    const resolved = await getInlinePackageEntryPath(base);
    expect(resolved).toBe(path.join(base, "mock_lib"));
  });

  it("resolves conditional exports without require (default)", async () => {
    const base = path.join(fixtures, "plugin_with_entry_dot_default");
    const resolved = await getInlinePackageEntryPath(base);
    expect(resolved).toBe(path.join(base, "mock_lib"));
  });
});
