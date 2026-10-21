/* global __VERCEL_ENV__ */
// Reads copy entries from src/content/<page>.js by slot ID (see CONTENT.md).
// Entry format, markers and the production gate are documented in scripts/draft-gate.mjs.

const modules = import.meta.glob('../../content/*.js', { eager: true })

const entries = new Map()
for (const [path, mod] of Object.entries(modules)) {
  const page = path.split('/').pop().replace(/\.js$/, '')
  for (const entry of mod.default ?? []) {
    const existing = entries.get(entry.id)
    if (existing) {
      throw new Error(`Copy id "${entry.id}" is defined in both ${existing.page}.js and ${page}.js`)
    }
    entries.set(entry.id, { ...entry, page })
  }
}

// Drafts are highlighted in local dev and on every deployment except production.
// __VERCEL_ENV__ is set at build time in vite.config.js; it is empty outside Vercel.
export const showDrafts = import.meta.env.DEV || __VERCEL_ENV__ !== 'production'

export const isApproved = (entry) => entry.status === 'approved'

export const getEntry = (id) => {
  const entry = entries.get(id)
  if (!entry) {
    // The build gate checks every literal ID; this catches IDs built at runtime.
    const message = `Unknown copy id "${id}"`
    if (showDrafts) throw new Error(message)
    console.error(message)
  }
  return entry
}

// Plain string, for attributes (alt, aria-label, title) and anything that can't hold markup.
// Drafts can't be highlighted there; the review file lists them.
export const copy = (id) => getEntry(id)?.text ?? ''
