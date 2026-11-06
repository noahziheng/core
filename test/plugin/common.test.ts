import path from "path";
import { getInlinePackageEntryPath } from "../../src/plugin/common";

describe("test/plugin/common.test.ts", () => {
  describe("getInlinePackageEntryPath", () => {
    it("should resolve when exports['.'] is a string", async () => {
      const packagePath = path.resolve(
        __dirname,
        "../fixtures/plugins/plugin_inline_exports_dot_string",
      );
      const resolved = await getInlinePackageEntryPath(packagePath);
      expect(resolved).toBe(path.resolve(packagePath));
    });

    it("should resolve when exports['.'] is a conditional object with require", async () => {
      const packagePath = path.resolve(
        __dirname,
        "../fixtures/plugins/plugin_inline_exports_dot_conditional",
      );
      const resolved = await getInlinePackageEntryPath(packagePath);
      expect(resolved).toBe(path.resolve(packagePath));
    });
  });
});
