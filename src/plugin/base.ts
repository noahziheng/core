import { ManifestPluginUnit } from "../loader";
import { Plugin, PluginConfigItem, PluginMetadata } from "./types";

type PluginMap = Map<string, BasePlugin>;

export class BasePlugin implements Plugin {
  public name: string;
  public enable: boolean;
  public importPath: string;
  public metadata: Partial<PluginMetadata> = {};
  public manifest: Partial<ManifestPluginUnit>;

  constructor(name: string, configItem: PluginConfigItem) {
    this.name = name;
    const importPath = configItem.path ?? configItem.package;
    if (!importPath) {
      throw new Error(`Plugin ${name} need have path or package field`);
    }
    this.importPath = importPath;
    this.enable = configItem.enable ?? false;
    this.manifest = configItem.manifest ?? {};
  }

  async init() { }

  checkPluginStatus(allPlugins: PluginMap, checks: string[], optional: boolean) {
    for (const pluginName of checks) {
      const instance = allPlugins.get(pluginName);
      if (!instance || !instance.enable) {
        if (optional) {
          // TODO: use artus logger instead
          console.warn(`Plugin ${this.name} need have optional dependence: ${pluginName}.`)
        } else {
          throw new Error(`Plugin ${this.name} need have dependence: ${pluginName}.`);
        }
      }
    }
  }

  checkDepExisted(map: PluginMap): void {
    this.checkPluginStatus(map, this.metadata.dependencies ?? [], false);
    this.checkPluginStatus(map, this.metadata.optionalDependencies ?? [], true);
  }

  getDepEdgeList(): [string, string][] {
    return this.metadata.dependencies?.map((depPluginName) => [this.name, depPluginName]) ?? [];
  }
}
