import { useCallback, useEffect, useMemo, useState } from 'react'
import { memories } from '../content/content'

/*
 * Memory cards can be personalised without touching code:
 *  - open the site with ?edit to see the editor (only Kamal needs this link)
 *  - edits are previewed locally (localStorage, this browser only)
 *  - "Copy link" encodes the cards into ?m=... so the shared link carries them
 * Nothing is ever uploaded.
 */

const STORAGE_KEY = 'blue.memories.v1'
const MAX_TITLE = 80
const MAX_TEXT = 320
const MAX_CLOSING = 240

const defaults = {
  cards: memories.cards.map(({ id, title, text }) => ({ id, title, text })),
  closing: memories.closing,
}

const clean = (value, max) => (typeof value === 'string' ? value.slice(0, max) : '')

function sanitize(raw) {
  if (!raw || typeof raw !== 'object') return null
  const titles = Array.isArray(raw.t) ? raw.t : []
  const texts = Array.isArray(raw.x) ? raw.x : []
  return {
    cards: defaults.cards.map((card, index) => ({
      id: card.id,
      title: clean(titles[index], MAX_TITLE).trim() || card.title,
      text: clean(texts[index], MAX_TEXT).trim() || card.text,
    })),
    closing: clean(raw.c, MAX_CLOSING).trim() || defaults.closing,
  }
}

function toCompact(data) {
  return { t: data.cards.map((c) => c.title), x: data.cards.map((c) => c.text), c: data.closing }
}

function encode(data) {
  const bytes = new TextEncoder().encode(JSON.stringify(toCompact(data)))
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decode(value) {
  try {
    let b64 = value.replace(/-/g, '+').replace(/_/g, '/')
    while (b64.length % 4) b64 += '='
    const binary = atob(b64)
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0))
    return sanitize(JSON.parse(new TextDecoder().decode(bytes)))
  } catch {
    return null
  }
}

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? sanitize(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

function writeStorage(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toCompact(data)))
  } catch {
    /* storage unavailable: preview simply won't persist */
  }
}

function clearStorage() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

function initial() {
  if (typeof window === 'undefined') return defaults
  const params = new URLSearchParams(window.location.search)
  const fromUrl = params.get('m') ? decode(params.get('m')) : null
  return fromUrl || readStorage() || defaults
}

export default function useMemoryCards() {
  const [data, setData] = useState(initial)
  const editMode = useMemo(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('edit'),
    [],
  )

  useEffect(() => {
    if (editMode) writeStorage(data)
  }, [data, editMode])

  const updateCard = useCallback((index, field, value) => {
    setData((prev) => ({
      ...prev,
      cards: prev.cards.map((card, i) => (i === index ? { ...card, [field]: value } : card)),
    }))
  }, [])

  const updateClosing = useCallback((value) => setData((prev) => ({ ...prev, closing: value })), [])

  const reset = useCallback(() => {
    clearStorage()
    setData(defaults)
  }, [])

  /** Values used for display: empty fields fall back to defaults. */
  const display = useMemo(() => sanitize(toCompact(data)) || defaults, [data])

  const shareLink = useCallback(() => {
    const url = new URL(window.location.href)
    url.search = ''
    url.hash = ''
    const isDefault =
      display.closing === defaults.closing &&
      display.cards.every((c, i) => c.title === defaults.cards[i].title && c.text === defaults.cards[i].text)
    if (!isDefault) url.searchParams.set('m', encode(display))
    return url.toString()
  }, [display])

  return { data, display, editMode, updateCard, updateClosing, reset, shareLink, limits: { MAX_TITLE, MAX_TEXT, MAX_CLOSING } }
}
