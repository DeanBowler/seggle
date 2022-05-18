/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function disableReactDevTools() {
  if (typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // Replace all global hook properties with a no-op function or a null value
    for (const prop in (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      if (prop === 'renderers') {
        // prevents console error when dev tools try to iterate of renderers
        (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
        continue;
      }
      (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = isFunction(
        (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__[prop],
      )
        ? Function.prototype
        : null;
    }
  }
}

export function isFunction(obj: any | Function): obj is Function {
  return typeof obj == 'function';
}
