/** Tiny className joiner — keeps only non-empty strings, filters falsy values. */
export function cn(...parts: unknown[]): string {
  return parts.filter((part): part is string => typeof part === 'string' && part.length > 0).join(' ')
}
