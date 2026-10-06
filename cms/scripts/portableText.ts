type Mark = { _key: string; _type: 'link'; href: string }

type Span = { _key: string; _type: 'span'; marks: string[]; text: string }

export type Block = {
  _key: string
  _type: 'block'
  children: Span[]
  level?: number
  listItem?: 'bullet' | 'number'
  markDefs: Mark[]
  style: 'normal' | 'h2' | 'h3'
}

type Link = { href: string; text: string }

type Inline = string | Link

type Node =
  | { kind: 'h2' | 'h3' | 'p'; content: Inline[] }
  | { kind: 'ul' | 'ol'; items: (Inline[] | { nested: Inline[][] })[] }

export const h2 = (text: string): Node => ({ content: [text], kind: 'h2' })
export const h3 = (text: string): Node => ({ content: [text], kind: 'h3' })
export const p = (...content: Inline[]): Node => ({ content, kind: 'p' })
export const ul = (...items: (Inline[] | { nested: Inline[][] })[]): Node => ({ items, kind: 'ul' })
export const ol = (...items: (Inline[] | { nested: Inline[][] })[]): Node => ({ items, kind: 'ol' })
export const link = (text: string, href: string): Link => ({ href, text })
export const nested = (...items: Inline[][]) => ({ nested: items })

export function toBlocks(prefix: string, nodes: Node[]): Block[] {
  const blocks: Block[] = []
  const block = (
    content: Inline[],
    style: Block['style'],
    list?: { listItem: 'bullet' | 'number'; level: number }
  ) => {
    const key = `${prefix}${blocks.length}`
    const markDefs: Mark[] = []
    const children = content.map((part, index): Span => {
      if (typeof part === 'string') {
        return { _key: `${key}s${index}`, _type: 'span', marks: [], text: part }
      }
      const markKey = `${key}m${markDefs.length}`
      markDefs.push({ _key: markKey, _type: 'link', href: part.href })
      return { _key: `${key}s${index}`, _type: 'span', marks: [markKey], text: part.text }
    })
    blocks.push({ _key: key, _type: 'block', children, markDefs, style, ...list })
  }

  for (const node of nodes) {
    if ('items' in node) {
      const listItem = node.kind === 'ul' ? 'bullet' : 'number'
      for (const item of node.items) {
        if ('nested' in item) {
          for (const child of item.nested) block(child, 'normal', { level: 2, listItem: 'bullet' })
        } else {
          block(item, 'normal', { level: 1, listItem })
        }
      }
    } else {
      block(node.content, node.kind === 'p' ? 'normal' : node.kind)
    }
  }
  return blocks
}
