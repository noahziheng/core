import { Constructable, Container } from '@artus/injection';
import { Application } from '../types';
import {
  HOOK_CONSTRUCTOR_PARAMS,
  HOOK_CONSTRUCTOR_PARAMS_APP,
  HOOK_CONSTRUCTOR_PARAMS_CONTAINER,
  HOOK_NAME_META_PREFIX
} from '../constraints';

export type HookFunction = <T = unknown>(hookProps : {
  app: Application,
  lifecycleManager: LifecycleManager,
  payload?: T
}) => void|Promise<void>;

export class LifecycleManager {
  hookList: string[] = [
    'configWillLoad', // 配置文件即将加载，这是最后动态修改配置的时机
    'configDidLoad', // 配置文件加载完成
    'didLoad', // 文件加载完成
    'willReady', // 插件启动完毕
    'didReady', // 应用启动完成
    'beforeClose' // 应用即将关闭
  ];
  hookFnMap: Map<string, HookFunction[]> = new Map();
  private app: Application;
  private container: Container;

  constructor(app: Application, container: Container) {
    this.app = app;
    this.container = container;
  }

  insertHook(existHookName: string, newHookName: string) {
    const startIndex = this.hookList.findIndex((val) => val === existHookName);
    this.hookList.splice(startIndex, 0, newHookName);
  }

  appendHook(newHookName: string) {
    this.hookList.push(newHookName);
  }

  registerHook(hookName: string, hookFn: HookFunction) {
    if (this.hookFnMap.has(hookName)) {
      this.hookFnMap.get(hookName)?.push(hookFn);
    } else {
      this.hookFnMap.set(hookName, [
        hookFn
      ]);
    }
  }

  batchRegisterHookByClass(hookClazz: Constructable<any>) {
    const fnMetaKeys = Reflect.getMetadataKeys(hookClazz);
    const constructorParams = Reflect.getMetadata(HOOK_CONSTRUCTOR_PARAMS, hookClazz) ?? [];
    const paramsMap = {
      [HOOK_CONSTRUCTOR_PARAMS_APP]: this.app,
      [HOOK_CONSTRUCTOR_PARAMS_CONTAINER]: this.container
    };
    const hookClazzInstance = new hookClazz(...constructorParams.map((param) => paramsMap[param]));
    for (const fnMetaKey of fnMetaKeys) {
      if (typeof fnMetaKey !== 'string' || !fnMetaKey.startsWith(HOOK_NAME_META_PREFIX)) {
        continue;
      }
      const hookName = Reflect.getMetadata(fnMetaKey, hookClazz);
      const propertyKey = fnMetaKey.slice(HOOK_NAME_META_PREFIX.length);
      this.registerHook(hookName, hookClazzInstance[propertyKey].bind(hookClazzInstance));
    }
  }

  async emitHook<T = unknown>(hookName: string, payload?: T) {
    if (!this.hookFnMap.has(hookName)) {
      return;
    }
    const fnList = this.hookFnMap.get(hookName);
    if (!Array.isArray(fnList)) {
      return;
    }
    for (const hookFn of fnList) {
      await hookFn({
        app: this.app,
        lifecycleManager: this,
        payload
      });
    }
  }
};
