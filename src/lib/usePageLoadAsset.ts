import { useEffect } from 'react';
import { registerPageLoadAsset } from '@/lib/pageLoadRegistry';

export function usePageLoadAsset(factory: () => Promise<unknown> | null | undefined, deps: unknown[]) {
  useEffect(() => {
    const promise = factory();
    if (!promise) return;
    return registerPageLoadAsset(promise);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
