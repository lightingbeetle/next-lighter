import { useEffect, useCallback, useRef, useMemo } from "react";

import generateId from "./useId";
import canUseDom from "./canUseDom";

// TODO: replace this with useId from React 18
/**
 * Returns unique string for the `id` attribute.
 *
 * @param id Provided id
 * @param name Optional prefix
 */
const useUniqueId = (id?: string, name?: string) =>
  useMemo(() => id ?? generateId(name), [id, name]);

interface StaticClass {
  update?(config?: {}): void;
  destroy?(): void;
}

interface StaticClassConstructable<T extends StaticClass> {
  new (ref: HTMLElement, config: {}): T;
}

/**
 * Hook that is managing "static" class in a reactive way
 *
 * @param StaticClass Class that encapsulates DOM mutating behaviour
 * @param config Object holding message passed to static class
 */

const useStatic = <T extends StaticClass>(
  StaticClass: StaticClassConstructable<T>,
  config: {} = {},
  hookConfig?: {
    /** Inits StaticClass asynchronously */
    async?: boolean;
  }
) => {
  const instance = useRef<T | null>(null);
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config ?? {};
  }, [config]);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      // use latest config available
      const config = configRef.current;
      if (node) {
        if (instance.current === null) {
          if (hookConfig?.async) {
            setTimeout(() => {
              instance.current = new StaticClass(node, config) as T;
            });
          } else {
            instance.current = new StaticClass(node, config) as T;
          }
        } else {
          instance.current.update?.(config);
        }
      }
    },
    [StaticClass, hookConfig]
  );

  useEffect(
    () => () => {
      if (instance.current) {
        instance.current.destroy?.();
        instance.current = null;
      }
    },
    []
  );

  return [ref, instance] as const;
};

// From https://www.jayfreestone.com/writing/react-portals-with-hooks/
function useGetRootElementForPortal(id: string) {
  const rootElemRef = useRef(document?.createElement("div"));

  useEffect(
    function setupElement() {
      // Look for existing target dom element to append to
      const parentElem = document?.getElementById(id);

      // Add the detached element to the parent
      // eslint-disable-next-line no-unused-expressions
      parentElem?.appendChild(rootElemRef.current);
      // This function is run on unmount
      return function removeElement() {
        // eslint-disable-next-line no-unused-expressions
        rootElemRef?.current.remove();
      };
    },
    [id]
  );

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document?.createElement("div");
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

// usePortal crashes on server so we should use this check when using portals
function usePortal(id: string) {
  // this is ok to be behind condition because in the browser it will be always true and at server it will not be called at all
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return canUseDom() ? useGetRootElementForPortal(id) : null;
}

const useIsComponentMounted = (): boolean => {
  const mounted = useRef<boolean>(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted.current;
};

export { useUniqueId, useStatic, usePortal, useIsComponentMounted };
