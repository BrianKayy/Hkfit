export const SITE_URL = "https://www.hkfitness.ae";
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;
export const productPath = (slug: string) => `/apparel/${encodeURIComponent(slug)}`;
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
