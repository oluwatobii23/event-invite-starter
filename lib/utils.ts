export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ')
}

export function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
