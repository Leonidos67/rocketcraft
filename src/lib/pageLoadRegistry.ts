const registeredAssets = new Set<Promise<unknown>>();

export function registerPageLoadAsset<T>(promise: Promise<T>): () => void {
  registeredAssets.add(promise);
  promise.finally(() => {
    registeredAssets.delete(promise);
  });
  return () => {
    registeredAssets.delete(promise);
  };
}

export async function waitForRegisteredPageAssets(): Promise<void> {
  const pending = [...registeredAssets];
  if (pending.length === 0) return;
  await Promise.allSettled(pending);
}
