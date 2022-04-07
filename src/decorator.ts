import { Injectable, ScopeEnum } from '@artus/injection';
import { ArtusInjectEnum, HOOK_NAME_META_PREFIX } from './constraints';
import { appExtMap } from './application';

export function ApplicationExtension(): ClassDecorator {
  return (target: any) => {
    appExtMap.add(target);
  };
};

export function ApplicationHook(hookName?: string): PropertyDecorator {
  return (target: any, propertyKey: string|symbol) => {
    if (typeof propertyKey === 'symbol') {
      throw new Error(`hookName is not support symbol [${propertyKey.description}]`);
    }
    Reflect.defineMetadata(`${HOOK_NAME_META_PREFIX}${propertyKey}`, hookName ?? propertyKey, target.constructor);
  };
};

export function DefineTrigger(): ClassDecorator {
  return (target:any) => Injectable({
    id: ArtusInjectEnum.Trigger,
    scope: ScopeEnum.SINGLETON
  })(target);
}
