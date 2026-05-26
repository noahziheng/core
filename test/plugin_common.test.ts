import "reflect-metadata";
import path from "path";
import { getInlinePackageEntryPath } from "../src/plugin/common";

describe("test/plugin_common.test.ts", () => {
  describe("getInlinePackageEntryPath", () => {
    it("resolves exports['.'] when it is a string", async () => {
      const root = path.join(__dirname, "fixtures/inline_pkg_exports_dot_string");
      const resolved = await getInlinePackageEntryPath(root);
      expect(resolved).toBe(path.join(root, "pkg-main"));
    });

    it("resolves exports['.'] when only default condition is set", async () => {
      const root = path.join(__dirname, "fixtures/inline_pkg_exports_dot_default");
      const resolved = await getInlinePackageEntryPath(root);
      expect(resolved).toBe(path.join(root, "pkg-runtime"));
    });

    it("prefers require over import when both exist", async () => {
      const root = path.join(__dirname, "fixtures/inline_pkg_exports_dot_require");
      const resolved = await getInlinePackageEntryPath(root);
      expect(resolved).toBe(path.join(root, "pkg-cjs"));
    });
  });
});
