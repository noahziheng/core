import { Container } from '@artus/injection';
import { HookFunction } from './lifecycle';
import { Manifest } from './loader';
import Trigger from './trigger';

export interface ApplicationLifecycle {
  configWillLoad?: HookFunction;
  configDidLoad?: HookFunction;
  didLoad?: HookFunction;
  willReady?: HookFunction;
  didReady?: HookFunction;
  beforeClose?: HookFunction;
}

export interface ApplicationInitOptions {
  containerName?: string;
}

export interface Application extends Container {
  manifest?: Manifest;
  config?: Record<string, any>;

  get trigger(): Trigger;

  load(manifest: Manifest): Promise<this>;
  run(): Promise<void>;
  registerHook(hookName: string, hookFn: HookFunction): void;
}

export * from './loader/types';
