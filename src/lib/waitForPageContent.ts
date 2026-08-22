import { waitForRegisteredPageAssets } from '@/lib/pageLoadRegistry';

export interface WaitForPageContentOptions {
  /** Корневой узел для поиска медиа. По умолчанию — `#root`. */
  root?: ParentNode | null;
  /** Минимальное время показа загрузки, мс. */
  minDuration?: number;
  /** Максимальное ожидание, мс. */
  maxDuration?: number;
  /** Пауза без новых ресурсов перед завершением, мс. */
  settleDuration?: number;
}

const DEFAULT_ROOT_SELECTOR = '#root';

function loadUrl(url: string): Promise<void> {
  if (!url || url.startsWith('data:')) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.src = url;
  });
}

function loadImage(img: HTMLImageElement): Promise<void> {
  if (img.loading === 'lazy') {
    img.loading = 'eager';
  }

  if (img.complete && img.naturalWidth > 0) {
    return Promise.resolve();
  }

  const src = img.currentSrc || img.src;
  if (!src) return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => resolve();
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
    loadUrl(src).finally(done);
  });
}

function loadMediaElement(
  element: HTMLMediaElement,
  readyStateThreshold = HTMLMediaElement.HAVE_ENOUGH_DATA
): Promise<void> {
  if (element.readyState >= readyStateThreshold) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const done = () => resolve();
    element.addEventListener('canplaythrough', done, { once: true });
    element.addEventListener('loadeddata', done, { once: true });
    element.addEventListener('error', done, { once: true });
    element.load();
  });
}

function extractBackgroundImageUrls(element: Element): string[] {
  const style = window.getComputedStyle(element);
  const value = style.backgroundImage;
  if (!value || value === 'none') return [];

  const urls: string[] = [];
  const pattern = /url\(["']?([^"')]+)["']?\)/g;
  let match = pattern.exec(value);
  while (match) {
    urls.push(match[1]);
    match = pattern.exec(value);
  }
  return urls;
}

function collectAssetPromises(root: ParentNode): Promise<void>[] {
  const promises: Promise<void>[] = [];

  if (root instanceof HTMLImageElement) {
    promises.push(loadImage(root));
  }

  if (root instanceof HTMLVideoElement || root instanceof HTMLAudioElement) {
    promises.push(loadMediaElement(root));
  }

  if (root instanceof Element) {
    promises.push(...extractBackgroundImageUrls(root).map(loadUrl));

    root.querySelectorAll('img').forEach((img) => {
      promises.push(loadImage(img));
    });

    root.querySelectorAll('video').forEach((video) => {
      promises.push(loadMediaElement(video));
    });

    root.querySelectorAll('audio').forEach((audio) => {
      promises.push(loadMediaElement(audio));
    });

    root.querySelectorAll('picture source[srcset]').forEach((source) => {
      const srcset = source.getAttribute('srcset');
      if (!srcset) return;
      const firstCandidate = srcset.split(',')[0]?.trim().split(/\s+/)[0];
      if (firstCandidate) promises.push(loadUrl(firstCandidate));
    });
  }

  return promises;
}

function waitForDocumentReady(): Promise<void> {
  if (document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function resolveRoot(root?: ParentNode | null): ParentNode {
  if (root) return root;
  return document.querySelector(DEFAULT_ROOT_SELECTOR) ?? document.body;
}

export async function waitForPageContent(
  options: WaitForPageContentOptions = {}
): Promise<void> {
  const {
    root,
    minDuration = 350,
    maxDuration = 20000,
    settleDuration = 450,
  } = options;

  const startedAt = performance.now();
  const contentRoot = resolveRoot(root);

  await waitForDocumentReady();

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  // Дать дочерним компонентам зарегистрировать ресурсы в useEffect.
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

  await new Promise<void>((resolve) => {
    const pending = new Set<Promise<void>>();
    let settleTimer = 0;
    let finished = false;

    const track = (promise: Promise<void>) => {
      pending.add(promise);
      promise.finally(() => {
        pending.delete(promise);
        scheduleSettle();
      });
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(settleTimer);
      window.clearTimeout(safetyTimer);
      observer.disconnect();

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minDuration - elapsed);
      window.setTimeout(resolve, remaining);
    };

    const scheduleSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (pending.size === 0) {
          void waitForRegisteredPageAssets()
            .then(() => waitForPaint())
            .then(finish);
        }
      }, settleDuration);
    };

    const scan = (node: Node) => {
      if (node instanceof Element || node instanceof Document || node instanceof DocumentFragment) {
        collectAssetPromises(node).forEach(track);
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(scan);
        if (
          mutation.type === 'attributes' &&
          mutation.target instanceof HTMLImageElement &&
          (mutation.attributeName === 'src' || mutation.attributeName === 'srcset')
        ) {
          track(loadImage(mutation.target));
        }
      });
      scheduleSettle();
    });

    observer.observe(contentRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'srcset', 'style'],
    });

    scan(contentRoot);
    track(waitForRegisteredPageAssets().then(() => undefined));
    scheduleSettle();

    const safetyTimer = window.setTimeout(finish, maxDuration);
  });
}
