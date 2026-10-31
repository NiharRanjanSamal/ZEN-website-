const BAD = "MYMEMORY WARNING";

type PlainObject = Record<string, unknown>;

function isBadString(value: unknown): value is string {
  return typeof value === "string" && value.includes(BAD);
}

/** Replace failed machine-translation placeholders with the English source string. */
export function sanitizeLocaleContent<T extends PlainObject>(en: T, hi: T): T {
  return mergeWithFallback(en, hi) as T;
}

function mergeWithFallback(en: unknown, hi: unknown): unknown {
  if (isBadString(hi)) return en;
  if (Array.isArray(hi)) {
    const enArr = Array.isArray(en) ? en : [];
    return hi.map((item, index) => mergeWithFallback(enArr[index], item));
  }
  if (hi && typeof hi === "object") {
    const enObj = en && typeof en === "object" ? (en as PlainObject) : {};
    const out: PlainObject = {};
    for (const key of Object.keys(hi as PlainObject)) {
      out[key] = mergeWithFallback(enObj[key], (hi as PlainObject)[key]);
    }
    return out;
  }
  return hi;
}
