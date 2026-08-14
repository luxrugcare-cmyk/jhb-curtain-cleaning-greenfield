const DEFAULT_MIN_DESCRIPTION = 90;
const DEFAULT_MAX_DESCRIPTION = 165;
const DEFAULT_MAX_TITLE_BASE = 46;
const BRAND_SUFFIX = /\s*(?:\||[-–—])\s*JHB Curtain Cleaning\s*$/i;

function clean(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripBrandSuffix(value: string) {
  let title = clean(value);
  while (BRAND_SUFFIX.test(title)) {
    title = title.replace(BRAND_SUFFIX, "").trim();
  }
  return title;
}

export function normalizeSeoDescription(
  value: string | undefined,
  fallback: string,
  context: string,
) {
  let description = clean(value || fallback);
  if (description.length < DEFAULT_MIN_DESCRIPTION) {
    description = clean(`${description} ${context}`);
  }
  if (description.length > DEFAULT_MAX_DESCRIPTION) {
    const clipped = description.slice(0, DEFAULT_MAX_DESCRIPTION - 1);
    const boundary = clipped.lastIndexOf(" ");
    description = `${clipped.slice(0, boundary > 100 ? boundary : clipped.length).replace(/[,:;\-\s]+$/, "")}.`;
  }
  return description;
}

export function normalizeSeoTitle(value: string | undefined, fallback: string) {
  const title = stripBrandSuffix(value || fallback);
  if (title.length <= DEFAULT_MAX_TITLE_BASE) return title;
  const clipped = title.slice(0, DEFAULT_MAX_TITLE_BASE);
  const boundary = clipped.lastIndexOf(" ");
  return clipped.slice(0, boundary > 28 ? boundary : clipped.length).replace(/[,:;\-\s]+$/, "");
}
