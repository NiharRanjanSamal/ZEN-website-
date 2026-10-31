type RevealCallback = (visible: boolean) => void;

type RevealEntry = {
  callback: RevealCallback;
  once: boolean;
};

const entries = new WeakMap<Element, RevealEntry>();

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (observed) => {
      for (const entry of observed) {
        const record = entries.get(entry.target);
        if (!record) continue;

        if (entry.isIntersecting) {
          record.callback(true);
          if (record.once) {
            observer?.unobserve(entry.target);
            entries.delete(entry.target);
          }
        } else if (!record.once) {
          record.callback(false);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  return observer;
}

export function observeAboutReveal(
  element: Element,
  callback: RevealCallback,
  once: boolean,
): () => void {
  entries.set(element, { callback, once });
  getObserver().observe(element);

  return () => {
    getObserver().unobserve(element);
    entries.delete(element);
  };
}
